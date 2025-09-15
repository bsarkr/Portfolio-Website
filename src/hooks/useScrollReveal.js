// /src/hooks/useScrollReveal.js
// By Bilash Sarkar
// Hook: reveals elements with `.section-reveal` as they enter the viewport.
// Handles iOS quirks, progressive enhancement (view-timeline), and graceful fallbacks.

import { useEffect } from "react";

export default function useScrollReveal({
    selector = ".section-reveal", // target elements to reveal
    root = null,                  // IntersectionObserver root
    rootMargin = "0px",           // IO root margin
    threshold = 0.18,             // IO intersection threshold
    toggleOut = false,            // if true, hide again when scrolled out (non-iOS)
} = {}) {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll(selector));
        if (!els.length) return;

        const isiOS = /iP(hone|od|ad)/i.test(navigator.userAgent);
        const html = document.documentElement;

        // Mark when JS is ready (prevents CSS from hiding before JS runs). Add iOS flag for CSS tweaks.
        html.classList.add("js-ready");
        if (isiOS) html.classList.add("ios");

        // Enable view-timeline only on browsers that truly support it (avoid iOS bugs).
        let viewTimelineOK = false;
        try {
            viewTimelineOK =
                !isiOS &&
                CSS?.supports?.("animation-timeline: view()") &&
                CSS?.supports?.("(animation-range: entry 20% cover 30%) or (timeline-scope: none)");
        } catch { }
        html.classList.toggle("view-timeline-ok", !!viewTimelineOK);

        // Track which nodes have been revealed to avoid repeat work.
        const revealed = new WeakSet();
        const vv = window.visualViewport;

        const show = (el) => {
            if (!revealed.has(el)) {
                el.classList.add("is-visible");
                revealed.add(el);
            }
        };
        const hide = (el) => el.classList.remove("is-visible");

        // Immediate pass to reveal anything already in view (accounts for iOS visualViewport).
        const prime = () => {
            const vh = (vv?.height ?? window.innerHeight) || document.documentElement.clientHeight;
            const fudgeTop = isiOS ? 0.10 : 0;   // tolerate iOS toolbar overlap
            const fudgeBottom = isiOS ? 0.05 : 0;
            for (const el of els) {
                const r = el.getBoundingClientRect();
                const inView = r.top < vh * (1 - fudgeTop) && r.bottom > vh * (-fudgeBottom);
                if (inView) show(el);
            }
        };

        // Fallback listeners in case IO isn't available or triggers late.
        window.addEventListener("scroll", prime, { passive: true });
        window.addEventListener("resize", prime);

        // IntersectionObserver: reveal on enter; optionally hide on exit (non-iOS).
        let io = null;
        if ("IntersectionObserver" in window) {
            io = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting || entry.intersectionRatio > 0) {
                            show(entry.target);
                            io.unobserve(entry.target); // reveal once
                        } else if (!isiOS && toggleOut) {
                            hide(entry.target);
                        }
                    }
                },
                {
                    root,
                    threshold: isiOS ? 0.001 : threshold,             // sensitive on iOS
                    rootMargin: isiOS ? "0px 0px -12% 0px" : rootMargin, // account for bottom bars
                }
            );
            els.forEach((el) => io.observe(el));
        }

        // Extra primes to beat Safari timing issues and viewport resizes.
        prime();
        const raf = requestAnimationFrame(prime);
        const onVV = () => setTimeout(prime, 60);
        vv?.addEventListener?.("resize", onVV);
        window.addEventListener("orientationchange", onVV);
        window.addEventListener("load", prime, { once: true });

        // iOS bailout: if nothing has appeared after 1.2s, force reveal.
        const bailTimer = setTimeout(() => {
            if (isiOS) els.forEach(show);
        }, 1200);

        // Cleanup: remove listeners, timers, and observers.
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(bailTimer);
            window.removeEventListener("scroll", prime);
            window.removeEventListener("resize", prime);
            window.removeEventListener("orientationchange", onVV);
            window.removeEventListener("load", prime);
            vv?.removeEventListener?.("resize", onVV);
            io?.disconnect();
        };
    }, [selector, root, rootMargin, threshold, toggleOut]);
}