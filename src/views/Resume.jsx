// /src/views/Resume.jsx
// By Bilash Sarkar
//
// Resume page: clean PNG preview with rounded corners, sized naturally to the
// resume itself. Buttons for PDF. Uses the shared PageHeader for consistency.

import PageHeader from "../components/PageHeader";

export default function Resume() {
    const IMG_PATH = "/resume.png"; // PNG preview
    const PDF_PATH = "/resume.pdf";
    const DRIVE_ID = "1uyjrfcTZUHPD80fFo67VhgEwuGngVo8u";
    const DRIVE_VIEW = `https://drive.google.com/file/d/${DRIVE_ID}/view`;

    return (
        // No extra top/bottom padding here; PageHeader controls the vertical rhythm
        <section className="min-h-[calc(100vh-80px)] px-6">
            <PageHeader
                title="Resume"
                subtitle="Click the preview or use the buttons below for the latest PDF copy."
                gradient="from-fuchsia-500 via-pink-500 to-purple-500"
            />

            {/* Content container */}
            <div className="mx-auto max-w-3xl">
                {/* PNG Preview (natural size, rounded, subtle shadow) */}
                <a
                    href={DRIVE_VIEW}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resume on Google Drive"
                    className="block"
                >
                    <img
                        src={IMG_PATH}
                        alt="Bilash Sarkar – Resume"
                        className="w-full h-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,.45)]"
                        loading="lazy"
                        decoding="async"
                    />
                </a>

                {/* Actions */}
                <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href={DRIVE_VIEW}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 transition"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M12 5v10m0 0l-4-4m4 4l4-4M5 19h14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Open on Drive
                    </a>

                    <a
                        href={PDF_PATH}
                        download="Bilash_Sarkar_Resume.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
}