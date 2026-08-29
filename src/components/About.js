import React from "react";
import SectionHead from "./SectionHead";
import useReveal from "../hooks/useReveal";
import education from "../data/education";
import "../styles/About.css";

const About = () => {
  useReveal();

  return (
    <section id="about" className="about">
      <div className="shell">
        <SectionHead index="01" title="About" note="Who / What / Why" />

        <div className="about-grid" data-reveal>
          <figure className="about-portrait">
            <img src="/img.jpg" alt="Sankalp Rajeev" />
            <figcaption className="mono">Sankalp Rajeev</figcaption>
          </figure>

          <div className="about-body">
            <h3 className="about-lead">
              Here&rsquo;s a <span className="emph">little</span> about me
            </h3>
            <p className="prose about-text">
              I am an <strong>AI and ML Engineer</strong> pursuing a{" "}
              <strong>Dual Master&rsquo;s in Artificial Intelligence and Robotics Engineering</strong> at the{" "}
              <strong>University of Michigan – Dearborn</strong> (GPA 3.90). I specialize in building
              production-grade systems across <strong>ML Engineering</strong>, <strong>Agentic AI</strong>, and{" "}
              <strong>Data Engineering</strong> — from 411M-row data pipelines and transformer-based
              recommendation systems to fine-tuned LLMs evaluated with LLM-as-a-Judge and multimodal ML
              pipelines deployed on GCP. I&rsquo;m currently seeking <strong>Summer 2026 internships</strong> in
              ML Engineering, AI Engineering, and Data Science.
            </p>

            <div className="actions">
              <a
                className="action action-solid"
                href="/Sankalp_Rajeev-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                View resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="education" className="shell education">
        <SectionHead index="02" title="Education" note={`${education.length} degrees`} />

        <div className="education-grid">
          {education.map((entry) => (
            <article key={entry.degree} className="education-card" data-reveal>
              <header className="education-head">
                <span className="label">{entry.years}</span>
                <h3 className="education-degree">{entry.degree}</h3>
                <p className="education-institution mono">{entry.institution}</p>
              </header>

              <dl className="education-facts">
                <div>
                  <dt className="label">GPA</dt>
                  <dd className="mono">{entry.gpa}</dd>
                </div>
                <div>
                  <dt className="label">Note</dt>
                  <dd className="mono">{entry.description}</dd>
                </div>
              </dl>

              {entry.courses && (
                <div className="education-courses">
                  <span className="label">Key coursework</span>
                  <ul className="tags">
                    {entry.courses.map((course) => (
                      <li key={course} className="tag">
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                className="link education-transcript"
                href={entry.transcriptLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View transcript
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
