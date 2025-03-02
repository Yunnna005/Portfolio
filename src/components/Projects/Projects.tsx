import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import FilterButtons from "./FilterButtons";
import TimelineDots from "./TimelineDots";
import "./Projects.css";

export interface Project {
  name: string;
  description: string;
  tags: string[];
  category: string;
  link: string;
  images: string[];
  detailedInfo: string;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Software Development"
  );
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false); // To control visibility of extra projects

  const projects: Project[] = [
    {
      name: "Portfolio Website",
      description: "A personal portfolio built with React and TypeScript.",
      tags: ["React", "TypeScript", "CSS"],
      category: "Software Development",
      link: "https://portfolio-example.com",
      images: [
        "/api/placeholder/500/300",
        "/api/placeholder/500/300",
        "/api/placeholder/500/300",
      ],
      detailedInfo:
        "This portfolio website was built using React and TypeScript. It features a responsive design, dark/light mode toggle, and smooth animations. The site is optimized for performance and accessibility, with a 95+ Lighthouse score across all categories. The project structure utilizes component-based architecture with reusable UI elements.",
    },
    {
      name: "Weather App",
      description:
        "A cute weather app with API integration and animated icons.",
      tags: ["JavaScript", "API", "Animation"],
      category: "Software Development",
      link: "https://weather-app-example.com",
      images: ["/api/placeholder/500/300", "/api/placeholder/500/300"],
      detailedInfo:
        "This weather application connects to the OpenWeatherMap API to provide real-time weather data. Features include animated weather icons that change based on conditions, a 5-day forecast, location search, and temperature unit conversion. The app was built with vanilla JavaScript and uses CSS animations for the weather illustrations.",
    },
    {
      name: "Weather App",
      description:
        "A cute weather app with API integration and animated icons.",
      tags: ["JavaScript", "API", "Animation"],
      category: "Software Development",
      link: "https://weather-app-example.com",
      images: ["/api/placeholder/500/300", "/api/placeholder/500/300"],
      detailedInfo:
        "This weather application connects to the OpenWeatherMap API to provide real-time weather data. Features include animated weather icons that change based on conditions, a 5-day forecast, location search, and temperature unit conversion. The app was built with vanilla JavaScript and uses CSS animations for the weather illustrations.",
    },
    {
      name: "Game Prototype",
      description: "A 2D platformer made in Unity.",
      tags: ["Unity", "C#", "Game Dev"],
      category: "Games Development",
      link: "https://game-prototype-example.com",
      images: [
        "/api/placeholder/500/300",
        "/api/placeholder/500/300",
        "/api/placeholder/500/300",
        "/api/placeholder/500/300",
      ],
      detailedInfo:
        "This 2D platformer prototype was developed in Unity using C#. It features pixel art graphics, custom character controller with smooth movement physics, collectible items, and environmental hazards. The game includes three playable levels with unique mechanics and a simple save system. Audio effects and background music were created using FMOD integration.",
    },
  ];

  const filteredProjects = projects.filter(
    (project) => project.category === selectedCategory
  );

  const openProjectDetails = (project: Project) => {
    setActiveProject(project);
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
  };

  return (
    <section className="projects-section" id="projects">
      <h2>My Projects</h2>

      <FilterButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="timeline-container">
        <TimelineDots count={showAll ? filteredProjects.length : 2} />

        <div className="projects-list">
          {/* First two projects shown normally */}
          {filteredProjects.slice(0, 2).map((project, index) => (
            <div key={index} className="project-wrapper">
              <ProjectCard
                project={project}
                openProjectDetails={openProjectDetails}
              />
            </div>
          ))}

          {/* Show third project with half visibility and blur when there are more than 2 projects */}
          {filteredProjects.length > 2 && !showAll && (
            <div className="third-project-container">
              <div className="project-wrapper blurred">
                <ProjectCard
                  project={filteredProjects[2]}
                  openProjectDetails={openProjectDetails}
                />
              </div>
              <div className="third-project-overlay">
                <button
                  className="see-more-btn"
                  onClick={() => setShowAll(true)}
                >
                  See More Projects
                </button>
              </div>
            </div>
          )}

          {/* Show all additional projects when showAll is true */}
          {showAll &&
            filteredProjects.slice(2).map((project, index) => (
              <div key={index + 2} className="project-wrapper">
                <ProjectCard
                  project={project}
                  openProjectDetails={openProjectDetails}
                />
              </div>
            ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={closeProjectDetails} />
      )}
    </section>
  );
}
