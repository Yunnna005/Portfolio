import { useState, useEffect } from "react";
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
  date: string; // Add date property
  markdownContent?: string;
}

// Helper function to parse markdown files
async function fetchProjectsFromMarkdown(): Promise<Project[]> {
  try {
    const markdownModules = import.meta.glob('/src/projects/*.md', { as: 'raw' });
    const projects: Project[] = [];
    
    for (const path in markdownModules) {
      const markdown = await markdownModules[path]();
      const project = parseMarkdownToProject(markdown);
      project.markdownContent = markdown;
      projects.push(project);
    }
    
    return projects;
  } catch (error) {
    console.error("Error fetching project files:", error);
    return [];
  }
}

// Parse markdown content to a Project object
function parseMarkdownToProject(markdown: string): Project {
  const project: Partial<Project> = {};
  
  const titleMatch = markdown.match(/^# (.+)$/m);
  if (titleMatch) {
    project.name = titleMatch[1].trim();
  }
  
  const descriptionMatch = markdown.match(/## Description\s*\n([^\n#]+)/);
  if (descriptionMatch) {
    project.description = descriptionMatch[1].trim();
  }
  
  const tagsMatch = markdown.match(/## Tags\s*\n([^\n#]+)/);
  if (tagsMatch) {
    project.tags = tagsMatch[1].split(',').map(tag => tag.trim());
  }
  
  const categoryMatch = markdown.match(/## Category\s*\n([^\n#]+)/);
  if (categoryMatch) {
    project.category = categoryMatch[1].trim();
  }
  
  const linkMatch = markdown.match(/## Link\s*\n([^\n#]+)/);
  if (linkMatch) {
    project.link = linkMatch[1].trim();
  }
  
  const imagesSection = markdown.match(/## Images\s*\n((?:[^\n#]+\n)+)/);
  if (imagesSection) {
    const imageLines = imagesSection[1].trim().split('\n');
    project.images = imageLines.filter(line => line.trim() !== '');
  } else {
    project.images = [];
  }
  
  const detailedInfoMatch = markdown.match(/## Detailed Info\s*\n([\s\S]+)(?:$|(?=\n## ))/);
  if (detailedInfoMatch) {
    project.detailedInfo = detailedInfoMatch[1].trim();
  }
  
  const dateMatch = markdown.match(/## Date\s*\n([^\n#]+)/);
  if (dateMatch) {
    project.date = dateMatch[1].trim();
  } else {
    project.date = "1970-01-01"; // Default date if not specified
  }
  
  return project as Project;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Software Development");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const projectData = await fetchProjectsFromMarkdown();
      setProjects(projectData);
      setLoading(false);
    };
    
    loadProjects();
  }, []);

  const filteredProjects = projects
    .filter((project) => project.category === selectedCategory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort projects by date

  const openProjectDetails = (project: Project) => {
    setActiveProject(project);
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

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
        <ProjectModal 
          project={activeProject} 
          onClose={closeProjectDetails} 
        />
      )}
    </section>
  );
}