"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { modelsData } from "../../data/modelsData";
import Sidebar from "../../components/Sidebar";
import "./dashboard.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [showFilterModal, setShowFilterModal] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       router.replace("/login");
//     }
//   }, [user]);

//   if (!user) return null;

  const handleModelClick = (modelId) => {
    router.push(`/viewer/${modelId}`);
  };

  const filteredModels = modelsData.filter((model) => {
    if (filter === "all") return true;
    if (filter === "finished")
      return model.status === "Finished" && !model.signed;
    if (filter === "finishedSigned")
      return model.status === "Finished" && model.signed;
    if (filter === "ongoing") return model.status === "Ongoing";
    return true;
  });

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
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="model-card"
              onClick={() => handleModelClick(model.id)}
            >
              {model.thumbnail && (
                <div className="thumbnail-container">
                  <img
                    src={model.thumbnail}
                    alt={model.name}
                    className="model-thumbnail"
                  />
                </div>
              )}
              <div
                className={`card-content ${
                  model.thumbnail ? "with-thumbnail" : "no-thumbnail"
                }`}
              >
                <div className="model-top">
                  <h3 className="model-title">{model.name}</h3>
                </div>
                <span
                  className={`model-status ${
                    model.status === "Finished" ? "finished" : "ongoing"
                  } ${model.signed ? "signed" : ""}`}
                >
                  {model.status}
                  {model.signed ? " / Signed" : ""}
                </span>
                {model.description && (
                  <div className="model-description">
                    <p
                      className={`description-box ${
                        model.thumbnail
                          ? "desc-with-thumbnail"
                          : "desc-no-thumbnail"
                      }`}
                    >
                      {model.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showFilterModal && (
          <div
            className="filter-modal-overlay"
            onClick={() => setShowFilterModal(false)}
          >
            <div
              className="filter-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Project Filter</h2>
              <form>
                {["all", "finished", "finishedSigned", "ongoing"].map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="filter"
                      value={value}
                      checked={filter === value}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1).replace("Signed", " / Signed")}
                    <br />
                  </label>
                ))}
              </form>
              <button onClick={() => setShowFilterModal(false)}>
                Apply Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
