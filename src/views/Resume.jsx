// src/views/Resume.jsx
// By Bilash Sarkar

// Renders a resume page with a preview image that falls back to an embedded PDF,
// plus quick actions to open on Google Drive or download locally.

export default function Resume() {
    // Resource locations: preview image, canonical PDF, and Drive viewer URL
    const IMG_PATH = "/resume.png";
    const PDF_PATH = "/resume.pdf";
    const DRIVE_ID = "1uyjrfcTZUHPD80fFo67VhgEwuGngVo8u";
    const DRIVE_VIEW = `https://drive.google.com/file/d/${DRIVE_ID}/view`;

    // If image preview fails (e.g., missing or blocked), reveal the inline PDF embed
    const handleImgError = (e) => {
        const wrapper = e.currentTarget.closest("[data-resume]");
        if (!wrapper) return;
        wrapper.querySelector("[data-img]").style.display = "none";
        wrapper.querySelector("[data-pdf]").style.display = "block";
    };

    return (
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-5xl">
                {/* Header: title and short instructions */}
                <div className="text-center mb-6">
                    <h1 className="font-extrabold text-5xl md:text-6xl bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                        Resume
                    </h1>
                    <p className="mt-3 text-white/70">
                        Click the preview or the buttons below to access the latest copy.
                    </p>
                </div>

                {/* Preview: image first for speed; auto-fallback to PDF on error */}
                <a
                    href={DRIVE_VIEW}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    aria-label="Open resume on Google Drive"
                >
                    <div
                        data-resume
                        className="rounded-2xl overflow-hidden border border-white/12 shadow-[0_30px_70px_rgba(0,0,0,.55)] bg-black/30 backdrop-blur-md"
                    >
                        <img
                            data-img
                            src={IMG_PATH}
                            alt="Bilash Sarkar – Resume"
                            className="w-full h-auto block"
                            onError={handleImgError}
                        />

                        <object
                            data-pdf
                            data={`${PDF_PATH}#toolbar=0&navpanes=0&scrollbar=0`}
                            type="application/pdf"
                            className="w-full h-[88vh] hidden"
                        >
                            <div className="p-6 text-center text-white/80">
                                Your browser can’t display the PDF inline. Click to open the file.
                            </div>
                        </object>
                    </div>
                </a>

                {/* Actions: open in Drive (canonical) or download the local PDF */}
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