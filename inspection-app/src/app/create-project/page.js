"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import "./create-project.css";

export default function CreateProject() {
  const router = useRouter();
  const { user } = useAuth();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [zipFile, setZipFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle ZIP file upload
  const handleZipUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".zip")) {
      setZipFile(file);
    } else {
      alert("Please upload a valid .zip file");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !description || !zipFile || !user?.id) {
      alert("Please fill all fields and upload a ZIP file.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", projectName);
    formData.append("description", description);
    formData.append("file", zipFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HUB}/projects/create`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Project Created Successfully!");
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create project");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };    

  return (
    <div className="page-wrapper">
      <div className="create-project-container">
        <h1>Create a New Project</h1>
        <form onSubmit={handleSubmit} className="project-form">
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
  
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
  
          <label>Upload ZIP File:</label>
          <input type="file" accept=".zip" onChange={handleZipUpload} />
  
          {zipFile && (
            <p className="file-name-preview">Selected File: {zipFile.name}</p>
          )}
  
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Creating Project..." : "Create Project"}
          </button>
  
          {isLoading && (
            <div className="loading-spinner">Uploading and processing, please wait...</div>
          )}
        </form>
      </div>
    </div>
  );
  
}
