import { execSync } from "child_process";
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

for (const fav of favicons) {
  const outPath = join(publicDir, fav.name);
  const cmd = `magick convert -background none -density 300 "${svgSource}" -resize ${fav.size}x${fav.size} -gravity center -extent ${fav.size}x${fav.size} "${outPath}"`;
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`Generated ${fav.name} (${fav.size}x${fav.size})`);
  } catch {
    // Try without "magick" prefix for older ImageMagick v6
    const cmdV6 = `convert -background none -density 300 "${svgSource}" -resize ${fav.size}x${fav.size} -gravity center -extent ${fav.size}x${fav.size} "${outPath}"`;
    execSync(cmdV6, { stdio: "inherit" });
    console.log(`Generated ${fav.name} (${fav.size}x${fav.size}) [ImageMagick v6]`);
  }
}

console.log("All favicons generated with transparent backgrounds using ImageMagick!");
