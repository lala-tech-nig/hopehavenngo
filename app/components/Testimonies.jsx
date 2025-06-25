'use client';

import { useEffect, useState } from "react";

const testimonies = [
	{
		name: "Amina Yusuf",
		photo: "/passport.jpg",
		text: "Hope Haven Foundation provided me with school supplies and mentorship. Now I am excelling in my studies and have hope for a brighter future.",
	},
	{
		name: "Chinedu Okafor",
		photo: "/passport.jpg",
		text: "Thanks to Hope Haven Foundation, my family received food support during tough times. Their kindness changed our lives.",
	},
	{
		name: "Fatima Bello",
		photo: "/passport.jpg",
		text: "I was able to attend a coding bootcamp through their scholarship. I now dream of becoming a software engineer.",
	},
	{
		name: "John Ade",
		photo: "/passport.jpg",
		text: "The health outreach program helped me recover from malaria. I am grateful for their care and support.",
	},
	{
		name: "Blessing Udo",
		photo: "/passport.jpg",
		text: "Hope Haven Foundation gave me the confidence to pursue my passion for art. I have even sold my first painting!",
	},
	{
		name: "Maryam Musa",
		photo: "/passport.jpg",
		text: "Their workshops taught me valuable life skills. I feel empowered and ready to face the world.",
	},
];

const CARD_WIDTH = 320;
const CARD_GAP = 32;
const SLIDE_SPEED = 0.7; // px per frame

const Testimonies = () => {
	const [dropped, setDropped] = useState(Array(testimonies.length).fill(false));
	const [sliding, setSliding] = useState(false);
	const [offset, setOffset] = useState(0);

	// Drop cards one by one
	useEffect(() => {
		testimonies.forEach((_, i) => {
			setTimeout(() => {
				setDropped((prev) => {
					const arr = [...prev];
					arr[i] = true;
					return arr;
				});
				if (i === testimonies.length - 1) {
					setTimeout(() => setSliding(true), 700);
				}
			}, 350 * i);
		});
	}, []);

	// Infinite sliding effect
	useEffect(() => {
		if (!sliding) return;
		let raf;
		function animate() {
			setOffset((prev) => {
				const totalWidth = testimonies.length * (CARD_WIDTH + CARD_GAP);
				let next = prev + SLIDE_SPEED;
				if (next >= totalWidth) next = 0;
				return next;
			});
			raf = requestAnimationFrame(animate);
		}
		raf = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf);
	}, [sliding]);

	return (
		<section className="testimonies-section">
			<h2 className="testimonies-header">TESTIMONIES</h2>
			<div className="testimonies-slider-outer">
				<div
					className="testimonies-slider"
					style={{
						transform: `translateX(-${offset}px)`,
						transition: sliding
							? "none"
							: "transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
					}}
				>
					{[...testimonies, ...testimonies].map((t, idx) => {
						// Only animate drop for the first set
						const dropIdx = idx % testimonies.length;
						return (
							<div
								className={`testimony-card${
									dropped[dropIdx] ? " dropped" : ""
								}`}
								key={idx}
								style={{
									transitionDelay:
										!sliding && dropped[dropIdx]
											? `${dropIdx * 0.1 + 0.2}s`
											: "0s",
								}}
							>
								<img
									src={t.photo}
									alt={t.name}
									className="testimony-photo"
									loading="lazy"
								/>
								<div className="testimony-name">{t.name}</div>
								<div className="testimony-text">{t.text}</div>
							</div>
						);
					})}
				</div>
			</div>
			<style>{`
        .testimonies-section {
          width: 100vw;
          background: linear-gradient(120deg, #f8fafc 60%, #e3f0ff 100%);
          padding: 3.5rem 0 2.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .testimonies-header {
          color: #111;
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: 2px;
          margin-bottom: 2.2rem;
          text-align: center;
        }
        .testimonies-slider-outer {
          width: 100vw;
          max-width: 1200px;
          overflow: hidden;
          padding: 0.5rem 0;
        }
        .testimonies-slider {
          display: flex;
          align-items: flex-start;
          gap: ${CARD_GAP}px;
          will-change: transform;
        }
        .testimony-card {
          width: ${CARD_WIDTH}px;
          min-width: ${CARD_WIDTH}px;
          max-width: 95vw;
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          padding: 2.2rem 1.5rem 1.5rem 1.5rem;
          margin-bottom: 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(-80px) scale(0.95);
          transition:
            opacity 0.7s cubic-bezier(.68,-0.55,.27,1.55),
            transform 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .testimony-card.dropped {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .testimony-photo {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1.1rem;
          box-shadow: 0 2px 12px #007bff22;
          border: 3px solid #e3f0ff;
          background: #f8fafc;
        }
        .testimony-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #007bff;
          margin-bottom: 0.7rem;
          text-align: center;
        }
        .testimony-text {
          font-size: 1.05rem;
          color: #222;
          text-align: center;
          line-height: 1.6;
        }
        @media (max-width: 700px) {
          .testimonies-header {
            font-size: 1.2rem;
          }
          .testimony-card {
            width: 90vw;
            min-width: 90vw;
            padding: 1.2rem 0.7rem 1rem 0.7rem;
          }
          .testimony-photo {
            width: 54px;
            height: 54px;
          }
        }
      `}</style>
		</section>
	);
};

export default Testimonies;