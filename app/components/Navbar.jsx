'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navVariants = {
  hidden: { y: -60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } }
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, type: 'spring', stiffness: 100 }
  })
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className="navbar-glass"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.div
        className="navbar-left"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
      >
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <span className="navbar-org">Hope Haven NGO</span>
      </motion.div>
      <AnimatePresence>
        <motion.div
          className={`navbar-center ${open ? 'open' : ''}`}
          initial={false}
          animate={open || window.innerWidth > 768 ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 1, y: 0, pointerEvents: 'auto', transition: { staggerChildren: 0.07 } },
            hidden: { opacity: 0, y: -30, pointerEvents: 'none' }
          }}
        >
          {['Home', 'About Us', 'Contact Us'].map((text, i) => (
            <motion.a
              key={text}
              href="#"
              className="navbar-link"
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.25)" }}
              whileTap={{ scale: 0.97 }}
            >
              {text}
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="navbar-right"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
      >
        <motion.button
          className="join-btn"
          whileHover={{ scale: 1.07, backgroundColor: "rgba(255,255,255,0.22)", color: "#222" }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="join-btn-text">Join Us</span>
        </motion.button>
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>
      <style>{`
        .navbar-glass {
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 2.5rem;
          background: rgba(30, 30, 40, 0.18);
          backdrop-filter: blur(18px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.13);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .navbar-logo {
          height: 44px;
          width: 44px;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        }
        .navbar-org {
          font-size: 1.7rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 1.5px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.22);
        }
        .navbar-center {
          display: flex;
          gap: 2.8rem;
          justify-content: center;
          align-items: center;
        }
        .navbar-link {
          color: #fff;
          font-size: 1.13rem;
          font-weight: 700;
          padding: 0.6rem 1.5rem;
          border-radius: 22px;
          background: rgba(255,255,255,0.13);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .navbar-link:hover {
          background: rgba(255,255,255,0.25);
          color: #222;
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.7rem;
        }
        .join-btn {
          position: relative;
          overflow: visible;
          padding: 0.8rem 2.3rem;
          font-size: 1.13rem;
          font-weight: 800;
          color: #fff;
          background: rgba(255,255,255,0.13);
          border: none;
          border-radius: 30px;
          cursor: pointer;
          z-index: 1;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          transition: background 0.2s, color 0.2s;
        }
        .join-btn-text {
          position: relative;
          z-index: 2;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
        }
        .hamburger span {
          display: block;
          width: 28px;
          height: 3px;
          background: #fff;
          border-radius: 2px;
          transition: 0.3s;
        }
        /* Mobile Styles */
        @media (max-width: 900px) {
          .navbar-center {
            gap: 1.2rem;
          }
          .navbar-org {
            font-size: 1.1rem;
          }
        }
        @media (max-width: 768px) {
          .navbar-glass {
            padding: 0.5rem 1rem;
          }
          .navbar-center {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background: rgba(30,30,40,0.97);
            flex-direction: column;
            gap: 2rem;
            padding: 2rem 0;
            z-index: 99;
            transform: translateY(-120%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s;
          }
          .navbar-center.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .navbar-link {
            font-size: 1.3rem;
            background: rgba(255,255,255,0.08);
            width: 80vw;
            text-align: center;
          }
          .navbar-right {
            gap: 0.5rem;
          }
          .join-btn {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;