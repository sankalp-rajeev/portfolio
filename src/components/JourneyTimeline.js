import React from "react";
import SectionHead from "./SectionHead";
import useReveal from "../hooks/useReveal";
import journey from "../data/journey";
import "../styles/JourneyTimeline.css";

const JourneyEntry = ({ logo, alt, title, subtitle, dates }) => (
    <div className="journey-entry">
        <img className="journey-logo" src={logo} alt={alt} loading="lazy" />
        <div className="journey-entry-body">
            <h4 className="journey-entry-title">{title}</h4>
            <p className="journey-entry-sub mono">{subtitle}</p>
            <p className="journey-entry-dates label">{dates}</p>
        </div>
    </div>
);

const JourneyTimeline = () => {
    useReveal();

    const span = `${journey[0].year} — ${journey[journey.length - 1].year}`;

    return (
        <section id="journey" className="journey">
            <div className="shell">
                <SectionHead index="03" title="Journey" note={span} />

                <div className="journey-legend">
                    <span className="label">Education</span>
                    <span className="label">Experience</span>
                </div>

                <div className="journey-grid">
                    {journey.map((row) => (
                        <div key={row.year} className="journey-row" data-reveal>
                            <div className="journey-cell journey-cell-education">
                                {row.education && (
                                    <JourneyEntry
                                        logo={row.education.logo}
                                        alt={row.education.institution}
                                        title={row.education.title}
                                        subtitle={row.education.institution}
                                        dates={row.education.dates}
                                    />
                                )}
                            </div>

                            <div className="journey-year">
                                <span className="journey-dot" aria-hidden="true" />
                                <span className="journey-year-label">{row.year}</span>
                            </div>

                            <div className="journey-cell journey-cell-experience">
                                {row.experience && (
                                    <JourneyEntry
                                        logo={row.experience.logo}
                                        alt={row.experience.company}
                                        title={row.experience.title}
                                        subtitle={row.experience.company}
                                        dates={row.experience.dates}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;
