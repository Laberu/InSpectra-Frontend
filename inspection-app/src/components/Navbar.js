"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavClick = (href) => {
    router.push(href);
    setIsMenuOpen(false); // close menu after navigation
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/">
            <img src="/logo.png" alt="InSpectra Logo" className="logo-image" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
        <li><a href="#hero">Home</a></li>
          {/* <li><a href="#partners">Partners</a></li> */}
          <li><a href="#features">Features</a></li>
          <li><a href="#usecases">Use Cases</a></li>
          <li><a href="#footer">Contact Us</a></li>
        </ul>

        {/* Desktop CTA Button */}
        <div className="navbar-cta">
          <button
            className="navbar-demo-btn"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        </div>

        {/* Hamburger Icon (mobile only) */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Mobile Menu (hidden by default on desktop) */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#partners">Partners</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#usecases">Use Cases</a></li>
          <li><a href="#footer">Contact Us</a></li>
        </ul>
        <div className="mobile-cta">
          <button
            className="navbar-demo-btn"
            onClick={() => {
              router.push("/login");
              setIsMenuOpen(false);
            }}
          >
            Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
