interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <ul className="label-list">
      {tags.map((tag, tagIndex) => (
        <li key={tagIndex} className="label label--chip">
          {tag}
        </li>
      ))}
    </ul>
  );
}
