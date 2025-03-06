"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { modelsData } from "../data/modelsData";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Sidebar from "@/components/Sidebar";
import KeyPartners from "../components/KeyPartners";
import Footer from "../components/Footer";
import "./dashboard.css"; // Combined styles in one file

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showFilterModal, setShowFilterModal] = useState(false);

  // On clicking a project card, navigate to /viewer/[id]
  const handleModelClick = (modelId) => {
    router.push(`/viewer/${modelId}`);
  };

  if (!user) {
    return (
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
    );
  }

  return (
<div className="dashboard-layout">
  <Sidebar />
  <div className="dashboard-main">
    <h1 className="models-title">Projects</h1>
    <div className="dashboard-actions">
      <button
        onClick={() => router.push("/create-project")}
        className="new-project-button"
      >
        + New Project
      </button>
      <button
        className="filter-button"
        onClick={() => setShowFilterModal(true)}
      >
        <img src="/filter.svg" alt="Filter" className="filter-icon" />
      </button>
    </div>
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
            <div className="model-top">
              <h3 className="model-title">{model.name}</h3>
              {/* Optionally, add an ellipsis menu here */}
            </div>
            <span
              className={`model-status ${model.status === "Finished" ? "finished" : "ongoing"} ${model.signed ? "signed" : ""}`}
            >
              {model.status}
              {model.signed ? " / Signed" : ""}
            </span>
            {model.description && (
              <div className= "model-description">
                <p className={`description-box ${model.thumbnail ? "desc-with-thumbnail" : "desc-no-thumbnail"}`}>{model.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    {/* Filter Modal (if needed) */}
    {showFilterModal && (
      <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
        <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
          <h2>Project Filter</h2>
          <p>Filter options go here.</p>
          <button onClick={() => setShowFilterModal(false)}>Close</button>
        </div>
      </div>
    )}
  </div>
</div>

  );
}
