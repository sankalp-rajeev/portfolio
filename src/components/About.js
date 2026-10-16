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
              I&rsquo;m an <strong>AI/ML engineer</strong> pursuing{" "}
              <strong>dual master&rsquo;s degrees in Artificial Intelligence and Robotics Engineering</strong> at the{" "}
              <strong>University of Michigan-Dearborn</strong>. I build <strong>machine learning systems</strong>{" "}
              that have to work outside a notebook, spanning industrial computer vision,{" "}
              <strong>production LLM applications</strong>, edge inference, recommendation systems, and{" "}
              <strong>AI reliability</strong>.
              At Magna, I developed and deployed computer-vision systems for manufacturing environments.
              At Zoetis, I shipped production LLM tools on Azure Kubernetes, and my current research focuses
              on the reliability of LLM-generated software repairs. I graduate in December 2026
              and am seeking <strong>full-time AI/ML engineering roles</strong> starting January 2027, with
              interest in the SF Bay Area, NYC, and Seattle.
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
