import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Footer.css";

const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mf7kx1g",
        "template_tdo27e9",
        form.current,
        "wIV7shGRkzZTPSkGq"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("An error occurred. Please try again.");
        }
      );

    e.target.reset();
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <h2>Contact Me</h2>
        <p>Feel free to reach out! I'd love to hear from you.</p>

        {/* Contact Information */}
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <span>+1 (480)-208-2139</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>rajeevsankalp@gmail.com</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Dearborn, Michigan</span>
          </div>
        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-row">
            <input type="text" name="from_name" placeholder="Name" required />
            <input type="email" name="from_email" placeholder="Email" required />
          </div>
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea name="message" placeholder="Message" rows="5" required></textarea>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
