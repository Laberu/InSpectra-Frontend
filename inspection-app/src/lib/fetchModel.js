// src/lib/fetchModel.js

export async function fetchModel(modelId) {
    // Simulate fetching model URL based on modelId
    const modelUrl = `/models/${modelId}.fbx`; // Assuming models are in the public/models folder
    return modelUrl;
  }
  