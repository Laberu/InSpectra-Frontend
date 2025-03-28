export async function fetchTextures(modelId) {
  const res = await fetch(`/api/model/${modelId}/data`);
  if (!res.ok) throw new Error('Failed to fetch data.json');

  const json = await res.json();
  const textureSets = json.textureSets;

  for (const setName in textureSets) {
    const set = textureSets[setName];
    for (const key in set) {
      set[key] = `/api/model/${modelId}/texture?file=${encodeURIComponent(set[key])}`;
    }
  }

  return textureSets;
}
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { modelId } = params;
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'Missing file param' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'tmp', 'storage', modelId, file);

  try {
    const stat = fs.statSync(filePath);
    const stream = fs.createReadStream(filePath);

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg', // or detect dynamically if needed
        'Content-Length': stat.size,
      },
    });
  } catch (err) {
    console.error('[TEXTURE API] Failed to load texture:', filePath);
    return NextResponse.json({ error: 'Texture not found' }, { status: 404 });
  }
}
