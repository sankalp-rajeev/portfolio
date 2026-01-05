import React, { useState, useEffect, useRef } from "react";
import "../styles/Home.css";

const Home = () => {
  const [text, setText] = useState("");
  const phrases = [
    "teaching machines to think",
    "crafting computer vision models",
    "debugging lines of chaos into harmony",
    "exploring the depths of AI and ML"
  ];
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopIndex % phrases.length];
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setLoopIndex(loopIndex + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, typingSpeed]);

  // Parallax effect for circles
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / 25,
      y: (clientY - centerY) / 25
    });
  };

  // 3D Tilt effect for content
  const handleContentMouseMove = (e) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    contentRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleContentMouseLeave = () => {
    if (contentRef.current) {
      contentRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
  };

  const socialLinks = [
    { href: "https://www.linkedin.com/in/sankalp-rajeev/", icon: "fab fa-linkedin" },
    { href: "https://github.com/sankalp-rajeev", icon: "fab fa-github" },
    { href: "https://www.instagram.com/sankalp_rajeev/", icon: "fab fa-instagram" },
  ];

  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="home-section" onMouseMove={handleMouseMove}>
      {/* Social Icons */}
      <div className="social-icons">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            <i className={link.icon}></i>
          </a>
        ))}
      </div>

      {/* Breathing Circles with Parallax */}
      <div
        className="circle-container"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`
        }}
      ></div>

      {/* Main Content with 3D Tilt */}
      <div
        className="main-content"
        ref={contentRef}
        onMouseMove={handleContentMouseMove}
        onMouseLeave={handleContentMouseLeave}
      >
        <h2>
          Hi, The name's <span className="highlight">Sankalp</span>
        </h2>
        <h3 className="role-title fade-in">AI/Machine Learning Engineer</h3>
        <h1>
          I like <span className="dynamic-text">{text}</span>.
        </h1>
        <button className="nav-button" onClick={handleLearnMoreClick}>
          Learn More
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" onClick={handleLearnMoreClick}>
        <span className="scroll-text">Scroll</span>
        <div className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
};

export default Home;
