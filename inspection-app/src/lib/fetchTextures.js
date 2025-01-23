// src/lib/fetchTextures.js

export async function fetchTextures(modelId) {
    // Define texture sets based on modelId
    const textureSets = {
      Dam_Phrae: {
        setA: {
          "DAM.1001": `/textures/Dam_Phrae/setA/DAM.1001.jpg`,
          "DAM.1002": `/textures/Dam_Phrae/setA/DAM.1002.jpg`,
        },
        setB: {
          "DAM.1001": `/textures/Dam_Phrae/setB/DAM.1001.jpg`,
          "DAM.1002": `/textures/Dam_Phrae/setB/DAM.1002.jpg`,
        },
        // Add more sets if needed
      },
      // Define other models as needed
      Another_Model: {
        setA: {
          "Material1": `/textures/Another_Model/setA/Material1.jpg`,
          "Material2": `/textures/Another_Model/setA/Material2.jpg`,
        },
        setB: {
          "Material1": `/textures/Another_Model/setB/Material1.jpg`,
          "Material2": `/textures/Another_Model/setB/Material2.jpg`,
        },
      },
      overallDOH: {
        setA: {
          "DAM.1001": `/textures/Dam_Phrae/setA/DAM.1001.jpg`,
          "DAM.1002": `/textures/Dam_Phrae/setA/DAM.1002.jpg`,
        },
        setB: {
          "DAM.1001": `/textures/Dam_Phrae/setB/DAM.1001.jpg`,
          "DAM.1002": `/textures/Dam_Phrae/setB/DAM.1002.jpg`,
        },
        // Add more sets if needed
      },
    };
  
    // Return texture sets for the specified modelId
    return textureSets[modelId];
  }
  