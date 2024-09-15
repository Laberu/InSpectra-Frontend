// 3DViewer.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Viewer = ({ file, fileType }) => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [camera, setCamera] = useState(null);
  const [cursorStyle, setCursorStyle] = useState('default');
  const [materials, setMaterials] = useState([]); // Store all unique materials
  const [materialCount, setMaterialCount] = useState(0); // Track number of unique materials
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0); // Track the current material index
  const sceneRef = useRef(null); // Store a reference to the scene
  const originalMaterialsRef = useRef([]); // Store original materials of each mesh

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xd3d3d3);
    
    // Disable shadow maps on the renderer
    renderer.shadowMap.enabled = false;
  
    mountRef.current.appendChild(renderer.domElement);
  
    // Add AmbientLight for basic illumination without shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White ambient light
    scene.add(ambientLight);
  
    // Add Orbit Controls
    const controls = new OrbitControls(newCamera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
  
    // Update cursor on mouse events
    const onMouseMove = () => {
      if (controls.state === THREE.MOUSE.ROTATE) {
        setCursorStyle('move');
      } else if (controls.state === THREE.MOUSE.DOLLY) {
        setCursorStyle('zoom-in');
      } else if (controls.state === THREE.MOUSE.PAN) {
        setCursorStyle('grab');
      }
    };
  
    const onMouseUp = () => {
      setCursorStyle('default');
    };
  
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
  
    const adjustModelScaleAndPosition = (object) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
  
      object.position.x += (object.position.x - center.x);
      object.position.y += (object.position.y - center.y);
      object.position.z += (object.position.z - center.z);
  
      const maxDimension = Math.max(size.x, size.y, size.z);
      const fitHeightDistance = maxDimension / (2 * Math.atan((Math.PI * newCamera.fov) / 360));
      const fitWidthDistance = fitHeightDistance / newCamera.aspect;
      const distance = Math.max(fitHeightDistance, fitWidthDistance);
  
      newCamera.position.set(0, 0, distance * 1.5);
      newCamera.lookAt(center);
      controls.target.copy(center);
  
      controls.maxDistance = distance * 3;
    };
  
    const checkTexturesInFBX = (object) => {
      let textureCount = 0;
      object.traverse((child) => {
        if (child.isMesh) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach(mat => {
              if (mat.map) {
                textureCount++;
                console.log('Texture found:', mat.map);
              }
            });
          } else {
            if (material.map) {
              textureCount++;
              console.log('Texture found:', material.map);
            }
          }
        }
      });
      console.log(`Total textures found: ${textureCount}`);
    };
  
    const logFBXHierarchy = (object, depth = 0) => {
      const indent = ' '.repeat(depth * 2);
      console.log(`${indent}${object.name} (${object.type})`);
  
      object.children.forEach((child) => {
        logFBXHierarchy(child, depth + 1);
      });
    };
  
    const collectMaterials = (object) => {
      const uniqueMaterials = new Map();
      const originalMaterials = [];
      object.traverse((child) => {
        if (child.isMesh) {
          originalMaterials.push(child.material);
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach(mat => uniqueMaterials.set(mat.uuid, mat));
          } else {
            uniqueMaterials.set(material.uuid, material);
          }
        }
      });
      setMaterials(Array.from(uniqueMaterials.values()));
      originalMaterialsRef.current = originalMaterials;
    };
  
    const loadModel = () => {
      if (fileType === 'obj') {
        const objLoader = new OBJLoader();
        const mtlLoader = new MTLLoader();
  
        mtlLoader.load(`${file}.mtl`, (materials) => {
          materials.preload();
          objLoader.setMaterials(materials);
          objLoader.load(file, (object) => {
            adjustModelScaleAndPosition(object);
            scene.add(object);
            
            // Disable shadows for all meshes
            scene.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
              }
            });
            
            setLoading(false);
          },
          (xhr) => {
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
          });
        });
      } else if (fileType === 'fbx') {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(file, (object) => {
          checkTexturesInFBX(object);
          logFBXHierarchy(object);
  
          collectMaterials(object);
  
          adjustModelScaleAndPosition(object);
          scene.add(object);
          
          // Disable shadows for all meshes
          scene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = false;
              child.receiveShadow = false;
            }
          });
          
          setLoading(false);
        },
        (xhr) => {
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        });
      }
    };
  
    loadModel();
  
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, newCamera);
    };
    animate();
  
    return () => {
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      mountRef.current.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, [file, fileType]);
  

  const applyMaterial = (materialIndex) => {
    const selectedMaterial = materials[materialIndex];
    if (selectedMaterial) {
      console.log(`Selected Material Index: ${materialIndex}`);
      console.log('Selected Material:', selectedMaterial);
  
      // Traverse the scene and apply the selected material
      sceneRef.current.traverse((child) => {
        if (child.isMesh) {
          const originalMaterial = child.material;
  
          if (Array.isArray(originalMaterial)) {
            originalMaterial.forEach((mat, idx) => {
              const newMaterial = selectedMaterial.clone();
              // Preserve the original texture
              newMaterial.map = mat.map;
              newMaterial.needsUpdate = true;
              child.material[idx] = newMaterial;
            });
          } else {
            const newMaterial = selectedMaterial.clone();
            // Preserve the original texture
            newMaterial.map = originalMaterial.map;
            newMaterial.needsUpdate = true;
            child.material = newMaterial;
          }
        }
      });
      setCurrentMaterialIndex(materialIndex);
    }
  };
  

  return (
    <div className="viewer-container" style={{ cursor: cursorStyle }}>  {/* Apply the dynamic cursor style */}
      {loading && <div className="loader">Loading...</div>}
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />

      {/* Toolbar */}
      <div className="toolbar">
        {/* Dropdown for selecting materials */}
        <select onChange={(e) => applyMaterial(e.target.value)} value={currentMaterialIndex}>
          {materials.map((material, index) => (
            <option key={material.uuid} value={index}>
              {material.name || `Material ${index + 1}`}
            </option>
          ))}
        </select>
        {/* Display the number of unique materials */}
        <div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
