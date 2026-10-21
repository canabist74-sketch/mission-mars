import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createMissionPdf } from '../src/utils/generateMissionPdf.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const doc = createMissionPdf();
const arrayBuffer = doc.output('arraybuffer');
const buffer = Buffer.from(arrayBuffer);

const publicDir = path.resolve(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.resolve(publicDir, 'mission_mars_dossier.pdf');
fs.writeFileSync(outputPath, buffer);
console.log('Successfully generated PDF at', outputPath, 'Size:', buffer.length, 'bytes');
