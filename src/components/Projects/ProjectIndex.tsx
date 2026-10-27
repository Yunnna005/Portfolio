import { Project } from "./Projects";

interface ProjectIndexProps {
  id: string;
  hidden: boolean;
  projects: Project[];
  openProjectDetails: (project: Project) => void;
}

export default function ProjectIndex({
  id,
  hidden,
  projects,
  openProjectDetails,
}: ProjectIndexProps) {
  return (
    <div id={id} className="project-index" hidden={hidden}>
      <table>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Project</th>
            <th scope="col" className="project-index-wide">Category</th>
            <th scope="col" className="project-index-wide">Stack</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.name}>
              <td className="project-index-year">
                <time dateTime={project.date}>{project.date.slice(0, 4)}</time>
              </td>
              <td>
                <button
                  type="button"
                  className="project-index-name"
                  aria-haspopup="dialog"
                  onClick={() => openProjectDetails(project)}
                >
                  {project.name}
                </button>
              </td>
              <td className="project-index-wide project-index-meta">{project.category}</td>
              <td className="project-index-wide project-index-meta">{project.tags.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
