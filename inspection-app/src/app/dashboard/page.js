"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import "./dashboard.css";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [models, setModels] = useState([]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  // Fetch project models from API
  useEffect(() => {
    if (!loading && user) {
      const fetchProjects = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_HUB}/status/user/${user.id}`);
          const data = await res.json();
          setModels(data);
        } catch (err) {
          console.error("Failed to fetch projects:", err);
        }
      };

      fetchProjects();
    }
  }, [user, loading]);

  if (loading || !user) return null;

  const handleModelClick = (modelId) => {
    router.push(`/viewer/${modelId}`);
  };

  const filteredModels = models.filter((model) => {
    if (filter === "all") return true;
    if (filter === "finished") return model.status === "finished" && !model.signed;
    if (filter === "finishedSigned") return model.status === "finished" && model.signed;
    if (filter === "ongoing") return model.status === "Ongoing" || model.status === "processing";
    return true;
  });

  const handleDelete = async (modelId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HUB}/projects/delete/${modelId}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setModels((prev) => prev.filter((model) => model.job_id !== modelId));
      } else {
        console.error("Failed to delete project.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };  

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
              key={model.job_id}
              className="model-card"
              onClick={() => handleModelClick(model.job_id)}
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
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleDelete(model.job_id);
                  }}
                  title="Delete project"
                >
                  🗑️
                </button>
              </div>

                <span
                  className={`model-status ${
                    model.status === "finished" ? "finished" : "ongoing"
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
                    {value.charAt(0).toUpperCase() +
                      value.slice(1).replace("Signed", " / Signed")}
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
