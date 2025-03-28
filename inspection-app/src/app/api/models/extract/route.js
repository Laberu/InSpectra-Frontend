import { unzipSync } from 'fflate';
import { writeFile, mkdir, access } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const modelId = formData.get('modelId');

    if (!modelId) {
      console.error('[ERROR] Missing modelId in formData');
      return NextResponse.json({ error: 'Missing modelId' }, { status: 400 });
    }

    const downloadUrl = `${process.env.NEXT_PUBLIC_STORAGE_BACKEND}/projects/download/job/${modelId}`;
    console.log(`[DEBUG] Fetching zip from: ${downloadUrl}`);

    const zipRes = await fetch(downloadUrl);
    if (!zipRes.ok) {
      console.error(`[ERROR] Zip download failed. Status: ${zipRes.status}`);
      return NextResponse.json(
        { error: `Failed to download zip. Status ${zipRes.status}` },
        { status: zipRes.status }
      );
    }

    const buffer = Buffer.from(await zipRes.arrayBuffer());
    const unzipped = unzipSync(new Uint8Array(buffer));
    console.log('[DEBUG] Files inside ZIP:', Object.keys(unzipped));

    const targetDir = path.join(process.cwd(), 'tmp', 'storage', modelId);
    await mkdir(targetDir, { recursive: true });
    console.log('[DEBUG] Created targetDir:', targetDir);

    const writeTasks = Object.entries(unzipped).map(async ([filename, fileData]) => {
      const filePath = path.join(targetDir, filename);
      const dir = path.dirname(filePath);

      if (!fileData.length) {
        console.log('[DEBUG] Skipping folder:', filename);
        return;
      }

      await mkdir(dir, { recursive: true });
      console.log('[DEBUG] Writing file:', filePath);
      await writeFile(filePath, Buffer.from(fileData));
    });

    await Promise.all(writeTasks);
    console.log('[DEBUG] All files written successfully.');

    // Confirm accessibility
    const dataPath = path.join(targetDir, 'data.json');
    const modelPath = path.join(targetDir, 'model.fbx');

    let attempts = 0;
    while (attempts < 5) {
      try {
        await access(dataPath);
        await access(modelPath);
        console.log('[DEBUG] Files confirmed accessible.');
        break;
      } catch (err) {
        console.warn(`[DEBUG] Retry ${attempts + 1}: Files not ready yet...`);
        await new Promise(resolve => setTimeout(resolve, 200));
        attempts++;
      }
    }

    if (attempts === 5) {
      console.error('[ERROR] File access check failed after 5 retries');
      return NextResponse.json({ error: 'Files not accessible after extraction' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Extraction completed',
      extractedFiles: Object.keys(unzipped), // 🐞 remove later in production
    });
  } catch (err) {
    console.error('Zip extract error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
