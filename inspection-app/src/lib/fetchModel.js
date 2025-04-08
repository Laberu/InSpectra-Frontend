// src/lib/fetchModel.js

export async function fetchModel(modelId) {
  if (modelId.startsWith("d-")) {
    return `/demo/${modelId}/model.fbx`;
  }

  // This now returns a real API URL
  return `/api/models/${modelId}/fbx`;
}
