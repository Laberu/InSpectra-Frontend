// src/app/api/models/[modelId]/route.js
import prisma from '../../../../lib/prismaClient';

export async function GET(request, { params }) {
  const { modelId } = params;

  try {
    // Find the model by ID in the database
    const model = await prisma.model.findUnique({
      where: { id: parseInt(modelId) },
    });

    if (!model) {
      return new Response(JSON.stringify({ error: 'Model not found' }), { status: 404 });
    }

    // Return model details, including the path to the model file
    return new Response(JSON.stringify({ modelPath: model.modelPath }), { status: 200 });
  } catch (error) {
    console.error("Error fetching model:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
