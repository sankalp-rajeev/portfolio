const projects = {
  "AI & Machine Learning": [
    {
      title: "Kairos — Demand Intelligence Platform",
      intro: "Large-scale recommendation and demand intelligence platform processing 411M+ e-commerce events through batch and streaming ML pipelines.",
      highlights: [
        "Processed 411M+ behavioral events with PySpark, Kafka, and Airflow.",
        "Built SASRec → Two-Tower → XGBoost recommendation pipelines, reaching NDCG@10 ≈ 0.90 and ranking AUC 0.9883.",
        "Built demand forecasting with 9.44% WMAPE.",
        "Validated the platform with 83 automated Pytest tests and GitHub Actions CI."
      ],
      tools: [
        "PySpark", "Kafka", "Airflow", "TimescaleDB", "Redis", "PyTorch", "XGBoost", "FastAPI", "Docker", "Prometheus", "Grafana", "GitHub Actions"
      ],
      image: "/assets/projects/kairos.png",
      link: "https://github.com/sankalp-rajeev/Kairos",
    },
    {
      title: "Nexus — LLMOps Observability & Self-Healing Platform",
      intro: "LLMOps reliability platform that detects agent failures, diagnoses root causes, proposes structured repairs, and re-evaluates fixes in a closed feedback loop.",
      highlights: [
        "Streams execution traces through Kafka across an 11-service architecture.",
        "Detects hallucination, context bleed, plan drift, tool misfires, and repetitive-loop failures.",
        "Uses LangGraph for root-cause diagnosis and prompt/configuration repair.",
        "Re-evaluates repaired runs with DeepEval and MLflow in under 90 seconds."
      ],
      tools: [
        "LangGraph", "Kafka", "FastAPI", "MLflow", "DeepEval", "Docker"
      ],
      link: "https://github.com/sankalp-rajeev/Nexus",
    },
    {
      title: "CodeMind",
      intro: "Code intelligence platform combining hybrid retrieval, multi-agent analysis, and QLoRA-based automated test generation.",
      highlights: [
        "Built hybrid vector + BM25 retrieval with Reciprocal Rank Fusion across 42K+ code chunks, reaching 15.4 ms median retrieval latency.",
        "Orchestrated specialized agents for code exploration, security, testing, performance, and documentation.",
        "Fine-tuned Gemma 3 12B with QLoRA/Unsloth for automated test generation, reaching 34.7 CodeBLEU (+73.5% relative vs. baseline).",
        "Achieved a 3.3× inference speedup over the baseline setup."
      ],
      tools: [
        "Python", "FastAPI", "React", "TypeScript", "CrewAI", "LangChain", "Ollama", "ChromaDB", "MLflow"
      ],
      image: "/assets/projects/codemind.png",
      link: "https://github.com/sankalp-rajeev/CodeMind",
    },
    {
      title: "Smriti — Offline Maternal-Health Visit Copilot",
      intro: "Offline maternal-health visit copilot using an on-device LLM and local retrieval to generate reviewed, cited visit records without cloud connectivity.",
      highlights: [
        "Runs fully offline in the field using Gemma and LiteRT-LM.",
        "Generates structured visit notes with local RAG and persistent Room/SQLite storage.",
        "Requires human review of generated notes, with citation validation before saving.",
        "15–22 s CPU latency per structured note."
      ],
      tools: [
        "Kotlin", "Jetpack Compose", "Room/SQLite", "Gemma 4", "LiteRT-LM", "Android", "RAG"
      ],
      image: "/assets/projects/smriti.png",
      link: "https://github.com/sankalp-rajeev/Smriti",
      videoLink: "https://www.youtube.com/watch?v=s5zeFpfrVQo",
    },
    {
      title: "Multimodal Document Q&A",
      intro: "Ablation study of text, layout, and visual signals for document understanding using BERT and LayoutLMv3.",
      highlights: [
        "Improved question-answering F1 from 25.62 with text-only BERT to 49.34 with layout-aware modeling.",
        "Adding visual features improved question-answering F1 only marginally to 49.77.",
        "Multi-task modeling reached 68.88 entity-recognition micro-F1 and 43.85 question-answering F1.",
        "Identified and corrected an 18% benchmark contamination issue during evaluation."
      ],
      tools: [
        "Python", "PyTorch", "LayoutLMv3", "BERT", "Transformers", "FUNSD", "Multi-Task Learning", "Streamlit"
      ],
      image: "/assets/projects/docqa.png",
      link: "https://github.com/sankalp-rajeev/multimodal-doc-qa",
      paperLink: "/reports/Sankalp_Rajeev_CIS583_Project-report.docx",
    },
    {
      title: "MeetingMind AI",
      intro: "Multimodal meeting-intelligence system combining speech, speaker, face, OCR, and LLM pipelines behind a FastAPI backend deployed on Google Cloud Run.",
      highlights: [
        "Built a five-stage multimodal ML pipeline using Whisper, Pyannote, YOLOv11m-face, InsightFace, OCR, and Gemini.",
        "Exposed the system through 23 REST endpoints with FastAPI.",
        "Reduced VLM API cost by 85%."
      ],
      tools: [
        "Python", "FastAPI", "React", "Docker", "GCP Cloud Run", "Whisper", "Pyannote",
        "YOLOv11m-face", "InsightFace", "Gemini 2.0", "LangChain", "ChromaDB", "Vertex AI"
      ],
      link: "https://github.com/sankalp-rajeev/meetingsmindAI",
    },
    {
      title: "Repository Health Predictor",
      intro: "ML-based risk assessment tool for open-source repositories using repository activity, contributor behavior, and commit trends.",
      highlights: [
        "Dual XGBoost models: regression for risk score, classification for risk category with label encoding",
        "Analyzes 52-week commit trends, contributor activity slopes, and repository metrics",
        "Live GitHub API integration with rate-limit handling and offline dataset predictions",
        "Interactive Plotly diagnostics: predicted vs actual, residuals, feature importance charts"
      ],
      tools: [
        "Python", "XGBoost", "scikit-learn", "Gradio", "GitHub API", "Plotly", "Pandas", "NumPy"
      ],
      image: "/assets/projects/repohealth.png",
      link: "https://github.com/sankalp-rajeev/repo_health_predictor",
    },
  ],
  "Computer Vision": [
    {
      title: "ApertureAI — Industrial Surface Defect Inspection",
      intro: "Industrial visual-inspection platform combining defect classification, explainability, inference optimization, and process-drift monitoring.",
      highlights: [
        "Achieved 99.54% top-1 test accuracy across six defect classes.",
        "Reduced median CPU inference latency from 33.21 ms to 12.05 ms with ONNX Runtime/OpenVINO, a 2.76× speedup measured across 1,000 runs.",
        "Evaluated robustness across 27 DOE configurations and identified degradation beyond blur sigma = 3 px.",
        "Implemented SPC monitoring using four Western Electric rules, achieving 100% drift detection with 0% false alarms/escapes in the tested scenarios."
      ],
      tools: [
        "Python", "PyTorch", "EfficientNet", "OpenCV", "Grad-CAM", "ONNX Runtime", "OpenVINO", "FastAPI", "SPC", "DOE"
      ],
      image: "/assets/projects/apertureai.png",
      link: "https://github.com/sankalp-rajeev/ApertureAI",
    },
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
      image: "/assets/projects/acc.jpg",
      link: "https://github.com/sankalp-rajeev/Carla-Autonomous-Vehicle",
      paperLink: "/reports/AI-Powered Adaptive Cruise Control.pdf",
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
      image: "/assets/projects/slam.png",
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
      paperLink: "/reports/FinalReport.pdf",
    },
  ],
  "Embedded Systems": [
    {
      title: "CardioSync — Two-Agent Cardiac Monitor",
      intro: "Real-time cardiac monitoring firmware on a custom cooperative RTOS, where two sensing agents must reach consensus before an alert fires.",
      highlights: [
        "Custom SIGALRM-driven preemptive-tick RTOS in C using POSIX ucontext, with message queues, mutexes, counting semaphores, and priority inheritance.",
        "Agent 1 runs the smartwatch path (PPG sensor model → HR estimation → anomaly detection with Welford baselines and adaptive brady/tachy/variance thresholds); Agent 2 handles ECG patch rhythm classification.",
        "Decision engine state machine gates alerts behind cross-agent consensus with a 2800ms ECG response timeout.",
        "Random Forest rhythm classifier trained offline on MIT-BIH and exported to a header-only ml_model.h for embedded inference, wrapped in rule guards as a hybrid classifier.",
        "Integration monitor tracking latency, deadline misses, and consensus behavior, plus BIST, JSON session logging, and a live web dashboard bridge."
      ],
      tools: [
        "C", "POSIX ucontext", "pthreads", "CMake", "Python", "scikit-learn", "MIT-BIH"
      ],
      image: "/assets/projects/cardiosync.png",
      link: "https://github.com/sankalp-rajeev/CardioSync",
    },
    {
      title: "RT-MDAQ — Multi-Rate Data Acquisition Simulator",
      intro: "Foreground/background real-time simulator in C11 with rate-monotonic scheduling and explicit priority-inversion instrumentation.",
      highlights: [
        "Three periodic foreground tasks at 1ms, 10ms, and 100ms plus a background task, activated by timerfd under rate-monotonic priority assignment.",
        "Mutex-protected shared buffer that logs priority inversion whenever a task blocks on a buffer already held.",
        "Deadline, jitter, and activation records exported to CSV, with per-second foreground CPU utilization charted through gnuplot.",
        "Optional live ncurses dashboard reporting period, activations, CPU %, deadline misses, jitter violations, and mutex contention."
      ],
      tools: [
        "C11", "POSIX threads", "timerfd", "Make", "ncurses", "gnuplot"
      ],
      link: "https://github.com/sankalp-rajeev/RT-MDAQ",
    },
    {
      title: "TrafficController — Mini Real-Time Kernel",
      intro: "C++17 mini real-time kernel driving a simulated smart traffic intersection, built so scheduling and timing behavior stay measurable.",
      highlights: [
        "Discrete-tick kernel with periodic task release, deadline checking, preemptive-priority and round-robin policies, and context-switch accounting via a dispatcher.",
        "Synchronization layer providing a mutex with optional priority inheritance, mailboxes, and event flags.",
        "Phase controller supporting adaptive and degraded all-red safe mode operation under tick-armed fault injection.",
        "Metrics collector recording traces, deadline misses, CPU load, and faults to CSV, with an optional Dear ImGui + SFML dashboard for live demos."
      ],
      tools: [
        "C++17", "CMake", "Dear ImGui", "SFML", "Unit Testing"
      ],
      link: "https://github.com/sankalp-rajeev/TrafficController",
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
      image: "/assets/projects/unitgenie.webp",
      link: "https://github.com/sankalp-rajeev/ConversionsApp",
      paperLink: "/reports/UnitGenie.pdf",
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

export default projects;
