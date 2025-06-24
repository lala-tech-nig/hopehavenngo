'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';

const Toast = ({ message, onClose }) => (
  <div className="toast">
    {message}
    <button className="toast-close" onClick={onClose}>×</button>
    <style>{`
      .toast {
        position: fixed;
        bottom: 2.5rem;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
        color: #fff;
        padding: 1.1rem 2.2rem;
        border-radius: 1.5rem;
        font-size: 1.15rem;
        font-weight: 700;
        box-shadow: 0 6px 32px rgba(0,0,0,0.18);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1.2rem;
        animation: toastIn 0.4s cubic-bezier(.68,-0.55,.27,1.55);
      }
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(-50%) translateY(40px);}
        to { opacity: 1; transform: translateX(-50%) translateY(0);}
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
    `}</style>
  </div>
);

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ name: '', email: '', what: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setModalOpen(false);
    setConfetti(true);
    setToast(`Thank you, ${form.name.trim() || "Friend"}, for willing to support humanity!`);
    setTimeout(() => setConfetti(false), 10000);
    setTimeout(() => setToast(''), 10000);
    setForm({ name: '', email: '', what: '' });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
          <span className="navbar-org">Hope Haven NGO</span>
        </div>
        <div className="navbar-center">
          <a href="#" className="navbar-link">Home</a>
          <a href="#" className="navbar-link">About Us</a>
          <a href="#" className="navbar-link">Contact Us</a>
        </div>
        <div className="navbar-right">
          <button className="join-btn" onClick={() => setModalOpen(true)}>
            Join Us
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
              <button type="submit">Submit</button>
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
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .navbar-logo {
          height: 44px;
          width: 44px;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        }
        .navbar-org {
          font-size: 1.7rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 1.5px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.22);
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
        }
        .navbar-link:hover {
          background: rgba(255,255,255,0.25);
          color: #222;
        }
        .navbar-right {
          display: flex;
          align-items: center;
        }
        .join-btn {
          padding: 0.8rem 2.3rem;
          font-size: 1.13rem;
          font-weight: 800;
          color: #fff;
          background: #007bff;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          transition: background 0.2s, color 0.2s;
        }
        .join-btn:hover {
          background: #0056b3;
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
        }
        .modal {
          background: #fff;
          padding: 2rem 2.5rem 1.5rem 2.5rem;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          min-width: 320px;
          max-width: 90vw;
          position: relative;
          animation: modalIn 0.3s cubic-bezier(.68,-0.55,.27,1.55);
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
        }
        .modal input:focus, .modal textarea:focus {
          border-color: #007bff;
        }
        .modal button[type="submit"] {
          background: #007bff;
          color: #fff;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          padding: 0.7rem 0;
          font-size: 1.1rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
        }
        .modal button[type="submit"]:hover {
          background: #0056b3;
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
            flex-direction: column;
            align-items: stretch;
            gap: 0.7rem;
            padding: 0.7rem 0.7rem;
          }
          .navbar-left {
            justify-content: center;
            margin-bottom: 0.5rem;
          }
          .navbar-center {
            flex-direction: column;
            gap: 0.7rem;
            margin-bottom: 0.5rem;
          }
          .navbar-link {
            width: 100%;
            text-align: center;
            font-size: 1.1rem;
            padding: 0.7rem 0;
          }
          .navbar-right {
            justify-content: center;
            margin-bottom: 0.5rem;
          }
          .join-btn {
            width: 100%;
            padding: 0.8rem 0;
            font-size: 1.1rem;
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
        }
      `}</style>
    </>
  );
}

export default Navbar;