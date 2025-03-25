// src/app/viewer/[modelId]/page.js
"use client";

import ProtectedRoute from '../../../components/ProtectedRoute';
import Viewer from '../../../components/Viewer';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchModel } from '../../../lib/fetchModel';
import { fetchTextures } from '../../../lib/fetchTextures';
import { fetchInfos } from '../../../lib/fetchInfos';


export default function ViewerPage() {
  const { modelId } = useParams();
  const [modelUrl, setModelUrl] = useState(null);
  const [textureSets, setTextureSets] = useState(null);
  const [modelInfos, setModelInfos] = useState(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const model = await fetchModel(modelId);
        const textures = await fetchTextures(modelId);
        const infos = await fetchInfos(modelId);
        setModelUrl(model);
        setTextureSets(textures);
        setModelInfos(infos);
      } catch (error) {
        console.error("Error fetching model or textures:", error);
      }
    };
    loadResources();
  }, [modelId]);

  if (!modelUrl || !textureSets || !modelInfos) {
    return <div>Loading...</div>;
  }

  return (
    // <ProtectedRoute>
      <div>
        <Viewer modelUrl={modelUrl} textureSets={textureSets} modelInfos={modelInfos}/>
      </div>
    // </ProtectedRoute>
  );
}
