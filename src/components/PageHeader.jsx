// /src/components/PageHeader.jsx
// By Bilash Sarkar
// Renders a reusable page header with a gradient title and optional subtitle.

export default function PageHeader({
    title,                      // Main heading text
    subtitle,                   // Optional supporting text
    gradient = "from-pink-500 via-fuchsia-500 to-purple-500", // Gradient color classes
    className = "",             // Extra classes for layout adjustments
}) {
    return (
        <header className={`mx-auto max-w-6xl px-6 pt-12 pb-4 text-center ${className}`}>
            {/* Gradient-styled main title */}
            <h1
                className={`font-extrabold text-5xl md:text-6xl bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}
            >
                {title}
            </h1>

            {/* Subtitle shows only if provided */}
            {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}
        </header>
    );
}