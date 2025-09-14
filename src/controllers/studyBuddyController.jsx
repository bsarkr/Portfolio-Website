// src/controllers/studyBuddyController.jsx
// By Bilash Sarkar

import React from "react";
import { createRoot } from "react-dom/client";

import "../index.css";
import Header from "../views/header.jsx";
import ProjectDetail from "../views/ProjectDetail.jsx";
import { studyBuddyDetail } from "../models/studyBuddyDetails.js";

function StudyBuddyPage() {
    return (
        <div id="app-root">
            <Header />
            <main>
                <ProjectDetail data={studyBuddyDetail} />
            </main>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<StudyBuddyPage />);