import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
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

const THEME_KEY = "theme";

const readStoredTheme = () => {
    try {
        const stored = window.localStorage.getItem(THEME_KEY);
        return stored === "dark" || stored === "light" ? stored : "dark";
    } catch {
        return "dark";
    }
};

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
    const [theme, setTheme] = useState(readStoredTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            window.localStorage.setItem(THEME_KEY, theme);
        } catch {
            /* storage unavailable — theme still applies for this session */
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);

    return (
        <Router>
            <div className="App">
                <a className="skip-link" href="#main">Skip to content</a>
                <Header theme={theme} toggleTheme={toggleTheme} />
                <main id="main">
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
