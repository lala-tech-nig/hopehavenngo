'use client';

import React, { useEffect, useState, useRef } from 'react';

const NEED_HELP_SOUND =
  "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae6b2.mp3"; // Free notification sound

const Needhelp = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    challenge: ''
  });
  const audioRef = useRef(null);
  const reminderTimer = useRef(null);

  // Play sound when prompt appears
  useEffect(() => {
    if (showPrompt && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [showPrompt]);

  // Show prompt after 20 seconds
  useEffect(() => {
    if (!showPrompt && !showForm && !showFloating) {
      const t = setTimeout(() => setShowPrompt(true), 20000);
      return () => clearTimeout(t);
    }
  }, [showPrompt, showForm, showFloating]);

  // Show reminder text every 20 seconds when floating icon is visible
  useEffect(() => {
    if (showFloating) {
      setShowReminder(true);
      reminderTimer.current = setInterval(() => {
        setShowReminder(true);
        setTimeout(() => setShowReminder(false), 3500);
      }, 20000);
      // Hide reminder after 3.5s
      setTimeout(() => setShowReminder(false), 3500);
      return () => clearInterval(reminderTimer.current);
    } else {
      setShowReminder(false);
      if (reminderTimer.current) clearInterval(reminderTimer.current);
    }
  }, [showFloating]);

  // If user clicks NO, hide prompt and show floating icon
  const handleNo = () => {
    setShowPrompt(false);
    setShowForm(false);
    setShowFloating(true);
  };

  // If user clicks YES, show form
  const handleYes = () => {
    setShowPrompt(false);
    setShowForm(true);
    setShowFloating(false);
  };

  // On form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setForm({ name: '', phone: '', address: '', challenge: '' });
    setShowFloating(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // When floating icon is clicked, show form
  const handleFloatingClick = () => {
    setShowForm(true);
    setShowFloating(false);
  };

  return (
    <>
      {/* Hidden audio element for sound */}
      <audio ref={audioRef} src={NEED_HELP_SOUND} preload="auto" />

      {/* Floating Support Icon & Prompt */}
      {showPrompt && (
        <div className="needhelp-popup">
          <div className="needhelp-icon">🆘</div>
          <div className="needhelp-note">NEED HELP?</div>
          <div className="needhelp-actions">
            <button className="needhelp-btn yes" onClick={handleYes}>YES</button>
            <button className="needhelp-btn no" onClick={handleNo}>NO</button>
          </div>
        </div>
      )}

      {/* Floating shaking icon with reminder */}
      {showFloating && !showPrompt && !showForm && (
        <div className="needhelp-floating-container">
          <button
            className="needhelp-floating"
            onClick={handleFloatingClick}
            aria-label="Need Help"
          >
            🆘
          </button>
          {showReminder && (
            <span className="needhelp-reminder">Need help? Click here!</span>
          )}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="needhelp-modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="needhelp-modal" onClick={e => e.stopPropagation()}>
            <h3 style={{marginTop:0}}>How can we support you?</h3>
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
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <textarea
                name="challenge"
                placeholder="What challenge are you facing?"
                value={form.challenge}
                onChange={handleChange}
                rows={3}
                required
              />
              <button type="submit" className="needhelp-submit">Submit</button>
            </form>
            <button className="needhelp-modal-close" onClick={() => setShowForm(false)}>×</button>
          </div>
        </div>
      )}

      <style>{`
        .needhelp-popup {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
          padding: 1.2rem 2.2rem 1.5rem 2.2rem;
          z-index: 3001;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 0.4s;
        }
        .needhelp-icon {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
        }
        .needhelp-note {
          font-size: 1.3rem;
          font-weight: 800;
          color: #007bff;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }
        .needhelp-actions {
          display: flex;
          gap: 1.2rem;
        }
        .needhelp-btn {
          padding: 0.7rem 2.2rem;
          border-radius: 22px;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .needhelp-btn.yes {
          background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
          color: #fff;
        }
        .needhelp-btn.yes:hover {
          background: linear-gradient(90deg, #0056b3 60%, #00aaff 100%);
        }
        .needhelp-btn.no {
          background: #eee;
          color: #007bff;
        }
        .needhelp-btn.no:hover {
          background: #ddd;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -40%);}
          to { opacity: 1; transform: translate(-50%, -50%);}
        }
        .needhelp-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.35);
          z-index: 4000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .needhelp-modal {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 2rem 2.5rem 1.5rem 2.5rem;
          min-width: 320px;
          max-width: 95vw;
          position: relative;
          animation: fadeIn 0.3s;
        }
        .needhelp-modal h3 {
          color: #007bff;
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 1.2rem;
        }
        .needhelp-modal form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .needhelp-modal input,
        .needhelp-modal textarea {
          padding: 0.7rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          font-family: inherit;
          outline: none;
          resize: none;
        }
        .needhelp-modal input:focus,
        .needhelp-modal textarea:focus {
          border-color: #007bff;
        }
        .needhelp-submit {
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
        .needhelp-submit:hover {
          background: #0056b3;
        }
        .needhelp-modal-close {
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
        .needhelp-modal-close:hover {
          color: #007bff;
        }
        .needhelp-floating-container {
          position: fixed;
          right: 1.2rem;
          bottom: 6.5rem; /* was 3.5rem, now higher */
          z-index: 3002;
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .needhelp-floating {
          background: #fff;
          border: none;
          border-radius: 50%;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          width: 60px;
          height: 60px;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: shake 1.2s infinite;
          transition: background 0.2s;
        }
        .needhelp-floating:hover {
          background: #e6f0ff;
        }
        .needhelp-reminder {
          background: #007bff;
          color: #fff;
          font-weight: 700;
          border-radius: 18px;
          padding: 0.7rem 1.2rem;
          margin-left: 0.5rem;
          font-size: 1rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.13);
          animation: fadeReminder 0.5s, fadeOutReminder 0.5s 3s forwards;
          white-space: nowrap;
        }
        @keyframes shake {
          0% { transform: translateY(0) rotate(0deg);}
          10% { transform: translateY(-2px) rotate(-8deg);}
          20% { transform: translateY(2px) rotate(8deg);}
          30% { transform: translateY(-2px) rotate(-6deg);}
          40% { transform: translateY(2px) rotate(6deg);}
          50% { transform: translateY(-1px) rotate(-4deg);}
          60% { transform: translateY(1px) rotate(4deg);}
          70% { transform: translateY(0) rotate(0deg);}
          100% { transform: translateY(0) rotate(0deg);}
        }
        @keyframes fadeReminder {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOutReminder {
          to { opacity: 0; }
        }
        @media (max-width: 600px) {
          .needhelp-popup {
            width: 95vw;
            padding: 1rem 0.5rem 1.2rem 0.5rem;
          }
          .needhelp-modal {
            min-width: 90vw;
            padding: 1rem 0.5rem 1rem 0.5rem;
          }
          .needhelp-floating-container {
            right: 0.7rem;
            bottom: 4.5rem; /* was 1.2rem, now higher */
          }
          .needhelp-floating {
            width: 48px;
            height: 48px;
            font-size: 1.5rem;
          }
          .needhelp-reminder {
            font-size: 0.95rem;
            padding: 0.5rem 0.7rem;
          }
        }
      `}</style>
    </>
  );
}

export default Needhelp