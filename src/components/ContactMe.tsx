import { useState } from "react";
import SectionHead from "./SectionHead";

const EMAIL = "annakovalenko0050@gmail.com";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMailOpened, setIsMailOpened] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Opens the visitor's own mail app with the subject and message filled in.
  // encodeURIComponent keeps spaces and line breaks as %20 and %0A, which mail apps expect.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = `${formData.message}\n\n${formData.name}`;
    const href =
      `mailto:${EMAIL}` +
      `?subject=${encodeURIComponent(formData.subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setIsMailOpened(true);
  };

  return (
    <section className="section contact theme-accent" id="contact" aria-labelledby="contact-title">
      <SectionHead number="03" title="Contact" id="contact-title" />

      <div className="section-body">
        <p className="contact-line">
          Have a project in mind or want to collaborate?
        </p>
        <a className="contact-email" href={`mailto:${EMAIL}`}>
          {EMAIL}
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
            <button type="submit" className="button-primary">
              Open in my email app
            </button>

            {isMailOpened && (
              <p className="status-message" role="status">
                Your email app should open with the message ready to send. If
                nothing happened, write to {EMAIL} directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
