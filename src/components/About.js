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
    institutionJsx: true,
    institution: "University of Michigan - Dearborn",
    years: "09/2024 - 12/2026",
    gpa: "3.90/4.0",
    transcriptLink: "/transcripts/umich_transcript.pdf",
    descriptionJsx: true,
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
          <h2 className="section-title">About</h2>
          <h3>
            Here’s a <span className="highlight">little</span> about me
          </h3>
          <p>
            I am a <strong>Machine Learning and Robotics Engineer</strong> dedicated to building robust, intelligent systems. Currently pursuing a <strong>Dual Master’s in AI and Robotics</strong> at the <strong>University of Michigan</strong>, I specialize in bridging the gap between theoretical research and production deployment. My technical capabilities span optimizing <strong>edge-AI models</strong> on high-performance <strong>Qualcomm</strong> hardware, deploying <strong>multimodal LLM pipelines</strong> on <strong>GCP</strong>, and engineering autonomous navigation stacks using <strong>ROS</strong> and <strong>SLAM</strong>. I am seeking full-time AI/ML roles for 2026 where I can leverage my expertise in <strong>Deep Learning</strong> and <strong>Computer Vision</strong> to drive innovation in autonomous systems.
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
