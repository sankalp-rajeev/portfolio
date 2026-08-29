import React from 'react';
import PageHead from './PageHead';
import useReveal from '../hooks/useReveal';
import projectCategories from '../data/projects';
import '../styles/Projects.css';

const Projects = () => {
  useReveal();

  const categories = Object.entries(projectCategories);
  const total = categories.reduce((count, [, items]) => count + items.length, 0);

  return (
    <div className="page shell projects">
      <PageHead
        path="~/projects"
        title="Projects"
        note={`${total} projects across production ML platforms, computer vision research, applications, and data visualization.`}
      />

      {categories.map(([category, items], categoryIndex) => (
        <section key={category} className="project-category">
          <header className="section-head" data-reveal>
            <span className="section-index">{String(categoryIndex + 1).padStart(2, '0')}</span>
            <h2 className="section-name">{category}</h2>
            <span className="section-note">{items.length} entries</span>
          </header>

          <div className="project-grid">
            {items.map((project, projectIndex) => (
              <article key={project.title} className="project-card" data-reveal>
                <div className="project-media">
                  {project.image ? (
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                  ) : (
                    <span className="project-plate">{project.title}</span>
                  )}
                  <span className="project-number">
                    {String(projectIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-intro">{project.intro}</p>

                  <ul className="bullets project-bullets">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <ul className="tags project-tools">
                    {project.tools.map((tool) => (
                      <li key={tool} className="tag">
                        {tool}
                      </li>
                    ))}
                  </ul>

                  <div className="actions project-actions">
                    {project.link && (
                      <a
                        className="action"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        className="action"
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live demo
                      </a>
                    )}
                    {project.videoLink && (
                      <a
                        className="action"
                        href={project.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo video
                      </a>
                    )}
                    {project.paperLink && (
                      <a
                        className="action"
                        href={project.paperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Report
                      </a>
                    )}
                    {project.additionalPaperLink && (
                      <a
                        className="action"
                        href={project.additionalPaperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Literature survey
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Projects;
