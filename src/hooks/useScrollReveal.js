// /src/hooks/useScrollReveal.js
// By Bilash Sarkar
// Scroll-reveal hook with direction-aware behavior:
// - Fade IN as sections enter while scrolling down and keep them visible.
// - When scrolling up, progressively fade sections as they exit via the bottom,
//   then fully hide so they can re-reveal when scrolling back down.
// iOS-safe with reduced-motion support and fallbacks.

import { useEffect } from "react";

export default function useScrollReveal({
    selector = ".section-reveal",  // Elements to reveal
    root = null,                   // IntersectionObserver root
    rootMargin = "0px",            // IO root margin
    threshold = 0.18,              // Unused in this variant (multi-threshold IO below)
    toggleOut = true,              // Keep true; up-scroll fade-out is managed here
    enableViewTimeline = false     // Force off to avoid CSS view-timeline overriding logic
} = {}) {
    useEffect(() => {
        const els = Array.from(document.querySelectorAll(selector));
        if (!els.length) return;

        const isiOS = /iP(hone|od|ad)/i.test(navigator.userAgent);
        const html = document.documentElement;
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

        // Platform flags for CSS gating
        html.classList.add("js-ready");
        if (isiOS) html.classList.add("ios");

        // Explicitly disable view-timeline unless opted in
        html.classList.toggle("view-timeline-ok", !!enableViewTimeline && !isiOS);

        // Respect reduced motion: reveal everything and skip observers/animation
        if (reduceMotion) {
            els.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const vv = window.visualViewport;
        const inView = new Set();       // Elements currently intersecting
        const revealed = new WeakSet(); // Elements shown at least once

        const show = (el) => {
            el.classList.add("is-visible");
            el.removeAttribute("data-out");
            el.style.removeProperty("--out");
            revealed.add(el);
        };
        const hideHard = (el) => {
            el.classList.remove("is-visible");
            el.removeAttribute("data-out");
            el.style.removeProperty("--out");
        };

        // Track scroll direction: "down" or "up"
        let lastY = window.pageYOffset || document.documentElement.scrollTop || 0;
        let dir = "down";
        const trackDir = () => {
            const y = window.pageYOffset || document.documentElement.scrollTop || 0;
            dir = y > lastY ? "down" : y < lastY ? "up" : dir;
            lastY = y;
            scheduleMeasure();
        };
        window.addEventListener("scroll", trackDir, { passive: true });

        // Prime: reveal anything initially in view (handles iOS toolbar offsets)
        const prime = () => {
            const vh = (vv?.height ?? window.innerHeight) || document.documentElement.clientHeight;
            const fudgeTop = isiOS ? 0.10 : 0;
            const fudgeBottom = isiOS ? 0.05 : 0;
            for (const el of els) {
                const r = el.getBoundingClientRect();
                const inV = r.top < vh * (1 - fudgeTop) && r.bottom > vh * (-fudgeBottom);
                if (inV) show(el);
            }
        };

        // IntersectionObserver: maintain inView set and trigger reveal on downward entry
        let io = null;
        if ("IntersectionObserver" in window) {
            io = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        const el = entry.target;
                        const r = entry.boundingClientRect;

                        if (entry.isIntersecting || entry.intersectionRatio > 0) {
                            inView.add(el);
                            // Fade in when scrolling down (or first time)
                            if (dir === "down" || !revealed.has(el)) show(el);
                            if (dir === "down") {
                                el.removeAttribute("data-out");
                                el.style.removeProperty("--out");
                            }
                        } else {
                            inView.delete(el);
                            // When scrolling up, hard-hide once the section has moved fully below viewport,
                            // so it can re-reveal on the next downward pass.
                            if (toggleOut && dir === "up") {
                                const vpBottom = vv?.height ?? window.innerHeight;
                                if (r.top > vpBottom) hideHard(el);
                            }
                        }
                    }
                    scheduleMeasure();
                },
                {
                    root,
                    threshold: [0, 0.25, 0.5, 0.75, 1],
                    rootMargin: isiOS ? "0px 0px -12% 0px" : rootMargin,
                }
            );
            els.forEach((el) => io.observe(el));
        }

        // rAF measure loop: compute progressive fade ONLY on upward scroll
        let raf = 0;
        let needMeasure = false;
        const scheduleMeasure = () => {
            if (!needMeasure) {
                needMeasure = true;
                raf = requestAnimationFrame(measure);
            }
        };

        const measure = () => {
            needMeasure = false;

            // Downward: keep intersecting elements fully visible
            if (dir === "down") {
                for (const el of inView) {
                    if (revealed.has(el)) {
                        el.removeAttribute("data-out");
                        el.style.removeProperty("--out");
                    } else {
                        show(el);
                    }
                }
                return;
            }

            // Upward: fade elements based on visible ratio as they leave via bottom
            const vh = (vv?.height ?? window.innerHeight) || document.documentElement.clientHeight;

            for (const el of inView) {
                const r = el.getBoundingClientRect();
                const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
                const maxVisible = Math.max(1, Math.min(vh, r.height));
                const ratio = Math.max(0, Math.min(1, visible / maxVisible));

                const leavingBottom = r.bottom > vh || r.top > 0;

                if (leavingBottom && revealed.has(el)) {
                    el.dataset.out = "1";                     // CSS switches to scroll-coupled fade
                    el.style.setProperty("--out", String(ratio));
                    if (ratio <= 0.01) hideHard(el);          // fully gone → reset state
                } else {
                    el.removeAttribute("data-out");
                    el.style.removeProperty("--out");
                }
            }
        };

        // Safari/iOS nudges to keep measurements fresh
        const onResize = () => scheduleMeasure();
        const onVV = () => setTimeout(scheduleMeasure, 60);

        window.addEventListener("resize", onResize);
        vv?.addEventListener?.("resize", onVV);
        window.addEventListener("orientationchange", onVV);
        window.addEventListener(
            "load",
            () => {
                prime();
                scheduleMeasure();
            },
            { once: true }
        );

        prime();
        scheduleMeasure();

        // iOS bailout after a moment in case initial paints were delayed
        const bailTimer = setTimeout(() => {
            if (isiOS) {
                prime();
                scheduleMeasure();
            }
        }, 1200);

        // Cleanup
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(bailTimer);
            window.removeEventListener("scroll", trackDir);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("orientationchange", onVV);
            window.removeEventListener("load", prime);
            vv?.removeEventListener?.("resize", onVV);
            io?.disconnect();
        };
    }, [selector, root, rootMargin, threshold, toggleOut, enableViewTimeline]);
}