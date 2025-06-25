'use client';

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const teamMembers = [
  {
    name: "Dr. Amina Bello",
    position: "Founder & CEO",
    photo: "/1.jpg",
    socials: {
      facebook: "https://facebook.com/aminabello",
      twitter: "https://twitter.com/aminabello",
      instagram: "https://instagram.com/aminabello",
      linkedin: "https://linkedin.com/in/aminabello",
    },
  },
  {
    name: "Samuel Eze",
    position: "Programs Director",
    photo: "/2.jpg",
    socials: {
      facebook: "https://facebook.com/samueleze",
      twitter: "https://twitter.com/samueleze",
      instagram: "https://instagram.com/samueleze",
      linkedin: "https://linkedin.com/in/samueleze",
    },
  },
  {
    name: "Fatima Musa",
    position: "Community Lead",
    photo: "/3.jpg",
    socials: {
      facebook: "https://facebook.com/fatimamusa",
      twitter: "https://twitter.com/fatimamusa",
      instagram: "https://instagram.com/fatimamusa",
      linkedin: "https://linkedin.com/in/fatimamusa",
    },
  },
];

const Team = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));

  return (
    <section className="team-section">
      <h2 className="team-header">OUR TEAM</h2>
      <div className="team-carousel">
        <button className="team-arrow left" onClick={prev} aria-label="Previous">
          &#8592;
        </button>
        <div className="team-card-outer">
          {teamMembers.map((member, idx) => (
            <div
              className={`team-card${idx === current ? " active" : ""}`}
              key={member.name}
              style={{
                transform: `translateX(${(idx - current) * 110}%)`,
                zIndex: idx === current ? 2 : 1,
              }}
            >
              <div className="team-img-block">
                <img src={member.photo} alt={member.name} className="team-img" />
                <div className="team-socials">
                  <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                  <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
              <div className="team-info">
                <div className="team-name">{member.name}</div>
                <div className="team-position">{member.position}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="team-arrow right" onClick={next} aria-label="Next">
          &#8594;
        </button>
      </div>
      <style>{`
        .team-section {
          width: 100vw;
          background: linear-gradient(120deg, #f8fafc 60%, #e3f0ff 100%);
          padding: 3.5rem 0 2.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .team-header {
          color: #111;
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 2.2rem;
          text-align: center;
        }
        .team-carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          max-width: 700px;
          position: relative;
        }
        .team-arrow {
          background: #fff;
          border: none;
          font-size: 2.2rem;
          color: #007bff;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          box-shadow: 0 2px 12px #007bff11;
          cursor: pointer;
          margin: 0 1rem;
          transition: background 0.2s, color 0.2s, transform 0.2s;
          z-index: 3;
        }
        .team-arrow:hover {
          background: #007bff;
          color: #fff;
          transform: scale(1.13);
        }
        .team-card-outer {
          width: 340px;
          height: 440px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .team-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 340px;
          height: 440px;
          background: #fff;
          border-radius: 2rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          opacity: 0;
          pointer-events: none;
          transition:
            transform 0.7s cubic-bezier(.68,-0.55,.27,1.55),
            opacity 0.5s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .team-card.active {
          opacity: 1;
          pointer-events: auto;
          z-index: 2;
        }
        .team-img-block {
          width: 180px;
          height: 240px;
          margin-top: 2.2rem;
          margin-bottom: 1.2rem;
          position: relative;
          border-radius: 1.2rem;
          overflow: hidden;
          box-shadow: 0 2px 18px #007bff22;
        }
        .team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.2rem;
          transition: filter 0.3s;
        }
        .team-img-block:hover .team-img {
          filter: brightness(0.7) blur(1px);
        }
        .team-socials {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.1rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          background: rgba(0,123,255,0.12);
        }
        .team-img-block:hover .team-socials {
          opacity: 1;
          pointer-events: auto;
        }
        .team-socials a {
          color: #fff;
          background: #007bff;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          box-shadow: 0 2px 8px #007bff33;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .team-socials a:hover {
          background: #fff;
          color: #007bff;
          transform: scale(1.13) rotate(-8deg);
        }
        .team-info {
          text-align: center;
        }
        .team-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: #007bff;
          margin-bottom: 0.3rem;
        }
        .team-position {
          font-size: 1.05rem;
          color: #222;
          font-weight: 600;
        }
        @media (max-width: 500px) {
          .team-card-outer, .team-card {
            width: 95vw;
            height: 340px;
          }
          .team-img-block {
            width: 110px;
            height: 140px;
            margin-top: 1.2rem;
            margin-bottom: 0.7rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Team;