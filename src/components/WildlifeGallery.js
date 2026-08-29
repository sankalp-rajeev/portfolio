import React from "react";
import gallery from "../data/gallery";
import "../styles/WildlifeGallery.css";

const WildlifeGallery = () => {
  return (
    <div className="wildlife-gallery-page">
      <header className="gallery-header">
        <h1>Wildlife Photography</h1>
        <p>Explore my collection of wildlife moments captured in nature.</p>
      </header>
      <main className="wildlife-gallery">
        {gallery.map((photo) => (
          <div key={photo.src} className="gallery-item">
            <img src={photo.src} alt={photo.caption} loading="lazy" />
            <div className="caption">{photo.caption}</div>
          </div>
        ))}
      </main>
      <footer className="gallery-footer">
        <p>
          Explore more on my{" "}
          <a
            href="https://www.instagram.com/sankalp_rajeev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default WildlifeGallery;
