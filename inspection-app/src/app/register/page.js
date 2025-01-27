"use client";

import { useState } from "react";
import Link from "next/link";
import "./register.css"; // Import the CSS file for styling

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false); // To handle modal visibility
  const [termsAcknowledged, setTermsAcknowledged] = useState(false); // To check if terms are acknowledged

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

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Registration successful!");
  };

  const handleAcknowledgeTerms = () => {
    setTermsAcknowledged(true);
    setShowTermsModal(false); // Close the modal
  };

  return (
    <div className="register-container">
      {/* Left section: Registration form */}
      <div className="register-form">
        <h2>Signup</h2>
        <form onSubmit={handleRegister} className="form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => validatePassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              (You can replace this text with your actual terms and conditions.)
            </p>
            <button
              className="acknowledge-button"
              onClick={handleAcknowledgeTerms} // Acknowledge terms
            >
              I Accept
            </button>
          </div>
        </div>
      )}

      {/* Right section: Welcome message */}
      <div className="register-welcome">
        <h2>Join Us!</h2>
        <p>
          Create an account to get started. Enjoy exclusive features and connect
          with our amazing community.
        </p>
        <Link href="/login" className="signin-link">
          Already have an account? Signin.
        </Link>
      </div>
    </div>
  );
}
