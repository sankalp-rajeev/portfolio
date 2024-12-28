import React, { useEffect } from "react";
import "../styles/Timeline.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Timeline = () => {
  const story = [
    {
      year: "2020",
      title: "The First Step",
      description: `I started my Bachelor's in Computer Science at Arizona State University, armed with curiosity but little knowledge. Every class felt like a mountain to climb.`,
      icon: "🎓",
    },
    {
      year: "2021",
      title: "A Year of Struggles",
      description: `I encountered significant academic challenges that tested my resolve. Through relentless effort and determination, I overcame these hurdles by focusing on core computer science courses to build a strong foundation. This journey not only deepened my technical understanding but also instilled in me the importance of perseverance and resilience in the face of adversity.`,
      icon: "⚠️",
    },
    {
      year: "2022",
      title: "Building Foundations",
      description: `2022 marked the start of my journey as a Software Development Engineer (SDE) intern. The experience was both fun and enriching, as I tackled challenges, learned new skills, and grew professionally. During this time, I also delved into applied data analytics, strengthening my analytical and problem-solving foundation.`,
      icon: "📊",
    },
    {
      year: "2023",
      title: "Diving Into AI",
      description: `My passion for machine learning grew stronger as I earned an Advanced Computer Vision certification. It was a steep learning curve, but the satisfaction was unmatched.`,
      icon: "📜",
    },
    {
      year: "2024",
      title: "A Year of Milestones",
      description: `2024 was a pivotal year in my journey, marked by key achievements and significant transitions.`,
      icon: "🌟",
      subsections: [
        {
          title: "Graduated from ASU",
          description: `After years of dedication and hard work, I proudly graduated magna cum laude from Arizona State University with a degree in Computer Science.`,
          icon: "🎓",
        },
        {
          title: "Internship as AI/ML Engineer",
          description: `During my internship, I worked on cutting-edge machine learning models, applying AI to solve real-world problems.`,
          icon: "🖥️",
        },
        {
          title: "Started Dual Master's",
          description: `Embarking on a dual Master's program in AI and Robotics Engineering marked the beginning of an exciting new chapter.`,
          icon: "🚀",
        },
      ],
    },
  ];

  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">My Journey</h2>
      <div className="story-timeline">
        {story.map((milestone, index) => (
          <div
            key={index}
            className={`story-event ${milestone.year === currentYear ? "highlight" : ""
              }`}
            data-aos="fade-up"
            data-aos-delay={`${index * 200}`}
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
