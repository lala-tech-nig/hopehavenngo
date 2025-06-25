'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const socialLinks = [
  { name: "Facebook", url: "https://facebook.com/hopehavenngo", icon: <FaFacebookF /> },
  { name: "Twitter", url: "https://twitter.com/hopehavenngo", icon: <FaTwitter /> },
  { name: "Instagram", url: "https://instagram.com/hopehavenngo", icon: <FaInstagram /> },
  { name: "LinkedIn", url: "https://linkedin.com/company/hopehavenngo", icon: <FaLinkedinIn /> }
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [confetti, setConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    setConfetti(true);
    setSubmitted(true);
    setTimeout(() => setConfetti(false), 4000);
    setTimeout(() => setSubmitted(false), 5000);
    setEmail('');
  };

  return (
    <footer className="footer-section">
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-block">
            <img src="/hhflogo.png" alt="Hope Haven NGO" className="footer-logo-img" />
            <span className="footer-org-name">Hope Haven NGO</span>
          </div>
          <form className="footer-newsletter" onSubmit={handleNewsletter}>
            <label htmlFor="newsletter" className="footer-newsletter-label">
              Subscribe to our Newsletter
            </label>
            <div className="footer-newsletter-row">
              <input
                id="newsletter"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="footer-newsletter-input"
                disabled={submitted}
              />
              <button
                type="submit"
                className={`footer-newsletter-btn${submitted ? ' submitted' : ''}`}
                disabled={submitted}
              >
                {submitted ? "Thank you!" : "Subscribe"}
              </button>
            </div>
            {submitted && (
              <div className="footer-newsletter-success">
                🎉 You have subscribed!
              </div>
            )}
          </form>
        </div>
        <div className="footer-bottom">
          <div className="footer-socials">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="footer-social-link"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="footer-contact">
            <div>
              <strong>Address:</strong> 123 Hope Street, Abuja, Nigeria
            </div>
            <div>
              <strong>Phone:</strong> <a href="tel:+2348000000000">+234 800 000 0000</a>
            </div>
            <div>
              <strong>Email:</strong> <a href="mailto:info@hopehavenngo.org">info@hopehavenngo.org</a>
            </div>
          </div>
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Hope Haven NGO. All rights reserved.
          </div>
        </div>
      </div>
      <style>{`
        .footer-section {
          width: 100vw;
          background: linear-gradient(120deg, #e3f0ff 0%, #f8fafc 60%, #e3f0ff 100%);
          border-top: 1.5px solid #e3f0ff;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 -2px 32px rgba(0,0,0,0.06);
          animation: footerFadeIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes footerFadeIn {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .footer-content {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.2rem;
          padding: 2.5rem 0 1.2rem 0;
        }
        .footer-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .footer-logo-block {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          animation: logoPop 1.1s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .footer-logo-img {
          width: 80px;
          height: 80px;
          border-radius: 18px;
          object-fit: contain;
          background: #fff;
          box-shadow: 0 2px 18px rgba(0,0,0,0.10);
          transition: transform 0.3s;
        }
        .footer-logo-img:hover {
          transform: scale(1.07) rotate(-6deg);
        }
        .footer-org-name {
          font-size: 2.1rem;
          font-weight: 900;
          color: #007bff;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 12px #b3d8ff33;
          animation: orgNameFadeIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes logoPop {
          0% { transform: scale(0.7) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(8deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg);}
        }
        @keyframes orgNameFadeIn {
          from { opacity: 0; letter-spacing: 0;}
          to { opacity: 1; letter-spacing: 2px;}
        }
        .footer-newsletter {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.7rem;
          background: rgba(255,255,255,0.7);
          border-radius: 1.2rem;
          padding: 1.2rem 1.5rem;
          box-shadow: 0 2px 12px #007bff11;
          min-width: 270px;
          max-width: 350px;
          animation: newsletterFadeIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes newsletterFadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .footer-newsletter-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #007bff;
          margin-bottom: 0.2rem;
        }
        .footer-newsletter-row {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }
        .footer-newsletter-input {
          flex: 1;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          border: 1.5px solid #b3d8ff;
          font-size: 1rem;
          outline: none;
          background: #f8fafc;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .footer-newsletter-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px #007bff33;
        }
        .footer-newsletter-btn {
          background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
          color: #fff;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          padding: 0.7rem 1.2rem;
          font-size: 1.05rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 2px 8px #007bff22;
        }
        .footer-newsletter-btn:hover {
          background: linear-gradient(90deg, #0056b3 60%, #00aaff 100%);
          transform: scale(1.07);
        }
        .footer-newsletter-btn.submitted {
          background: #28a745;
          color: #fff;
          cursor: default;
        }
        .footer-newsletter-success {
          color: #28a745;
          font-weight: 700;
          font-size: 1rem;
          margin-top: 0.3rem;
          animation: fadeInSuccess 0.7s;
        }
        @keyframes fadeInSuccess {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .footer-bottom {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .footer-socials {
          display: flex;
          gap: 1.5rem;
        }
        .footer-social-link {
          font-size: 2rem;
          color: #007bff;
          background: #fff;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px #007bff11;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .footer-social-link:hover {
          background: #007bff;
          color: #fff;
          transform: scale(1.13) rotate(-8deg);
          box-shadow: 0 4px 18px #007bff33;
        }
        .footer-contact {
          color: #222;
          font-size: 1rem;
          margin: 0.7rem 0 0.2rem 0;
          text-align: left;
          line-height: 1.7;
        }
        .footer-contact a {
          color: #007bff;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .footer-contact a:hover {
          color: #0056b3;
        }
        .footer-copy {
          color: #444;
          font-size: 1rem;
          text-align: center;
          width: 100%;
          margin-top: 0.5rem;
        }
        @media (max-width: 900px) {
          .footer-main {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            justify-content: center;
          }
        }
        @media (max-width: 600px) {
          .footer-content {
            gap: 1.2rem;
            padding: 1.2rem 0 0.7rem 0;
          }
          .footer-logo-img {
            width: 48px;
            height: 48px;
          }
          .footer-org-name {
            font-size: 1.1rem;
          }
          .footer-newsletter {
            min-width: 90vw;
            max-width: 98vw;
            padding: 0.7rem 0.5rem;
          }
          .footer-newsletter-row {
            flex-direction: column;
            gap: 0.5rem;
          }
          .footer-newsletter-btn {
            width: 100%;
          }
          .footer-bottom {
            margin-top: 1rem;
          }
          .footer-social-link {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;