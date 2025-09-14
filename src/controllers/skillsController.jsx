//src/controllers/skillsController.jsx
// By Bilash Sarkar


import React from "react";
import { createRoot } from "react-dom/client";

import "../index.css";
import Header from "../views/header.jsx";
import Skills from "../views/Skills.jsx";
import { skillsData } from "../models/skillsData.js";

function SkillsPage() {
    return (
        <div id="app-root">
            <Header />
            <main>
                <Skills data={skillsData} />
            </main>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<SkillsPage />);