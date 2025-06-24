'use client';

import React, { useEffect, useRef, useState } from 'react';

const countersData = [
  { label: "TODAY", target: 128, color: "#007bff" },
  { label: "THIS MONTH", target: 3120, color: "#00c6ff" },
  { label: "THIS YEAR", target: 18400, color: "#28a745" },
  { label: "OVERALL", target: 102340, color: "#ff9800" }
];

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const raf = useRef();

  useEffect(() => {
    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return count;
}

const Counter = () => {
  const counts = countersData.map(item => useCountUp(item.target, 1800 + Math.random() * 800));

  return (
    <div className="counter-bar">
      <div className="counter-title">
        <span>Live Touched</span>
        <span className="counter-dot" />
      </div>
      <div className="counter-list">
        {countersData.map((item, idx) => (
          <div className="counter-item" key={item.label}>
            <span className="counter-label">{item.label}</span>
            <span className="counter-number" style={{ color: item.color }}>
              {counts[idx].toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .counter-bar {
          width: 100vw;
          max-width: 100vw;
          background: linear-gradient(90deg, #007bff 60%, #00c6ff 100%);
          color: #fff;
          padding: 2.2rem 0.5rem 1.5rem 0.5rem;
          box-shadow: 0 2px 24px rgba(0,0,0,0.10);
          border-bottom-left-radius: 24px;
          border-bottom-right-radius: 24px;
          margin-bottom: 2.5rem;
        }
        .counter-title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.1rem;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .counter-dot {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: #28ff6a;
          border-radius: 50%;
          margin-left: 1rem;
          box-shadow: 0 0 12px #28ff6a, 0 0 24px #28ff6a;
          animation: pulseDot 1.2s infinite;
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 12px #28ff6a, 0 0 24px #28ff6a; }
          50% { box-shadow: 0 0 24px #28ff6a, 0 0 48px #28ff6a; }
          100% { box-shadow: 0 0 12px #28ff6a, 0 0 24px #28ff6a; }
        }
        .counter-list {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 3.5rem;
          flex-wrap: wrap;
        }
        .counter-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 120px;
          margin-bottom: 0.5rem;
        }
        .counter-label {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          letter-spacing: 1px;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.13);
        }
        .counter-number {
          font-size: 2.2rem;
          font-weight: 900;
          text-shadow: 0 2px 12px rgba(0,0,0,0.18);
          transition: color 0.2s;
        }
        @media (max-width: 900px) {
          .counter-title {
            font-size: 1.3rem;
          }
          .counter-list {
            gap: 1.5rem;
          }
          .counter-item {
            min-width: 90px;
          }
          .counter-number {
            font-size: 1.3rem;
          }
        }
        @media (max-width: 600px) {
          .counter-bar {
            padding: 1.2rem 0.2rem 1rem 0.2rem;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
          }
          .counter-title {
            font-size: 1.1rem;
          }
          .counter-list {
            gap: 0.7rem;
          }
          .counter-item {
            min-width: 70px;
          }
          .counter-label {
            font-size: 0.95rem;
          }
          .counter-number {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Counter;