// src/lib/fetchModel.js

export async function fetchModel(modelId) {
  // This now returns a real API URL
  return `/api/models/${modelId}/fbx`;
}
