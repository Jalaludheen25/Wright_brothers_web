/**
 * Turns the client's 24-megapixel camera originals into web-sized derivatives
 * and prints the `lib/images.ts` entries for them.
 *
 *   node scripts/optimize-photos.mjs
 *
 * Originals live in media-src/images/ (gitignored, ~700 MB). Only the
 * derivatives in public/photos/ are committed and deployed — next/image can
 * then resize from a sane source instead of decoding 6000x4000 on every miss.
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const SRC = "media-src/images";
const OUT = "public/photos";
const MAX_WIDTH = 2560;
const QUALITY = 82;

/** key -> source path, relative to SRC. */
const PICKS = {
  // --- Sterling Perfumes Head Office, DIP -------------------------------
  "wb-dip-meeting-pod": "7/6G5A8196.jpg",
  "wb-dip-corridor-wide": "7/6G5A8197.jpg",
  "wb-dip-slat-screen": "7/6G5A8199.jpg",
  "wb-dip-partition-run": "7/6G5A8203.jpg",
  "wb-dip-open-office": "7/6G5A8205.jpg",
  "wb-dip-banded-glass": "7/6G5A8226.jpg",

  // --- Contemporary open-plan workspace ---------------------------------
  "wb-workspace-bar": "7/6G5A8244.jpg",
  "wb-workspace-cafe": "7/6G5A8247.jpg",
  "wb-workspace-wide": "7/6G5A8248.jpg",
  "wb-workspace-seating": "7/6G5A8249.jpg",
  "wb-workspace-lounge-end": "7/6G5A8257.jpg",

  // --- Corporate office fit-out -----------------------------------------
  "wb-office-reception": "7/6G5A8220.jpg",
  "wb-office-boardroom": "7/6G5A8231.jpg",
  "wb-office-artwork-bar": "7/6G5A8218.jpg",
  "wb-office-quote-wall": "7/6G5A8222.jpg",
  "wb-office-timber-frame": "7/6G5A8350.jpg",
  "wb-office-exterior": "7/6G5A8289.jpg",
  "wb-lounge-leather": "brown office setup/6G5A8291.jpg",
  "wb-lounge-pendants": "brown office setup/6G5A8293.jpg",
  "wb-lounge-wide": "brown office setup/6G5A8296.jpg",
  "wb-pantry-bar": "5/6G5A8320.jpg",
  "wb-armaf-lobby": "6/6G5A8184.jpg",

  // --- Perfume retail ----------------------------------------------------
  "wb-retail-wall": "armaf perfume/6G5A8395.jpg",
  "wb-retail-wall-wide": "8/6G5A8373.jpg",
  "wb-retail-shelving": "armaf perfume/6G5A8386.jpg",
  "wb-retail-lounge": "armaf perfume/6G5A8407.jpg",
  "wb-retail-display": "armaf perfume/6G5A8404.jpg",
  "wb-retail-pergola": "8/6G5A8376.jpg",
  "wb-cosmo-store": "3/6G5A8433.jpg",

  // --- Added for the gallery page ----------------------------------------
  "wb-office-glass-desks": "7/6G5A8192.jpg",
  "wb-office-glass-corridor": "7/6G5A8193.jpg",
  "wb-office-grid-partition": "7/6G5A8204.jpg",
  "wb-office-breakout": "7/6G5A8217.jpg",
  "wb-office-artwork-run": "7/6G5A8219.jpg",
  "wb-office-bar-artwork": "7/6G5A8223.jpg",
  "wb-office-meeting-screen": "7/6G5A8229.jpg",
  "wb-office-counter": "7/6G5A8235.jpg",
  "wb-office-sofa-lounge": "7/6G5A8260.jpg",
  "wb-office-open-desks": "7/6G5A8276.jpg",
  "wb-office-timber-lounge": "7/6G5A8351.jpg",
  "wb-office-timber-glazing": "7/6G5A8352.jpg",
  "wb-office-small": "7/6G5A8361.jpg",
  "wb-workspace-bar-wide": "7/6G5A8246.jpg",
  "wb-lounge-shelving": "brown office setup/6G5A8292.jpg",
  "wb-lounge-seating": "brown office setup/6G5A8300.jpg",
  "wb-pantry-dining": "5/6G5A8327.jpg",
  "wb-pantry-mezzanine": "5/6G5A8336.jpg",
  "wb-armaf-atrium": "6/6G5A8186.jpg",
  "wb-retail-wall-elite": "armaf perfume/6G5A8382.jpg",
  "wb-retail-chandelier": "armaf perfume/6G5A8385.jpg",
  "wb-retail-steps": "armaf perfume/6G5A8389.jpg",
  "wb-retail-wall-shelves": "armaf perfume/6G5A8394.jpg",
  "wb-retail-blue-corridor": "armaf perfume/6G5A8397.jpg",
  "wb-retail-curtain": "armaf perfume/6G5A8399.jpg",
  "wb-retail-pergola-wide": "8/6G5A8377.jpg",
  "wb-retail-store-wide": "8/6G5A8379.jpg",
  "wb-retail-seating": "8/6G5A8381.jpg",
  "wb-cosmo-store-2": "3/6G5A8434 (1).jpg",
};

mkdirSync(OUT, { recursive: true });

const entries = [];

for (const [key, rel] of Object.entries(PICKS)) {
  const src = path.join(SRC, rel);
  if (!existsSync(src)) {
    console.error(`MISSING: ${src}`);
    process.exitCode = 1;
    continue;
  }

  const dest = path.join(OUT, `${key}.jpg`);
  const info = await sharp(src)
    .rotate() // honour EXIF orientation before we drop the metadata
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(dest);

  const blur = await sharp(src)
    .rotate()
    .resize(20, 20, { fit: "inside" })
    .jpeg({ quality: 40 })
    .toBuffer();

  entries.push(
    `  "${key}": {\n` +
      `    src: "/photos/${key}.jpg",\n` +
      `    width: ${info.width},\n` +
      `    height: ${info.height},\n` +
      `    blurDataURL:\n` +
      `      "data:image/jpeg;base64,${blur.toString("base64")}",\n` +
      `  },`
  );
}

writeFileSync("C:/Users/PC/AppData/Local/Temp/photo-registry.txt", entries.join("\n"));
console.log(`${entries.length} derivatives written to ${OUT}/`);
