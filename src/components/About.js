import React from "react";
import "../styles/About.css";

const educationDetails = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Arizona State University",
    years: "08/2020 - 05/2024",
    gpa: "3.71/4.0",
    transcriptLink: "transcripts/ASU_FinalTranscript.pdf",
    description: "Certified in Mathematical Concepts of Engineering.",
  },
  {
    degree: "MSc. in AI - Computer Vision | MSE. in Robotics Engineering",
    institution: "University of Michigan - Dearborn",
    years: "09/2024 - 05/2026",
    gpa: "3.9/4.0",
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
          {/* Resume Button Below Image */}
          <div className="resume-button-container">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="about-content">
          <h2>ABOUT</h2>
          <h3>
            Here is a <span className="highlight">little</span> background
          </h3>
          <p>
            👋 Hi, I am Sankalp, a Software / Machine Learning Engineer passionate about pushing the boundaries of AI and robotics. I recently completed my undergraduate degree in Computer Science at Arizona State University, specializing in machine learning and computer vision. Currently, I am pursuing my Master's in Artificial Intelligence and Robotics Engineering at the University of Michigan. I am actively seeking AI/ML roles for 2025 where I can contribute to innovative projects and apply my expertise in deep learning, robotics, and autonomous systems.
          </p>
          <p>
            Apart from coding, I am an avid wildlife photographer and hiker. I enjoy tackling new challenges that inspire me to think creatively and develop cutting-edge solutions. My dedication to problem-solving and passion for technology drives me to excel in every endeavor.
          </p>
        </div>
      </div>

      {/* Education Section */}
      <div className="education-section">
        <h3 className="education-title">Education</h3>
        <div className="education-grid">
          {educationDetails.map((edu, index) => (
            <div key={index} className="education-card">
              <h4 className="education-degree">{edu.degree}</h4>
              <h5 className="education-institution">{edu.institution}</h5>
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
