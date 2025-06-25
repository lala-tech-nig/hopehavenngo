'use client';

import React, { useEffect, useRef, useState } from 'react';

const countersData = [
    { label: 'TODAY', target: 128, color: '#007bff' },
    { label: 'THIS MONTH', target: 3120, color: '#00c6ff' },
    { label: 'THIS YEAR', target: 18400, color: '#28a745' },
    { label: 'OVERALL', target: 102340, color: '#ff9800' }
];

// Custom hook for animated counting with speed control
function useCountUp(target, duration = 2000, delay = 0, slowEnd = false, initial = 0, stepInterval = null) {
    const [count, setCount] = useState(initial);
    const raf = useRef();

    useEffect(() => {
        if (stepInterval) {
            // For TODAY: increase by 1 every stepInterval ms until target
            setCount(initial);
         let interval = setInterval(() => {
             setCount(prev => {
                 if (prev < target) return prev + 1;
                 clearInterval(interval);
                 return target;
             });
         }, stepInterval);
         return () => clearInterval(interval);
        } else {
            let start = null;
            let timeout;
            function animate(ts) {
                if (!start) start = ts;
                const elapsed = ts - start;
                let progress = Math.min(elapsed / duration, 1);

                // Slow down at the end if slowEnd is true
                if (slowEnd && progress > 0.85) {
                    progress = 0.85 + (progress - 0.85) / 2;
                }

                let next = Math.floor(progress * target);
                setCount(next);

                if (progress < 1 && next < target) {
                    raf.current = requestAnimationFrame(animate);
                } else {
                    setCount(target);
                }
            }
            timeout = setTimeout(() => {
                raf.current = requestAnimationFrame(animate);
            }, delay);
            return () => {
                clearTimeout(timeout);
                cancelAnimationFrame(raf.current);
            };
        }
    // eslint-disable-next-line
    }, [target, duration, delay, slowEnd, initial, stepInterval]);

    return count;
}

const Counter = () => {
    // TODAY: start from random digit <= 20, increase by 1 every 30 minutes (1800000 ms)
    const todayStart = React.useMemo(() => Math.floor(Math.random() * 20) + 1, []);
    const todayCount = useCountUp(
        countersData[0].target,
        0,
        0,
        false,
        todayStart,
        1800000 // 30 minutes in ms
    );

    // Other counters: fast, slow at end
    const counts = [
        todayCount,
        useCountUp(countersData[1].target, 1200, 400, true),
        useCountUp(countersData[2].target, 1800, 800, true),
        useCountUp(countersData[3].target, 2200, 1200, true),
    ];

    // Animate mounts from 1 to 500 in center
    const [mounts, setMounts] = useState(1);
    useEffect(() => {
        let raf;
        function animateMounts() {
            setMounts(prev => {
                if (prev < 500) {
                    raf = requestAnimationFrame(animateMounts);
                    return prev + 1;
                }
                return 500;
            });
        }
        raf = requestAnimationFrame(animateMounts);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div className="counter-bar">
            <div className="counter-title">
                <span>Lives Touched</span>
            </div>
            <div className="counter-mounts">{mounts.toLocaleString()} Mounts</div>
            <div className="counter-list">
                {countersData.map((item, idx) => (
                    <div className="counter-item-box" key={item.label}>
                        <span className="counter-label">{item.label}</span>
                        <span className="counter-number" style={{ color: item.color }}>
                            {counts[idx].toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
            <style>{`
        .counter-bar {
          width: 80vw;
          max-width: 1100px;
          margin: 2.5rem auto 2.5rem auto;
          background: linear-gradient(90deg, #e3f0ff 60%, #f8fafc 100%);
          color: #222;
          padding: 2.2rem 0.5rem 1.5rem 0.5rem;
          box-shadow: 0 2px 24px rgba(0,0,0,0.08);
          border-radius: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .counter-title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.1rem;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 1.2rem;
          color: #111;
          text-shadow: none;
        }
        .counter-dot {
          display: none;
        }
        .counter-mounts {
          font-size: 2.1rem;
          font-weight: 800;
          color: #222;
          margin-bottom: 1.7rem;
          text-align: center;
          letter-spacing: 2px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .counter-list {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 2.2rem;
          flex-wrap: wrap;
        }
        .counter-item-box {
          background: rgba(0,123,255,0.06);
          border-radius: 1.2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          padding: 1.2rem 2.2rem 1.1rem 2.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 120px;
          margin-bottom: 0.5rem;
          border: 1.5px solid #e3f0ff;
          transition: box-shadow 0.2s, border 0.2s;
        }
        .counter-item-box:hover {
          box-shadow: 0 4px 24px #007bff11;
          border: 1.5px solid #b3d8ff;
        }
        .counter-label {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          letter-spacing: 1px;
          color: #222;
          text-shadow: none;
        }
        .counter-number {
          font-size: 2.2rem;
          font-weight: 900;
          text-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: color 0.2s;
        }
        @media (max-width: 900px) {
          .counter-title {
            font-size: 1.3rem;
          }
          .counter-list {
            gap: 1.2rem;
          }
          .counter-item-box {
            min-width: 90px;
            padding: 0.8rem 1.2rem 0.8rem 1.2rem;
          }
          .counter-number {
            font-size: 1.3rem;
          }
          .counter-mounts {
            font-size: 1.3rem;
          }
        }
        @media (max-width: 600px) {
          .counter-bar {
            padding: 1.2rem 0.2rem 1rem 0.2rem;
            border-radius: 1rem;
            width: 98vw;
            max-width: 98vw;
          }
          .counter-title {
            font-size: 1.1rem;
          }
          .counter-list {
            gap: 0.7rem;
          }
          .counter-item-box {
            min-width: 70px;
          }
          .counter-label {
            font-size: 0.95rem;
          }
          .counter-number {
            font-size: 1.1rem;
          }
          .counter-mounts {
            font-size: 1.1rem;
          }
        `}</style>
        </div>
    );
};

export default Counter;