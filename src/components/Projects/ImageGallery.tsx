import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="modal-image-section">
      <div className="modal-image-container">
        <img
          src={images[currentImageIndex]}
          alt={`${name} screenshot ${currentImageIndex + 1}`}
          className="modal-image"
        />
      </div>

      {images.length > 1 && (
        <div className="image-navigation">
          <button className="image-nav-btn prev" onClick={prevImage}>
            ←
          </button>
          <div className="image-indicators">
            {images.map((_, imgIndex) => (
              <span
                key={imgIndex}
                className={`indicator ${
                  currentImageIndex === imgIndex ? "active" : ""
                }`}
                onClick={() => setCurrentImageIndex(imgIndex)}
              ></span>
            ))}
          </div>
          <button className="image-nav-btn next" onClick={nextImage}>
            →
          </button>
        </div>
      )}
    </div>
  );
}
