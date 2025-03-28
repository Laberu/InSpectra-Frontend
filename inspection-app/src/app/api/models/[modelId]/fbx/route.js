import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { modelId } = params;
  const filePath = path.join(process.cwd(), 'tmp', 'storage', modelId, 'model.fbx');

  try {
    const stat = fs.statSync(filePath);
    const stream = fs.createReadStream(filePath);

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': stat.size,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
