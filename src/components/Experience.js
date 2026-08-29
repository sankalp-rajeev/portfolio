import React from "react";
import PageHead from "./PageHead";
import useReveal from "../hooks/useReveal";
import experience from "../data/experience";
import "../styles/Experience.css";

const Experience = () => {
    useReveal();

    return (
        <div className="page shell experience">
            <PageHead
                path="~/experience"
                title="Experience"
                note="Applied computer vision, ML engineering, and robotics roles across automotive, pharmaceutical, and research settings."
            />

            <div className="experience-list">
                {experience.map((role, index) => (
                    <article key={`${role.company}-${role.title}`} className="record" data-reveal>
                        <div className="record-rail">
                            <div className="experience-logo">
                                <img src={role.image} alt={`${role.company} logo`} loading="lazy" />
                            </div>
                            <div className="experience-dates">
                                <span className="experience-index">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="label">{role.duration}</span>
                            </div>
                            <span className="mono">{role.location}</span>
                        </div>

                        <div className="record-body">
                            <h2 className="experience-role">{role.title}</h2>
                            <p className="experience-company">
                                {role.company}
                                {role.team && <span className="experience-team"> — {role.team}</span>}
                            </p>

                            <ul className="bullets experience-bullets">
                                {role.contributions.map((contribution) => (
                                    <li key={contribution}>{contribution}</li>
                                ))}
                            </ul>

                            <div className="experience-foot">
                                <ul className="tags">
                                    {role.technologies.map((tech) => (
                                        <li key={tech} className="tag">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                                {role.report && (
                                    <a
                                        className="link"
                                        href={role.report}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View report
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Experience;
