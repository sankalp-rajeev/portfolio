import React, { useState } from "react";
import "../styles/Certificate.css";

const certifications = [
  {
    title: "Bsc Computer Science Diploma",
    pdf: "/certificates/eDiploma.pdf",
    type: "pdf",
  },
  {
    title: "Computer Vision",
    pdf: "/certificates/computervisionCertificate.pdf",
    type: "pdf",
  },
  {
    title: "Intro to Applied Data Analytics",
    pdf: "https://www.credential.net/b8c8897b-7a62-4358-997d-1b7addd0e239#acc.kfhEQs3g", 
    type: "external",
  },
  {
    title: "Tableau Certification",
    pdf: "https://www.credential.net/fd1fa7b0-7775-4048-b5cc-2ce6c43954b2#acc.2W7pwUl5",
    type: "external",
  },
];

const Certificate = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(certifications[0]);

  return (
    <div className="certification-container">
      <h1 className="certification-title">My Certifications</h1>
      <div className="certification-grid">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`cert-card ${selectedCertificate.title === cert.title ? "active" : ""}`}
            onClick={() => setSelectedCertificate(cert)}
          >
            <h2 className="cert-title">{cert.title}</h2>
          </div>
        ))}
      </div>
      <div className="viewer-container">
        {selectedCertificate.type === "pdf" ? (
          <iframe
            src={selectedCertificate.pdf}
            title="Certificate Viewer"
            frameBorder="0"
            className="pdf-iframe"
          ></iframe>
        ) : selectedCertificate.type === "external" ? (
          <iframe
            src={selectedCertificate.pdf}
            title="External Certificate Viewer"
            frameBorder="0"
            className="external-iframe"
          ></iframe>
        ) : null}
      </div>
      <div className="ongoing-certification">
        <div className="certification-header">
          <strong>Current Pursuit:</strong>
          <span className="cert-name">Google Cloud Professional Machine Learning Engineer (PMLE)</span>
        </div>
        <div className="cert-progress-container">
          <div className="cert-progress-bar" style={{ width: "10%" }}></div>
        </div>
        <p className="ongoing-text">
          I am passionately working towards earning my <strong>Google Cloud Professional Machine Learning Engineer</strong> certification. This journey is enhancing my skills in cloud-native ML solutions, data pipeline design, and model deployment.
          <br />
          <span className="estimated-time">Estimated Completion: May 2025</span>
        </p>
      </div>

    </div>
  );
};

export default Certificate;
