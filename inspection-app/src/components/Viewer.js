// components/Viewer.js

"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { gsap } from 'gsap';
import './Viewer.css'; // Import the new CSS

const Viewer = ({ modelUrl, textureSets, modelInfos}) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const ambientLightRef = useRef(null); // Reference for ambient light
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#d3d3d3");
  const [lightIntensity, setLightIntensity] = useState(1);
  const [selectedTextureSet, setSelectedTextureSet] = useState("setA");
  const cameraRef = useRef(null);
  const [selectedPosition, setSelectedPosition] = useState(null);


  const initialCameraPosition = { position: [50, 50, 100], target: [0, 0, 0] };

  const { positions, modelInfo } = modelInfos || {
    positions: [],
    modelInfo: { name: '', vertices: 0, faces: 0 },
  };


  const [expandedSections, setExpandedSections] = useState({
    general: false,
    lighting: false,
    textures: false,
    camera: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };


  const applyTextureSet = (model, textures, loader) => {
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
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

  
  const moveCameraToPosition = (index) => {
    const selected = positions[index];
    if (!selected || !cameraRef.current || !controlsRef.current) {
      console.warn('⚠️ Invalid position or camera is not ready');
      return;
    }
  
    const { position, rotationTarget } = selected;
  
    gsap.to(cameraRef.current.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        cameraRef.current.lookAt(rotationTarget.x, rotationTarget.y, rotationTarget.z);
      },
      onComplete: () => {
        controlsRef.current.target.set(rotationTarget.x, rotationTarget.y, rotationTarget.z);
        controlsRef.current.update();
  
        // Set selected position details
        setSelectedPosition(selected);
      },
    });
  };
  


  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 10000);
    camera.position.set(...initialCameraPosition.position);
    cameraRef.current = camera;
    
    let renderer = rendererRef.current;
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.autoClear = true; // Ensures each frame clears the previous frame
      rendererRef.current = renderer;
    }
    mountRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(backgroundColor);

    // Add ambient light and store its reference
    const ambientLight = new THREE.AmbientLight(0xffffff, lightIntensity);
    ambientLightRef.current = ambientLight; // Store reference
    scene.add(ambientLight);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.maxDistance = 8000;
    controlsRef.current = controls;
    controls.target.set(...initialCameraPosition.target);
    controls.update();

    // Load the model and apply texture set
    const loadModel = () => {
      if (modelUrl) {
        setLoading(true);
        const fbxLoader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        fbxLoader.load(
          modelUrl,
          (object) => {
            modelRef.current = object;
            scene.add(object);
            applyTextureSet(object, textureSets[selectedTextureSet], textureLoader);
            setLoading(false);
          },
          undefined,
          (error) => {
            console.error("Error loading model:", error);
            setLoading(false);
          }
        );
      }
    };

    loadModel();

    // Animation loop with clear command and control updates
    const animate = () => {
      renderer.clear();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resizing
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      modelRef.current?.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
          child.material.map?.dispose();
        }
      });
      scene.clear();
    };
  }, [modelUrl]);

  // Update light intensity based on `lightIntensity` state
  useEffect(() => {
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = lightIntensity;
    }
  }, [lightIntensity]);

  // Update background color based on `backgroundColor` state
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(backgroundColor);
    }
  }, [backgroundColor]);

  // Reapply textures on texture set change
  useEffect(() => {
    if (modelRef.current) {
      const textureLoader = new THREE.TextureLoader();
      applyTextureSet(modelRef.current, textureSets[selectedTextureSet], textureLoader);
    }
  }, [selectedTextureSet]);

  const handleBackgroundColorChange = (e) => setBackgroundColor(e.target.value);
  const handleLightIntensityChange = (e) => setLightIntensity(parseFloat(e.target.value));
  const handleTextureSetChange = (e) => setSelectedTextureSet(e.target.value);

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      gsap.to(cameraRef.current.position, {
        x: initialCameraPosition.position[0],
        y: initialCameraPosition.position[1],
        z: initialCameraPosition.position[2],
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          cameraRef.current.lookAt(
            initialCameraPosition.target[0],
            initialCameraPosition.target[1],
            initialCameraPosition.target[2]
          );
        },
        onComplete: () => {
          controlsRef.current.target.set(
            initialCameraPosition.target[0],
            initialCameraPosition.target[1],
            initialCameraPosition.target[2]
          );
          controlsRef.current.update();
        },
      });
    }
  };

  const closeInfoPanel = () => setSelectedPosition(null);

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
              <button onClick={resetCamera}>Reset Camera</button>
            </div>
          )}
        </div>
      </div>

      {/* Main 3D Viewer */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Info Panel */}
      {selectedPosition && (
        <div className="info-panel">
          {/* Top Image Section */}
          <div className="info-panel__image">
            <img
              src="https://via.placeholder.com/600x300" 
              alt="Defect Detail"
            />
            <button className="info-panel__close" onClick={closeInfoPanel}>✖</button>
          </div>

          {/* Defect Header */}
          <div className="info-panel__header">
            <p>Defect N/A</p>
          </div>

          {/* Property Table */}
          <div className="info-panel__table">
            <table>
              <tbody>
                <tr>
                  <th>Inspector</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Position</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Damage Types</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Accuracy</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Damage Levels</th>
                  <td>N/A</td>
                </tr>
                <tr>
                  <th>Verified</th>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Details */}
          <div className="info-panel__details">
            <h4>Additional Details</h4>
            <p><strong>Location:</strong> N/A</p>
            <p><strong>Damage Area:</strong> N/A</p>
            <p><strong>Damage Depth:</strong> N/A</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewer;