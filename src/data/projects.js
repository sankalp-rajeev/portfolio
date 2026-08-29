const projects = {
  "AI & Machine Learning": [
    {
      title: "Kairos — Demand Intelligence Platform",
      intro: "End-to-end production ML platform processing 411M+ e-commerce interactions for real-time recommendations and forecasting.",
      highlights: [
        "Ingested 411M+ events via PySpark ETL orchestrated by Apache Airflow DAGs and Kafka Structured Streaming (5-min tumbling windows) to TimescaleDB with AQE and skew-join optimization.",
        "Built three-stage inference: SASRec Transformer candidate retrieval (NDCG@10 ≈ 0.90) → Two-Tower re-scoring → XGBoost ranking (AUC 0.9883).",
        "XGBoost demand forecaster with lag/rolling features achieving 9.44% WMAPE.",
        "FastAPI serving layer with Redis and PgBouncer for sub-10ms end-to-end latency.",
        "17-service Docker Compose stack with GitHub Actions CI/CD (83 Pytest tests, Ruff zero-warning policy)."
      ],
      tools: [
        "PySpark", "Kafka", "Airflow", "TimescaleDB", "Redis", "PyTorch", "XGBoost", "FastAPI", "Docker", "Prometheus", "Grafana", "GitHub Actions"
      ],
      image: "/assets/projects/kairos.png",
      link: "https://github.com/sankalp-rajeev/Kairos",
    },
    {
      title: "Nexus — LLMOps Observability & Self-Healing Platform",
      intro: "11-service agent reliability platform that detects, diagnoses, and repairs LLM failures in under 90 seconds.",
      highlights: [
        "Streams agent traces through Kafka and classifies hallucination, context-bleed, and plan-drift failure modes.",
        "Performs LangGraph-based root-cause diagnosis and automated prompt/config repair.",
        "Re-evaluates every proposed fix with DeepEval and MLflow, closing the detect-repair-verify loop in under 90s."
      ],
      tools: [
        "LangGraph", "Kafka", "FastAPI", "MLflow", "DeepEval", "Docker"
      ],
      link: "https://github.com/sankalp-rajeev/Nexus",
    },
    {
      title: "CodeMind",
      intro: "Agentic AI codebase intelligence system featuring autonomous crews for deep analysis and evolution.",
      highlights: [
        "Built a full-stack CrewAI multi-agent system for automated code exploration, security auditing, test generation, and refactoring.",
        "Engineered a Hybrid RAG pipeline (Vector + BM25 + RRF) achieving 15.4ms median retrieval latency across 42k+ chunks.",
        "Fine-tuned Gemma 3 (12B) on the KodCode dataset via QLoRA for autonomous test generation, achieving 73.5% CodeBLEU improvement and 3.3x speedup.",
        "Designed Anti-Hallucination guardrails using Chain-of-Verification (CoVe) prompts, evaluated with DeepEval using Gemini-2.0-Flash as LLM-as-a-Judge for strict, evidence-based reporting."
      ],
      tools: [
        "Python", "FastAPI", "React", "TypeScript", "CrewAI", "LangChain", "Ollama", "ChromaDB", "MLflow"
      ],
      image: "/assets/projects/codemind.png",
      link: "https://github.com/sankalp-rajeev/CodeMind",
    },
    {
      title: "MeetingMind AI",
      intro: "End-to-end meeting intelligence system deployed on Google Cloud Run.",
      highlights: [
        "Reduced VLM API costs by 85% using a multi-signal content pre-filter (SSIM scene change detection, EasyOCR text density gate) to restrict analysis to high-value semantic frames.",
        "5-phase ML pipeline: Pyannote diarization → Whisper ASR → YOLO face detection → ArcFace matching → Gemini summarization",
        "RAG Q&A system with LangChain, ChromaDB, and Vertex AI embeddings for conversational queries",
        "Real-time React frontend with FastAPI backend featuring 23 REST endpoints"
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
      image: "/assets/projects/docqa.png",
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
      image: "/assets/projects/repohealth.png",
      link: "https://github.com/sankalp-rajeev/repo_health_predictor",
    },
  ],
  "Computer Vision": [
    {
      title: "ApertureAI — Industrial Surface Defect Inspection",
      intro: "End-to-end machine vision system for industrial surface inspection, from defect-focused preprocessing through runtime optimization to process drift monitoring.",
      highlights: [
        "EfficientNet-B0 defect classifier reaching 99.54% test top-1 accuracy across 6 classes, with Grad-CAM heatmaps confirming model attention aligns with actual defect regions.",
        "CPU inference path benchmarked over 1000 timed runs per runtime: OpenVINO cut median latency from PyTorch's 33.21ms to 12.05ms, a 2.76x speedup.",
        "OpenCV preprocessing chain (CLAHE, adaptive Gaussian thresholding, morphological closing/opening, contour-guided ROI extraction) to isolate defects under non-uniform lighting.",
        "Physics-inspired optical degradation simulator driving a full-factorial 27-configuration DOE across PSF blur, SNR, and vignetting; OLS analysis identified blur as the dominant factor, with macro F1 dropping below 0.90 past sigma = 3px.",
        "SPC monitoring implementing four Western Electric rules on X-bar/R control charts, achieving 100% drift detection with 0% false alarms and 0% false escapes.",
        "FastAPI backend and tabbed dashboard exposing prediction, SPC behavior, DOE effects, and runtime metrics."
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
      paperLink: "/FinalReport.pdf",
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
      title: "Smriti — Offline Maternal-Health Visit Copilot",
      intro: "Android copilot that turns a community health worker's home-visit observation into a reviewed, cited visit record with no cloud dependency in the field.",
      highlights: [
        "On-device Gemma 4 E2B inference through LiteRT-LM 0.11.0 producing strict structured visit notes, with no cloud API calls in the core runtime after setup.",
        "Local-first data layer in Room/SQLite covering patient roster, visit history, referrals, and follow-ups, with protocol retrieval over country/region-aware bundled JSON assets.",
        "Safety pipeline gating every generation through a strict JSON parser, citation validator, and safety post-processor, requiring CHW review before anything saves — invalid or uncited output surfaces retry messaging instead of falling back to mock clinical text.",
        "Jetpack Compose workflow spanning roster, review screen, follow-up tasks, editable patient leave-behind messages, a Community Panel, and an end-of-day supervisor summary.",
        "Deterministic JVM test suite over retrieval, pipeline behavior, model gates, safety checks, and Room-backed state; CPU benchmarks measured 15–22s per structured note."
      ],
      tools: [
        "Kotlin", "Jetpack Compose", "Room/SQLite", "Gemma 4", "LiteRT-LM", "Android", "RAG"
      ],
      image: "/assets/projects/smriti.png",
      link: "https://github.com/sankalp-rajeev/Smriti",
      videoLink: "https://www.youtube.com/watch?v=s5zeFpfrVQo",
    },
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
