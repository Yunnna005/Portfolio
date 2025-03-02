interface TimelineDotsProps {
  count: number;
}

export default function TimelineDots({ count }: TimelineDotsProps) {
  return (
    <div className="timeline-line">
      {Array.from({ length: count }).map((_, index) => (
        <div className="timeline-point" key={index}>
          <div className="point-inner"></div>
        </div>
      ))}
    </div>
  );
}
