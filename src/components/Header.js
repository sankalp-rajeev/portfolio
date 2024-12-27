import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setIsScrolling(true); // Show header when scrolling

      // Hide header after 1 second of no scrolling
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout); // Cleanup timeout
    };
  }, []);

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path); // Navigate to the specified path
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after navigation
      }, 100); // Allow time for navigation
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top if already on the page
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (location.pathname !== "/") {
      // Navigate to home and scroll to footer after navigation
      navigate("/");
      setTimeout(() => {
        const footerElement = document.getElementById("footer");
        if (footerElement) {
          footerElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Allow time for navigation
    } else {
      // If already on the home page, scroll to footer directly
      const footerElement = document.getElementById("footer");
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header
      className={`navbar ${isScrolling ? "visible" : ""}`}
      onMouseEnter={() => setIsScrolling(true)} // Keep header visible on hover
      onMouseLeave={() => setIsScrolling(false)} // Allow hiding after hover ends
    >
      <div className="logo"></div>
      <ul className="nav-links">
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
          <a
            href="#"
            onClick={handleContactClick} // Handle Contact Scroll
          >
            Contact
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
