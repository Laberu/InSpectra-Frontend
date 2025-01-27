"use client";

import { useState } from "react";
import Link from "next/link";
import "./login.css"; // Import the CSS file for styling

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    alert("Login successful!");
  };

  const handleSocialLogin = (platform) => {
    alert(`Login with ${platform} clicked!`);
  };

  return (
    <div className="login-container">
      {/* Left section: Sign-in form */}
      <div className="login-form">
        <h2>Signin</h2>
        <form onSubmit={handleLogin} className="form-container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </form>
        <button type="submit" className="signin-button">
            Signin
          </button>
        <p>or signin with</p>
        <div className="social-buttons">
          <button
              className="google-button"
              aria-label="Sign in with Google"
              onClick={() => alert("Google Sign-In Clicked!")}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                className="google-icon"
              />
              Sign in with Google
          </button>
        </div>
      </div>

      {/* Right section: Welcome message */}
      <div className="login-welcome">
        <h2>Welcome back!</h2>
        <p>
          Welcome back! We are so happy to have you here. It's great to see you
          again. We hope you had a safe and enjoyable time away.
        </p>
        <Link href="/register" className="signup-link">
          No account yet? Signup.
        </Link>
      </div>
    </div>
  );
}
