// /src/App.jsx
//By Bilash Sarkar

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Global shell
import Header from "./views/header.jsx";

// Pages
import Hero from "./views/hero.jsx";
import Projects from "./views/projects.jsx";
import Skills from "./views/Skills.jsx";
import Resume from "./views/Resume.jsx";
import About from "./views/about.jsx";
import ProjectDetail from "./views/ProjectDetail.jsx";
<Route path="/projects/:slug" element={<ProjectDetail />} />

// Data for project detail pages
import { projectDetails } from "./models/watchThisDetails.js";
import { studyBuddyDetail } from "./models/studyBuddyDetails.js";
import { skillsData } from "./models/skillsData.js";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

// Simple Home that reuses your current landing sections
function Home() {
  return (
    <>
      <Hero />
      <Projects />
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);

  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Primary pages */}
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills data={skillsData} />} />
          <Route path="/resume" element={<Resume />} />

          {/* Project detail pages */}
          <Route
            path="/projects/watch-this"
            element={<ProjectDetail data={projectDetails["watch-this"]} />}
          />
          <Route
            path="/projects/studybuddy"
            element={<ProjectDetail data={studyBuddyDetail} />}
          />

          {/* Fallback: send unknown routes to home (or make a 404 component) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}