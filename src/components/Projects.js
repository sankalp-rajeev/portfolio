import React from 'react';
import '../styles/Projects.css';

const projectCategories = {
  "Computer Vision": [
    {
      title: "Image Caption Generation Using CNN-LSTM with Beam Search Optimization",
      description:
        "Developed a system to generate human-like textual descriptions of images using InceptionV3 for feature extraction, LSTM for sequence generation, and Beam Search for optimal captions. The project bridges computer vision and natural language processing.",
      tools: [
        "Python",
        "TensorFlow/Keras",
        "Flask",
        "GloVe",
        "InceptionV3",
        "LSTM",
      ],
      link: "https://github.com/srajeev234/ece5831-2024-final-project",
      paperLink: "/Final Report.pdf",
    },
    {
      title: "Camera Calibration and 3D Reconstruction",
      description:
        "Explored 3D reconstruction and camera calibration techniques, implementing algorithms for reconstructing 3D scenes from image pairs.",
      tools: [
        "Python",
        "OpenCV",
        "NumPy",
        "Matplotlib",
        "Scipy",
        "Checkerboard Patterns",
      ],
      link: "https://github.com/sankalp-rajeev/Camera-Calibration-and-3D-Reconstruction",
    },
    {
      title: "Panorama Auto-Stitching",
      description:
        "Implemented an automatic panorama stitching algorithm to create seamless panoramic images by detecting and matching keypoints, estimating transformations, and blending overlapping regions.",
      tools: [
        "Python",
        "OpenCV",
        "NumPy",
        "RANSAC",
        "Image Blending Algorithms",
      ],
      link: "https://github.com/sankalp-rajeev/Panorama-Auto-Stitching",
    },
    {
      title: "Scene Analyzer",
      description:
        "A Flask-based web application that uses MobileNetV2 and OpenAI's GPT-3.5 to analyze images and provide photography improvement suggestions. The app integrates image recognition and AI-generated tips to assist users in enhancing their photography skills.",
      tools: [
        "Python",
        "Flask",
        "TensorFlow",
        "MobileNetV2",
        "OpenAI API",
      ],
      link: "https://github.com/sankalp-rajeev/scene-analyzer",
    },
    {
      title: "Image Blending",
      description:
        "Designed and implemented advanced image blending techniques to merge multiple images seamlessly. The project focused on using multi-band blending and other image processing algorithms for smooth transitions.",
      tools: [
        "Python",
        "OpenCV",
        "NumPy",
        "Gaussian Pyramids",
        "Laplacian Pyramids",
        "Image Reconstruction Algorithms",
        "Image Blending Techniques",
      ],
      link: "https://github.com/sankalp-rajeev/Image-Blending",
    },
    {
      title: "Hand-Written Digit Classification",
      description:
        "Implemented a neural network from scratch for hand-written digit classification and later enhanced it using PyTorch. The project covered network initialization, gradient computation, and training on the NIST36 dataset. Achieved a classification accuracy of 78%.",
      tools: ["Python", "PyTorch", "NumPy", "NIST36 Dataset"],
      link: "https://github.com/sankalp-rajeev/hand-written-digit-classification",
    },
  ],
  "App Development": [
    {
      title: "Unit Genie - A Mobile Unit Conversion App",
      description:
        "Unit Genie is a versatile and user-friendly app designed for unit conversions across Length, Weight, Temperature, and Volume. It offers transparent conversion steps, conversion history, and an admin dashboard for monitoring user activity. Features include user registration/login, mathematical transparency for conversions, and a detailed admin system for account management.",
      tools: [
        "Android Studio",
        "Java",
        "Kotlin",
        "SQLite",
        "AndroidX",
        "Material Design",
        "RecyclerView",
        "SharedPreferences",
      ],
      link: "https://github.com/sankalp-rajeev/ConversionsApp",
      paperLink: "/reports/Final Report UnitGenie.pdf",
    },
    {
      title: "Social Media Photo Share App",
      description:
        "Created a comprehensive social media platform for users to interact, share, and engage with multimedia content.",
      tools: ["Javascript", "React", "Node.js", "mySQL"],
      link: "https://github.com/sankalp-rajeev/social-media-2023",
    },
  ],
  "Data Visualization": [
    {
      title: "NASA Data Visualization",
      description:
        "Designed an interactive visualization of NASA exoplanet data, allowing dynamic filtering and characteristic representation.",
      tools: ["Javascript", "HTML", "CSS", "d3.js"],
      link: "https://github.com/sankalp-rajeev/Nasa-Data-Viz",
    },
    {
      title: "Car Data Visualization",
      description:
        "Developed an interactive dashboard for visualizing automotive datasets, providing multi-dimensional exploration of car performance data.",
      tools: ["Javascript", "HTML", "CSS", "d3.js"],
      link: "https://github.com/sankalp-rajeev/Car-Data-Viz",
    },
  ],
};

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      {Object.entries(projectCategories).map(([category, projects], index) => (
        <div key={index} className="project-category">
          <h2 className="category-title">{category}</h2>
          <div className="projects-grid">
            {projects.map((project, projectIndex) => (
              <div key={projectIndex} className="project-card">
                <div className="project-content">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tools">
                    <h3>Tools & Technologies:</h3>
                    <ul>
                      {project.tools.map((tool, toolIndex) => (
                        <li key={toolIndex} className="tool-item">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-links">
                    {project.paperLink && (
                      <a
                        href={project.paperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-paper"
                      >
                        View Report
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
