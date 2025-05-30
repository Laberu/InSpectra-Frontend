// src/lib/fetchInfos.js
export async function fetchInfos(modelId, retries = 3, delay = 500) {
  if (modelId.startsWith("d-")) {
    const res = await fetch(`/demo/${modelId}/data.json`);
    const json = await res.json();
    return json.modelInfos;
  }

  for (let i = 0; i < retries; i++) {
    const res = await fetch(`/api/models/${modelId}/data`);
    if (res.ok) {
      const json = await res.json();
      return json.modelInfos;
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw new Error('Failed to fetch data.json');
}
