// /src/Views/header.jsx
// By Bilash Sarkar

// Renders the global header with site logo and navigation links
// (internal pages + external profiles).

import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                {/* Logo / Name (click -> home) */}
                <Link to="/" className="site-logo">Bilash Sarkar</Link>

                {/* Navigation */}
                <nav className="site-nav">
                    <Link to="/about" className="site-nav__link">About Me</Link>
                    <Link to="/resume" className="site-nav__link">Resume</Link>
                    <Link to="/skills" className="site-nav__link">Skills</Link>
                    <Link to="/projects" className="site-nav__link">Projects</Link>

                    {/* External Links */}
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