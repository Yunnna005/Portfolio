export default function ExperienceEducation() {
  const experience = [
    {
      role: "Frontend Developer Intern",
      company: "Tech Startup",
      duration: "Jan 2024 - Present",
      description:
        "Assisting in UI development using React and TypeScript. Collaborating with the design team to enhance user experience.",
    },
  ];

  const education = [
    {
      degree: "Bachelor's in Computer Science",
      university: "XYZ University",
      duration: "2022 - Present",
      description:
        "Currently pursuing studies in software development, web technologies, and UI/UX design.",
    },
  ];

  return (
    <section className="experience-education">
      <h2>Experience</h2>
      <div className="experience-list">
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>
              {exp.role} - <span>{exp.company}</span>
            </h3>
            <p className="duration">{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <h2>Education</h2>
      <div className="education-list">
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>
              {edu.degree} - <span>{edu.university}</span>
            </h3>
            <p className="duration">{edu.duration}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
