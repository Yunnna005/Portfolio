import { useState } from "react";
import { Project } from "./Projects";
import TagList from "./TagList";
import { hasRealLink } from "./projectLinks";

interface ProjectCardProps {
  project: Project;
  position: number;
  openProjectDetails: (project: Project) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

// "Bloom (Final Year Project)" -> title "Bloom", note "Final Year Project"
const splitName = (name: string) => {
  const match = name.match(/^(.+?)\s*\((.+)\)$/);
  return match ? { title: match[1], note: match[2] } : { title: name, note: null };
};

export default function ProjectCard({
  project,
  position,
  openProjectDetails,
}: ProjectCardProps) {
  const [frame, setFrame] = useState(0);
  // The frame takes the first screenshot's shape; the others letterbox inside it
  const [ratio, setRatio] = useState<number | null>(null);
  const frames = project.images;
  const { title, note } = splitName(project.name);

  return (
    <li className="project">
      {/* A terminal screen that steps through the project's screenshots */}
      <div className="project-screen theme-navy">
        <p className="project-screen-bar label">
          <span className="project-screen-title">
            <span>{pad(position)}</span>
            {note && <span>{note}</span>}
          </span>
          <span>
            {pad(frame + 1)} / {pad(frames.length)}
          </span>
        </p>

        <figure className="project-figure" style={ratio ? { aspectRatio: ratio } : undefined}>
          {frames.map((src, i) => (
            <img
              key={src}
              src={src}
              onLoad={
                i === 0
                  ? (e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)
                  : undefined
              }
              alt={i === frame ? `${project.name} screenshot ${i + 1} of ${frames.length}` : ""}
              aria-hidden={i !== frame}
              data-active={i === frame}
              loading="lazy"
            />
          ))}
        </figure>

        {frames.length > 1 && (
          <div className="project-frames" role="group" aria-label={`${project.name} screenshots`}>
            {frames.map((src, i) => (
              <button
                key={src}
                type="button"
                className="project-frame"
                aria-label={`Screenshot ${i + 1}`}
                aria-pressed={i === frame}
                onClick={() => setFrame(i)}
                onPointerEnter={() => setFrame(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="project-text">
        <h3 className="project-name">
          {title}
          {note && <span className="visually-hidden"> ({note})</span>}
        </h3>
        <p className="project-description">{project.description}</p>

        <dl className="spec">
          <div className="spec-row">
            <dt>Year</dt>
            <dd>
              <time dateTime={project.date}>{project.date.slice(0, 4)}</time>
            </dd>
          </div>
          <div className="spec-row">
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div className="spec-row">
            <dt>Stack</dt>
            <dd>
              <TagList tags={project.tags} />
            </dd>
          </div>
        </dl>

        <div className="project-actions">
          <button
            type="button"
            className="text-link"
            aria-haspopup="dialog"
            onClick={() => openProjectDetails(project)}
          >
            Read more
          </button>
          {hasRealLink(project.link) && (
            <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">
              View project
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
