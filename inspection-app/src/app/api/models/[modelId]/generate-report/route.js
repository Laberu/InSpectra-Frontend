// src/app/api/models/[modelId]/generate-report/route.js

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req, { params }) {
  try {
    const modelId = params.modelId;
    const body = await req.json();
    const modelInfos = body.modelInfos;

    if (!modelId || !modelInfos) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 });
    }

    const outputDir = path.join(process.cwd(), 'tmp', 'storage', modelId);
    await mkdir(outputDir, { recursive: true });

    const savePath = path.join(outputDir, 'report-data.json');
    await writeFile(savePath, JSON.stringify(modelInfos, null, 2));

    return new Response(JSON.stringify({ message: 'Saved for report generation' }), { status: 200 });
  } catch (err) {
    console.error('[ERROR] Report save failed:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
