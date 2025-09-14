// /src/models/studyBuddyDetail.js
// By Bilash Sarkar

// Structured content for the StudyBuddy project page.
// Provides metadata, technologies, setup steps, usage examples, learnings, and roadmap.

export const studyBuddyDetail = {
    // Core project identifiers
    id: "studybuddy",
    title: "StudyBuddy",
    tagline: "A sleek, social-first iOS study app for creating, organizing, and sharing study materials.",
    video: "/videos/studybuddy.mp4",   // Path to demo video
    logo: "/StudyBuddyLogo.png",       // Path to logo asset in /public
    layout: "portraitSplit",           // Layout type used by the project page

    // Technologies grouped by category: UI, backend, collaboration
    tech: {
        "iOS & UI": [
            "SwiftUI",
            "Custom bottom tab bar",
            "Responsive layouts",
            "PhotosUI / UIImagePickerController",
        ],
        "Backend & Realtime": [
            "Firebase Authentication",
            "Firebase Firestore",
            "Firebase Storage",
            "Realtime listeners",
        ],
        "Dev & Collaboration": ["Git", "GitHub", "Xcode 15+"],
    },

    // Step-by-step instructions for running the project locally
    setup: [
        "Clone the repo: git clone https://github.com/bsarkr/StudyBuddy.git",
        "Open the project in Xcode 15+.",
        "Run `pod install` if needed for Firebase integration.",
        "Connect your Firebase project by replacing GoogleService-Info.plist.",
        "Enable Firebase Auth, Firestore, and Storage in the Firebase console.",
        "Build and run on a real device or simulator.",
    ],

    // How end users interact with the app
    usage: [
        "Create flashcard sets and organize them into folders.",
        "Customize your profile; add friends and accept requests.",
        "Use messaging for quick collaboration.",
        "Practice with a focused Learn Mode.",
    ],

    // Key technical and collaborative lessons learned during development
    learnings: [
        "Implemented secure Firebase Authentication and session tracking.",
        "Built real-time friend requests & messaging with Firestore listeners.",
        "Integrated profile photo upload + cropping with Firebase Storage.",
        "Designed a custom bottom tab bar for consistent app navigation.",
        "Refactored large SwiftUI views into modular, scalable components.",
        "Collaborated via GitHub with conflict resolution and merging.",
    ],

    // Planned future improvements and features
    roadmap: [
        "Richer Learn Mode with spaced repetition.",
        "Public set browsing & featured creators.",
        "Shared folders and collaborative editing.",
        "In-app notifications and activity feed.",
    ],
};