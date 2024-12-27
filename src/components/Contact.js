import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact Me</h2>
      <p>I'd love to hear from you! Feel free to reach out through any of the platforms below.</p>
      <ul className="contact-links">
        <li><a href="https://www.linkedin.com/in/sankalp-rajeev/">LinkedIn</a></li>
        <li><a href="https://github.com/sankalp-rajeev">GitHub</a></li>
        <li><a href="mailto:srajeev@umich.edu">Email Me</a></li>
      </ul>
    </section>
  );
};

export default Contact;
