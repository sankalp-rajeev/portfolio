import React from "react";
import "../styles/Skills.css";

// Map skills to their devicon class names
const skillIcons = {
  "Python": "devicon-python-plain",
  "C/C++": "devicon-cplusplus-plain",
  "SQL": "devicon-mysql-plain",
  "JavaScript": "devicon-javascript-plain",
  "Java": "devicon-java-plain",
  "Lua": "devicon-lua-plain",
  "MATLAB": "devicon-matlab-plain",
  "PyTorch": "devicon-pytorch-original",
  "TensorFlow": "devicon-tensorflow-original",
  "FastAPI": "devicon-fastapi-plain",
  "React": "devicon-react-original",
  "LangChain": "fas fa-link",
  "HuggingFace": "fas fa-face-smile",
  "ROS": "fas fa-robot",
  "OpenCV": "devicon-opencv-plain",
  "scikit-learn": "devicon-scikitlearn-plain",
  "Docker": "devicon-docker-plain",
  "Git": "devicon-git-plain",
  "GCP (Cloud Run, Vertex AI)": "devicon-googlecloud-plain",
  "Azure": "devicon-azure-plain",
  "Generative AI": "fas fa-wand-magic-sparkles",
  "NLP": "fas fa-language",
  "Computer Vision": "fas fa-eye",
  "Reinforcement Learning": "fas fa-gamepad",
  "Full-Stack Development": "fas fa-layer-group",
  "MLOps": "fas fa-gears",
};

const skillsData = [
  {
    category: "Languages",
    icon: "fas fa-code",
    skills: ["Python", "C/C++", "SQL", "JavaScript", "Java", "Lua", "MATLAB"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "fas fa-layer-group",
    skills: [
      "PyTorch",
      "TensorFlow",
      "FastAPI",
      "React",
      "LangChain",
      "HuggingFace",
      "ROS",
      "OpenCV",
      "scikit-learn",
    ],
  },
  {
    category: "Cloud/DevOps",
    icon: "fas fa-cloud",
    skills: ["Docker", "Git", "GCP (Cloud Run, Vertex AI)", "Azure"],
  },
  {
    category: "Domains",
    icon: "fas fa-brain",
    skills: [
      "Generative AI",
      "NLP",
      "Computer Vision",
      "Reinforcement Learning",
      "Full-Stack Development",
      "MLOps",
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
            <h2 className="skill-category-title">
              {category.category}
            </h2>
            <div className="skills-list">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">
                  <span className="skill-text">{skill}</span>
                  <i className={`skill-icon ${skillIcons[skill] || 'fas fa-code'}`}></i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
