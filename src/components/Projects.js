import React, { useEffect } from 'react';
import '../styles/Projects.css';

const projectCategories = {
  "AI & Machine Learning": [
    {
      title: "CodeMind",
      intro: "Agentic AI codebase intelligence system featuring autonomous crews for deep analysis and evolution.",
      highlights: [
        "Architected a multi-agent system (CrewAI) where specialized agents audit and refactor code, routed by a fine-tuned Qwen2.5 (QLoRA) intent classifier",
        "Optimized Hybrid RAG pipeline fusing ChromaDB and BM25 via Reciprocal Rank Fusion (RRF) to achieve low retrieval latency",
        "Developed iterative self-correction loops that autonomously execute tests, interpret failure logs, and refine code in 3-cycle agentic loops",
        "Designed Anti-Hallucination guardrails using Chain-of-Verification (CoVe) prompts and code-inventory checklists for evidence-based reporting"
      ],
      tools: [
        "Python", "FastAPI", "React", "TypeScript", "CrewAI", "LangChain", "Ollama", "ChromaDB", "MLflow"
      ],
      link: "https://github.com/sankalp-rajeev/CodeMind",
    },
    {
      title: "MeetingMind AI",
      intro: "End-to-end meeting intelligence system deployed on Google Cloud Run.",
      highlights: [
        "5-phase ML pipeline: Pyannote diarization → Whisper ASR → YOLO face detection → ArcFace matching → Gemini summarization",
        "RAG Q&A system with LangChain, ChromaDB, and Vertex AI embeddings for conversational queries",
        "Real-time React frontend with FastAPI backend featuring 23 REST endpoints",
        "VLM visual intelligence with SSIM scene detection and EasyOCR for slide/chart extraction"
      ],
      tools: [
        "Python", "FastAPI", "React", "Docker", "GCP Cloud Run", "Whisper", "Pyannote",
        "YOLOv8", "InsightFace", "Gemini 2.0", "LangChain", "ChromaDB", "Vertex AI"
      ],
      link: "https://github.com/sankalp-rajeev/meetingsmindAI",
    },
    {
      title: "Multimodal Document Q&A",
      intro: "Systematic ablation study on document understanding with LayoutLMv3.",
      highlights: [
        "Demonstrated 92% relative F1 improvement from 2D layout embeddings over text-only BERT",
        "Multi-task learning with shared encoder for joint span extraction and BIO entity tagging (68.88% F1)",
        "Discovered vision features add <1% gain for grayscale forms—layout coordinates capture spatial semantics",
        "Identified and corrected 18% data contamination in standard FUNSD benchmark"
      ],
      tools: [
        "Python", "PyTorch", "LayoutLMv3", "BERT", "Transformers", "FUNSD", "Multi-Task Learning", "Streamlit"
      ],
      link: "https://github.com/sankalp-rajeev/multimodal-doc-qa",
      paperLink: "/reports/Sankalp_Rajeev_CIS583_Project-report.docx",
    },
    {
      title: "Repository Health Predictor",
      intro: "ML-powered risk assessment for open-source repositories.",
      highlights: [
        "Dual XGBoost models: regression for risk score, classification for risk category with label encoding",
        "Analyzes 52-week commit trends, contributor activity slopes, and repository metrics",
        "Live GitHub API integration with rate-limit handling and offline dataset predictions",
        "Interactive Plotly diagnostics: predicted vs actual, residuals, feature importance charts"
      ],
      tools: [
        "Python", "XGBoost", "scikit-learn", "Gradio", "GitHub API", "Plotly", "Pandas", "NumPy"
      ],
      link: "https://github.com/sankalp-rajeev/repo_health_predictor",
      demoLink: "https://repo-health-predictor.onrender.com/",
    },
  ],
  "Computer Vision": [
    {
      title: "AI-Powered Adaptive Cruise Control",
      intro: "Full ACC system in CARLA simulator using reinforcement learning.",
      highlights: [
        "PPO-based RL agent with CNN-encoded semantic perception for lane adherence",
        "YOLOv8 object detection + Ultra-Fast Lane Detection (UFLD) for real-time perception",
        "Custom reward shaping and safe agent evaluation metrics",
        "Integrated steering, throttle, and brake control in simulated traffic"
      ],
      tools: [
        "Python", "CARLA Simulator", "YOLOv8", "UFLD", "TensorFlow/Keras", "Stable-Baselines3 (PPO)"
      ],
      link: "https://github.com/sankalp-rajeev/Carla-Autonomous-Vehicle",
      paperLink: "/reports/ECE-544-Visual-Slam-Final.pdf",
      additionalPaperLink: "/reports/Final_Project_ECE532.pdf"
    },
    {
      title: "Stereo Visual SLAM in CARLA",
      intro: "Real-time 3D trajectory mapping with stereo vision.",
      highlights: [
        "Stereo depth estimation using SGBM (Semi-Global Block Matching)",
        "Visual odometry with PnP + RANSAC for robust pose estimation",
        "Loop closure detection and 9D Kalman Filter pose fusion",
        "Real-time 3D map and trajectory visualization with Open3D"
      ],
      tools: [
        "Python", "CARLA Simulator", "OpenCV", "Open3D", "Matplotlib", "Kalman Filters"
      ],
      link: "https://github.com/sankalp-rajeev/Stereo-Visual-SLAM",
      paperLink: "/reports/ECE-544-Visual-Slam-Final.pdf",
    },
    {
      title: "Image Caption Generation",
      intro: "CNN-LSTM architecture for generating image descriptions.",
      highlights: [
        "InceptionV3 for visual feature extraction, LSTM for sequence generation",
        "Beam Search optimization for higher-quality captions",
        "GloVe embeddings for semantic word representations",
        "Flask web interface for real-time caption prediction"
      ],
      tools: [
        "Python", "TensorFlow/Keras", "Flask", "GloVe", "InceptionV3", "LSTM"
      ],
      link: "https://github.com/srajeev234/ece5831-2024-final-project",
      paperLink: "/Final Report.pdf",
    },
    {
      title: "Camera Calibration & 3D Reconstruction",
      intro: "3D scene reconstruction from stereo image pairs.",
      highlights: [
        "Intrinsic/extrinsic camera calibration using checkerboard patterns",
        "Epipolar geometry and fundamental matrix estimation",
        "Dense 3D point cloud generation from disparity maps"
      ],
      tools: [
        "Python", "OpenCV", "NumPy", "Matplotlib", "Scipy"
      ],
      link: "https://github.com/sankalp-rajeev/Camera-Calibration-and-3D-Reconstruction",
    },
    {
      title: "Panorama Auto-Stitching",
      intro: "Automatic panoramic image creation from overlapping photos.",
      highlights: [
        "SIFT/ORB keypoint detection and feature matching",
        "RANSAC-based homography estimation for robust alignment",
        "Multi-band blending for seamless transitions"
      ],
      tools: [
        "Python", "OpenCV", "NumPy", "RANSAC", "Image Blending"
      ],
      link: "https://github.com/sankalp-rajeev/Panorama-Auto-Stitching",
    },
    {
      title: "Scene Analyzer",
      intro: "AI-powered photography improvement suggestions.",
      highlights: [
        "MobileNetV2 for scene classification and content recognition",
        "GPT-3.5 integration for personalized photography tips",
        "Flask web app with real-time image upload and analysis"
      ],
      tools: [
        "Python", "Flask", "TensorFlow", "MobileNetV2", "OpenAI API"
      ],
      link: "https://github.com/sankalp-rajeev/scene-analyzer",
    },
    {
      title: "Image Blending",
      intro: "Advanced multi-band blending for seamless image compositing.",
      highlights: [
        "Gaussian and Laplacian pyramid construction for frequency decomposition",
        "Multi-resolution blending with weighted masks",
        "Seamless object insertion and gradient-domain composition"
      ],
      tools: [
        "Python", "OpenCV", "NumPy", "Gaussian Pyramids", "Laplacian Pyramids"
      ],
      link: "https://github.com/sankalp-rajeev/Image-Blending",
    },
    {
      title: "Hand-Written Digit Classification",
      intro: "Neural network from scratch for digit recognition.",
      highlights: [
        "Implemented forward/backprop with manual gradient computation",
        "Enhanced with PyTorch for improved training efficiency",
        "Achieved 78% accuracy on NIST36 dataset"
      ],
      tools: ["Python", "PyTorch", "NumPy", "NIST36 Dataset"],
      link: "https://github.com/sankalp-rajeev/hand-written-digit-classification",
    },
  ],
  "App Development": [
    {
      title: "Unit Genie",
      intro: "Mobile unit conversion app with admin dashboard.",
      highlights: [
        "Conversions for Length, Weight, Temperature, and Volume with step-by-step transparency",
        "User registration/login with SQLite-backed session management",
        "Conversion history tracking and admin dashboard for usage analytics",
        "Material Design UI with RecyclerView for smooth scrolling"
      ],
      tools: [
        "Android Studio", "Java", "Kotlin", "SQLite", "Material Design", "RecyclerView"
      ],
      link: "https://github.com/sankalp-rajeev/ConversionsApp",
      paperLink: "/reports/Final Report UnitGenie.pdf",
    },
    {
      title: "Social Media Photo Share App",
      intro: "Full-stack social platform for multimedia sharing.",
      highlights: [
        "User profiles, posts, likes, and comments functionality",
        "React frontend with Node.js/Express backend",
        "MySQL database for persistent data storage"
      ],
      tools: ["JavaScript", "React", "Node.js", "MySQL"],
      link: "https://github.com/sankalp-rajeev/social-media-2023",
    },
  ],
  "Data Visualization": [
    {
      title: "NASA Exoplanet Visualization",
      intro: "Interactive exploration of NASA exoplanet data.",
      highlights: [
        "Dynamic filtering by planet characteristics (mass, radius, distance)",
        "D3.js-powered scatter plots and comparative visualizations",
        "Responsive design with hover tooltips and zoom functionality"
      ],
      tools: ["JavaScript", "D3.js", "HTML", "CSS"],
      link: "https://github.com/sankalp-rajeev/Nasa-Data-Viz",
    },
    {
      title: "Car Performance Dashboard",
      intro: "Multi-dimensional automotive data exploration.",
      highlights: [
        "Interactive charts for MPG, horsepower, weight correlations",
        "Filter by manufacturer, year, and vehicle type",
        "Parallel coordinates plot for multi-attribute comparison"
      ],
      tools: ["JavaScript", "D3.js", "HTML", "CSS"],
      link: "https://github.com/sankalp-rajeev/Car-Data-Viz",
    },
  ],
};

const Projects = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(
      ".projects-title, .category-title, .project-card"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      {Object.entries(projectCategories).map(([category, projects], index) => (
        <div key={index} className="project-category">
          <h2 className="project-category-title">{category}</h2>
          <div className="projects-grid">
            {projects.map((project, projectIndex) => (
              <div key={projectIndex} className="project-card">
                <div className="project-content">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-intro">{project.intro}</p>
                  <ul className="project-highlights">
                    {project.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="project-tools">
                    {project.tools.map((tool, toolIndex) => (
                      <span key={toolIndex} className="tool-tag">
                        {tool}
                      </span>
                    ))}
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
                    {project.additionalPaperLink && (
                      <a
                        href={project.additionalPaperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-literature"
                      >
                        Literature Survey
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-demo"
                      >
                        Live Demo
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
