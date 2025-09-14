// /src/Views/header.jsx
// By Bilash Sarkar

// Renders the global header with site logo and navigation links
// (internal pages + external profiles).

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                {/* Logo linking back to homepage */}
                <a href="/" className="site-logo">
                    Bilash Sarkar
                </a>

                {/* Navigation: internal site sections + external links */}
                <nav className="site-nav">
                    <a href="/about/" className="site-nav__link">About Me</a>
                    <a href="/resume/" className="site-nav__link">Resume</a>
                    <a href="/skills/" className="site-nav__link">Skills</a>
                    <a href="/projects.html" className="site-nav__link">Projects</a>

                    <a
                        href="https://github.com/bsarkr"
                        className="site-nav__link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/bilashsarkar/"
                        className="site-nav__link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                </nav>
            </div>
        </header>
    );
}