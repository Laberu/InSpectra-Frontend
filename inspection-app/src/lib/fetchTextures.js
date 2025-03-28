// src/lib/fetchTextures.js

export async function fetchTextures(modelId) {
  const res = await fetch(`/api/models/${modelId}/data`);
  if (!res.ok) throw new Error('Failed to fetch data.json');

  const json = await res.json();
  const textureSets = json.textureSets;

  // Fix paths to use API endpoint
  for (const setName in textureSets) {
    const set = textureSets[setName];
    for (const key in set) {
      set[key] = `/api/models/${modelId}/texture?file=${encodeURIComponent(set[key])}`;
    }
  }

  return textureSets;
}
