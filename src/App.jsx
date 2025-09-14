// /src/App.jsx

import Header from "./views/header";
import Hero from "./views/hero";
import Projects from "./views/projects";

export default function App() {
  return (
    <div id="app-root">
      <Header />
      <main>
        <Hero />
        <Projects />
      </main>
    </div>
  );
}