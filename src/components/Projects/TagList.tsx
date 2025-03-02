interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="project-tags">
      {tags.map((tag, tagIndex) => (
        <span key={tagIndex} className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
