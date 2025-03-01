import { useState } from "react";

type SkillGroup = {
  sections: {
    title: string;
    skills: {
      name: string;
      icon: string;
    }[];
  }[];
};

type SkillGroups = {
  [key: string]: SkillGroup;
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const skillGroups: SkillGroups = {
    "Software Development": {
      sections: [
        {
          title: "Frontend Development",
          skills: [
            { name: "React", icon: "/icons/react.svg" },
            { name: "TypeScript", icon: "/icons/typescript.svg" },
          ],
        },
        {
          title: "Backend Development",
          skills: [
            { name: "Java", icon: "/icons/java.svg" },
            { name: "Python", icon: "/icons/python.svg" },
            { name: "Csharp", icon: "/icons/csharp.svg" },
            { name: "Dotnet", icon: "/icons/dotnet.svg" },
          ],
        },
        {
          title: "Database Management",
          skills: [
            { name: "Cockroachdb", icon: "/icons/cockroachdb.svg" },
            { name: "Mariadb", icon: "/icons/mariadb.svg" },
            { name: "Mysql", icon: "/icons/mysql.svg" },
          ],
        },
      ],
    },
    "Game Development": {
      sections: [
        {
          title: "Game Engines",
          skills: [{ name: "Unity", icon: "/icons/unity.svg" }],
        },
        {
          title: "3D Modeling",
          skills: [{ name: "Maya", icon: "/icons/maya.svg" }],
        },
      ],
    },
    "Tools & Technologies": {
      sections: [
        {
          title: "Cloud & DevOps",
          skills: [
            { name: "Azure", icon: "/icons/azure.svg" },
            { name: "Docker", icon: "/icons/docker.svg" },
          ],
        },
        {
          title: "Development Environment",
          skills: [
            { name: "VSCode", icon: "/icons/visual_studio_code.svg" },
            { name: "VisualStudio", icon: "/icons/visual_studio.svg" },
            { name: "Jetbrains", icon: "/icons/jetbrains.svg" },
          ],
        },
        {
          title: "Project Management",
          skills: [
            { name: "GitHub", icon: "/icons/github.svg" },
            { name: "Jira", icon: "/icons/jira.svg" },
          ],
        },
      ],
    },
  };

  return (
    <section className="skills">
      <h2>Skills</h2>
      <div className="skill-groups">
        {Object.keys(skillGroups).map((group) => (
          <button
            key={group}
            className={`group-button ${activeGroup === group ? "active" : ""}`}
            onClick={() => setActiveGroup(activeGroup === group ? null : group)}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="skills-container">
        {activeGroup &&
          skillGroups[activeGroup].sections.map((section) => (
            <div key={section.title} className="skill-section">
              <h3>{section.title}</h3>
              <div className="skill-grid">
                {section.skills.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <img src={skill.icon} alt={skill.name} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
