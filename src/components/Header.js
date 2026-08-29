import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const homeSections = [
  { label: "About", hash: "#about" },
  { label: "Education", hash: "#education" },
  { label: "Journey", hash: "#journey" },
  { label: "Skills", hash: "#skills" },
  { label: "Contact", hash: "#footer" },
];

const pages = [
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Certificates", path: "/certificates" },
  { label: "Gallery", path: "/wildlife-gallery" },
];

const Header = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth <= 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsSectionsOpen(false);
  }, []);

  const scrollToSection = useCallback((hash) => {
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, []);

  const goToSection = useCallback(
    (hash) => {
      closeMenus();
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for the home route to mount before measuring the target.
        setTimeout(() => scrollToSection(hash), 400);
        return;
      }
      scrollToSection(hash);
    },
    [closeMenus, location.pathname, navigate, scrollToSection]
  );

  const goToPage = useCallback(
    (path) => {
      closeMenus();
      if (location.pathname !== path) navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [closeMenus, location.pathname, navigate]
  );

  return (
    <header className={`nav ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <a
          className="nav-mark"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            goToPage("/");
          }}
        >
          <span className="nav-mark-name">Sankalp Rajeev</span>
          <span className="nav-mark-role">AI / ML Engineer</span>
        </a>

        <button
          type="button"
          className="nav-burger"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav-links ${isMenuOpen ? "is-open" : ""}`}>
          <div
            className={`nav-group ${isSectionsOpen ? "is-open" : ""}`}
            onMouseEnter={() => !isCompact && setIsSectionsOpen(true)}
            onMouseLeave={() => !isCompact && setIsSectionsOpen(false)}
          >
            <a
              className={`nav-link ${location.pathname === "/" ? "is-active" : ""}`}
              href="/"
              aria-expanded={isSectionsOpen}
              onClick={(e) => {
                e.preventDefault();
                if (isCompact) {
                  setIsSectionsOpen((prev) => !prev);
                  return;
                }
                goToPage("/");
              }}
            >
              Home
            </a>
            <div className="nav-panel">
              {homeSections.map((section) => (
                <a
                  key={section.hash}
                  className="nav-panel-item"
                  href={`/${section.hash}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(section.hash);
                  }}
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>

          {pages.map((page) => (
            <a
              key={page.path}
              className={`nav-link ${location.pathname === page.path ? "is-active" : ""}`}
              href={page.path}
              onClick={(e) => {
                e.preventDefault();
                goToPage(page.path);
              }}
            >
              {page.label}
            </a>
          ))}

          <button
            type="button"
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
