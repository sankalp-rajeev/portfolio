import React from "react";
import "../styles/Skills.css";

const skillsData = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "C++", level: "Intermediate" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "Java", level: "Intermediate" },
      { name: "Lua", level: "Intermediate" },
      { name: "MATLAB", level: "Intermediate" },
    ],
  },
  {
    category: "AI/ML Frameworks",
    skills: [
      { name: "TensorFlow", level: "Advanced" },
      { name: "PyTorch", level: "Advanced" },
      { name: "Scikit-learn", level: "Advanced" },
      { name: "OpenCV", level: "Advanced" },
      { name: "NumPy", level: "Advanced" },
      { name: "Pandas", level: "Advanced" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "ROS", level: "Advanced" },
      { name: "Qualcomm SNPE SDK", level: "Intermediate" },
      { name: "Mission Planner", level: "Intermediate" },
    ],
  },
  {
    category: "Specialized Skills",
    skills: [
      { name: "Computer Vision", level: "Expert" },
      { name: "AI Model Deployment", level: "Advanced" },
      { name: "Embedded Systems", level: "Advanced" },
      { name: "Robotics", level: "Advanced" },
      { name: "3D Reconstruction", level: "Advanced" },
      { name: "SLAM (Simultaneous Localization and Mapping)", level: "Intermediate" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h1 className="skills-title">Skills</h1>
      <div className="skills-container">
        {skillsData.map((category, index) => (
          <div key={index} className="skill-category">
            <h2 className="category-title">{category.category}</h2>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  <span className={`skill-level skill-${skill.level.toLowerCase()}`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
