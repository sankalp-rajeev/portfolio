import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sampleQuestions = [
    "What is Sankalp's educational background?",
    "Tell me about Sankalp's projects.",
    "What are Sankalp's skills in AI/ML?",
    "Does Sankalp have any certifications?",
    "Can you guide me to the experience section?",
  ];

  const predefinedResponses = {
    gallery:
      "To view Sankalp's gallery, use the navbar and click on 'Gallery'. This section showcases stunning visuals and highlights from Sankalp's personal and professional projects, including his wildlife photography collection.",
    projects:
      "To view Sankalp's projects, use the navbar and click on 'Projects'. This section showcases key projects like Image Caption Generation, Unit Conversion App, and 3D Reconstruction Techniques.",
    certifications:
      "To find certifications, go to the navbar and click on 'Certificates'.",
    experience:
      "To explore the Experience section, navigate to the navbar at the top of the page and click on 'Experience'.",
    hobbies:
      "Sankalp's hobbies include:\n1. **Wildlife Photography**: He enjoys capturing the beauty of nature and wildlife through his lens.\n2. **Hiking and Adventure**: He loves exploring new trails and embracing adventurous experiences.\n3. **Gaming**: A passionate gamer who enjoys immersive and strategic games in his free time.",
  };

  const handleSendMessage = async (message) => {
    const userMessage = { role: "user", content: message || input };
    if (!userMessage.content.trim()) return;

    setMessages((prev) => [...prev, userMessage]);
    if (!message) setInput("");

    // Custom logic for predefined responses
    const query = userMessage.content.toLowerCase();
    if (query.includes("gallery")) {
      const botMessage = { role: "assistant", content: predefinedResponses.gallery };
      setMessages((prev) => [...prev, botMessage]);
      return;
    } else if (query.includes("projects")) {
      const botMessage = { role: "assistant", content: predefinedResponses.projects };
      setMessages((prev) => [...prev, botMessage]);
      return;
    } else if (query.includes("certifications")) {
      const botMessage = { role: "assistant", content: predefinedResponses.certifications };
      setMessages((prev) => [...prev, botMessage]);
      return;
    } else if (query.includes("experience")) {
      const botMessage = { role: "assistant", content: predefinedResponses.experience };
      setMessages((prev) => [...prev, botMessage]);
      return;
    } else if (query.includes("hobbies") || query.includes("interests")) {
      const botMessage = { role: "assistant", content: predefinedResponses.hobbies };
      setMessages((prev) => [...prev, botMessage]);
      return;
    }

    // Fallback to API for other queries
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `
  You are an intelligent assistant designed to enhance the user experience on Sankalp's personal portfolio website.

  Your purpose is to answer questions related to Sankalp's background, skills, projects, certifications, hobbies, and other relevant topics showcased on the website. Be conversational, concise, and engaging while providing informative responses.

  ### About Sankalp:
  - Sankalp is a Machine Learning Engineer and Software Developer passionate about Artificial Intelligence and Robotics.
  - He graduated magna cum laude with a Bachelor’s degree in Computer Science from Arizona State University in 2023.
  - Sankalp is currently pursuing a dual Master’s degree in Artificial Intelligence (focused on Computer Vision) and Robotics Engineering at the University of Michigan.

  ### Experience:
  - Sankalp has hands-on experience developing AI models, computer vision systems, and robotic control software.

  ### Key Projects:
  1. **Image Caption Generation**: Developed using CNN-LSTM for generating natural language descriptions of images.
  2. **Unit Conversion App**: Created a mobile app for accurate unit conversions with transparent calculations.
  3. **3D Reconstruction Techniques**: Implemented advanced algorithms for reconstructing 3D scenes from image pairs.
  4. **Panorama Auto-Stitching**: Designed a system for creating seamless panoramic images.
  5. **Handwritten Digit Classification**: Built a neural network for digit classification with PyTorch.

  ### Personal Hobbies:
  - **Wildlife Photography**: Sankalp enjoys capturing the beauty of nature and wildlife through his lens.
  - **Hiking and Adventure**: He loves exploring new trails and embracing adventurous experiences.
  - **Gaming**: A passionate gamer who enjoys immersive and strategic games in his free time.

  ### Certifications:
  - Advanced Computer Vision
  - Tableau Certification

  ### Skills:
  - **Programming Languages**: Python, TensorFlow, PyTorch, ROS, and OpenCV.
  - **Specializations**: Computer Vision, AI model deployment, and Robotics.
`,
            },
            ...messages,
            userMessage,
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSampleQuestionClick = (question) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Chatbot</h3>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === "user" ? "user" : "assistant"}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about Sankalp..."
        />
        <button onClick={() => handleSendMessage()}>Send</button>
      </div>
      <div className="chatbot-sample-questions">
        <p>Try asking:</p>
        {sampleQuestions.map((question, index) => (
          <button
            key={index}
            className="sample-question-button"
            onClick={() => handleSampleQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
