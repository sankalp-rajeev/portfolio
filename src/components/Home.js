import React, { useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  const [text, setText] = useState("");
  const phrases = [
    "teaching machines to think🧠",
    "crafting computer vision models👁️",
    "debugging lines of chaos into harmony💻",
    "exploring the depths of AI and ML🤖"
  ];
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopIndex % phrases.length];
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1000); // Shorter pause before deleting
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setLoopIndex(loopIndex + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : typingSpeed); // Faster deleting speed
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, typingSpeed]);

  const socialLinks = [
    { href: "https://www.linkedin.com/in/sankalp-rajeev/", icon: "fab fa-linkedin" },
    { href: "https://github.com/sankalp-rajeev", icon: "fab fa-github" },
    { href: "https://www.instagram.com/sankalp_rajeev/", icon: "fab fa-instagram" },
  ];

  // Scroll to About Section
  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="home-section">
      {/* Breathing Circles */}
      <div className="circle-container"></div>

      {/* Main Content */}
      <div className="main-content">
        <h2>
          Hi, The name's <span className="highlight">Sankalp</span>
        </h2>
        <h3>Machine Learning Engineer</h3>
        <h1>
          I like <span className="dynamic-text">{text}</span>.
        </h1>
        <button className="nav-button" onClick={handleLearnMoreClick}>
          Learn More
        </button>
      </div>

      {/* Social Icons */}
      <div className="social-icons">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            <i className={link.icon}></i>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Home;
