import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const contentDir = join(process.cwd(), 'content');

async function fixLineEndings(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await fixLineEndings(fullPath);
    } else if (entry.name.endsWith('.mdx')) {
      const content = await readFile(fullPath, 'utf-8');
      if (content.includes('\r')) {
        const fixed = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        await writeFile(fullPath, fixed, 'utf-8');
        console.log(`Fixed: ${fullPath}`);
      } else {
        console.log(`OK: ${fullPath}`);
      }
    }
  }
}

fixLineEndings(contentDir).then(() => console.log('Done!'));
