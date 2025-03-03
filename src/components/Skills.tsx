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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skillGroups: SkillGroups = {
    "Software Development": {
      sections: [
        {
          title: "Frontend Development",
          skills: [
            { name: "React", icon: "/icons/react.svg" },
            { name: "TypeScript", icon: "/icons/typescript.svg" },
            { name: "CSS", icon: "/icons/css.svg" },
            { name: "HTML", icon: "/icons/html.svg" },
          ],
        },
        {
          title: "Backend Development",
          skills: [
            { name: "Java", icon: "/icons/java.svg" },
            { name: "Python", icon: "/icons/python.svg" },
            { name: "Csharp", icon: "/icons/CSharp.svg" },
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
          title: "Automation",
          skills: [
            { name: "Zapier", icon: "/icons/zapier.svg" },
            { name: "Make.com", icon: "/icons/make.svg" },
          ],
        },
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
            { name: "Trello", icon: "/icons/trello.svg" },
          ],
        },
      ],
    },
  };

  const handleGroupClick = (group: string) => {
    if (activeGroup === group) {
      setActiveGroup(null);
      setIsModalOpen(false);
    } else {
      setActiveGroup(group);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveGroup(null);
  };

  return (
    <section className="skills-section">
      <h2>Skills</h2>
      <div className="skill-groups">
        {Object.keys(skillGroups).map((group) => (
          <button
            key={group}
            className={`group-button ${activeGroup === group ? "active" : ""}`}
            onClick={() => handleGroupClick(group)}
          >
            {group}
          </button>
        ))}
      </div>

      {isModalOpen && activeGroup && (
        <div className="skills-modal-overlay" onClick={closeModal}>
          <div className="skills-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{activeGroup}</h2>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-content">
              {skillGroups[activeGroup].sections.map((section) => (
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
          </div>
        </div>
      )}
    </section>
  );
}
