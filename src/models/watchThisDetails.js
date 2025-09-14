// /src/models/projectDetails.js
// By Bilash Sarkar

// Structured content for project case studies. Each project entry
// provides metadata, technologies, setup steps, usage, learnings, and roadmap.

export const projectDetails = {
    "watch-this": {
        // Core project identifiers
        title: "WatchThis",
        tagline: "A clean, fast movie explorer with lists, search, and trailers — Netflix-inspired UI with a full MVC backend.",
        demoUrl: "https://youtu.be/A6EmARngpug",  // External demo video
        video: "/videos/watchThis.mp4",           // Local demo video asset

        // Technologies grouped by frontend, backend, and tools
        tech: {
            Frontend: [
                "HTML", "CSS", "JavaScript",
                "jQuery (AJAX)",
                "Responsive custom layout",
            ],
            Backend: [
                "PHP (MVC)",
                "RESTful routing",
                "MySQL (XAMPP)",
                "3rd-party movie API (AJAX)",
            ],
            Tools: [
                "VS Code", "GitHub",
                "Postman (API testing)",
                "XAMPP (Apache/MySQL)",
            ],
        },

        // Step-by-step instructions for running the project locally
        setup: [
            "Clone the repo: git clone https://github.com/bsarkr/WatchThis.git",
            "Start XAMPP (or MAMP) → start Apache + MySQL.",
            "Import the provided .sql via phpMyAdmin to create tables.",
            "Update config.php with your DB credentials.",
            "Open http://localhost/WatchThis in your browser.",
        ],

        // How end users interact with the app
        usage: [
            "Search any movie/TV show with the top search bar.",
            "Browse trending, top-rated, or filter by genre (Action, Comedy, Drama...).",
            "Open a detail page for overview, cast, director, runtime, trailer, tags.",
            "Leave general site feedback (anonymous or logged-in).",
        ],

        // Key technical and design lessons learned during development
        learnings: [
            "End-to-end stack: frontend ↔ backend ↔ database with a clean MVC structure.",
            "Real-time search via AJAX without full reloads.",
            "Secure auth & input validation in PHP.",
            "Effective API usage & debugging across the full stack.",
        ],

        // Planned future improvements and features
        roadmap: [
            "Logged-in homepage with personalized recommendations",
            "Watch-Later lists (solo & shared)",
            "Friend system (add/remove/message)",
            "Real-time notifications",
            "Richer user profiles with history & preferences",
        ],
    },
};