"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./login.css"; // Import the CSS file for styling
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as needed

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // Get the login function from your AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const AUTH_BACKEND_API_URL = process.env.NEXT_PUBLIC_AUTH_BACKEND_API_URL;

  // Handle standard email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${AUTH_BACKEND_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || "Login failed");
        return;
      }

      const data = await response.json();
      const userData = {
        id: data.userid,
        email: data.email,
        // Add more fields if necessary
      };

      login(userData, data.accesstoken);
      router.push('/');
    } catch (err) {
      console.error("Error logging in", err);
      setError("An error occurred while logging in.");
    }
  };

  // Handle social login (Google)
  const handleSocialLogin = (platform) => {
    if (platform === "Google") {
      window.location.href = `${AUTH_BACKEND_API_URL}/auth/google`;
    }
  };

  // Optional: Handle token after redirect from Google
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch(`${AUTH_BACKEND_API_URL}/auth/get-user`, {
        credentials: 'include', // 👈 Important to send cookies
      });

      if (!response.ok) {
        throw new Error('User not authenticated');
      }

      const data = await response.json();

      const userData = {
        id: data.userid,
        email: data.email,
        // Add more fields if needed
      };

      login(userData, null); // You can omit token if it's in cookies
      router.push('/dashboard');
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  };

  fetchUser();
}, []);

  return (
    <div className="login-body">
    <div className="login-container">
      {/* Left section: Sign-in form */}
      <div className="login-form">
        <h2>Sign In</h2>
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
          <Link href="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
          <button type="submit" className="signin-button">
            Signin
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p>or sign in with</p>
        <div className="social-buttons">
          <button
            className="google-button"
            aria-label="Sign in with Google"
            onClick={() => handleSocialLogin("Google")}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="google-icon"
            />
            Continue with Google
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
    </div>
  );
}
