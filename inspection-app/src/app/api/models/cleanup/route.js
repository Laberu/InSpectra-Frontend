// src/app/api/models/cleanup/route.js
import { NextResponse } from 'next/server';
import { rm } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const { modelId } = await req.json();
    if (!modelId) {
      return NextResponse.json({ error: 'Missing modelId' }, { status: 400 });
    }

    // Updated path to match tmp-based storage
    const dirPath = path.join(process.cwd(), 'tmp', 'storage', modelId);
    await rm(dirPath, { recursive: true, force: true });

    return NextResponse.json({ message: `Deleted ${modelId} folder.` });
  } catch (err) {
    console.error('Cleanup error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
