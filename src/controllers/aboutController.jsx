// /src/controllers/aboutController.jsx
// By Bilash Sarkar

import React from "react";
import { createRoot } from "react-dom/client";

import "../index.css";
import Header from "../views/header.jsx";
import About from "../views/About.jsx";

function AboutPage() {
    return (
        <div id="app-root">
            <Header />
            <main>
                <About />
            </main>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<AboutPage />);