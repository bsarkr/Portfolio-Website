// /src/Views/header.jsx
// By Bilash Sarkar
// Responsive site header with desktop nav and a mobile “top drop” menu.
// Uses a portal-based backdrop to block interaction/scroll behind the menu
// without modifying <body>/<html> overflow. Keyboard + resize handling included.

import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation } from "react-router-dom";

const MENU_MS = 500; // animation duration for closing state sync

// Tracks viewport width to decide when to render the mobile experience
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth < breakpoint : true
    );
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);
    return isMobile;
}

// Mobile menu is rendered in a portal to sit above the app and capture backdrop clicks.
// Close is requested via ESC, backdrop click, or link activation.
function MobileMenu({ closing, onRequestClose, navItems, currentPath }) {
    if (typeof document === "undefined") return null;

    // Renders internal links via <Link> and external via <a>, with subtle staggered entrance animation
    const LinkOrA = ({ item, i }) =>
        item.href ? (
            <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onRequestClose}
                className="block text-3xl sm:text-4xl font-semibold tracking-tight text-white/95 hover:text-white transition animate-itemRise"
                style={{ ["--stagger"]: `${100 + i * 45}ms` }}
            >
                {item.label}
            </a>
        ) : (
            <Link
                to={item.to}
                onClick={onRequestClose}
                className={`block text-3xl sm:text-4xl font-semibold tracking-tight transition animate-itemRise ${currentPath === item.to ? "text-white" : "text-white/95 hover:text-white"
                    }`}
                style={{ ["--stagger"]: `${100 + i * 45}ms` }}
            >
                {item.label}
            </Link>
        );

    return ReactDOM.createPortal(
        <div id="mobile-menu" className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
            {/* Backdrop: prevents interaction and native scroll behind the sheet */}
            <div
                className="absolute inset-0 z-[60]"
                onClick={onRequestClose}
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
            />

            {/* Top sheet: auto-height with max, momentum scrolling on iOS */}
            <div
                className={[
                    "absolute left-0 right-0 top-0 z-[65]",
                    "mx-0 w-full",
                    "bg-[#0c0d0f]/90 backdrop-blur-xl",
                    "border-b border-white/10 shadow-[0_22px_60px_rgba(0,0,0,.45)]",
                    "rounded-b-2xl",
                    "max-h-[85vh] overflow-y-auto",
                    "[-webkit-overflow-scrolling:touch]",
                    closing ? "animate-menuRiseTop" : "animate-menuDropTop",
                ].join(" ")}
            >
                <div className="flex items-center justify-end px-4 py-4">
                    <button
                        type="button"
                        onClick={onRequestClose}
                        className="inline-flex items-center justify-center rounded-lg p-2 border border-white/15 text-white/90 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                        aria-label="Close menu"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 sm:px-8 pt-1 pb-8 max-w-2xl">
                    <ul className="space-y-6 sm:space-y-7">
                        {navItems.map((item, i) => (
                            <li key={item.label}>
                                <LinkOrA item={item} i={i} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="px-6 sm:px-8 pb-6 text-xs text-white/50">
                    © {new Date().getFullYear()} Bilash Sarkar
                </div>
            </div>
        </div>,
        document.body
    );
}

export default function Header() {
    const [menuShown, setMenuShown] = useState(false); // sheet visibility
    const [isClosing, setIsClosing] = useState(false); // sync for closing animation
    const isMobile = useIsMobile();
    const { pathname } = useLocation();

    // Single source of truth for both desktop and mobile nav items
    const navItems = useMemo(
        () => [
            { label: "Home", to: "/", type: "internal" },
            { label: "About Me", to: "/about", type: "internal" },
            { label: "Resume", to: "/resume", type: "internal" },
            { label: "Skills", to: "/skills", type: "internal" },
            { label: "Projects", to: "/projects", type: "internal" },
            { label: "GitHub", href: "https://github.com/bsarkr", type: "external" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/bilashsarkar/", type: "external" },
        ],
        []
    );

    // Global listeners: ESC to close, auto-close if resized to desktop breakpoint
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && requestClose();
        const onResize = () => window.innerWidth >= 768 && hardClose();
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Open/close helpers keep animation timing in sync with unmount
    const requestOpen = () => {
        setIsClosing(false);
        setMenuShown(true);
    };
    const requestClose = () => {
        if (!menuShown || isClosing) return;
        setIsClosing(true);
        window.setTimeout(() => {
            setMenuShown(false);
            setIsClosing(false);
        }, MENU_MS);
    };
    const hardClose = () => {
        setIsClosing(false);
        setMenuShown(false);
    };
    const toggle = () => (menuShown ? requestClose() : requestOpen());

    return (
        <header className="site-header sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-white/10">
            <div className="site-header__inner mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                {/* Brand link */}
                <Link to="/" className="site-logo text-base md:text-lg font-semibold tracking-tight">
                    Bilash Sarkar
                </Link>

                {/* Desktop navigation */}
                <nav className="site-nav hidden md:flex items-center gap-6">
                    <Link to="/" className="site-nav__link">Home</Link>
                    {[
                        { label: "About Me", to: "/about" },
                        { label: "Resume", to: "/resume" },
                        { label: "Skills", to: "/skills" },
                        { label: "Projects", to: "/projects" },
                        { label: "GitHub", href: "https://github.com/bsarkr" },
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/bilashsarkar/" },
                    ].map((item) =>
                        item.to ? (
                            <Link key={item.label} to={item.to} className="site-nav__link">
                                {item.label}
                            </Link>
                        ) : (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="site-nav__link"
                            >
                                {item.label}
                            </a>
                        )
                    )}
                </nav>

                {/* Mobile hamburger toggles the top sheet */}
                <button
                    type="button"
                    onClick={toggle}
                    className="md:hidden inline-flex items-center justify-center rounded-lg p-2 border border-white/15 text-white/90 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                    aria-label={menuShown ? "Close menu" : "Open menu"}
                    aria-controls="mobile-menu"
                    aria-expanded={menuShown}
                    aria-pressed={menuShown}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                        <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {isMobile && menuShown && (
                <MobileMenu
                    closing={isClosing}
                    onRequestClose={requestClose}
                    navItems={navItems}
                    currentPath={pathname}
                />
            )}
        </header>
    );
}