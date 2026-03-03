import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Use the SVG source for best quality + transparent background
const svgUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-LlOmmmB7ANBm5V53DaY4DvjoehUKu3.svg";

const favicons = [
  { name: "android-chrome-96x96.png", size: 96 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
];

async function main() {
  const res = await fetch(svgUrl);
  const svgBuffer = Buffer.from(await res.arrayBuffer());

  for (const fav of favicons) {
    const pngBuffer = await sharp(svgBuffer, { density: 300 })
      .resize(fav.size, fav.size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    writeFileSync(fav.name, pngBuffer);
    console.log(`Generated ${fav.name} (${fav.size}x${fav.size}, ${pngBuffer.length} bytes)`);
  }
  console.log("Done!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
