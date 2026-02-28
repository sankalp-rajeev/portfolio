import React from "react";
import "../styles/JourneyTimeline.css";

const journeyData = [
    {
        year: "2020",
        education: {
            title: "Started B.SC in Computer Science",
            institution: "Arizona State University",
            logo: "/assets/experience/asu.png",
            dates: "Aug 2020 - May 2024"
        },
        experience: null
    },
    {
        year: "2022",
        education: null,
        experience: {
            title: "SDE Intern",
            company: "Machani Robotics",
            logo: "/assets/experience/machani-robotics.png",
            dates: "Jun - Aug 2022"
        }
    },
    {
        year: "2023",
        education: null,
        experience: {
            title: "Software Developer",
            company: "Astroseed",
            logo: "/assets/experience/astroseed.png",
            dates: "Aug 2023 - May 2024"
        }
    },
    {
        year: "2024",
        education: {
            title: "Completed B.SC, Started M.SC/M.SE",
            institution: "University of Michigan - Dearborn",
            logo: "/assets/experience/umdearborn.png",
            dates: "Sep 2024 - Dec 2026"
        },
        experience: {
            title: "AI/ML Engineer Intern",
            company: "Mistral Solutions",
            logo: "/assets/experience/mistral1.png",
            dates: "Jun - Aug 2024"
        }
    },
    {
        year: "2025",
        education: null,
        experience: {
            title: "AI Engineering Intern",
            company: "Zoetis",
            logo: "/assets/experience/zoetis.png",
            dates: "May - Nov 2025"
        }
    },
    {
        year: "2026",
        education: {
            title: "Graduate with Dual Master's",
            institution: "University of Michigan - Dearborn",
            logo: "/assets/experience/umdearborn.png",
            dates: "December 2026"
        },
        experience: null
    }
];

const JourneyTimeline = () => {
    return (
        <div id="journey" className="journey-timeline">
            <h3 className="journey-title">My Journey</h3>
            <div className="journey-container">
                {/* Labels */}
                <div className="journey-labels">
                    <span className="label-education">
                        <i className="fas fa-graduation-cap"></i> Education
                    </span>
                    <span className="label-experience">
                        <i className="fas fa-briefcase"></i> Experience
                    </span>
                </div>

                {/* Timeline */}
                <div className="timeline-wrapper">
                    {journeyData.map((item, index) => (
                        <div key={index} className="timeline-row">
                            {/* Education Side */}
                            <div className={`timeline-item education ${item.education ? 'active' : 'empty'}`}>
                                {item.education && (
                                    <div className="timeline-content">
                                        <img src={item.education.logo} alt={item.education.institution} className="timeline-logo" />
                                        <h4>{item.education.title}</h4>
                                        <p>{item.education.institution}</p>
                                        <span className="hover-dates">{item.education.dates}</span>
                                    </div>
                                )}
                            </div>

                            {/* Year Marker */}
                            <div className="timeline-year">
                                <div className="year-dot"></div>
                                <span>{item.year}</span>
                            </div>

                            {/* Experience Side */}
                            <div className={`timeline-item experience ${item.experience ? 'active' : 'empty'}`}>
                                {item.experience && (
                                    <div className="timeline-content">
                                        <img src={item.experience.logo} alt={item.experience.company} className="timeline-logo" />
                                        <h4>{item.experience.title}</h4>
                                        <p>{item.experience.company}</p>
                                        <span className="hover-dates">{item.experience.dates}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vertical Line */}
                <div className="timeline-line"></div>
            </div>
        </div>
    );
};

export default JourneyTimeline;
