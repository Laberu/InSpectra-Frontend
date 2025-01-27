"use client";

import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/">
            <img src="/logo.png" alt="InSpectra Logo" className="logo-image" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/partners">Partners</Link>
          </li>
          <li>
            <Link href="/features">Features</Link>
          </li>
          <li>
            <Link href="/use-case">Use Case</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Demo Button */}
        <div className="navbar-cta">
          <Link href="/demo" className="navbar-demo-btn">
            Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
