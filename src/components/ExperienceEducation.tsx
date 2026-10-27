import SectionHead from "./SectionHead";
import Skills from "./Skills";

type Entry = {
  title: string;
  organisation?: string;
  duration: string;
  description?: string;
};

const experience: Entry[] = [
  {
    title: "Software Development Intern",
    organisation: "Ailtir",
    duration: "Jan - Apr 2025",
    description:
      "Built and launched the company website in Framer in one week, with a Make.com automation that saves customer details to a database. Developed React and TypeScript components for an AI-powered tender and bid management platform. Worked with the management, marketing and design teams, picked up backend tasks and tracked sprint work in Jira.",
  },
];

const education: Entry[] = [
  {
    title: "MSc Finance (Corporate Finance)",
    organisation: "University College Cork (UCC)",
    duration: "2026 - Present",
    description:
      "Modules: Investments and Equity Valuation, Financial Analysis and Forecasting, Treasury and Risk Management, Python and Machine Learning for Finance, Capital Markets and Regulation and Compliance.",
  },
  {
    title: "BSc (Hons) in Computer Science",
    organisation: "Munster Technological University (MTU Kerry)",
    duration: "2022 - 2026",
    description:
      "First Class Honours (1:1). Modules: Artificial Intelligence, Advanced Databases, Data Analytics, Data Structures and Concurrency, Cloud Analytics, Software Project Management.",
  },
];

const activities: Entry[] = [
  {
    title: "Chairperson",
    organisation: "MTU Dance Society",
    duration: "2023 - 2026",
    description:
      "Ran society events and taught weekly dance classes to students of all levels. Worked with the committee, university staff and outside venues to make events happen.",
  },
  {
    title: "Captain",
    organisation: "MTU Women's Volleyball Team",
    duration: "2023 - 2026",
    description:
      "Led the team through training and matches, and handled communication and conflicts under pressure.",
  },
  {
    title: "Participant and tech contributor",
    organisation: "Dublin Give(a)Go Hiring Hackathon and Dublin HackIreland",
    duration: "2025 - 2026",
    description:
      "Built and presented software ideas with a team in a short timeframe.",
  },
  {
    title: "Participant",
    organisation: "Legacy Dublin23 Leadership Programme, Common Purpose Ireland",
    duration: "2023",
    description:
      "Worked with senior leaders on real community challenges.",
  },
];

function Ledger({ heading, entries }: { heading: string; entries: Entry[] }) {
  return (
    <div className="ledger-group">
      <h3 className="ledger-heading">{heading}</h3>
      <ul className="ledger">
        {entries.map((entry) => (
          <li key={entry.title} className="ledger-row">
            <span className="ledger-key label">{entry.duration}</span>
            <div className="ledger-body">
              <h4 className="ledger-title">{entry.title}</h4>
              {entry.organisation && (
                <p className="ledger-org">{entry.organisation}</p>
              )}
              {entry.description && (
                <p className="ledger-text">{entry.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceEducation() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <SectionHead number="01" title="Experience and education" id="experience-title" />
      <div className="section-body ledger-columns">
        <Ledger heading="Experience" entries={experience} />
        <Ledger heading="Education" entries={education} />
        <Ledger heading="Activities" entries={activities} />
        <Skills />
      </div>
    </section>
  );
}
