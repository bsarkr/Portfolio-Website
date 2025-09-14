// src/views/Projects.jsx
// By Bilash Sarkar

// Renders the Projects page as a list of full-width project cards.
// Each card auto-plays/pauses its preview video based on viewport visibility
// (IntersectionObserver + Page Visibility API) for a smooth, quiet browsing experience.

import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { projects } from "../models/projects";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Projects() {
    // Map project id → <video> element for quick lookup in observer callbacks
    const videoMapRef = useRef(new Map());
    // Set of project ids currently considered "in view" enough to play
    const inViewRef = useRef(new Set());
    // Single IntersectionObserver shared across all cards
    const observerRef = useRef(null);

    // Scroll-reveal for the container + each project card
    useScrollReveal({
        selector: ".section-reveal, article.project-full.section-reveal",
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
        toggleOut: true, // fade out when leaving viewport
    });

    useEffect(() => {
        // Observe all project cards (each has a data-project-id)
        const cards = document.querySelectorAll("[data-project-id]");

        // IntersectionObserver drives play/pause when a card crosses thresholds
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute("data-project-id");
                    const videoEl = videoMapRef.current.get(id);
                    if (!videoEl) return;

                    // If card is meaningfully visible (>= 55%), play; otherwise pause
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                        inViewRef.current.add(id);
                        if (videoEl.paused) videoEl.play().catch(() => { });
                    } else {
                        inViewRef.current.delete(id);
                        if (!videoEl.paused) videoEl.pause();
                    }
                });
            },
            // Multiple thresholds reduce jitter around play/pause boundaries
            { threshold: [0, 0.25, 0.55, 0.85] }
        );

        cards.forEach((el) => observerRef.current.observe(el));

        // When the tab is hidden, pause all; when visible, resume only those in view
        const onVisibility = () => {
            const hidden = document.visibilityState !== "visible";
            videoMapRef.current.forEach((videoEl, id) => {
                if (hidden) {
                    if (!videoEl.paused) videoEl.pause();
                } else if (inViewRef.current.has(id)) {
                    if (videoEl.paused) videoEl.play().catch(() => { });
                }
            });
        };
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            observerRef.current?.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    return (
        <section id="projects" className="projects sectionsnap section-reveal">
            {projects.map((p, idx) => {
                // Slight vertical offset for the StudyBuddy card to balance the split layout
                const studyBuddyShift =
                    p.id === "studybuddy" ? "md:mt-12 lg:mt-30 xl:mt-36" : "";

                return (
                    <article
                        key={p.id}
                        data-project-id={p.id}
                        className="project-full section-reveal"
                        style={{ transitionDelay: `${idx * 80}ms` }} // subtle stagger per card
                    >
                        <div
                            className={`project-full__inner relative ${idx % 2 === 1 ? "is-reverse" : ""
                                } items-start`}
                        >
                            {/* Full-card invisible anchor: clicking anywhere opens the project */}
                            <Link
                                to={p.href}
                                aria-label={`Open ${p.title}`}
                                className="absolute inset-0 z-10"
                            />

                            {/* Inline hint to communicate interactivity without stealing focus */}
                            <Link
                                to={p.href}
                                className="absolute top-10 right-10 z-20 text-xs md:text-sm text-white/60 hover:text-white transition"
                            >
                                Click to learn more
                            </Link>

                            {/* Text column with title, blurb, and (for StudyBuddy) overlaid logo */}
                            <div
                                className={`project-full__text relative flex flex-col items-start justify-start self-start text-left ${studyBuddyShift}`}
                            >
                                {/* Title is plain text here to avoid nested anchors with the full-card link */}
                                <div className="projects__title mb-2">{p.title}</div>
                                <p className="projects__blurb mb-2">{p.blurb}</p>

                                {/* StudyBuddy logo is centered deeper in the column for visual balance */}
                                {p.id === "studybuddy" && (
                                    <>
                                        <div className="pointer-events-none select-none pb-48 md:pb-56 lg:pb-64" />
                                        <div className="absolute inset-x-0 top-[66%] -translate-y-1/2 flex justify-center">
                                            <img
                                                src="/StudyBuddyLogo.png"
                                                alt="StudyBuddy logo"
                                                className="rounded-2xl w-32 md:w-40 lg:w-44 object-contain pointer-events-none select-none"
                                                loading="eager"
                                                decoding="async"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Media column holding the autoplay preview video (click handled by overlay) */}
                            <div className="project-full__media" aria-hidden="true">
                                <div
                                    className={`proj-frame ${p.orientation === "portrait"
                                            ? "proj-frame--phone"
                                            : "proj-frame--wide"
                                        }`}
                                >
                                    <video
                                        ref={(el) => el && videoMapRef.current.set(p.id, el)}
                                        className="proj-video"
                                        src={p.video}
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                    />
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}