// app/api/model/[modelId]/data/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req, { params }) {
  const { modelId } = params;

  const filePath = path.join(process.cwd(), 'tmp', 'storage', modelId, 'data.json');

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    return new NextResponse(file, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Failed to read data.json:', err.message);
    return NextResponse.json({ error: 'data.json not found' }, { status: 404 });
  }
}
