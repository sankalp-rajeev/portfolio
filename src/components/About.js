import React from "react";
import "../styles/About.css";

const educationDetails = [
  {
    degree: "B.SC in Computer Science",
    institution: "Arizona State University",
    years: "08/2020 - 05/2024",
    gpa: "3.71/4.0",
    transcriptLink: "transcripts/ASU_FinalTranscript.pdf",
    description: "Certified in Mathematical Concepts of Engineering.",
    courses: [
      "Foundations of Machine Learning",
      "Applied Linear Algebra",
      "Data Visualization",
      "Exploring Data in R & Python",
      "Probability & Stats for Engr",
      "Intro to Theoretical CS",
    ],
  },
  {
    degree: "M.SC in AI - Computer Vision | M.SE in Robotics Engineering",
    institution: "University of Michigan - Dearborn",
    years: "09/2024 - 12/2026",
    gpa: "3.90/4.0",
    transcriptLink: "/transcripts/umich_transcript.pdf",
    description: "Focusing on advanced AI, ML Engineering, and Data Engineering.",
    courses: [
      "Deep Learning",
      "Robot Vision",
      "Mobile Robots",
      "Embedded Systems",
      "Pat. Rec. & Neural Networks",
      "Advanced AI",
    ],
  },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Image Section */}
        <div className="about-image">
          <img src="/img.jpg" alt="Sankalp" />
        </div>

        {/* Content Section */}
        <div className="about-content">
          <h2 className="section-title">About</h2>
          <h3>
            Here’s a <span className="highlight">little</span> about me
          </h3>
          <p>
            I am an <strong>AI and ML Engineer</strong> pursuing a <strong>Dual Master's in Artificial Intelligence and Robotics Engineering</strong> at the <strong>University of Michigan – Dearborn</strong> (GPA 3.90). I specialize in building production-grade systems across <strong>ML Engineering</strong>, <strong>Agentic AI</strong>, and <strong>Data Engineering</strong> — from 411M-row data pipelines and transformer-based recommendation systems to fine-tuned LLMs evaluated with LLM-as-a-Judge and multimodal ML pipelines deployed on GCP. I'm currently seeking <strong> Summer 2026 internships</strong> in ML Engineering, AI Engineering, and Data Science.
          </p>

          {/* Centered Resume Button */}
          <div className="resume-button-container">
            <a
              href="/Sankalp_Rajeev-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div id="education" className="education-section">
        <h3 className="education-title">Education</h3>
        <div className="education-grid">
          {educationDetails.map((edu, index) => (
            <div key={index} className="education-card">
              <h4 className="education-degree">{edu.degree}</h4>
              <p className="education-institution">{edu.institution}</p>
              <p className="education-years">{edu.years}</p>
              <p className="education-gpa">
                <strong>GPA:</strong> {edu.gpa}
              </p>

              {/* Key Coursework */}
              {edu.courses && (
                <div className="education-courses">
                  <h5 className="courses-title">Key Coursework:</h5>
                  <ul className="courses-list">
                    {edu.courses.map((course, i) => (
                      <li key={i}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="education-description">{edu.description}</p>
              <a
                href={edu.transcriptLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transcript-link"
              >
                View Transcript
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
