// src/components/MobileShowcase.jsx
// By Bilash Sarkar
// Mobile-first project showcase: gradient title, poster card preview, tech tags,
// and a lightweight video lightbox for quick demos.

import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileShowcase({
    title,                 // Project name
    tagline,               // Short description under the title
    poster,                // Poster image shown inside the card
    video,                 // Optional demo video (opens in lightbox)
    ratio = "16/9",        // CSS aspect-ratio for the poster card
    tech = [],             // Array of tech tags displayed below the card
    ctaHref,               // Optional "learn more" link (internal or external)
    ctaLabel = "Tap here to learn more",
    align = "center"       // "left" | "center" | "right" alignment for text and buttons
}) {
    const [open, setOpen] = useState(false);      // Lightbox visibility
    const dialogRef = useRef(null);               // Ref to lightbox root for querying the <video>
    const { pathname } = useLocation();

    // Used to slightly vary the title gradient on the /projects overview page
    const onProjectsPage = /^\/projects\/?$/.test(pathname);

    // Open the lightbox and attempt muted autoplay after mount
    const openLightbox = () => {
        setOpen(true);
        setTimeout(() => {
            const v = dialogRef.current?.querySelector("video");
            if (v) {
                v.muted = true;
                v.play().catch(() => { });
            }
        }, 50);
    };

    // Close the lightbox and pause any active playback
    const closeLightbox = () => {
        const v = dialogRef.current?.querySelector("video");
        if (v && !v.paused) v.pause();
        setOpen(false);
    };

    // Internal links use <Link>; external use <a>
    const isInternal = typeof ctaHref === "string" && ctaHref.startsWith("/");

    // Alignment helpers for text and CTA row
    const textAlign =
        align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center";
    const justifyRow =
        align === "right" ? "justify-end" : align === "left" ? "justify-start" : "justify-center";

    // Shared CTA styling
    const learnMoreClass =
        "text-sm font-medium text-white/75 hover:text-white underline decoration-white/25 hover:decoration-white transition";

    // On /projects, brand the title with a sky gradient for key projects
    const isSkyTitle =
        onProjectsPage &&
        (/watch[-\s]?this/i.test(title || "") || /study\s*buddy/i.test(title || ""));

    return (
        <section className="md:hidden px-5 pt-6 pb-10 section-reveal">
            {/* Title */}
            <div className={`mb-2 ${textAlign}`}>
                <h1
                    className={`text-4xl font-extrabold tracking-tight text-transparent bg-clip-text ${isSkyTitle
                            ? "bg-gradient-to-r from-cyan-400 to-sky-500"
                            : "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500"
                        }`}
                >
                    {title}
                </h1>
            </div>

            {/* Tagline */}
            {tagline && (
                <p className={`text-[17px] leading-relaxed text-white/85 mb-2 ${textAlign}`}>
                    {tagline}
                </p>
            )}

            {/* Learn more CTA (internal <Link> or external <a>) */}
            {ctaHref && (
                <div className={`flex ${justifyRow} mb-4`}>
                    {isInternal ? (
                        <Link
                            to={ctaHref}
                            className={`${learnMoreClass} no-underline`}
                            aria-label="Learn more about this project"
                        >
                            {ctaLabel}
                        </Link>
                    ) : (
                        <a
                            href={ctaHref}
                            className={`${learnMoreClass} no-underline`}
                            aria-label="Learn more about this project"
                        >
                            {ctaLabel}
                        </a>
                    )}
                </div>
            )}

            {/* Poster card → opens lightbox if a video is provided */}
            <button
                type="button"
                onClick={openLightbox}
                className="w-full group"
                aria-label={`Play demo video for ${title}`}
            >
                <div className="rounded-2xl p-[2px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-purple-500 shadow-[0_20px_60px_rgba(0,0,0,.45)]">
                    <div
                        className="relative overflow-hidden rounded-[14px] bg-black/50"
                        style={{ aspectRatio: ratio }}
                    >
                        {poster ? (
                            <img
                                src={poster}
                                alt={`${title} preview`}
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <div className="absolute inset-0 grid place-items-center text-white/70">
                                No poster provided
                            </div>
                        )}

                        {video && (
                            <div className="absolute inset-0 grid place-items-center">
                                <span className="rounded-full px-4 py-2 bg-white/12 backdrop-blur border border-white/20 text-white text-sm opacity-90 group-active:scale-95 transition">
                                    Tap to Play
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </button>

            {/* Tech tags */}
            {!!tech?.length && (
                <div className={`mt-4 flex flex-wrap gap-2 ${justifyRow}`}>
                    {tech.map((t, i) => (
                        <span
                            key={i}
                            className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-white/90"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}

            {/* Lightbox with native controls; backdrop captures focus/esc via parent handler */}
            {video && open && (
                <div
                    ref={dialogRef}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 bg-white/10 border border-white/20 text-white"
                        aria-label="Close video"
                    >
                        Close
                    </button>

                    <div className="h-full w-full grid place-items-center px-4">
                        <div className="w-full max-w-[720px] rounded-xl overflow-hidden border border-white/15 bg-black">
                            <video
                                className="w-full h-auto"
                                src={video}
                                controls
                                playsInline
                                preload="metadata"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}