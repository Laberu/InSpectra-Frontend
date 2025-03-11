"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import "./create-project.css";

export default function CreateProject() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];

    setImages(newImages);

    // Generate image previews
    const newPreviews = [...imagePreviews, ...files.map((file) => URL.createObjectURL(file))];
    setImagePreviews(newPreviews);
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !description || images.length === 0) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("description", description);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("/api/create-project", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Project Created Successfully!");
        router.push("/dashboard");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
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

          <label>Upload Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />

          {/* Display selected images with remove button */}
          <div className="image-preview">
            {imagePreviews.map((src, index) => (
              <div key={index} className="image-container">
                <img src={src} alt={`Preview ${index}`} />
                <button type="button" className="remove-button" onClick={() => handleRemoveImage(index)}>
                  ✖
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">Create Project</button>
        </form>
      </div>
    </div>
  );
}
