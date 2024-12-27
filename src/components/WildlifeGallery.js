import React from "react";
import "../styles/WildlifeGallery.css";

const WildlifeGallery = () => {
  const wildlifePhotos = [
    { src: "/photos/photo1.jpg", caption: "A majestic tiger quenches its thirst at a jungle stream." },
    { src: "/photos/photo2.jpg", caption: "A tiger's quiet stride, blending seamlessly with its surroundings." },
    { src: "/photos/photo3.jpg", caption: "A close-up of the tiger in its natural habitat, exuding power and grace." },
    { src: "/photos/photo4.jpg", caption: "A lioness secures her prey in the wild savanna, a testament to her strength." },
    { src: "/photos/photo5.jpg", caption: "A lion's intense stare, a window into the king of the jungle's soul." },
    { src: "/photos/photo6.jpg", caption: "A young lion cub sits quietly in the bush, observing its world." }
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
    </div>
  );
};

export default WildlifeGallery;
