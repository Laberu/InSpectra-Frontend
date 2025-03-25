// src/lib/fetchModel.js

export async function fetchModel(modelId) {
    // Simulate fetching model URL based on modelId
    const modelUrl = `/storage/${modelId}/model.fbx`; // Assuming models are in the public/models folder
    return modelUrl;
  }
  