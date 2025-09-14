// src/controllers/resumeController.jsx
// By Bilash Sarkar

import React from "react";
import { createRoot } from "react-dom/client";

import "../index.css";
import Header from "../views/header.jsx";
import ResumeOnly from "../views/Resume.jsx";

function ResumePage() {
    return (
        <div id="app-root">
            <Header />
            <main>
                <ResumeOnly />
            </main>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<ResumePage />);