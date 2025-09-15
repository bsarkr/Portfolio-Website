// src/views/ProjectDetail.jsx
// By Bilash Sarkar
// Project detail page with a centered hero and left-aligned content below.
// Supports a portrait demo layout for StudyBuddy and a widescreen default player.
// Includes custom HTML5 video controls and tech/usage/setup sections.

import { useEffect, useRef, useState } from "react";

export default function ProjectDetail({ data }) {
    if (!data) return null;

    // Identify StudyBuddy entries to switch to the portrait demo layout
    const isStudyBuddy =
        /studybuddy/i.test(data.slug || "") ||
        /studybuddy/i.test(data.id || "") ||
        /studybuddy/i.test(data.title || "");

    // Left-aligned section wrapper with title + accent underline
    const Section = ({ title, children }) => (
        <section className="mx-auto max-w-6xl px-6 py-10 text-left">
            <div className="pd-section-head text-left">
                <h2 className="pd-section-title">{title}</h2>
                <div className="pd-section-glow" />
            </div>
            <div className="pd-section-body">{children}</div>
        </section>
    );

    // Compact pill for skills/technologies
    const Pill = ({ children }) => (
        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 mr-2 mb-2 text-sm">
            {children}
        </span>
    );

    // Custom video player state/refs
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cur, setCur] = useState(0);
    const [dur, setDur] = useState(0);

    // Wire up video events and attempt muted autoplay when ready
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onLoaded = () => setDur(v.duration || 0);
        const onTime = () => setCur(v.currentTime || 0);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        v.addEventListener("loadedmetadata", onLoaded);
        v.addEventListener("timeupdate", onTime);
        v.addEventListener("play", onPlay);
        v.addEventListener("pause", onPause);

        const tryAuto = () => {
            v.muted = true;
            v.play().catch(() => { });
        };
        v.addEventListener("canplay", tryAuto);

        return () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            v.removeEventListener("timeupdate", onTime);
            v.removeEventListener("play", onPlay);
            v.removeEventListener("pause", onPause);
            v.removeEventListener("canplay", tryAuto);
        };
    }, []);

    // Toggle play/pause
    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => { });
        else v.pause();
    };

    // Seek to a specific timestamp and sync UI
    const seek = (e) => {
        const v = videoRef.current;
        if (!v) return;
        const t = Number(e.target.value);
        v.currentTime = t;
        setCur(t);
    };

    // Format seconds as M:SS
    const fmt = (s) => {
        if (!isFinite(s)) return "0:00";
        const m = Math.floor(s / 60);
        const r = Math.floor(s % 60);
        return `${m}:${r.toString().padStart(2, "0")}`;
    };

    return (
        <div id="project-detail">
            {/* Hero: centered title/tagline and GitHub CTA */}
            <header className="mx-auto max-w-6xl px-6 pt-24 pb-8 text-center">
                <h1 className="pd-hero-title">{data.title}</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200">{data.tagline}</p>

                <div className="mt-6 flex gap-3 justify-center">
                    <a
                        href={data.githubUrl || "https://github.com/bsarkr"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pd-pill-btn pd-pill-btn--gh"
                    >
                        <svg
                            viewBox="0 0 16 16"
                            width="16"
                            height="16"
                            className="-mt-0.5 mr-2 opacity-90"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
                1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.62 7.62 0 0 1 2-.27c.68 0
                1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87
                3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16
                8c0-4.42-3.58-8-8-8Z"
                            />
                        </svg>
                        GitHub
                    </a>
                </div>
            </header>

            {/* Below hero: left-aligned content and media */}
            {isStudyBuddy ? (
                <section className="mx-auto max-w-6xl px-6 pb-6 text-left">
                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* Portrait demo with custom controls */}
                        <div className="flex justify-center md:justify-start">
                            <div className="pd-video pd-video--contain group w/full max-w-[400px] md:max-h-[90vh]">
                                <div className="pd-frame-ring" />
                                <video
                                    ref={videoRef}
                                    className="pd-video-el"
                                    src={data.video}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    preload="metadata"
                                />
                                <div className="pd-controls group-hover:opacity-100">
                                    <button className="pd-ctrl-btn" onClick={togglePlay}>
                                        {isPlaying ? "Pause" : "Play"}
                                    </button>
                                    <input
                                        className="pd-scrubber"
                                        type="range"
                                        min="0"
                                        max={dur || 0}
                                        step="0.1"
                                        value={cur}
                                        onChange={seek}
                                    />
                                    <div className="pd-time">{fmt(cur)} / {fmt(dur)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Tech groups rendered as pill lists */}
                        <aside className="space-y-6 text-left">
                            <div className="pd-section-head mb-2 text-left">
                                <h2 className="pd-section-title">Technologies Used</h2>
                                <div className="pd-section-glow" />
                            </div>

                            {Object.entries(data.tech).map(([group, items]) => (
                                <div key={group} className="pd-card text-left">
                                    <h3 className="pd-card-title">{group}</h3>
                                    <div>{items.map((t) => <Pill key={t}>{t}</Pill>)}</div>
                                </div>
                            ))}
                        </aside>
                    </div>
                </section>
            ) : (
                data.video && (
                    <section className="mx-auto max-w-6xl px-6 pb-6 text-left">
                        {/* Widescreen demo with custom controls */}
                        <div className="pd-video pd-video--widescreen group mx-auto">
                            <div className="pd-frame-ring" />
                            <video
                                ref={videoRef}
                                className="pd-video-el"
                                src={data.video}
                                muted
                                loop
                                autoPlay
                                playsInline
                                preload="metadata"
                            />
                            <div className="pd-controls group-hover:opacity-100">
                                <button className="pd-ctrl-btn" onClick={togglePlay}>
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                                <input
                                    className="pd-scrubber"
                                    type="range"
                                    min="0"
                                    max={dur || 0}
                                    step="0.1"
                                    value={cur}
                                    onChange={seek}
                                />
                                <div className="pd-time">{fmt(cur)} / {fmt(dur)}</div>
                            </div>
                        </div>
                    </section>
                )
            )}

            {/* Tech grid for non-StudyBuddy entries */}
            {!isStudyBuddy && (
                <Section title="Technologies Used">
                    <div className="grid md:grid-cols-3 gap-6">
                        {Object.entries(data.tech).map(([group, items]) => (
                            <div key={group} className="pd-card text-left">
                                <h3 className="pd-card-title">{group}</h3>
                                <div>{items.map((t) => <Pill key={t}>{t}</Pill>)}</div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            <Section title="Setup & Installation">
                <ol className="list-decimal list-inside space-y-2 text-gray-200">
                    {data.setup.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
            </Section>

            <Section title="How to Use">
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    {data.usage.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
            </Section>

            <Section title="Key Learnings & Challenges">
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    {data.learnings.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
            </Section>

            <Section title="Roadmap & Future Features">
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                    {data.roadmap.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
            </Section>

            <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-white/60">
                Built by Bilash Sarkar
            </footer>
        </div>
    );
}