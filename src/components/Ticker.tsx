import { skillAreas } from "../data/skills";

const skills = skillAreas.flatMap((area) => area.skills);

// A stock-ticker band of skills. Decorative: section 01 lists them in full.
export default function Ticker() {
  const run = (copy: number) => (
    <ul className="ticker-run" key={copy}>
      {skills.map((skill) => (
        <li key={skill}>
          <span className="ticker-mark">▲</span>
          {skill}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker theme-navy" aria-hidden="true">
      <div className="ticker-track">{[0, 1].map(run)}</div>
    </div>
  );
}
