import React, { useEffect } from "react";
import "../styles/Experience.css";

const experienceDetails = [
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
        image: "experience/mistral1.jpg",
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
        image: "experience/astroseed.png",
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
        image: "experience/asu.png",
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
        image: "experience/image.png",
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
            { threshold: 0.2 }
        );

        const cards = document.querySelectorAll(".experience-card, .experience-title");
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className="experience-section">
            <h2 className="experience-title">Experience</h2>
            <div className="experience-timeline">
                {experienceDetails.map((exp, index) => (
                    <div
                        key={index}
                        className="experience-card"
                        style={{ "--card-order": index }}
                    >
                        <div className="experience-content">
                            <h3 className="experience-role">{exp.title}</h3>
                            <h4 className="experience-company">{exp.company}</h4>
                            <p className="experience-duration">
                                {exp.duration} <br />
                                <span className="experience-location">{exp.location}</span>
                            </p>
                            <ul className="experience-contributions">
                                {exp.contributions.map((contribution, i) => (
                                    <li key={i}>{contribution}</li>
                                ))}
                            </ul>
                            <p className="experience-technologies">
                                <strong>Technologies:</strong> {exp.technologies.join(", ")}
                            </p>
                            {exp.report && (
                                <a
                                    href={exp.report}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="experience-report-link"
                                >
                                    View Report
                                </a>
                            )}
                        </div>

                        {exp.image && (
                            <div className="experience-image">
                                <img src={exp.image} alt={`${exp.company} logo`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
