import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects"; 
import Contact from "./components/Footer";
import Certificate from "./components/Certificate";
import WildlifeGallery from "./components/WildlifeGallery";
import Experience from "./components/Experience"; // Import Experience component
import GlassBackground from "./components/nn";
import Skills from "./components/Skills"; // Import Skills component

function App() {
  return (
    <Router>
      <div className="App">
        <GlassBackground /> {/* Persistent background */}
        <Header />
        <main>
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Timeline />
                  <Skills/>
                  <Contact />
                </>
              }
            />
            {/* Projects Page */}
            <Route path="/projects" element={<Projects />} /> 
             {/* Certificates Page */}
             <Route path="/certificates" element={<Certificate />} /> 
            {/* Experience Page */}
            <Route path="/experience" element={<Experience />} /> {/* New Route */}
            {/* Wildlife Gallery */}
            <Route path="/wildlife-gallery" element={<WildlifeGallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;