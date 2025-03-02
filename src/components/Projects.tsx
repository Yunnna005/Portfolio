import { useState } from "react";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState(
    "Software Development"
  );

  const projects = [
    {
      name: "Portfolio Website",
      description: "A personal portfolio built with React and TypeScript.",
      tags: ["React", "TypeScript", "CSS"],
      category: "Software Development",
    },
    {
      name: "Weather App",
      description:
        "A cute weather app with API integration and animated icons.",
      tags: ["JavaScript", "API", "Animation"],
      category: "Software Development",
    },
    {
      name: "Game Prototype",
      description: "A 2D platformer made in Unity.",
      tags: ["Unity", "C#", "Game Dev"],
      category: "Games Development",
    },
  ];

  const filteredProjects = projects.filter(
    (project) => project.category === selectedCategory
  );

  return (
    <section>
      <h2>My Projects</h2>

      <div className="filter-buttons">
        <button
          className={
            selectedCategory === "Software Development" ? "active" : ""
          }
          onClick={() => setSelectedCategory("Software Development")}
        >
          Software Development
        </button>
        <button
          className={selectedCategory === "Games Development" ? "active" : ""}
          onClick={() => setSelectedCategory("Games Development")}
        >
          Games Development
        </button>
      </div>

      <div className="timeline-container">
        <div className="timeline-line">
          {filteredProjects.map((_, index) => (
            <div className="timeline-point" key={index}>
              <div className="point-inner"></div>
            </div>
          ))}
        </div>

        <div className="projects-list">
          {filteredProjects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-shape">
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
