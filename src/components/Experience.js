import React, { useEffect } from "react";
import "../styles/Experience.css";

const experienceDetails = [
    {
        title: "AI Micro Tools Developer Intern",
        company: "Zoetis",
        location: "Kalamazoo, MI",
        duration: "05/2025 – 11/2025",
        contributions: [
            "Architected modular Python/Streamlit microservices with Factory and Pipeline design patterns, implementing multi-stage ETL pipelines for automated document processing in a regulated GxP environment.",
            "Integrated enterprise LLM APIs with async batch processing, token-aware batching, semaphore-controlled concurrency, and exponential backoff for rate-limit resilience.",
            "Engineered bidirectional matching algorithms using token-based similarity with configurable thresholds and greedy assignment optimization for change request pairing.",
            "Built real-time analytics dashboards with Plotly visualization and openpyxl-powered Excel exports, logging productivity metrics to MySQL with session-based state management.",
            "Accelerated documentation workflows and automated SDLC compliance, saving an estimated ~1,000 engineer-hours annually while ensuring audit-ready traceability across enterprise systems.",
        ],
        technologies: ["Python", "Streamlit", "MySQL", "LLM APIs", "Plotly", "AKS", "Posit Connect"],
        image: "/assets/experience/zoetis.png",
    },
    {
        title: "AI/ML Engineer Intern",
        company: "Mistral Solutions Pvt Ltd",
        location: "Bangalore, KA",
        duration: "06/2024 – 08/2024",
        contributions: [
            "Engineered and deployed transfer-learned AI models (VGG16, YOLOv8, and ByteTrack) on the Mistral Eagle Kit using Qualcomm SNPE SDK, achieving 96% real-time object detection and tracking accuracy.",
            "Integrated DS1820 temperature sensors and Lightware LW20/C Lidar via Arduino to enable real-time telemetry and basic obstacle avoidance functionalities.",
            "Configured and optimized the Cube Orange Plus flight controller for seamless hardware-software integration, utilizing I2C protocols and Mission Planner for autonomous operations.",
            "Implemented obstacle detection and response mechanisms using Lightware LW20/C Lidar, enhancing operational safety during autonomous missions.",
        ],
        technologies: ["Python", "TensorFlow", "YOLOv8", "Arduino", "Lua", "Qualcomm SNPE SDK"],
        image: "/assets/experience/mistral1.png",
        report: "reports/Internship Report.pdf",
    },
    {
        title: "Software Developer",
        company: "Astroseed",
        location: "Tempe, AZ",
        duration: "08/2023 – 05/2024",
        contributions: [
            "Designed and implemented advanced robotic control software using ROS, enabling autonomous plant care tasks such as pruning and harvesting within the Terra Pod environment.",
            "Integrated a 3D depth camera with OpenNI Kinect for enhanced spatial perception, utilizing Canny Edge Detection and YOLO for real-time object detection and classification.",
            "Developed a custom script for accurate distance and size calculations, leveraging depth camera parameters to improve robotic arm precision during interactions.",
            "Optimized autonomous navigation through 2D SLAM, achieving reliable path planning and obstacle avoidance for seamless operations within confined spaces.",
        ],
        technologies: ["YOLOv5", "SLAM", "Python", "ROS", "Gazebo"],
        image: "/assets/experience/astroseed.png",
        report: "reports/Final Report_astroseed.pdf",
    },
    {
        title: "Teaching Assistant",
        company: "Arizona State University",
        location: "Tempe, AZ",
        duration: "08/2022 – 05/2024",
        contributions: [
            "Mentored 100+ freshmen, boosting academic performance with customized guidance programs.",
        ],
        technologies: ["Mentoring", "Academic Guidance"],
        image: "/assets/experience/asu.png",
    },
    {
        title: "Software Development Engineering Intern",
        company: "Machani Robotics",
        location: "Bangalore, KA",
        duration: "06/2022 – 08/2022",
        contributions: [
            "Developed motion control systems for a 6-DOF robotic arm using ROS and MoveIt, enabling autonomous pick-and-place operations with inverse kinematics for precise object handling.",
            "Integrated an Intel RealSense D435i camera for object detection, extracting feature points and implementing real-time object tracking for robotic arm coordination.",
            "Achieved image-to-coordinate conversion for robotic arm drawing tasks by utilizing OpenCV and Canny Edge Detection, enabling trajectory generation for complex patterns.",
            "Configured CAN communication protocols to control RMD motors, ensuring synchronized movement across multiple actuators and enhancing operational reliability.",
        ],
        technologies: ["Python", "ROS", "C++", "CAN Communication", "3D Depth Cameras"],
        image: "/assets/experience/machani-robotics.png",
        report: "reports/PROJECT REPORT_machanirobotics.pdf",
    },
];

const Experience = () => {
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

        const cards = document.querySelectorAll(".experience-card, .experience-title");
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className="experience-section">
            <h2 className="experience-title">Experience</h2>
            <div className="experience-container">
                {experienceDetails.map((exp, index) => (
                    <div key={index} className="experience-card">
                        {/* Left: Company Logo */}
                        <div className="experience-logo">
                            <img src={exp.image} alt={exp.company} />
                        </div>

                        {/* Right: Content */}
                        <div className="experience-content">
                            <div className="experience-header">
                                <div className="experience-info">
                                    <h3 className="experience-role">{exp.title}</h3>
                                    <h4 className="experience-company">{exp.company}</h4>
                                </div>
                                <div className="experience-meta">
                                    <span className="experience-duration">
                                        <i className="fas fa-calendar-alt"></i> {exp.duration}
                                    </span>
                                    <span className="experience-location">
                                        <i className="fas fa-map-marker-alt"></i> {exp.location}
                                    </span>
                                </div>
                            </div>

                            <ul className="experience-contributions">
                                {exp.contributions.map((contribution, i) => (
                                    <li key={i}>{contribution}</li>
                                ))}
                            </ul>

                            <div className="experience-footer">
                                <div className="experience-technologies">
                                    {exp.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                {exp.report && (
                                    <a
                                        href={exp.report}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="report-link"
                                    >
                                        <i className="fas fa-file-pdf"></i> View Report
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
