// /src/views/Projects.jsx
// By Bilash Sarkar
//
// Renders the Projects page (with header) when at /projects,
// and just the cards (no header) when embedded on the home page.
// Header uses the shared PageHeader for consistent sizing/spacing.

import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { projects } from "../models/projects";
import useScrollReveal from "../hooks/useScrollReveal";
import PageHeader from "../components/PageHeader";

export default function Projects() {
    const { pathname } = useLocation();
    const onProjectsPage = /^\/projects\/?$/.test(pathname);

    const videoMapRef = useRef(new Map());
    const inViewRef = useRef(new Set());
    const observerRef = useRef(null);

    useScrollReveal({
        selector: ".section-reveal",
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
        toggleOut: true,
    });

    useEffect(() => {
        const cards = document.querySelectorAll("[data-project-id]");

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute("data-project-id");
                    const videoEl = videoMapRef.current.get(id);
                    if (!videoEl) return;

                    if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                        inViewRef.current.add(id);
                        if (videoEl.paused) videoEl.play().catch(() => { });
                    } else {
                        inViewRef.current.delete(id);
                        if (!videoEl.paused) videoEl.pause();
                    }
                });
            },
            { threshold: [0, 0.25, 0.55, 0.85] }
        );

        cards.forEach((el) => observerRef.current.observe(el));

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
        <>
            {onProjectsPage && (
                <PageHeader
                    title="Projects"
                    subtitle="A few things I’ve built recently."
                    // slightly cooler purple bias than Resume
                    gradient="from-pink-500 via-purple-500 to-fuchsia-500"
                    className="section-reveal"
                />
            )}

            <section
                id="projects"
                className={`projects sectionsnap ${onProjectsPage ? "projects--compact" : ""}`}
            >
                {projects.map((p, idx) => {
                    const studyBuddyShift = p.id === "studybuddy" ? "md:mt-12 lg:mt-30 xl:mt-36" : "";

                    return (
                        <article
                            key={p.id}
                            data-project-id={p.id}
                            className="project-full section-reveal"
                            style={{ transitionDelay: `${idx * 80}ms` }}
                        >
                            <div className={`project-full__inner relative ${idx % 2 === 1 ? "is-reverse" : ""} items-start`}>
                                <Link to={p.href} aria-label={`Open ${p.title}`} className="absolute inset-0 z-10" />

                                <Link
                                    to={p.href}
                                    className="absolute top-10 right-10 z-20 text-xs md:text-sm text-white/60 hover:text-white transition"
                                >
                                    Click to learn more
                                </Link>

                                <div
                                    className={`project-full__text relative flex flex-col items-start justify-start self-start text-left ${studyBuddyShift}`}
                                >
                                    <div className="projects__title mb-2">{p.title}</div>
                                    <p className="projects__blurb mb-2">{p.blurb}</p>

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

                                <div className="project-full__media" aria-hidden="true">
                                    <div className={`proj-frame ${p.orientation === "portrait" ? "proj-frame--phone" : "proj-frame--wide"}`}>
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
        </>
    );
}