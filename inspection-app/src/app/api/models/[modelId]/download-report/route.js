import { readFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export async function GET(req, { params }) {
  try {
    const modelId = params.modelId;
    const jsonPath = path.join(process.cwd(), 'tmp', 'storage', modelId, 'report-data.json');
    const jsonData = await readFile(jsonPath, 'utf-8');
    const modelInfos = JSON.parse(jsonData);
    const modelName = modelInfos.modelInfo?.name || modelId;

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Sarabun-Regular.ttf');
    const fontBytes = await fs.promises.readFile(fontPath);
    const sarabunFont = await pdfDoc.embedFont(fontBytes);

    let page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();
    let cursorY = height - 40;
    const fontSize = 12;

    const drawText = (text, x, y, size = fontSize, bold = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: sarabunFont,
        color: rgb(0, 0, 0),
      });
    };

    const drawDivider = (y) => {
      page.drawLine({
        start: { x: 40, y },
        end: { x: width - 40, y },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });
    };

    // Title
    drawText(`รายงานการตรวจสอบ - ${modelName}`, 40, cursorY, 18);
    cursorY -= 20;
    drawDivider(cursorY);
    cursorY -= 20;

    for (let i = 0; i < modelInfos.positions.length; i++) {
      const pos = modelInfos.positions[i];
      const defect = pos.defect;
      if (!defect) continue;

      // Defect block title
      drawText(`ตำแหน่ง ${i + 1}: ${defect.title}`, 40, cursorY, 14);
      cursorY -= 18;

      const lines = [
        `Inspector: ${defect.inspector || 'N/A'}`,
        `Position: ${defect.position || 'N/A'}`,
        `Location: ${defect.location || 'N/A'}`,
        `Date: ${defect.date || 'N/A'}`,
        `DamageTypes: ${defect.damageTypes?.join(', ') || 'N/A'}`,
        `DamageArea: ${defect.damageArea || 'N/A'}`,
        `DamageDepth: ${defect.damageDepth || 'N/A'}`,
        `Accuracy: ${defect.accuracy || 'N/A'}`,
        `Verified: ${defect.verified ? 'ใช่' : 'ไม่ใช่'}`,
      ];

      for (const line of lines) {
        drawText(line, 60, cursorY);
        cursorY -= 14;
      }

      // Embed image if exists
      if (defect.image) {
        const imagePath = path.join(process.cwd(), 'tmp', 'storage', modelId, defect.image);
        if (fs.existsSync(imagePath)) {
          const imgBytes = await fs.promises.readFile(imagePath);
          let img;
          if (defect.image.endsWith('.jpg') || defect.image.endsWith('.jpeg')) {
            img = await pdfDoc.embedJpg(imgBytes);
          } else if (defect.image.endsWith('.png')) {
            img = await pdfDoc.embedPng(imgBytes);
          }

          if (img) {
            const scaled = img.scale(0.25);
            if (cursorY < scaled.height + 60) {
              page = pdfDoc.addPage([595, 842]);
              cursorY = height - 40;
            }

            page.drawImage(img, {
              x: 60,
              y: cursorY - scaled.height,
              width: scaled.width,
              height: scaled.height,
            });

            cursorY -= scaled.height + 10;
          }
        }
      }

      // Divider between blocks
      cursorY -= 10;
      drawDivider(cursorY);
      cursorY -= 20;

      if (cursorY < 120) {
        page = pdfDoc.addPage([595, 842]);
        cursorY = height - 40;
      }
    }

    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=report-${modelName}.pdf`,
      },
    });
  } catch (err) {
    console.error('[ERROR] PDF generation failed:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
