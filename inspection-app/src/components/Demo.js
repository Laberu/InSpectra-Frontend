"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Demo.css"; // reuse dashboard.css if preferred

export default function Demo() {
  const router = useRouter();
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchDemoModels = async () => {
      try {
        const res = await fetch("/demo/demo-index.json");
        const data = await res.json();
        setModels(data);
      } catch (err) {
        console.error("Failed to load demo models", err);
      }
    };

    fetchDemoModels();
  }, []);

  const handleModelClick = (modelId) => {
    router.push(`/viewer/${modelId}`);
  };

  return (
    <div>
      <h1 className="models-title">DEMO PROJECTS</h1>
      <div className="models-grid">
        {models.slice(0, 6).map((model) => (
          <div
            key={model.job_id}
            className={`model-card ${model.status !== "finished" ? "disabled-card" : ""}`}
            onClick={() => {
              if (model.status === "finished") {
                handleModelClick(model.job_id);
              }
            }}
            title={model.status !== "finished" ? "This demo is still processing." : ""}
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
    </div>
  );
}
