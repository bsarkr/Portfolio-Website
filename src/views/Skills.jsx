// src/views/Skills.jsx
// By Bilash Sarkar
// Renders the Skills page: hero header, project-applied skills, core resume stack,
// experience highlights, and non-technical skills.

import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

// Reusable pill badge for listing skills/keywords
const Pill = ({ children }) => (
    <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 mr-2 mb-2 text-sm">
        {children}
    </span>
);

// Section wrapper with title + glow underline for consistent page structure
const Section = ({ title, children }) => (
    <section className="section-reveal mx-auto max-w-6xl px-6 py-10 text-left">
        <div className="pd-section-head text-left">
            <h2 className="pd-section-title">{title}</h2>
            <div className="pd-section-glow" />
        </div>
        {children}
    </section>
);

export default function Skills({ data }) {
    const { title, subtitle, resume, fromProjects, experienceHighlights, nonTechnical } = data;

    // Activate IntersectionObserver-driven reveal on scroll
    useScrollReveal({
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
        toggleOut: true, // fade out again when leaving viewport
    });

    return (
        <div id="skills-page">
            {/* Hero: page title + supporting subtitle */}
            <header className="section-reveal mx-auto max-w-6xl px-6 pt-24 pb-6 text-center">
                <h1 className="pd-hero-title">{title}</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200">{subtitle}</p>
            </header>

            {/* Project-applied skills: shows where and how skills were used */}
            <Section title="Built in Projects">
                <div className="grid gap-6 md:grid-cols-2">
                    {fromProjects.map((p, idx) => (
                        <a
                            key={p.name}
                            href={p.href || undefined}
                            className="block p-5 rounded-xl border border-white/10 bg-white/5 shadow-[0_18px_44px_rgba(0,0,0,.35)] hover:bg-white/10 transition text-left"
                            style={{ transitionDelay: `${idx * 60}ms` }} // subtle stagger
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white/95">{p.name}</h3>
                                {p.href && <span className="text-xs text-white/60">view →</span>}
                            </div>
                            <div className="mt-3">
                                {p.skills.map((s) => (
                                    <Pill key={s}>{s}</Pill>
                                ))}
                            </div>
                            <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
                                {p.applied.map((line, i) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ul>
                        </a>
                    ))}
                </div>
            </Section>

            {/* Resume-based core stack grouped by category */}
            <Section title="Core Technical Stack">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl border border-white/10 bg-white/5 text-left">
                        <h3 className="font-semibold mb-2 text-white/90">Languages</h3>
                        {resume.languages.map((x, i) => (
                            <Pill key={x + i}>{x}</Pill>
                        ))}
                    </div>
                    <div className="p-5 rounded-xl border border-white/10 bg-white/5 text-left">
                        <h3 className="font-semibold mb-2 text-white/90">Frameworks</h3>
                        {resume.frameworks.map((x, i) => (
                            <Pill key={x + i}>{x}</Pill>
                        ))}
                    </div>
                    <div className="p-5 rounded-xl border border-white/10 bg-white/5 text-left">
                        <h3 className="font-semibold mb-2 text-white/90">Tools & Technologies</h3>
                        {resume.tools.map((x, i) => (
                            <Pill key={x + i}>{x}</Pill>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Experience-backed highlights (optional) */}
            {!!experienceHighlights?.length && (
                <Section title="Experience Highlights">
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        {experienceHighlights.map((l, i) => (
                            <li key={i}>{l}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {/* Soft skills / non-technical capabilities (optional) */}
            {!!nonTechnical?.length && (
                <Section title="More (non-technical)">
                    <div className="flex flex-wrap text-left">
                        {nonTechnical.map((x, i) => (
                            <Pill key={x + i}>{x}</Pill>
                        ))}
                    </div>
                </Section>
            )}

            {/* Footer credit */}
            <footer className="section-reveal mx-auto max-w-6xl px-6 py-10 text-center text-white/60">
                Built by Bilash Sarkar
            </footer>
        </div>
    );
}