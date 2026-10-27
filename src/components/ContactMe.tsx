import { useState } from "react";
import emailjs from "emailjs-com";
import SectionHead from "./SectionHead";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceID = "service_fy9l4aj";
      const templateID = "template_qva1g1b";
      const userID = "BLHHn1yRmVNrHvv7K";

      await emailjs.send(serviceID, templateID, formData, userID);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact theme-accent" id="contact" aria-labelledby="contact-title">
      <SectionHead number="03" title="Contact" id="contact-title" />

      <div className="section-body">
        <p className="contact-line">
          Have a project in mind or want to collaborate?
        </p>
        <a className="contact-email" href="mailto:annakovalenko0050@gmail.com">
          annakovalenko0050@gmail.com
        </a>

        <dl className="spec contact-spec">
          <div className="spec-row">
            <dt>Location</dt>
            <dd>Mallow, Ireland</dd>
          </div>
          <div className="spec-row">
            <dt>Languages</dt>
            <dd>English, Ukrainian</dd>
          </div>
          <div className="spec-row">
            <dt>Elsewhere</dt>
            <dd className="contact-links">
              <a className="text-link" href="https://github.com/Yunnna005" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="text-link" href="https://www.linkedin.com/in/anna-kovalenko-cs/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </dd>
          </div>
        </dl>

        <button
          type="button"
          className="text-link contact-toggle"
          aria-expanded={isFormOpen}
          aria-controls="contact-form"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Hide the form" : "Or write a message here"}
        </button>

        <form
          id="contact-form"
          className="contact-form"
          onSubmit={handleSubmit}
          hidden={!isFormOpen}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group form-group--wide">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group form-group--wide">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
            ></textarea>
          </div>

          <div className="form-footer">
            <button
              type="submit"
              className="button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>

            {submitStatus === "success" && (
              <p className="status-message" role="status">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {submitStatus === "error" && (
              <p className="status-message status-message--error" role="alert">
                There was an error sending your message. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
