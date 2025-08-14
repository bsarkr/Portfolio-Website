//header.jsx

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                {/* Logo / Name */}
                <div className="site-logo">Bilash Sarkar</div>

                {/* Navigation */}
                <nav className="site-nav">
                    <a href="#about" className="site-nav__link">About Me</a>
                    <a href="#resume" className="site-nav__link">Resume</a>
                    <a href="#skills" className="site-nav__link">Skills</a>
                    <a href="#projects" className="site-nav__link">Projects</a>
                    <a href="#contact" className="site-nav__link">Contact</a>
                </nav>
            </div>
        </header>
    );
}