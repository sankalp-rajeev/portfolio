import React, { useState } from "react";
import PageHead from "./PageHead";
import certificates from "../data/certificates";
import "../styles/Certificate.css";

const Certificate = () => {
  const [selected, setSelected] = useState(certificates[0]);

  return (
    <div className="page shell certificates">
      <PageHead
        path="~/certificates"
        title="Certificates"
        note="Degrees and coursework credentials. Select an entry to view the document."
      />

      <div className="certificates-layout">
        <ul className="certificates-list">
          {certificates.map((cert) => (
            <li key={cert.title}>
              <button
                type="button"
                className={`certificates-item ${selected.title === cert.title ? "is-active" : ""}`}
                onClick={() => setSelected(cert)}
              >
                <span className="certificates-item-title">{cert.title}</span>
                <span className="certificates-item-type">
                  {cert.type === "pdf" ? "PDF" : "Link"}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="certificates-viewer">
          <div className="certificates-viewer-bar">
            <span className="mono">{selected.title}</span>
            <a className="link" href={selected.pdf} target="_blank" rel="noopener noreferrer">
              Open
            </a>
          </div>
          <iframe src={selected.pdf} title={selected.title} className="certificates-frame" />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
