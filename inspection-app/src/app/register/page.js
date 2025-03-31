"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the router
import "./register.css"; // Import your CSS

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAcknowledged, setTermsAcknowledged] = useState(false);
  const [error, setError] = useState(""); // Error state

  const AUTH_BACKEND_API_URL = process.env.NEXT_PUBLIC_AUTH_BACKEND_API_URL; // Use environment variable

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });

  // Password validation logic
  const validatePassword = (value) => {
    setPassword(value);
    setPasswordValidation({
      hasMinLength: value.length >= 8,
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${AUTH_BACKEND_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If the server responds with an error, display it
        setError(data.error || "Sign up failed.");
      } else {
        // On successful signup, redirect to the login page
        router.push("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please try again.");
    }
  };

  const handleAcknowledgeTerms = () => {
    setTermsAcknowledged(true);
    setShowTermsModal(false); // Close the modal
  };

  return (
    <div className="register-body">
    <div className="register-container">
      {/* Left section: Registration form */}
      <div className="register-form">
        <h2>Sign Up</h2>

        {/* Display error message if any */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister} className="form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // Clear error when user types
            }}
            className="form-input"
            required
          />

          <div className="password-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => setShowPasswordRules(false)}
              onChange={(e) => {
                validatePassword(e.target.value);
                setError("");
              }}
              className="form-input"
              required
            />
            {showPasswordRules && (
              <div className="password-rules-overlay">
                <ul>
                  <li className={passwordValidation.hasMinLength ? "valid" : "invalid"}>
                    Minimum 8 characters
                  </li>
                  <li className={passwordValidation.hasUpperCase ? "valid" : "invalid"}>
                    At least 1 uppercase letter
                  </li>
                  <li className={passwordValidation.hasLowerCase ? "valid" : "invalid"}>
                    At least 1 lowercase letter
                  </li>
                  <li className={passwordValidation.hasNumber ? "valid" : "invalid"}>
                    At least 1 number
                  </li>
                </ul>
              </div>
            )}
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            className="form-input"
            required
          />

          {/* Agree to terms */}
          <div className="terms-container">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              disabled={!termsAcknowledged} // Disable until terms are acknowledged
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <label htmlFor="agreeTerms">
              I agree to the{" "}
              <span
                className="terms-link"
                onClick={() => setShowTermsModal(true)} // Show the modal
              >
                Terms and Conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={
              !(
                passwordValidation.hasMinLength &&
                passwordValidation.hasUpperCase &&
                passwordValidation.hasLowerCase &&
                passwordValidation.hasNumber &&
                agreeTerms
              )
            }
          >
            Signup
          </button>
        </form>

        <p>or signup with</p>
        <div className="social-buttons">
          <button
            className="google-button"
            aria-label="Sign up with Google"
            onClick={() => alert("Google Sign-Up Clicked!")}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="google-icon"
            />
            Sign up with Google
          </button>
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Terms and Conditions</h3>
            <p>
              Please read and accept the terms and conditions before continuing.
              (Replace this text with your actual terms and conditions.)
            </p>
            <button className="acknowledge-button" onClick={handleAcknowledgeTerms}>
              I Accept
            </button>
          </div>
        </div>
      )}

      {/* Right section: Welcome message */}
      <div className="register-welcome">
        <h2>Join Us!</h2>
        <p>
          Create an account to get started. Enjoy exclusive features and connect with
          our amazing community.
        </p>
        <Link href="/login" className="signin-link">
          Already have an account? Sign in.
        </Link>
      </div>
    </div>
    </div>
  );
}
