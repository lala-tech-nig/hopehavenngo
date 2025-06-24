'use client';

import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    // You can handle the form data here (e.g., send to backend)
  };

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-flex">
        <div className={`contact-image${animate ? " drop-in-left" : ""}`}>
          <img
            src="/contact.png"
            alt="Contact Us"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
            }}
          />
        </div>
        <div className={`contact-container${animate ? " drop-in-right" : ""}`}>
          <h2>Contact Us</h2>
          <p className="contact-desc">
            We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-row">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              required
            />
            <button type="submit" className="contact-submit">Send Message</button>
            {submitted && (
              <div className="contact-success">
                Thank you for reaching out! We will get back to you soon.
              </div>
            )}
          </form>
          <div className="contact-info">
            <div>
              <strong>Email:</strong> info@hopehavenngo.org
            </div>
            <div>
              <strong>Phone:</strong> +234 800 123 4567
            </div>
            <div>
              <strong>Address:</strong> 123 Hope Street, Lagos, Nigeria
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .contact-section {
          width: 100vw;
          background: linear-gradient(90deg, #f8fafc 60%, #e3f0ff 100%);
          padding: 3rem 0 4rem 0;
          display: flex;
          justify-content: center;
        }
        .contact-flex {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 2.5rem;
          width: 100%;
          max-width: 900px;
        }
        .contact-image {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          max-width: 370px;
          opacity: 0;
          transform: translateY(-60px);
        }
        .contact-container {
          flex: 1;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          max-width: 370px;
          width: 100%;
          padding: 1.5rem 1.2rem 1.2rem 1.2rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateY(60px);
        }
        .drop-in-left {
          animation: dropInLeft 0.8s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        .drop-in-right {
          animation: dropInRight 0.8s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        @keyframes dropInLeft {
          0% { opacity: 0; transform: translateY(-60px);}
          80% { opacity: 1; transform: translateY(10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes dropInRight {
          0% { opacity: 0; transform: translateY(60px);}
          80% { opacity: 1; transform: translateY(-10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .contact-image img {
          width: 100%;
          max-width: 370px;
          min-width: 180px;
          border-radius: 16px;
          object-fit: cover;
          aspect-ratio: 1/1.1;
        }
        .contact-container h2 {
          font-size: 1.5rem;
          font-weight: 900;
          color: #007bff;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .contact-desc {
          color: #444;
          font-size: 1rem;
          margin-bottom: 1.2rem;
          text-align: center;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .contact-row {
          display: flex;
          gap: 0.7rem;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          border: 1px solid #cfd8dc;
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          background: #f7fbff;
          transition: border 0.2s;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #007bff;
        }
        .contact-form textarea {
          min-height: 90px;
          resize: vertical;
        }
        .contact-submit {
          background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
          color: #fff;
          font-weight: 800;
          border: none;
          border-radius: 8px;
          padding: 0.8rem 0;
          font-size: 1.05rem;
          cursor: pointer;
          margin-top: 0.3rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          transition: background 0.2s;
        }
        .contact-submit:hover {
          background: linear-gradient(90deg, #0056b3 60%, #00aaff 100%);
        }
        .contact-success {
          margin-top: 0.7rem;
          color: #28a745;
          font-weight: 700;
          text-align: center;
        }
        .contact-info {
          margin-top: 1.5rem;
          font-size: 0.98rem;
          color: #333;
          background: #f7fbff;
          border-radius: 8px;
          padding: 0.8rem 0.7rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .contact-info > div {
          margin-bottom: 0.3rem;
        }
        .contact-info > div:last-child {
          margin-bottom: 0;
        }
        @media (max-width: 900px) {
          .contact-flex {
            flex-direction: column-reverse;
            align-items: center;
            gap: 1.5rem;
            max-width: 98vw;
          }
          .contact-container,
          .contact-image {
            max-width: 98vw;
          }
          .contact-image img {
            max-width: 370px;
            width: 100%;
          }
        }
        @media (max-width: 600px) {
          .contact-section {
            padding: 1.2rem 0 2rem 0;
          }
          .contact-container {
            padding: 1rem 0.3rem 1rem 0.3rem;
            max-width: 100vw;
          }
          .contact-image {
            min-width: 120px;
            max-width: 100vw;
          }
          .contact-image img {
            max-width: 100vw;
            min-width: 120px;
            aspect-ratio: 1/1.1;
          }
          .contact-row {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;