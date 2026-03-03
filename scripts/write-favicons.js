import { readFileSync, writeFileSync } from "fs";

const outputDir = "/vercel/share/v0-project/public";

const files = [
  "android-chrome-96x96.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "apple-touch-icon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon-48x48.png",
];

for (const file of files) {
  const b64 = readFileSync(`${file}.b64`, "utf-8");
  const buffer = Buffer.from(b64, "base64");
  writeFileSync(`${outputDir}/${file}`, buffer);
  console.log(`Wrote ${outputDir}/${file} (${buffer.length} bytes)`);
}

console.log("All favicons written to project!");
