import React from "react";
import "../styles/Skills.css";

// Map skills to their devicon class names
const skillIcons = {
  // Languages
  "Python": "devicon-python-plain",
  "C/C++": "devicon-cplusplus-plain",
  "SQL": "devicon-mysql-plain",
  "JavaScript": "devicon-javascript-plain",
  "TypeScript": "devicon-typescript-plain",
  "Java": "devicon-java-plain",
  "Lua": "devicon-lua-plain",
  "MATLAB": "devicon-matlab-plain",

  // Frameworks & Libraries
  "PyTorch": "/logos/pt.png",
  "TensorFlow": "/logos/tf.png",
  "scikit-learn": "/logos/scikit.png",
  "React": "devicon-react-original",
  "FastAPI": "devicon-fastapi-plain",
  "OpenCV": "/logos/opencv.png",

  // Cloud & Tools
  "Docker": "devicon-docker-plain",
  "Git": "devicon-git-plain",
  "GCP (Cloud Run, Vertex AI)": "devicon-googlecloud-plain",
  "Azure (AKS)": "devicon-azure-plain",
  "Kubernetes": "devicon-kubernetes-plain",

  // Specialized / FontAwesome Fallbacks
  "Generative AI": "fas fa-wand-magic-sparkles",
  "NLP": "fas fa-language",
  "Computer Vision": "fas fa-eye",
  "Reinforcement Learning": "fas fa-gamepad",
  "Full-Stack Development": "fas fa-layer-group",
  "MLOps": "fas fa-gears",

  // New Additions
  "CrewAI": "/logos/crew_ai.png",
  "LangChain": "/logos/langchain.png",
  "RAG (Hybrid Search/RRF)": "fas fa-project-diagram",
  "QLoRA": "fas fa-brain",
  "Unsloth": "/logos/unsloth.png",
  "Vertex AI (Gemini)": "devicon-googlecloud-plain",
  "HuggingFace": "/logos/hf.png",
  "Transformers": "/logos/hf.png",

  "ROS": "/logos/ros.png",
  "YOLO": "/logos/yolo.png",
  "SLAM": "fas fa-map-marked-alt",
  "InsightFace": "fas fa-id-badge",
  "EasyOCR": "fas fa-font",

  "Whisper": "/logos/whsiper.png",
  "Pyannote": "fas fa-waveform",

  "Vector DBs (ChromaDB)": "fas fa-database",

  // Data Engineering & Backend for Kairos
  "PySpark": "/logos/pyspark.png",
  "Apache Kafka": "/logos/kafka.png",
  "Apache Airflow": "/logos/airflow.png",
  "TimescaleDB": "/logos/timescaledb.png",
  "Redis": "/logos/redis.png",
  "Polars": "/logos/polars.png",
  "XGBoost": "/logos/xgboost.png",
  "Prometheus": "/logos/prometheus.png",
  "Grafana": "/logos/grafana.png",
  "GitHub Actions": "/logos/github.png",
};

const skillsData = [
  {
    category: "Languages",
    icon: "fas fa-code",
    skills: ["Python", "C/C++", "SQL", "Java", "TypeScript", "JavaScript"],
  },
  {
    category: "Agentic AI & GenAI",
    icon: "fas fa-brain",
    skills: [
      "CrewAI",
      "LangChain",
      "RAG (Hybrid Search/RRF)",
      "Vector DBs (ChromaDB)",
      "QLoRA",
      "Unsloth",
      "Vertex AI (Gemini)",
      "HuggingFace",
    ],
  },
  {
    category: "Machine Learning Engineering",
    icon: "fas fa-cogs",
    skills: [
      "PyTorch",
      "TensorFlow",
      "XGBoost",
      "scikit-learn",
      "Transformers",
      "Whisper",
      "Pyannote",
    ],
  },
  {
    category: "Data Engineering",
    icon: "fas fa-database",
    skills: [
      "PySpark",
      "Apache Kafka",
      "Apache Airflow",
      "TimescaleDB",
      "Redis",
      "Polars",
    ],
  },
  {
    category: "Cloud, DevOps & Backend",
    icon: "fas fa-cloud",
    skills: [
      "Docker",
      "Azure (AKS)",
      "GCP (Cloud Run, Vertex AI)",
      "FastAPI",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
      "Kubernetes",
    ],
  },
  {
    category: "Computer Vision & Robotics",
    icon: "fas fa-robot",
    skills: [
      "ROS",
      "SLAM",
      "YOLO",
      "OpenCV",
      "InsightFace",
      "EasyOCR",
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
              {category.skills.map((skill, skillIndex) => {
                const iconClass = skillIcons[skill];
                const hasIcon = Boolean(iconClass);
                const isImage = hasIcon && (iconClass.startsWith('/') || iconClass.startsWith('http'));

                return (
                  <span key={skillIndex} className={`skill-tag ${!hasIcon ? 'no-icon' : ''}`}>
                    <span className="skill-text">{skill}</span>
                    {hasIcon && (
                      isImage ? (
                        <img
                          src={iconClass}
                          alt={skill}
                          className="skill-icon-img"
                        />
                      ) : (
                        <i className={`skill-icon ${iconClass}`}></i>
                      )
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
