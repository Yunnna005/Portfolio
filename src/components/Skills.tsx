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
            { name: "React", icon: "/Portfolio/icons/react.svg" },
            { name: "TypeScript", icon: "/Portfolio/icons/typescript.svg" },
            { name: "CSS", icon: "/Portfolio/icons/css.svg" },
            { name: "HTML", icon: "/Portfolio/icons/html.svg" },
          ],
        },
        {
          title: "Backend Development",
          skills: [
            { name: "Java", icon: "/Portfolio/icons/java.svg" },
            { name: "Python", icon: "/Portfolio/icons/python.svg" },
            { name: "Csharp", icon: "/Portfolio/icons/CSharp.svg" },
            { name: "Dotnet", icon: "/Portfolio/icons/dotnet.svg" },
          ],
        },
        {
          title: "Database Management",
          skills: [
            { name: "Cockroachdb", icon: "/Portfolio/icons/cockroachdb.svg" },
            { name: "Mariadb", icon: "/Portfolio/icons/mariadb.svg" },
            { name: "Mysql", icon: "/Portfolio/icons/mysql.svg" },
          ],
        },
      ],
    },
    "Game Development": {
      sections: [
        {
          title: "Game Engines",
          skills: [{ name: "Unity", icon: "/Portfolio/icons/unity.svg" }],
        },
        {
          title: "3D Modeling",
          skills: [{ name: "Maya", icon: "/Portfolio/icons/maya.svg" }],
        },
      ],
    },
    "Tools & Technologies": {
      sections: [
        {
          title: "Automation",
          skills: [
            { name: "Zapier", icon: "/Portfolio/icons/zapier.svg" },
            { name: "Make.com", icon: "/Portfolio/icons/make.svg" },
          ],
        },
        {
          title: "Cloud & DevOps",
          skills: [
            { name: "Azure", icon: "/Portfolio/icons/azure.svg" },
            { name: "Docker", icon: "/Portfolio/icons/docker.svg" },
          ],
        },
        {
          title: "Development Environment",
          skills: [
            { name: "VSCode", icon: "/Portfolio/icons/visual_studio_code.svg" },
            { name: "VisualStudio", icon: "/Portfolio/icons/visual_studio.svg" },
            { name: "Jetbrains", icon: "/Portfolio/icons/jetbrains.svg" },
          ],
        },
        {
          title: "Project Management",
          skills: [
            { name: "GitHub", icon: "/Portfolio/icons/github.svg" },
            { name: "Jira", icon: "/Portfolio/icons/jira.svg" },
            { name: "Trello", icon: "/Portfolio/icons/trello.svg" },
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
