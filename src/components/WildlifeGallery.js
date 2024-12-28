import React from "react";
import "../styles/WildlifeGallery.css";

const WildlifeGallery = () => {
  const wildlifePhotos = [
    { src: "/photos/photo1.jpg", caption: "A majestic tiger quenches its thirst at a jungle stream." },
    { src: "/photos/photo2.jpg", caption: "A tiger's quiet stride, blending seamlessly with its surroundings." },
    { src: "/photos/photo3.jpg", caption: "A close-up of the tiger in its natural habitat, exuding power and grace." },
    { src: "/photos/photo4.jpg", caption: "A lioness secures her prey in the wild savanna, a testament to her strength." },
    { src: "/photos/photo5.jpg", caption: "A lion's intense stare, a window into the king of the jungle's soul." },
    { src: "/photos/photo6.jpg", caption: "A lioness yawning in the golden savanna, showcasing the raw beauty of the wild." },
    { src: "/photos/photo7.jpg", caption: "A rare black panther prowling through the dense jungle, embodying mystery." },
    { src: "/photos/photo8.jpg", caption: "A majestic bird of prey perched gracefully, surveying its surroundings." },
    { src: "/photos/photo9.jpg", caption: "A peacock flaunts its vibrant feathers, a dazzling display of nature's artistry." },
    { src: "/photos/photo10.jpg", caption: "A leopard rests on a tree, blending perfectly with its surroundings." },
    { src: "/photos/photo11.jpg", caption: "Leopard paws dangle from a branch, a picture of relaxation and stealth." },
    { src: "/photos/photo12.jpg", caption: "A leopard sleeping peacefully on a tree, basking in the tranquility of the wild." },
    { src: "/photos/photo15.jpg", caption: "A pair cheetah exploring the vast plains, their elegance unmatched." },
    { src: "/photos/photo16.jpg", caption: "A solitary cheetah gazing across the savanna, a symbol of grace and speed." },
    { src: "/photos/photo17.jpg", caption: "A cheetah enjoying a moment of rest in the golden grasslands." }
  ];

  return (
    <div className="wildlife-gallery-page">
      <header className="gallery-header">
        <h1>Wildlife Photography</h1>
        <p>Explore my collection of wildlife moments captured in nature.</p>
      </header>
      <main className="wildlife-gallery">
        {wildlifePhotos.map((photo, index) => (
          <div key={index} className="gallery-item">
            <img src={photo.src} alt={photo.caption} />
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
