import React, { useEffect, useState } from "react";
import experience from "../data/experience";
import "../styles/Home.css";

const phrases = [
  "teaching machines to think",
  "crafting computer vision models",
  "debugging lines of chaos into harmony",
  "exploring the depths of AI and ML",
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sankalp-rajeev/" },
  { label: "GitHub", href: "https://github.com/sankalp-rajeev" },
  { label: "Instagram", href: "https://www.instagram.com/sankalp_rajeev/" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const latestRole = experience[0];

  useEffect(() => {
    const currentPhrase = phrases[loopIndex % phrases.length];

    const step = () => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text === currentPhrase) setIsDeleting(true);
        return;
      }
      setText(currentPhrase.substring(0, text.length - 1));
      if (text === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    };

    const hold = !isDeleting && text === currentPhrase ? 1600 : isDeleting ? 40 : 70;
    const timer = setTimeout(step, hold);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex]);

  const scrollToAbout = () => {
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="shell hero-inner">
        <div className="hero-body">
          <p className="hero-greeting label">Hi, the name&rsquo;s Sankalp</p>
          <h1 className="hero-title">
            AI / Machine Learning
            <br />
            Engineer
          </h1>

          <p className="hero-line">
            I like <span className="hero-typed">{text}</span>
            <span className="hero-caret" aria-hidden="true" />
          </p>

          <div className="hero-actions">
            <button type="button" className="action" onClick={scrollToAbout}>
              Learn more
            </button>
            <a
              className="action"
              href="/Sankalp_Rajeev-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>

          <ul className="hero-social">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a className="link" href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <dl className="hero-meta">
          <div className="hero-meta-row">
            <dt className="label">Focus</dt>
            <dd>ML Engineering, Agentic AI, Data Engineering</dd>
          </div>
          <div className="hero-meta-row">
            <dt className="label">Based</dt>
            <dd>Dearborn, Michigan</dd>
          </div>
          <div className="hero-meta-row">
            <dt className="label">Studying</dt>
            <dd>M.S. AI + M.S.E. Robotics, U-M Dearborn</dd>
          </div>
          <div className="hero-meta-row">
            <dt className="label">Latest</dt>
            <dd>
              {latestRole.title}, {latestRole.company}
            </dd>
          </div>
        </dl>
      </div>

      <button type="button" className="hero-scroll" onClick={scrollToAbout}>
        <span className="label">Scroll</span>
        <span className="hero-scroll-rule" aria-hidden="true" />
      </button>
    </section>
  );
};

export default Home;
