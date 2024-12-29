import React, { useEffect } from "react";
import "../styles/Timeline.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Timeline = () => {
  const story = [
    {
      year: "2020",
      title: "The First Step",
      description: `I began my Bachelor's in Computer Science at Arizona State University, taking my first steps into the world of programming and problem-solving.`,
      icon: "🎓",
    },
    {
      year: "2021",
      title: "A Year of Struggles",
      description: `I faced academic challenges that tested my resilience, but my focus on core courses helped me build a strong foundation.`,
      icon: "⚠️",
    },
    {
      year: "2022",
      title: "Building Foundations",
      description: `As an SDE intern, I tackled real-world problems, strengthened my skills, and explored data analytics to enhance problem-solving.`,
      icon: "📊",
    },
    {
      year: "2023",
      title: "Diving Into AI",
      description: `I deepened my passion for AI by earning an Advanced Computer Vision certification, tackling steep learning curves along the way.`,
      icon: "📜",
    },
    {
      year: "2024",
      title: "A Year of Milestones",
      description: `2024 was a transformative year with key achievements and exciting transitions.`,
      icon: "🌟",
      subsections: [
        {
          title: "Graduated from ASU",
          description: `Graduated magna cum laude from Arizona State University with a Computer Science degree.`,
          icon: "🎓",
        },
        {
          title: "Internship as AI/ML Engineer",
          description: `Worked on cutting-edge machine learning models, applying AI to solve real-world problems.`,
          icon: "🖥️",
        },
        {
          title: "Started Dual Master's",
          description: `Embarked on a dual Master's in AI and Robotics Engineering, opening a new chapter in my academic journey.`,
          icon: "🚀",
        },
      ],
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with the 'once' option for single animation
  }, []);

  return (
    <div id="timeline" className="timeline-container">
      <h2 className="timeline-title">My Journey</h2>
      <div className="story-timeline">
        {story.map((milestone, index) => (
          <div
            key={index}
            className="story-event"
            data-aos="fade-up"
            data-aos-delay={`${index * 200}`} // Apply staggered delays
          >
            <div className="story-icon">{milestone.icon}</div>
            <div className="story-content">
              <h3 className="story-year">{milestone.year}</h3>
              <h4 className="story-title">{milestone.title}</h4>
              <p className="story-description">{milestone.description}</p>

              {milestone.subsections && (
                <div className="story-subsections">
                  {milestone.subsections.map((subsection, subIndex) => (
                    <div
                      key={subIndex}
                      className="story-subsection"
                      data-aos="fade-left"
                      data-aos-delay={`${subIndex * 200}`}
                    >
                      <div className="subsection-icon">{subsection.icon}</div>
                      <div className="subsection-content">
                        <h4 className="subsection-title">{subsection.title}</h4>
                        <p className="subsection-description">
                          {subsection.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
