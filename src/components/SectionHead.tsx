interface SectionHeadProps {
  number: string;
  title: string;
  id: string;
}

export default function SectionHead({ number, title, id }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="section-number" aria-hidden="true">
        {number}
      </span>
      <h2 id={id} className="section-title">
        {title}
      </h2>
    </div>
  );
}
