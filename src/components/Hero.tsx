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
          I like computing and finance, and I enjoy work that needs both. I
          build software, I'm studying finance, and I'm always happy to talk
          about either.
        </p>
        <div className="hero-actions">
          <div className="hero-buttons">
            <a
              className="button-primary"
              href={`${import.meta.env.BASE_URL}CV_AnnaKovalenko.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>
            <a
              className="icon-link"
              href="https://www.linkedin.com/in/anna-kovalenko-cs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              title="Connect on LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  fill="currentColor"
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
                />
              </svg>
            </a>
          </div>
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
