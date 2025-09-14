// /src/hooks/useScrollReveal.jsx
// By Bilash Sarkar

import { useEffect } from "react";

export default function useScrollReveal({
    selector = ".section-reveal",
    root = null,
    rootMargin = "0px 0px -10% 0px", // reveal a touch before fully in view
    threshold = 0.15,                 // ~15% visible to trigger
    toggleOut = true,                 // remove visibility when scrolled away
} = {}) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const els = Array.from(document.querySelectorAll(selector));
        if (!els.length) return;

        const io = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else if (toggleOut) {
                    entry.target.classList.remove("is-visible");
                }
            }
        }, { root, rootMargin, threshold });

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [selector, root, rootMargin, threshold, toggleOut]);
}