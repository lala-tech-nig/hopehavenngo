import { motion } from "framer-motion";

const title = "WELCOME TO HOPE HAVEN NGO";

const letterVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.06,
      type: "spring",
      stiffness: 500,
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
        height: "100vh",
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
          background: "rgba(0,0,0,0.4)",
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
        }}
      >
        <motion.h1
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            letterSpacing: "2px",
            color: "#fff",
            marginBottom: "2rem",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            display: "inline-block",
            whiteSpace: "pre-wrap",
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
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: 700,
              border: "none",
              borderRadius: "4px",
              background: "#fff",
              color: "#222",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            Learn More
          </button>
          <button
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              fontWeight: 700,
              border: "none",
              borderRadius: "4px",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            Donate Now
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            height: 50vh !important;
          }
          .hero-content h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;