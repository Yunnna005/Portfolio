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
      <img src={image} alt={name} className="project-image" style={{ width: '300px', height: '200px' }} />
      {hasMultiple}
    </div>
  );
}
