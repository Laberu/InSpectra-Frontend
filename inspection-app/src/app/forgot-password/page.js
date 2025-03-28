"use client";

import { useState } from "react";
import Link from "next/link";
import "./forgot.css"; // Reuse login styles

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔒 TODO: Connect to API later
    console.log("Forgot Password Submitted:", email);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="signin-button">
            Send Reset Link
          </button>
        </form>

        <p>
          <Link href="/login" className="forgot-password-link">
            Back to Login
          </Link>
        </p>
      </div>

      <div className="login-welcome">
        <h2>Forgot your password?</h2>
        <p>
          Don’t worry, it happens to the best of us.
          Just enter your email and we’ll help you reset it soon.
        </p>
      </div>
    </div>
  );
}
