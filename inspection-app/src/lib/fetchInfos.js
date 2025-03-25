// src/lib/fetchInfos.js

export async function fetchInfos(modelId) {
  const res = await fetch(`/storage/${modelId}/data.json`);
  if (!res.ok) throw new Error('Failed to fetch data.json');

  const json = await res.json();

  // Return only the modelInfos object (the one that includes positions and modelInfo)
  return json.modelInfos;
}
