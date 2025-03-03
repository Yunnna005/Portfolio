export default function ExperienceEducation() {
  const experience = [
    {
      role: "Frontend Developer Intern",
      company: "Ailtir",
      duration: "Jan 2024 - Present",
      description:
        "Contributed to AI integration, frontend development, and troubleshooting, while collaborating with cross-functional teams to enhance internal processes using AI tools.",
    },
  ];

  const education = [
    {
      degree: "Bachelor's in Computer Science",
      university: "Munster Technological University (MTU)",
      duration: "2022 - Present",
      description:
        "Currently pursuing studies in Computer Science, with a focus on games development.",
    },
  ];

  return (
    <section id="experience">
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

      <h2 id="education">Education</h2>
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
