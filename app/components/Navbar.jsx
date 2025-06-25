'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';

// Animated underline for nav links
const AnimatedLink = ({ children, ...props }) => (
  <a {...props} className={`navbar-link ${props.className || ''}`}>
    <span className="navbar-link-text">{children}</span>
    <span className="navbar-link-underline" />
  </a>
);

const Toast = ({ message, onClose }) => (
  <div className="toast">
    {message}
    <button className="toast-close" onClick={onClose}>×</button>
    <style>{`
      .toast {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
        color: #fff;
        padding: 1.1rem 2.2rem;
        border-radius: 0;
        font-size: 1.15rem;
        font-weight: 700;
        box-shadow: 0 -2px 32px rgba(0,0,0,0.18);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1.2rem;
        justify-content: center;
        animation: toastIn 0.4s cubic-bezier(.68,-0.55,.27,1.55);
      }
      @keyframes toastIn {
        from { opacity: 0; transform: translateY(40px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .toast-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      .toast-close:hover {
        opacity: 1;
      }
      @media (max-width: 768px) {
        .toast {
          font-size: 1rem;
          padding: 0.8rem 1.5rem;
        }
        .toast-close {
          font-size: 1.2rem;
        }
      }
    `}</style>
  </div>
);

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', email: '', what: '' });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setModalOpen(false);
    setMenuOpen(false);
    setConfetti(true);
    setToast(`Thank you, ${form.name.trim() || "Friend"}, for willing to support humanity!`);
    setTimeout(() => setConfetti(false), 10000);
    setTimeout(() => setToast(''), 10000);
    setForm({ name: '', email: '', what: '' });
  };

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'navbar-blur' : ''}`}>
        <div className="navbar-left">
          <img
            src="/hhflogo.png"
            alt="Logo"
            className="navbar-logo"
            style={{
              animation: "logoPop 1s cubic-bezier(.68,-0.55,.27,1.55)"
            }}
          />
          <span className="navbar-org">
            <span className="navbar-org-highlight">Hope</span> Haven NGO
          </span>
        </div>
        <div className={`navbar-center ${menuOpen ? 'show' : ''}`}>
          <AnimatedLink href="#" onClick={() => setMenuOpen(false)}>Home</AnimatedLink>
          <AnimatedLink href="#" onClick={() => setMenuOpen(false)}>About Us</AnimatedLink>
          <AnimatedLink href="#" onClick={() => setMenuOpen(false)}>Contact Us</AnimatedLink>
          <button className="join-btn mobile-join" onClick={() => { setModalOpen(true); setMenuOpen(false); }}>
            <span className="join-btn-glow" />
            <span>Join Us</span>
          </button>
        </div>
        <div className="navbar-right">
          <button className="join-btn desktop-join" onClick={() => setModalOpen(true)}>
            <span className="join-btn-glow" />
            <span>Join Us</span>
          </button>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Join Us</h2>
            <form onSubmit={handleSubmit}>
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
              <textarea
                name="what"
                placeholder="What can you do for us?"
                value={form.what}
                onChange={handleChange}
                required
                rows={3}
              />
              <button type="submit" className="modal-submit-animated">
                <span>Submit</span>
                <span className="modal-submit-arrow">→</span>
              </button>
            </form>
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
          </div>
        </div>
      )}

      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      <style>{`
        .navbar {
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 2.5rem;
          background: rgba(30, 30, 40, 0.18);
          backdrop-filter: blur(18px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.13);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          animation: navbarFadeIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .navbar-blur {
          background: rgba(30, 30, 40, 0.85) !important;
          backdrop-filter: blur(32px) !important;
          transition: background 0.3s, backdrop-filter 0.3s;
        }
        @keyframes navbarFadeIn {
          from { opacity: 0; transform: translateY(-40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .navbar-logo {
          height: 48px;
          width: 48px;
          object-fit: contain;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          background: #fff;
        }
        @keyframes logoPop {
          0% { transform: scale(0.7) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.15) rotate(8deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg);}
        }
        .navbar-org {
          font-size: 1.7rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 1.5px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.22);
          background: linear-gradient(90deg, #fff 60%, #00c6ff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .navbar-org-highlight {
          color: #007bff;
          background: none;
          -webkit-text-fill-color: #007bff;
          font-weight: 900;
          letter-spacing: 2px;
          margin-right: 0.2em;
        }
        .navbar-center {
          display: flex;
          gap: 2.8rem;
          justify-content: center;
          align-items: center;
        }
        .navbar-link {
          color: #fff;
          font-size: 1.13rem;
          font-weight: 700;
          padding: 0.6rem 1.5rem;
          border-radius: 22px;
          background: rgba(255,255,255,0.13);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
        }
        .navbar-link-text {
          position: relative;
          z-index: 2;
        }
        .navbar-link-underline {
          position: absolute;
          left: 20%;
          right: 20%;
          bottom: 8px;
          height: 3px;
          background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.3s cubic-bezier(.68,-0.55,.27,1.55);
          z-index: 1;
        }
        .navbar-link:hover .navbar-link-underline,
        .navbar-link:focus .navbar-link-underline {
          transform: scaleX(1);
        }
        .navbar-link:hover,
        .navbar-link:focus {
          background: rgba(255,255,255,0.25);
          color: #222;
        }
        .navbar-right {
          display: flex;
          align-items: center;
        }
        .join-btn {
          position: relative;
          padding: 0.8rem 2.3rem;
          font-size: 1.13rem;
          font-weight: 800;
          color: #fff;
          background: #007bff;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          overflow: hidden;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .join-btn-glow {
          position: absolute;
          top: 50%; left: 50%;
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, #00c6ff55 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(0.95);
          opacity: 0.7;
          z-index: 0;
          pointer-events: none;
          animation: joinGlow 2.5s infinite alternate;
        }
        @keyframes joinGlow {
          0% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.95);}
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.1);}
        }
        .join-btn:hover {
          background: #0056b3;
          color: #fff;
          box-shadow: 0 4px 24px #00c6ff44;
        }
        .desktop-join {
          display: inline-block;
        }
        .mobile-join {
          display: none;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 1rem;
          z-index: 101;
        }
        .hamburger span {
          display: block;
          width: 28px;
          height: 3px;
          background: #fff;
          border-radius: 2px;
          transition: 0.3s;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
        /* Modal styles */
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.45);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modalBackdropIn 0.3s;
        }
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal {
          background: #fff;
          padding: 2rem 2.5rem 1.5rem 2.5rem;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          min-width: 320px;
          max-width: 90vw;
          position: relative;
          animation: modalIn 0.4s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes modalIn {
          from { transform: scale(0.8) translateY(-40px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .modal h2 {
          margin-top: 0;
          margin-bottom: 1.2rem;
          color: #222;
          font-size: 1.5rem;
          font-weight: 800;
        }
        .modal form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .modal input, .modal textarea {
          padding: 0.7rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          resize: none;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .modal input:focus, .modal textarea:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px #007bff33;
        }
        .modal-submit-animated {
          background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
          color: #fff;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          padding: 0.7rem 0;
          font-size: 1.1rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          position: relative;
          overflow: hidden;
        }
        .modal-submit-animated:hover {
          background: linear-gradient(90deg, #0056b3 60%, #00aaff 100%);
        }
        .modal-submit-arrow {
          font-size: 1.3em;
          transition: transform 0.2s;
        }
        .modal-submit-animated:hover .modal-submit-arrow {
          transform: translateX(8px) scale(1.2);
        }
        .modal-close {
          position: absolute;
          top: 0.7rem;
          right: 1.2rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #333;
          cursor: pointer;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #007bff;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 900px) {
          .navbar-center {
            gap: 1.2rem;
          }
          .navbar-org {
            font-size: 1.1rem;
          }
        }
        @media (max-width: 768px) {
          .navbar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 0;
            padding: 0.7rem 0.7rem;
            width: 100vw;
          }
          .navbar-left {
            flex: 1;
            justify-content: flex-start;
            margin-bottom: 0;
          }
          .navbar-center {
            display: none;
            position: fixed;
            top: 64px;
            left: 0;
            width: 100vw;
            background: rgba(30,30,40,0.97);
            flex-direction: column;
            gap: 1.2rem;
            padding: 2rem 0 1.5rem 0;
            z-index: 200;
            align-items: center;
            border-bottom-left-radius: 18px;
            border-bottom-right-radius: 18px;
            animation: navbarMenuDrop 0.4s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes navbarMenuDrop {
            from { opacity: 0; transform: translateY(-40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .navbar-center.show {
            display: flex;
          }
          .navbar-link {
            width: 90vw;
            text-align: center;
            font-size: 1.1rem;
            padding: 0.7rem 0;
            background: rgba(255,255,255,0.10);
          }
          .navbar-right {
            flex: 1;
            justify-content: flex-end;
            margin-bottom: 0;
          }
          .join-btn.desktop-join {
            display: none;
          }
          .join-btn.mobile-join {
            display: flex;
            width: 90vw;
            margin: 0 auto;
            font-size: 1.1rem;
            padding: 0.8rem 0;
          }
          .hamburger {
            display: flex;
          }
        }
        @media (max-width: 480px) {
          .navbar {
            padding: 0.4rem 0.2rem;
          }
          .navbar-org {
            font-size: 1rem;
          }
          .navbar-logo {
            height: 36px;
            width: 36px;
          }
          .modal {
            padding: 1rem 0.5rem 1rem 0.5rem;
            min-width: 90vw;
          }
          .navbar-center .navbar-link,
          .navbar-center .join-btn.mobile-join {
            font-size: 1rem;
            padding: 0.7rem 0.2rem;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;