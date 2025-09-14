// /src/views/about.jsx
// By Bilash Sarkar

// Renders the About page with a hero section, thematic sections (why I code,
// community, hobbies), and a closing footer.

import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

// Section wrapper component with title + glowing underline
const Section = ({ title, children, className = "" }) => (
    <section className={`section-reveal mx-auto max-w-6xl px-6 py-12 text-left ${className}`}>
        <div className="relative pb-3 mb-6 text-left">
            <h2 className="pd-section-title">{title}</h2>
            <div className="pd-section-glow" />
        </div>
        {children}
    </section>
);

export default function About() {
    // Activate IntersectionObserver-driven reveal on scroll
    useScrollReveal({
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
        toggleOut: true, // remove .is-visible when scrolled away for fade-out effect
    });

    return (
        <div id="about-page">
            {/* Hero section with portrait on left and intro text on right */}
            <header className="section-reveal mx-auto max-w-6xl px-6 pt-24 pb-10 text-left">
                <div className="grid gap-10 md:grid-cols-2 items-center">
                    <div className="hero__right order-1 md:order-1">
                        <img
                            className="hero__photo"
                            src="/me.jpg"
                            alt="Bilash Sarkar portrait"
                        />
                    </div>
                    <div className="hero__left order-2 md:order-2">
                        <div className="hero__pretitle">Hey, I’m</div>
                        <h1 className="hero__title">Bilash Sarkar</h1>
                        <h2 className="hero__subtitle">
                            <span className="highlight-role">Software Developer</span> and Student at
                            Fordham University
                        </h2>
                        <p className="hero__paragraph">
                            As an undergraduate Computer Science student at Fordham University I’ve discovered
                            my creativity through coding. It lets me bring ideas to life with confidence and joy.
                            I love the cycle of building, learning, and improving. Collaborating with a team makes
                            that process even better since diverse perspectives spark new directions and stronger solutions.
                        </p>
                    </div>
                </div>
            </header>

            {/* Section: personal motivation for coding */}
            <Section title="Why I Love Building Software">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_44px_rgba(0,0,0,.35)] text-left">
                        <p className="text-gray-200 leading-relaxed">
                            I fell in love with programming through my projects, including this website.
                            I enjoy how open ended the craft is. I can have a thought and turn it into a real
                            experience that feels exactly how I imagined. That creative control is powerful and
                            it keeps me hungry to learn deeper tools and better patterns.
                        </p>
                        <p className="text-gray-200 leading-relaxed mt-4">
                            I’m excited to contribute my vision while supporting the vision of senior engineers.
                            I document carefully, ask precise questions, and move with intention. I work well with
                            others and I love the momentum of a steady build cycle where every week brings visible progress.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_44px_rgba(0,0,0,.35)] text-left">
                        <p className="text-gray-200 leading-relaxed">
                            At Fordham’s IT Service Desk I learned how to show up under pressure. I supervised and
                            trained student employees, troubleshot for thousands of users across platforms, and helped
                            maintain consistent service quality. Within a year I earned trust across campus and was asked
                            to represent the department at fairs and events. That experience taught me how to learn fast,
                            lead calmly, and communicate clearly with people from every background.
                        </p>
                        <p className="text-gray-200 leading-relaxed mt-4">
                            I’m bringing that same energy into software development.
                            I’d love to bring that mix of curiosity, ownership, and collaboration to your team. I ramp quickly,
                            I manage stress well, and I care deeply about craft and delivery.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Section: community experiences and growth mindset */}
            <Section title="Community and Growth">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_44px_rgba(0,0,0,.35)] text-left">
                        <p className="text-gray-200 leading-relaxed">
                            I’m a CodePath alum. In my experience, CodePath was a great environment to grow with driven peers who shared my
                            enthusiasm for building. I also attended the Emerging Engineers Summit where I listened to
                            industry leaders and spoke with them about the road ahead. Hearing their stories made the path
                            feel real and gave me even more motivation to keep developing and learning along the way.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_44px_rgba(0,0,0,.35)] text-left">
                        <p className="text-gray-200 leading-relaxed">
                            My projects reflect this mindset. I design polished interfaces, wire up responsive data flows,
                            and keep the stack clean and modular. I enjoy pairing, writing clear notes, and leaving trails
                            that teammates can follow. That’s how teams move quickly without losing quality.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Section: hobbies and interests beyond software */}
            <Section title="Beyond the Screen">
                <div className="grid gap-10 md:grid-cols-2 items-start">
                    <div className="order-2 md:order-1">
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_44px_rgba(0,0,0,.35)] text-left">
                            <h3 className="font-semibold text-white/90 mb-2">Music</h3>
                            <p className="text-gray-200 leading-relaxed">
                                Music has always been part of my life. Recently I started learning guitar and began dabling in creating my own sounds.
                                It feels similar to software for me. There’s structure and theory, yet there’s room to explore and shape something
                                personal. I love the challenge of improving and the joy of learning from people who are ahead of me while putting
                                in my own focused effort.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 hero__right">
                        <img
                            className="hero__photo"
                            src="/guitar.jpg"
                            alt="Bilash’s guitar"
                        />
                    </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2 items-start mt-10">
                    <div className="hero__right">
                        <img
                            className="hero__photo"
                            src="/lifting.jpg"
                            alt="Weight training"
                        />
                    </div>
                    <div>
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_44px_rgba(0,0,0,.35)] text-left">
                            <h3 className="font-semibold text-white/90 mb-2">Weight Training</h3>
                            <p className="text-gray-200 leading-relaxed">
                                Lifting keeps my mind steady and my schedule grounded. It helps me stay focused during busy stretches and
                                brings a healthy rhythm to my week. I enjoy the consistency and the long view. Progress shows up when
                                you keep your head down and keep showing up, which is also how I approach engineering. To top it off, the watching
                                the sunrise every morning is a nice way to start the day!
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Closing footer note */}
            <footer className="section-reveal mx-auto max-w-6xl px-6 py-10 text-center text-white/60">
                Thanks for reading — I’m excited to build with you!
            </footer>
        </div>
    );
}