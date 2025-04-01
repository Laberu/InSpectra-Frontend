"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import "./register.css"; // Reuse the register styles

export default function ResetPasswordPage() {
  const { id, token } = useParams();
  const router = useRouter();
  const AUTH_BACKEND_API_URL = process.env.NEXT_PUBLIC_AUTH_BACKEND_API_URL;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });

  const validatePassword = (value) => {
    setNewPassword(value);
    setPasswordValidation({
      hasMinLength: value.length >= 8,
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      !(
        passwordValidation.hasMinLength &&
        passwordValidation.hasUpperCase &&
        passwordValidation.hasLowerCase &&
        passwordValidation.hasNumber
      )
    ) {
      setError("Password does not meet the required rules.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${AUTH_BACKEND_API_URL}/auth/reset-password/${id}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed.");
      } else {
        setMessage("✅ Password reset successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <div className="register-form">
          <h2>Reset Password</h2>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="form-message">{message}</p>}

          <form onSubmit={handleSubmit} className="form-container">
            <div className="password-field">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
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

            <button
              type="submit"
              className="signup-button"
              disabled={
                !(
                  passwordValidation.hasMinLength &&
                  passwordValidation.hasUpperCase &&
                  passwordValidation.hasLowerCase &&
                  passwordValidation.hasNumber
                )
              }
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p style={{ marginTop: "1rem" }}>
            <Link href="/login" className="signin-link">
              Back to Login
            </Link>
          </p>
        </div>

        <div className="register-welcome">
          <h2>Welcome Back!</h2>
          <p>
            Set a new password that’s strong and secure.
            Make sure both fields match before submitting.
          </p>
        </div>
      </div>
    </div>
  );
}
