//hero.jsx

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__inner">
                {/* Left column */}
                <div className="hero__left">
                    <div className="hero__pretitle">Hey, I’m</div>
                    <h1 className="hero__title">Bilash Sarkar</h1>
                    <h2 class="hero__subtitle">
                        <span class="highlight-role">Software Developer</span> and Student at Fordham University
                    </h2>

                    <p className="hero__paragraph">
                        As an undergraduate Computer Science student at Fordham University, I've discovered my creativity through coding. It allows me to bring any idea to life, from games to solutions, without fear of failure. This freedom to experiment, learn from mistakes, and improve is what I love about programming. Collaborating in a team amplifies this creativity, as the diverse ideas and perspectives lead to constant innovation. My passion for programming is fueled by its endless possibilities.
                    </p>
                </div>

                {/* Right column (photo) */}
                <div className="hero__right">
                    <img
                        className="hero__photo"
                        src="/me.jpg"
                        alt="Bilash Sarkar portrait"
                    />
                </div>
            </div>
        </section>
    );
}