// /src/views/hero.jsx
// By Bilash Sarkar
// Hero section displayed on the homepage with intro text and portrait.
// Mobile: intro → photo → bio
// Desktop: intro stacked tightly above bio, image to the right.

export default function Hero() {
    return (
        <section className="hero page-enter">
            <div className="hero__inner grid md:grid-cols-2 md:gap-x-16 md:gap-y-0 items-start">

                {/* Left column */}
                <div className="order-1 md:order-none text-left">
                    <div className="hero__pretitle">Hey, I’m</div>
                    <h1 className="hero__title">Bilash Sarkar</h1>
                    <h2 className="hero__subtitle mb-2 md:mb-3">
                        <span className="highlight-role">Software Developer</span> and Student at Fordham University
                    </h2>

                    {/* Bio (hidden on mobile here, shown below image instead) */}
                    <p className="hero__paragraph mt-0 md:mt-1 hidden md:block">
                        As an undergraduate Computer Science student at Fordham University, I've discovered my creativity through coding.
                        It allows me to bring any idea to life, from games to solutions, without fear of failure. This freedom to experiment,
                        learn from mistakes, and improve is what I love about programming. Collaborating in a team amplifies this creativity,
                        as the diverse ideas and perspectives lead to constant innovation. My passion for programming is fueled by its endless possibilities.
                    </p>
                </div>

                {/* Right column: portrait */}
                <div className="order-2 md:order-none hero__right md:justify-self-end">
                    <img
                        className="hero__photo"
                        src="/me.jpg"
                        alt="Bilash Sarkar portrait"
                    />
                </div>

                {/* Mobile-only bio (appears under image) */}
                <div className="order-3 md:hidden mt-4 text-left">
                    <p className="hero__paragraph">
                        As an undergraduate Computer Science student at Fordham University, I've discovered my creativity through coding.
                        It allows me to bring any idea to life, from games to solutions, without fear of failure. This freedom to experiment,
                        learn from mistakes, and improve is what I love about programming. Collaborating in a team amplifies this creativity,
                        as the diverse ideas and perspectives lead to constant innovation. My passion for programming is fueled by its endless possibilities.
                    </p>
                </div>
            </div>
        </section>
    );
}