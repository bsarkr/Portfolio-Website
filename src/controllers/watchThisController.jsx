// /src/controllers/watchThisController.jsx
// By Bilash Sarkar


import React from "react";
import { createRoot } from "react-dom/client";

import "../index.css";
import Header from "../views/header.jsx";
import ProjectDetail from "../views/ProjectDetail.jsx";
import { projectDetails } from "../models/watchThisDetails.js";

function Page() {
    const data = projectDetails["watch-this"];

    return (
        <div id="app-root">
            <Header />
            <main>
                <ProjectDetail data={data} />
            </main>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<Page />);