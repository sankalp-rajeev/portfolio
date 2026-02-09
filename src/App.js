import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import JourneyTimeline from "./components/JourneyTimeline";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Footer";
import Certificate from "./components/Certificate";
import WildlifeGallery from "./components/WildlifeGallery";
import Experience from "./components/Experience";
import Skills from "./components/Skills";

// Home Page
const HomePage = () => {
    return (
        <>
            <Home />
            <About />
            <JourneyTimeline />
            <Skills />
            <Contact />
        </>
    );
};

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <Router>
            <div className={darkMode ? "App dark-mode" : "App"}>
                <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/certificates" element={<Certificate />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/wildlife-gallery" element={<WildlifeGallery />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
