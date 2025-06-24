'use client';

import React from "react";
import { motion } from "framer-motion";

const title = "WELCOME TO HOPE HAVEN NGO";

const letterVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2 + i * 0.07,
      type: "spring",
      stiffness: 600,
      damping: 18,
    },
  }),
};

const Hero = () => {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "90vh",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      />
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#fff",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <motion.h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            letterSpacing: "2px",
            color: "#fff",
            marginBottom: "1.2rem",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            display: "inline-block",
            whiteSpace: "pre-wrap",
            lineHeight: 1.1,
            wordBreak: "break-word",
          }}
          aria-label={title}
        >
          {title.split("").map((char, i) =>
            char === " " ? (
              <span key={i} style={{ display: "inline-block", width: "0.7em" }}>
                &nbsp;
              </span>
            ) : (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                style={{
                  display: "inline-block",
                }}
              >
                {char}
              </motion.span>
            )
          )}
        </motion.h1>
        <div
          style={{
            fontSize: "1.45rem",
            fontWeight: 500,
            marginBottom: "2.5rem",
            color: "#fff",
            textShadow: "0 2px 8px rgba(0,0,0,0.25)",
            letterSpacing: "0.5px",
            lineHeight: 1.4,
          }}
        >
          Empowering communities, changing lives, and spreading hope together.
        </div>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              padding: "1.1rem 2.5rem",
              fontSize: "1.15rem",
              fontWeight: 700,
              border: "none",
              borderRadius: "32px",
              background: "linear-gradient(90deg, #007bff 60%, #00c6ff 100%)",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
              transition: "background 0.2s, transform 0.2s",
              marginBottom: "0.5rem",
              minWidth: "140px",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #0056b3 60%, #00aaff 100%)")}
            onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #007bff 60%, #00c6ff 100%)")}
          >
            Learn More
          </button>
          <button
            style={{
              padding: "1.1rem 2.5rem",
              fontSize: "1.15rem",
              fontWeight: 700,
              border: "2px solid #fff",
              borderRadius: "32px",
              background: "rgba(255,255,255,0.13)",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
              transition: "background 0.2s, color 0.2s, border 0.2s, transform 0.2s",
              marginBottom: "0.5rem",
              minWidth: "140px",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#007bff";
              e.currentTarget.style.border = "2px solid #007bff";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.13)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.border = "2px solid #fff";
            }}
          >
            Donate Now
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-content h1 {
            font-size: 2.2rem !important;
          }
        }
        @media (max-width: 768px) {
          .hero-section {
            height: 100vh !important;
            min-height: 300px;
          }
          .hero-content h1 {
            font-size: 1.5rem !important;
          }
          .hero-content > div {
            font-size: 1rem !important;
          }
          .hero-content {
            padding: 0 0.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            height: 100vh !important;
            min-height: 220px;
          }
          .hero-content h1 {
            font-size: 1.1rem !important;
            letter-spacing: 1px !important;
          }
          .hero-content > div {
            font-size: 0.95rem !important;
          }
          .hero-content {
            padding: 0 0.2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;