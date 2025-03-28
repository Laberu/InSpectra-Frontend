// components/Viewer.js

"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { gsap } from 'gsap';
import './Viewer.css'; // Import the new CSS

const Viewer = ({ modelUrl, textureSets, modelInfos }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const ambientLightRef = useRef(null);
  const cameraRef = useRef(null);

  // States
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#d3d3d3');
  const [lightIntensity, setLightIntensity] = useState(1);
  const [selectedTextureSet, setSelectedTextureSet] = useState('setA');
  const [selectedPosition, setSelectedPosition] = useState(null);


  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [assistantLoading, setAssistantLoading] = useState(false);


  // Model/camera info
  const { positions = [], modelInfo = {} } = modelInfos || {};

  // Tool sections expansion
  const [expandedSections, setExpandedSections] = useState({
    general: false,
    lighting: false,
    textures: false,
    camera: false,
  });

  // Initial camera
  const initialCameraPosition = {
    position: [50, 50, 100],//TODO: Change the initial camera position to api data
    target: [0, 0, 0],
  };

  // Toggle expansions
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Apply textures
  const applyTextureSet = (model, textures, loader) => {
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((material) => {
          const textureFile = textures[material.name];
          if (textureFile) {
            const texture = loader.load(textureFile);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            material.map = texture;
            material.needsUpdate = true;
          }
        });
      }
    });
  };

  // Move camera with gsap
  const moveCameraToPosition = (index) => {
    const selected = positions[index];
    if (!selected || !cameraRef.current || !controlsRef.current) return;

    const { position, rotationTarget } = selected;
    gsap.to(cameraRef.current.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        cameraRef.current.lookAt(rotationTarget.x, rotationTarget.y, rotationTarget.z);
      },
      onComplete: () => {
        controlsRef.current.target.set(rotationTarget.x, rotationTarget.y, rotationTarget.z);
        controlsRef.current.update();
        setSelectedPosition(selected);
      },
    });
  };

  // Init scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.set(...initialCameraPosition.position);
    cameraRef.current = camera;

    // Renderer
    let renderer = rendererRef.current;
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = false; 
      renderer.autoClear = true;
      rendererRef.current = renderer;
    }
    mountRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(backgroundColor);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, lightIntensity);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.maxDistance = 8000;
    controlsRef.current = controls;
    controls.target.set(...initialCameraPosition.target);
    controls.update();

    // Load Model
    const loadModel = () => {
      if (!modelUrl) return;
      setLoading(true);
      const fbxLoader = new FBXLoader();
      const textureLoader = new THREE.TextureLoader();

      fbxLoader.load(
        modelUrl,
        (object) => {
          modelRef.current = object;
          scene.add(object);
          applyTextureSet(
            object,
            textureSets[selectedTextureSet],
            textureLoader
          );
          setLoading(false);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          setLoading(false);
        }
      );
    };
    loadModel();

    // Animation loop
    const animate = () => {
      renderer.clear();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!camera || !renderer || !mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  mat.map?.dispose();
                  mat.dispose();
                });
              } else {
                child.material.map?.dispose();
                child.material.dispose();
              }
            }
          }
        });
      }
      scene.clear();
    };
  }, [modelUrl]);

  // Light intensity changes
  useEffect(() => {
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = lightIntensity;
    }
  }, [lightIntensity]);

  // Background color changes
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(backgroundColor);
    }
  }, [backgroundColor]);

  // TextureSet changes
  useEffect(() => {
    if (modelRef.current) {
      const textureLoader = new THREE.TextureLoader();
      applyTextureSet(
        modelRef.current,
        textureSets[selectedTextureSet],
        textureLoader
      );
    }
  }, [selectedTextureSet]);

  // Handlers
  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };
  const handleLightIntensityChange = (e) => {
    setLightIntensity(parseFloat(e.target.value));
  };
  const handleTextureSetChange = (e) => {
    setSelectedTextureSet(e.target.value);
  };

  // Reset camera
  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    gsap.to(cameraRef.current.position, {
      x: initialCameraPosition.position[0],
      y: initialCameraPosition.position[1],
      z: initialCameraPosition.position[2],
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        cameraRef.current.lookAt(
          initialCameraPosition.target[0],
          initialCameraPosition.target[1],
          initialCameraPosition.target[2]
        );
      },
      onComplete: () => {
        controlsRef.current.target.set(
          ...initialCameraPosition.target
        );
        controlsRef.current.update();
      },
    });
  };

  const closeInfoPanel = () => {
    setSelectedPosition(null);
  };

  return (
    <div className="viewer-container">
      {/* Tools Bar */}
      <div className="tools-bar">
        <h2>Project</h2>

        {/* General Settings */}
        <div className="tools-section">
          <div className="tools-header" onClick={() => toggleSection('general')}>
            General Settings {expandedSections.general ? '▲' : '▼'}
          </div>
          {expandedSections.general && (
            <div className="tools-content">
              <label>Background Color:</label>
              <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
            </div>
          )}
        </div>

        {/* Lighting Settings */}
        <div className="tools-section">
          <div className="tools-header" onClick={() => toggleSection('lighting')}>
            Lighting {expandedSections.lighting ? '▲' : '▼'}
          </div>
          {expandedSections.lighting && (
            <div className="tools-content">
              <label>Global Light Intensity:</label>
              <input type="range" min="0" max="2" step="0.1" value={lightIntensity} onChange={(e) => setLightIntensity(parseFloat(e.target.value))} />
            </div>
          )}
        </div>

        {/* Texture Settings */}
        <div className="tools-section">
          <div className="tools-header" onClick={() => toggleSection('textures')}>
            Textures {expandedSections.textures ? '▲' : '▼'}
          </div>
          {expandedSections.textures && (
            <div className="tools-content">
              <label>Select Texture Set:</label>
              <select value={selectedTextureSet} onChange={(e) => setSelectedTextureSet(e.target.value)}>
                {Object.keys(textureSets).map((setName) => (
                  <option key={setName} value={setName}>{setName}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Camera Settings */}
        <div className="tools-section">
          <div className="tools-header" onClick={() => toggleSection('camera')}>
            Camera {expandedSections.camera ? '▲' : '▼'}
          </div>
          {expandedSections.camera && (
            <div className="tools-content">
              {positions.map((pos, index) => (
                <button key={index} onClick={() => moveCameraToPosition(index)}>
                  {pos.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Project Assistant */}
        <div className="tools-section">
          <div className="tools-header" onClick={() => toggleSection('assistant')}>
            Project Assistant {expandedSections.assistant ? '▲' : '▼'}
          </div>
          {expandedSections.assistant && (
            <div className="tools-content">
              <textarea
                placeholder="Ask something about the model or code..."
                value={assistantQuery}
                onChange={(e) => setAssistantQuery(e.target.value)}
                rows={3}
                style={{ width: '100%' }}
              />
              <button
                onClick={async () => {
                  setAssistantLoading(true);
                  setAssistantResponse('');
                  try {
                    const res = await fetch('/api/project-assistant', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        query: assistantQuery,
                        modelInfos,
                      }),
                    });           
                    const data = await res.json();
                    setAssistantResponse(data.answer);
                  } catch (err) {
                    setAssistantResponse('Error getting response.');
                  }
                  setAssistantLoading(false);
                }}
                disabled={assistantLoading || !assistantQuery.trim()}
              >
                {assistantLoading ? 'Thinking...' : 'Ask'}
              </button>
              {assistantResponse && (
                <div className="assistant-response">
                  <strong>Response:</strong>
                  <p>{assistantResponse}</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Main 3D Viewer */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Info Panel */}
      {selectedPosition && selectedPosition.defect && (
      <div className="info-panel">
        {/* Top Image Section */}
        <div className="info-panel__image">
          <img
            src={selectedPosition.defect.title || 'Defect Image'}
          />
          <button className="info-panel__close" onClick={closeInfoPanel}>✖</button>
        </div>

        {/* Defect Header */}
        <div className="info-panel__header">
          <p>{selectedPosition.defect.title || 'Unknown Defect'}</p>
        </div>

        {/* Property Table */}
        <div className="info-panel__table">
          <table>
            <tbody>
              <tr><th>Inspector</th><td>{selectedPosition.defect.inspector || 'N/A'}</td></tr>
              <tr><th>Position</th><td>{selectedPosition.defect.position || 'N/A'}</td></tr>
              <tr><th>Date</th><td>{selectedPosition.defect.date || 'N/A'}</td></tr>
              <tr><th>Damage Types</th><td>{selectedPosition.defect.damageTypes?.join(', ') || 'N/A'}</td></tr>
              <tr><th>Accuracy</th><td>{selectedPosition.defect.accuracy || 'N/A'}</td></tr>
              <tr><th>Damage Levels</th><td>{selectedPosition.defect.damageLevels || 'N/A'}</td></tr>
              <tr><th>Verified</th><td>{selectedPosition.defect.verified ? 'Yes' : 'No'}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Additional Details */}
        <div className="info-panel__details">
          <h4>Additional Details</h4>
          <p><strong>Location:</strong> {selectedPosition.defect.location || 'N/A'}</p>
          <p><strong>Damage Area:</strong> {selectedPosition.defect.damageArea || 'N/A'}</p>
          <p><strong>Damage Depth:</strong> {selectedPosition.defect.damageDepth || 'N/A'}</p>
        </div>

      </div>
    )}
    </div>
  );
};

export default Viewer;