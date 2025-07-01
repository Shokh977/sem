import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyTinyMCE() {
  const source = join(__dirname, '..', 'node_modules', 'tinymce');
  const destination = join(__dirname, '..', 'public', 'tinymce');

  try {
    await fs.copy(source, destination);
    console.log('TinyMCE files copied successfully!');
  } catch (err) {
    console.error('Error copying TinyMCE files:', err);
  }
}

copyTinyMCE();
