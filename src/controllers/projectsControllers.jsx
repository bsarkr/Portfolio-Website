// src/controllers/projectsControllers.jsx
// By Bilash Sarkar

import React from "react";
import { createRoot } from "react-dom/client";

import "../index.css";           // global styles
import Header from "../views/header.jsx";
import Projects from "../views/Projects.jsx";

function ProjectsPage() {
    return (
        <div id="app-root">
            <Header />
            <main>
                <section className="mx-auto max-w-6xl px-6 pt-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gradient">
                        My Projects
                    </h1>
                </section>
                <Projects />
            </main>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<ProjectsPage />);