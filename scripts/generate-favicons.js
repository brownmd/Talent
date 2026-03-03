import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const sourceImage = join(projectRoot, "public", "logo.png");
const outputDir = join(projectRoot, "public");

const favicons = [
  { name: "android-chrome-96x96.png", size: 96 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
];

async function generateFavicons() {
  for (const favicon of favicons) {
    const outputPath = join(outputDir, favicon.name);
    await sharp(sourceImage)
      .resize(favicon.size, favicon.size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toFile(outputPath);
    console.log(`Generated ${favicon.name} (${favicon.size}x${favicon.size})`);
  }
  console.log("All favicons generated successfully!");
}

generateFavicons().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
