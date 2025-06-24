'use client';

import React, { useState } from 'react';

const eventTypes = [
  {
    key: 'upcoming',
    title: 'Upcoming Events',
    desc: 'See what is coming up soon.',
    image: '/events/upcoming.jpg'
  },
  {
    key: 'ongoing',
    title: 'Ongoing Events',
    desc: 'Check out what is happening right now.',
    image: '/events/ongoing.jpg'
  },
  {
    key: 'past',
    title: 'Past Events',
    desc: 'Explore our previous events.',
    image: '/events/past.jpg'
  }
];

// Dummy event data for demonstration
const eventData = {
  upcoming: [
    {
      id: 1,
      name: 'Hope Outreach 2025',
      image: '/events/upcoming1.jpg',
      narration: 'Join us for our annual outreach to support local communities.',
      gallery: [
        '/events/upcoming1.jpg',
        '/events/upcoming1b.jpg',
        '/events/upcoming1c.jpg'
      ]
    }
  ],
  ongoing: [
    {
      id: 2,
      name: 'Food Drive Marathon',
      image: '/events/ongoing1.jpg',
      narration: 'We are currently distributing food packs to families in need.',
      gallery: [
        '/events/ongoing1.jpg',
        '/events/ongoing1b.jpg'
      ]
    }
  ],
  past: [
    {
      id: 3,
      name: 'Health Camp 2024',
      image: '/dance.jpg',
      narration: 'A successful health camp with over 500 beneficiaries.',
      gallery: [
        '/dance.jpg',
        '/dance.jpg',
        '/dance.jpg'
      ]
    },
    {
      id: 8,
      name: 'Health Camp 2024',
      image: '/events/past1.jpg',
      narration: 'A successful health camp with over 500 beneficiaries.',
      gallery: [
        '/events/past1.jpg',
        '/events/past1b.jpg',
        '/events/past1c.jpg'
      ]
    },
    {
      id: 7,
      name: 'Health Camp 2024',
      image: '/events/past1.jpg',
      narration: 'A successful health camp with over 500 beneficiaries.',
      gallery: [
        '/events/past1.jpg',
        '/events/past1b.jpg',
        '/events/past1c.jpg'
      ]
    },
    {
      id: 3,
      name: 'Health Camp 2024',
      image: '/events/past1.jpg',
      narration: 'A successful health camp with over 500 beneficiaries.',
      gallery: [
        '/events/past1.jpg',
        '/events/past1b.jpg',
        '/events/past1c.jpg'
      ]
    },
    {
      id: 6,
      name: 'Health Camp 2024',
      image: '/events/past1.jpg',
      narration: 'A successful health camp with over 500 beneficiaries.',
      gallery: [
        '/events/past1.jpg',
        '/events/past1b.jpg',
        '/events/past1c.jpg'
      ]
    },
    {
      id: 5,
      name: 'Health Camp 2024',
      image: '/events/past1.jpg',
      narration: 'A successful health camp with over 500 beneficiaries.',
      gallery: [
        '/events/past1.jpg',
        '/events/past1b.jpg',
        '/events/past1c.jpg'
      ]
    },
    {
      id: 4,
      name: 'Health Camp 2024',
      image: '/events/past1.jpg',
      narration: 'A successful health camp with over 500 beneficiaries.',
      gallery: [
        '/events/past1.jpg',
        '/events/past1b.jpg',
        '/events/past1c.jpg'
      ]
    }
  ]
};

const Event = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);

  return (
    <div className="event-section">
      <h2 className="event-heading">OUR EVENTS</h2>
      {!selectedType ? (
        <div className="event-type-list">
          {eventTypes.map(type => (
            <div
              className="event-type-card"
              key={type.key}
              onClick={() => setSelectedType(type.key)}
            >
              <img src={type.image} alt={type.title} className="event-type-img" />
              <div className="event-type-title">{type.title}</div>
              <div className="event-type-desc">{type.desc}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="event-list-page">
          <button className="event-back" onClick={() => setSelectedType(null)}>← Back</button>
          <h3 className="event-type-heading">{eventTypes.find(t => t.key === selectedType)?.title}</h3>
          <div className="event-list-cards">
            {eventData[selectedType].map(ev => (
              <div className="event-card" key={ev.id} onClick={() => setModalEvent(ev)}>
                <img src={ev.image} alt={ev.name} className="event-card-img" />
                <div className="event-card-content">
                  <div className="event-card-title">{ev.name}</div>
                  <div className="event-card-narration">{ev.narration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modalEvent && (
        <div className="event-modal-backdrop" onClick={() => setModalEvent(null)}>
          <div className="event-modal" onClick={e => e.stopPropagation()}>
            <button className="event-modal-close" onClick={() => setModalEvent(null)}>×</button>
            <div className="event-modal-gallery-full">
              {modalEvent.gallery.map((img, idx) => (
                <img key={idx} src={img} alt={`gallery-${idx}`} className="event-modal-img-full" />
              ))}
            </div>
            <div className="event-modal-title">{modalEvent.name}</div>
            <div className="event-modal-narration">{modalEvent.narration}</div>
          </div>
        </div>
      )}

      <style>{`
        .event-section {
          width: 100vw;
          min-height: 70vh;
          padding: 2.5rem 0 3rem 0;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .event-heading {
          color: #111;
          font-size: 2.3rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: 2px;
        }
        .event-type-list {
          display: flex;
          gap: 2.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .event-type-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          width: 260px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.2rem 1rem 1.5rem 1rem;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .event-type-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
        }
        .event-type-img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 1rem;
        }
        .event-type-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #007bff;
          margin-bottom: 0.5rem;
        }
        .event-type-desc {
          color: #444;
          font-size: 1rem;
          text-align: center;
        }
        .event-list-page {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }
        .event-back {
          background: none;
          border: none;
          color: #007bff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 1.2rem;
        }
        .event-type-heading {
          text-align: center;
          font-size: 1.5rem;
          font-weight: 900;
          color: #222;
          margin-bottom: 2rem;
        }
        .event-list-cards {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .event-card {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.10);
          width: 260px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1rem 1.3rem 1rem;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .event-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 6px 24px rgba(0,0,0,0.13);
        }
        .event-card-img {
          width: 100%;
          height: 110px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 0.8rem;
        }
        .event-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #007bff;
          margin-bottom: 0.3rem;
        }
        .event-card-narration {
          color: #444;
          font-size: 0.98rem;
          text-align: center;
        }
        /* Modal styles */
        .event-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.35);
          z-index: 4000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .event-modal {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 2rem 2.5rem 1.5rem 2.5rem;
          min-width: 320px;
          max-width: 95vw;
          max-height: 90vh;
          position: relative;
          animation: fadeIn 0.3s;
          overflow-y: auto;
        }
        .event-modal-close {
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
        .event-modal-close:hover {
          color: #007bff;
        }
        .event-modal-gallery-full {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 1.2rem;
        }
        .event-modal-img-full {
          width: 100%;
          max-width: 600px;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          margin: 0 auto;
          display: block;
        }
        .event-modal-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #007bff;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .event-modal-narration {
          color: #444;
          font-size: 1rem;
          text-align: center;
        }
        @media (max-width: 900px) {
          .event-type-list, .event-list-cards {
            gap: 1.2rem;
          }
          .event-modal {
            padding: 1rem 0.5rem 1rem 0.5rem;
          }
        }
        @media (max-width: 600px) {
          .event-section {
            padding: 1.2rem 0 2rem 0;
          }
          .event-type-card, .event-card {
            width: 98vw;
            max-width: 350px;
          }
          .event-modal-img {
            width: 80px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default Event;