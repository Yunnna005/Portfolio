import { skillAreas } from "../data/skills";

export default function Skills() {
  return (
    <div className="ledger-group">
      <h3 className="ledger-heading">Skills</h3>
      <ul className="ledger">
        {skillAreas.map((area) => (
          <li key={area.title} className="ledger-row ledger-row--skills">
            <span className="ledger-key">{area.title}</span>
            <ul className="label-list">
              {area.skills.map((skill) => (
                <li key={skill} className="label label--chip">
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
