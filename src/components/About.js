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
  },
  {
    degree: "M.SC in AI - Computer Vision | M.SE in Robotics Engineering",
    institution: "University of Michigan - Dearborn",
    years: "09/2024 - 05/2026",
    gpa: "3.8/4.0",
    transcriptLink: "/transcripts/umich_transcript.pdf",
    description:
      "Focusing on advanced AI models, robotics engineering, and computer vision.",
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
          <h2>ABOUT</h2>
          <h3>
            Here’s a <span className="highlight">little</span> about me
          </h3>
          <p>
            👋 Hi, I’m Sankalp—a Software and Machine Learning Engineer passionate about advancing AI and robotics. I hold a Computer Science degree from <strong>Arizona State University</strong> and am currently pursuing a dual Master’s in <strong>Artificial Intelligence</strong> (focused on Computer Vision) and <strong>Robotics Engineering</strong> at the <strong>University of Michigan</strong>. I’m seeking AI/ML roles for 2025 to drive innovation in deep learning and autonomous systems.
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
