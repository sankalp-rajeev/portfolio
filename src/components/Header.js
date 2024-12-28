import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      if (!isHovering) { 
        setIsScrolling(true);

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [isHovering]);

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false); 
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false); 
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const footerElement = document.getElementById("footer");
        if (footerElement) {
          footerElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const footerElement = document.getElementById("footer");
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header
      className={`navbar ${isScrolling ? "visible" : ""}`}
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)} 
    >
      <div className="logo"></div>
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/projects");
            }}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/certificates");
            }}
          >
            Certificates
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/experience");
            }}
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/wildlife-gallery");
            }}
          >
            Wildlife Photography
          </a>
        </li>
        <li>
          <a href="#" onClick={handleContactClick}>
            Contact
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
