interface ProjectImageProps {
  image: string;
  name: string;
  hasMultiple: boolean;
}

export default function ProjectImage({
  image,
  name,
  hasMultiple,
}: ProjectImageProps) {
  return (
    <div className="project-image-container">
      <img src={image} alt={`${name} screenshot`} className="project-image" />
      {hasMultiple && (
        <div className="image-dots">
          <span className="image-dot"></span>
          <span className="image-dot"></span>
          <span className="image-dot"></span>
        </div>
      )}
    </div>
  );
}
