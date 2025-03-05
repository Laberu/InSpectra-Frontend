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

  // On clicking a project card, navigate to /viewer/[id]
  const handleModelClick = (modelId) => {
    router.push(`/viewer/${modelId}`);
  };

  return (
    <div>
      {/* UNAUTHENTICATED VIEW: Hero + Key Partners + Footer */}
      {!user ? (
        <>
          <Navbar />
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

          <div className="key-partners-section">
            <KeyPartners />
          </div>
          <Footer />
        </>
      ) : (
        /* AUTHENTICATED VIEW: Show the dashboard container + project cards */
        <div className="dashboard-container">
          <div className="dashboard-actions">
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>

          {/* Projects */}
          <h1 className="models-title">Projects</h1>
          <button
              onClick={() => router.push("/create-project")}
              className="new-project-button"
            >
              + New Project
            </button>
          <div className="models-grid">
          {modelsData.map((model) => (
          <div
            key={model.id}
            className="model-card"
            onClick={() => handleModelClick(model.id)}
          >
            {model.thumbnail ? (
              <div className="thumbnail-container">
                <img
                  src={model.thumbnail}
                  alt={model.name}
                  className="model-thumbnail"
                />
              </div>
            ) : null}
            <div className={`card-content ${model.thumbnail ? "with-thumbnail" : "no-thumbnail"}`}>
              {/* Top Row: Title */}
              <div className="model-top">
                <h3 className="model-title">{model.name}</h3>
                {/* Optionally, add an ellipsis menu here */}
              </div>

              {/* Merged Status */}
              <span
                className={`model-status ${
                  model.status === "Finished" ? "finished" : "ongoing"
                } ${model.signed ? "signed" : ""}`}
              >
                {model.status}
                {model.signed ? " / Signed" : ""}
              </span>

              {/* Description */}
              {model.description && (
              <p
                className={`model-description ${
                  model.thumbnail ? "desc-with-thumbnail" : "desc-no-thumbnail"
                }`}
              >
                {model.description}
              </p>
            )}
            </div>
          </div>
        ))}

          </div>
        </div>
      )}
    </div>
  );
}
