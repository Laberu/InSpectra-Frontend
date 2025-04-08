import path from 'path';
import fs from 'fs/promises';

export async function GET(req, { params }) {
  try {
    const modelId = params.modelId;
    const modelPath = path.join(process.cwd(), 'tmp', 'storage', modelId, 'model.fbx');

    const fileBuffer = await fs.readFile(modelPath);

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${modelId}.fbx"`,
      },
    });
  } catch (err) {
    console.error('[ERROR] Model download failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to download model' }), {
      status: 500,
    });
  }
}
  