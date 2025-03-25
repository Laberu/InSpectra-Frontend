import { unzipSync } from 'fflate';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const zipFile = formData.get('file');
    const modelId = formData.get('modelId');

    if (!zipFile || !modelId) {
      return NextResponse.json({ error: 'Missing file or modelId' }, { status: 400 });
    }

    const buffer = Buffer.from(await zipFile.arrayBuffer());
    const unzipped = unzipSync(new Uint8Array(buffer));
    const targetDir = path.join(process.cwd(), 'public', 'storage', modelId);

    await mkdir(targetDir, { recursive: true });

    const writeTasks = Object.entries(unzipped).map(async ([filename, fileData]) => {
      const filePath = path.join(targetDir, filename);
      const dir = path.dirname(filePath);

      // Skip if this is a folder (empty file data)
      if (!fileData.length) return;

      await mkdir(dir, { recursive: true });
      await writeFile(filePath, Buffer.from(fileData));
    });

    await Promise.all(writeTasks);

    return NextResponse.json({ message: 'Extraction completed' });
  } catch (err) {
    console.error("Zip extract error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
