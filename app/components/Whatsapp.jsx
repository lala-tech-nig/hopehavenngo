'use client';

import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '+2348028724180';
const WHATSAPP_LINK = `https://wa.me/2348028724180?text=I%20am%20from%20Hope%20Haven%20Foundation%20website`;

const Whatsapp = () => {
  const [showNote, setShowNote] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const audioRef = useRef(null);

  // Show note for 5s every 30s, play sound once per note
  useEffect(() => {
    let noteTimeout, interval;
    const show = () => {
      setShowNote(true);
      setSoundPlayed(false);
      noteTimeout = setTimeout(() => setShowNote(false), 5000);
    };
    show();
    interval = setInterval(show, 30000);
    return () => {
      clearTimeout(noteTimeout);
      clearInterval(interval);
    };
  }, []);

  // Play sound when note is shown
  useEffect(() => {
    if (showNote && !soundPlayed && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setSoundPlayed(true);
    }
  }, [showNote, soundPlayed]);

  return (
    <>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-float${showNote ? ' show-note' : ''}`}
        aria-label="Chat with us on WhatsApp"
      >
        <span className="whatsapp-icon">
          <FaWhatsapp />
        </span>
        {showNote && (
          <span className="whatsapp-note">
            Reach out to us on WhatsApp now!
          </span>
        )}
      </a>
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5b2.mp3" preload="auto" />
      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 3000;
          display: flex;
          align-items: center;
          background: none;
          text-decoration: none;
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .whatsapp-icon {
          background: #25d366;
          color: #fff;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.7rem;
          box-shadow: 0 4px 24px #25d36644;
          animation: whatsappShake 1.2s infinite alternate;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .whatsapp-float:hover .whatsapp-icon {
          background: #128c7e;
          box-shadow: 0 6px 32px #128c7e55;
        }
        @keyframes whatsappShake {
          0% { transform: rotate(-8deg) scale(1);}
          20% { transform: rotate(8deg) scale(1.07);}
          40% { transform: rotate(-8deg) scale(1.1);}
          60% { transform: rotate(8deg) scale(1.07);}
          80% { transform: rotate(-8deg) scale(1);}
          100% { transform: rotate(0deg) scale(1);}
        }
        .whatsapp-note {
          background: #fff;
          color: #128c7e;
          font-weight: 700;
          font-size: 1.1rem;
          border-radius: 1.2rem;
          box-shadow: 0 2px 12px #25d36633;
          padding: 0.9rem 1.5rem;
          margin-left: 1.2rem;
          animation: noteAppear 0.7s cubic-bezier(.68,-0.55,.27,1.55);
          white-space: nowrap;
        }
        @keyframes noteAppear {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @media (max-width: 600px) {
          .whatsapp-float {
            bottom: 18px;
            right: 12px;
          }
          .whatsapp-icon {
            width: 48px;
            height: 48px;
            font-size: 1.7rem;
          }
          .whatsapp-note {
            font-size: 0.95rem;
            padding: 0.6rem 1rem;
            margin-left: 0.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default Whatsapp;