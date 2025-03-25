// src/lib/fetchTextures.js

export async function fetchTextures(modelId) {
  const res = await fetch(`/storage/${modelId}/data.json`);
  if (!res.ok) throw new Error('Failed to fetch data.json');

  const json = await res.json();
  const textureSets = json.textureSets;

  // Fix paths to be absolute
  for (const setName in textureSets) {
    const set = textureSets[setName];
    for (const key in set) {
      set[key] = `/storage/${modelId}/${set[key]}`;
    }
  }

  return textureSets;
}
