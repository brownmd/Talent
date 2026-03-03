import sharp from "sharp";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const publicDir = join(projectRoot, "public");
const svgSource = join(publicDir, "logo.svg");

const favicons = [
  { name: "android-chrome-96x96.png", size: 96 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "mstile-150x150.png", size: 150 },
];

async function main() {
  const svgBuffer = readFileSync(svgSource);
  console.log(`Read SVG source (${svgBuffer.length} bytes)`);

  for (const fav of favicons) {
    const pngBuffer = await sharp(svgBuffer, { density: 300 })
      .resize(fav.size, fav.size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const outPath = join(publicDir, fav.name);
    writeFileSync(outPath, pngBuffer);
    console.log(`Generated ${fav.name} (${fav.size}x${fav.size}, ${pngBuffer.length} bytes)`);
  }
  console.log("All favicons generated with transparent backgrounds!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
