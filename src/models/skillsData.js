// /src/models/skillsData.js
// By Bilash Sarkar

// Central data source for the Skills page. Organizes technical and non-technical
// skills into sections, including resume highlights and project applications.

export const skillsData = {
    // Section titles for the Skills page
    title: "My Skills",
    subtitle: "What I use to build—and where I put each skill to work.",

    // Resume-based skills grouped by category
    resume: {
        languages: [
            "C/C++", "Python", "JavaScript", "HTML", "CSS",
            "PHP", "Swift", "Java", "Assembly",
        ],
        frameworks: ["React", "Arduino"],
        tools: ["Firebase", "AWS", "Git/GitHub", "Linux", "MAMP", "MySQL", "Oracle"],
    },

    // Skills demonstrated through projects.
    // Each project includes: name, optional link, skills used, and applied examples.
    fromProjects: [
        {
            name: "WatchThis",
            href: "/projects/watch-this/",
            skills: [
                "JavaScript", "PHP", "HTML", "CSS", "MySQL",
                "REST APIs", "Sessions/Auth", "Caching",
            ],
            applied: [
                "Built full-stack app with JS/PHP + MVC.",
                "Integrated Streaming Availability & TMDB APIs.",
                "Implemented login sessions and caching for resiliency.",
            ],
        },
        {
            name: "StudyBuddy",
            href: "/projects/studybuddy/",
            skills: [
                "SwiftUI", "Firebase Auth", "Firestore", "Firebase Storage",
                "Realtime listeners", "UIKit/PhotosUI", "AI-assisted features",
            ],
            applied: [
                "Auth, profile & data sync with Firebase.",
                "Real-time friends/messaging and Learn Mode.",
                "Profile photo upload + cropping with UIImagePickerController.",
            ],
        },
        {
            name: "MySQL Development Tool",
            skills: ["C++", "Regex", "OOP"],
            applied: [
                "Designed CLI to create/retrieve data via custom parser.",
                "Practiced classes/strings/loops/functions in C++.",
            ],
        },
    ],

    // Key work experience highlights to showcase professional skills
    experienceHighlights: [
        "IT Service Desk: triage/resolve issues across Windows, macOS, mobile; mentor student staff; write KB docs.",
    ],

    // Non-technical or soft skills for completeness
    nonTechnical: [
        "Leadership & mentoring",
        "Clear documentation & knowledge sharing",
        "Customer support & communication",
    ],
};