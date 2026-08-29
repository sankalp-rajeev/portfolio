import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHead from "./SectionHead";
import useReveal from "../hooks/useReveal";
import "../styles/Footer.css";

const contactDetails = [
  { label: "Email", value: "rajeevsankalp@gmail.com", href: "mailto:rajeevsankalp@gmail.com" },
  { label: "Phone", value: "+1 (480) 208-2139", href: "tel:+14802082139" },
  { label: "Location", value: "Dearborn, Michigan" },
];

const Footer = () => {
  const form = useRef();
  const [status, setStatus] = useState("idle");
  useReveal();

  const sendEmail = (e) => {
    e.preventDefault();
    const formEl = e.target;
    setStatus("sending");

    emailjs
      .sendForm(
        "service_mf7kx1g",
        "template_tdo27e9",
        form.current,
        "wIV7shGRkzZTPSkGq"
      )
      .then(
        () => {
          setStatus("sent");
          formEl.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("error");
        }
      );
  };

  const statusMessage = {
    sending: "Sending…",
    sent: "Message sent. Thanks for reaching out.",
    error: "Something went wrong. Please email me directly.",
  }[status];

  return (
    <footer id="footer" className="contact">
      <div className="shell">
        <SectionHead index="05" title="Contact" note="Open to conversations" />

        <div className="contact-grid">
          <div className="contact-side" data-reveal>
            <p className="prose contact-lead">
              Feel free to reach out! I&rsquo;d love to hear from you.
            </p>

            <dl className="contact-details">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="contact-detail">
                  <dt className="label">{detail.label}</dt>
                  <dd>
                    {detail.href ? (
                      <a className="link" href={detail.href}>
                        {detail.value}
                      </a>
                    ) : (
                      <span className="mono">{detail.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form" data-reveal>
            <div className="contact-row">
              <label className="field">
                <span className="label">Name</span>
                <input type="text" name="from_name" required />
              </label>
              <label className="field">
                <span className="label">Email</span>
                <input type="email" name="from_email" required />
              </label>
            </div>

            <label className="field">
              <span className="label">Subject</span>
              <input type="text" name="subject" required />
            </label>

            <label className="field">
              <span className="label">Message</span>
              <textarea name="message" rows="6" required />
            </label>

            <div className="contact-submit">
              <button type="submit" className="action action-solid" disabled={status === "sending"}>
                Send message
              </button>
              {statusMessage && (
                <p className="contact-status mono" role="status">
                  {statusMessage}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="contact-foot">
          <span className="mono">© {new Date().getFullYear()} Sankalp Rajeev</span>
          <span className="mono">Dearborn, Michigan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
