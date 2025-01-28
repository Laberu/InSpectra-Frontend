// src/lib/fetchInfos.js

export async function fetchInfos(modelId) {
  const modelInfos = {
    Dam_Phrae: {
      positions: [
        //{ name: 'Position 0, position: { x: 50, y: 50, z: 100 }, rotationTarget: { x: 0, y: 0, z: 0 } }, set init camera position all model
        { name: 'Position 1', position: { x: 50, y: 50, z: 100 }, rotationTarget: { x: 0, y: 0, z: 0 } },
        { name: 'Position 2', position: { x: 0, y: 30, z: 50 }, rotationTarget: { x: 10, y: 10, z: 10 } },
      ],
      modelInfo: {
        name: 'Dam Phrae',
        vertices: 12000,
        faces: 6000,
      },
    },

    Another_Model: {
      positions: [
        { name: 'Position 1', position: { x: 10, y: 20, z: 30 }, rotationTarget: { x: 0, y: 0, z: 0 } },
        { name: 'Position 2', position: { x: 40, y: 50, z: 60 }, rotationTarget: { x: 10, y: 10, z: 10 } },
      ],
      modelInfo: {
        name: 'Another Model',
        vertices: 8000,
        faces: 4000,
      },
    },

    overallDOH: {
      positions: [
        { name: 'Position 1', position: { x: 15, y: 25, z: 35 }, rotationTarget: { x: 0, y: 0, z: 0 } },
        { name: 'Position 2', position: { x: 45, y: 55, z: 65 }, rotationTarget: { x: 10, y: 10, z: 10 } },
      ],
      modelInfo: {
        name: 'Overall DOH',
        vertices: 15000,
        faces: 7500,
      },
    },
  };

  return modelInfos[modelId] || null;
}
