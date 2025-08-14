//app.jsx

import Header from "./views/header";
import Hero from "./views/hero";

export default function App() {
  return (
    <div id="app-root">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}