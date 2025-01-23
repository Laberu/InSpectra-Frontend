"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import "./login.css"; // Import the CSS file for styling

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link href="/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
