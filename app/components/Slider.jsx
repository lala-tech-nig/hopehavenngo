import React from 'react';

const beneficiaries = [
  { name: "Amina Yusuf", location: "Kano, Nigeria", age: 12 },
  { name: "Chinedu Okafor", location: "Enugu, Nigeria", age: 9 },
  { name: "Fatima Bello", location: "Abuja, Nigeria", age: 15 },
  { name: "John Ade", location: "Lagos, Nigeria", age: 11 },
  { name: "Blessing Udo", location: "Uyo, Nigeria", age: 13 },
  { name: "Maryam Musa", location: "Kaduna, Nigeria", age: 10 },
  { name: "Samuel Eze", location: "Owerri, Nigeria", age: 14 },
  { name: "Grace Ojo", location: "Ibadan, Nigeria", age: 8 },
  { name: "Ibrahim Sani", location: "Sokoto, Nigeria", age: 16 },
  { name: "Ngozi Nwosu", location: "Onitsha, Nigeria", age: 12 },
  // Add more as needed
];

const Slider = () => {
  // Duplicate the list for seamless infinite scroll
  const slideList = [...beneficiaries, ...beneficiaries];

  return (
    <div className="slider-section">
      <h2 className="slider-header">LIVE BENEFICIARIES</h2>
      <div className="slider-container">
        <div className="slider-track">
          {slideList.map((b, idx) => (
            <div className="slider-card" key={idx}>
              <div className="slider-name">{b.name}</div>
              <div className="slider-info">
                <span className="slider-location">{b.location}</span>
                <span className="slider-age">{b.age} yrs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .slider-section {
          width: 100vw;
          padding: 2.5rem 0 1.5rem 0;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .slider-header {
          color: #111;
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .slider-container {
          width: 90vw;
          max-width: 1100px;
          overflow: hidden;
          border-radius: 1.5rem;
          background: #fff;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          padding: 0.7rem 0;
        }
        .slider-track {
          display: flex;
          width: max-content;
          animation: slideLeft 400s linear infinite; /* was 28s, now 56s for 50% slower */
          gap: 1.2rem;
        }
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slider-card {
          min-width: 220px;
          max-width: 260px;
          background: linear-gradient(90deg, #e3f0ff 60%, #f8fafc 100%);
          border-radius: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          padding: 1.1rem 1.3rem;
          margin: 0.3rem 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .slider-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #007bff;
          margin-bottom: 0.5rem;
        }
        .slider-info {
          display: flex;
          gap: 1.2rem;
          font-size: 1rem;
          color: #333;
        }
        .slider-location {
          font-weight: 600;
        }
        .slider-age {
          font-weight: 500;
          color: #00aaff;
        }
        @media (max-width: 600px) {
          .slider-header {
            font-size: 1.2rem;
          }
          .slider-container {
            width: 98vw;
            padding: 0.3rem 0;
          }
          .slider-card {
            min-width: 140px;
            max-width: 180px;
            padding: 0.7rem 0.7rem;
          }
          .slider-name {
            font-size: 1rem;
          }
          .slider-info {
            font-size: 0.95rem;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;