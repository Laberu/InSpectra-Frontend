"use client";

import Viewer from '../../../components/Viewer';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchModel } from '../../../lib/fetchModel';
import { fetchTextures } from '../../../lib/fetchTextures';
import { fetchInfos } from '../../../lib/fetchInfos';
import './ViewerPage.css';

export default function ViewerPage() {
  const { modelId } = useParams();
  const [modelUrl, setModelUrl] = useState(null);
  const [textureSets, setTextureSets] = useState(null);
  const [modelInfos, setModelInfos] = useState(null);
  const [extracted, setExtracted] = useState(false);

  useEffect(() => {
    const extractZipAndLoad = async () => {
      try {
        const formData = new FormData();
        formData.append("modelId", modelId);
  
        const postRes = await fetch("/api/models/extract", {
          method: "POST",
          body: formData,
        });
  
        if (!postRes.ok) throw new Error("Zip extraction failed");

        // Wait 300ms after extraction finishes
        await new Promise((resolve) => setTimeout(resolve, 300));

        setExtracted(true);
      } catch (err) {
        console.error("Extraction failed:", err);
      }
    };
  
    extractZipAndLoad();
  }, [modelId]);
  

  useEffect(() => {
    if (!extracted) return;

    const loadResources = async () => {
      try {
        const model = await fetchModel(modelId);
        const textures = await fetchTextures(modelId);
        const infos = await fetchInfos(modelId);
        setModelUrl(model);
        console.log("Model URL:", model);
        
        setTextureSets(textures);
        console.log("Texture Sets:", textures);
        
        setModelInfos(infos);
        console.log("Model Infos:", infos);
      } catch (error) {
        console.error("Error loading extracted resources:", error);
      }
    };

    loadResources();

      // 🧹 Cleanup when navigating away
  return () => {
    fetch('/api/models/cleanup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelId }),
    }).catch((err) => console.error("Cleanup failed:", err));
  };

    
  }, [modelId, extracted]);

  if (!modelUrl || !textureSets || !modelInfos) {
    return (
      <div className="loading-screen">
        <div className="loading-box">
          <div className="loading-spinner" />
          <p>Loading model, textures & metadata...</p>
        </div>
      </div>
    );
  }
  
  else{
      return (
      // <ProtectedRoute>
      <div>
        <Viewer
          modelUrl={modelUrl}
          textureSets={textureSets}
          modelInfos={modelInfos}
          modelId={modelId}
        />

      </div>
      // </ProtectedRoute>
    );
  }


}
