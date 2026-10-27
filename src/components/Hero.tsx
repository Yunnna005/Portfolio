import Clock from "./Clock";
import DotGrid from "./DotGrid";

const facts = [
  "MSc Finance at UCC",
  "BSc Computer Science, First Class Honours",
  "Mallow, Ireland",
];

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-text">
        <h1 className="hero-headline">Hi, I’m Anna</h1>
        <p className="hero-intro">
          I'm doing an MSc in Corporate Finance at UCC after a first class
          BSc in Computer Science. I build full-stack software with Python,
          SQL and React, and I'm looking for roles in FinTech engineering,
          FP&amp;A analytics and finance systems.
        </p>
        <div className="hero-actions">
          <a
            className="button-primary"
            href={`${import.meta.env.BASE_URL}CV_AnnaKovalenko.pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
          <ul className="hero-facts">
            {facts.map((fact) => (
              <li key={fact} className="label">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hero-panel theme-navy">
        <Clock />
        <DotGrid />
      </div>
    </section>
  );
}
