import sharp from "sharp";
import { writeFileSync } from "fs";

const sourceUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-I9x7UYTEHqdVU7UUvwsvaaEruH3DAN.png";

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
  const response = await fetch(sourceUrl);
  const buffer = Buffer.from(await response.arrayBuffer());

  for (const favicon of favicons) {
    const output = await sharp(buffer)
      .resize(favicon.size, favicon.size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toBuffer();
    // Write base64 to individual files so they can be read back
    writeFileSync(`${favicon.name}.b64`, output.toString("base64"));
    console.log(`Generated ${favicon.name} (${favicon.size}x${favicon.size})`);
  }
  console.log("All favicons generated successfully!");
}

generateFavicons().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
