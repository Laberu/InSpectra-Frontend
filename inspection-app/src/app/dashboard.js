"use client";

import { useAuth } from "../context/AuthContext";
import { modelsData } from "../data/modelsData";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import KeyPartners from "../components/KeyPartners";
import Footer from "../components/Footer";
import "./dashboard.css"; // Combined styles in one file

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleModelClick = (modelId) => {
    router.push(`/viewer/${modelId}`);
  };

  return (
    <div>
      <Navbar />

      {!user ? (
        <>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Elevate Asset Management with AI-Powered Inspections</h1>
            <p>
              InSpectra’s cloud-based inspection portal ties building owners and
              engineers closer with accurate, real-time data and insights that
              identify critical areas of concern. With AI Defect Detection
              capabilities, you can streamline reporting, reduce exterior damage
              faster, and see more accurately than traditional methods.
            </p>
            <button className="hero-cta" onClick={() => router.push("/login")}>
              Demo
            </button>
          </div>

          <div className="hero-image-container">
            <img src="/bridge.png" alt="Bridge" className="hero-image" />
          </div>
        </div>

        {/* Key Partners Section (or any other content) */}
        <div className="key-partners-section">
          <KeyPartners />
        </div>
        <Footer />
      </>
      ) : (
        /* If user IS logged in, show the dashboard content */
        <div className="dashboard-container">
          {/* Welcome Section */}
          <div className="user-info">
            <h2>Welcome, {user.email}</h2>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>

          <div className="dashboard-actions">
            <button onClick={logout} className="logout-button">Logout</button>
            <button onClick={() => router.push("/create-project")} className="new-project-button">
              + New Project
            </button>
          </div>

          {/* Model Section */}
          <h1 className="models-title">Select a Model</h1>
          <div className="models-grid">
            {modelsData.map((model) => (
              <div
                key={model.id}
                className="model-card"
                onClick={() => handleModelClick(model.id)}
              >
                {model.thumbnail ? (
                  <img
                    src={model.thumbnail}
                    alt={model.name}
                    className="model-image"
                  />
                ) : (
                  <div className="model-placeholder"></div>
                )}
                <h3 className="model-name">{model.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
