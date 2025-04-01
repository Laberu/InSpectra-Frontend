"use client";

import { useState } from "react";
import Link from "next/link";
import "./forgot.css"; // Reuse login styles

const AUTH_BACKEND_API_URL = process.env.NEXT_PUBLIC_AUTH_BACKEND_API_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${AUTH_BACKEND_API_URL}/auth/send-password-reset-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Reset link sent! Please check your email.");
      } else {
        setMessage(`❌ Error: ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again later.");
    }

    setLoading(false);
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
          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

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
