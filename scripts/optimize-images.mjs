import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const rawDir = path.join(rootDir, 'resources', 'raw-mockups');
const publicDir = path.join(rootDir, 'public', 'images', 'app');
const legacyMokupDir = path.join(rootDir, 'public', 'mokup');

// Ensure directories exist
if (!fs.existsSync(rawDir)) {
  fs.mkdirSync(rawDir, { recursive: true });
}
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// If original files exist in legacy public/mokup, migrate them safely to rawDir
if (fs.existsSync(legacyMokupDir)) {
  for (let i = 1; i <= 7; i++) {
    const src = path.join(legacyMokupDir, `${i}.png`);
    const dest = path.join(rawDir, `${i}.png`);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
}

async function optimizeImages() {
  console.log('--- Optimizing Mobile App Mockups ---');
  console.log(`Source: ${rawDir}`);
  console.log(`Output: ${publicDir}\n`);

  const results = [];

  for (let i = 1; i <= 7; i++) {
    const rawFile = path.join(rawDir, `${i}.png`);
    if (!fs.existsSync(rawFile)) {
      console.warn(`File not found: ${rawFile}`);
      continue;
    }

    const rawStat = fs.statSync(rawFile);
    const rawSizeKB = (rawStat.size / 1024).toFixed(1);

    // Uniform framing calculated to preserve 100% of phone pixels and delicate shadows
    let left, top, width, height;
    if (i === 1) {
      left = 160;
      top = 188;
      width = 2999;
      height = 2812;
    } else {
      left = 880;
      top = 350;
      width = 2240;
      height = 2100;
    }

    const baseImage = sharp(rawFile).extract({ left, top, width, height });

    // 1. Desktop WebP (800x750)
    const destWebpDesktop = path.join(publicDir, `app-mockup-${i}.webp`);
    await baseImage
      .clone()
      .resize(800, 750)
      .webp({ quality: 82, alphaQuality: 85, effort: 6 })
      .toFile(destWebpDesktop);
    const webpDeskStat = fs.statSync(destWebpDesktop);
    const webpDeskSizeKB = (webpDeskStat.size / 1024).toFixed(1);

    // 2. Mobile WebP (480x450)
    const destWebpMobile = path.join(publicDir, `app-mockup-${i}-sm.webp`);
    await baseImage
      .clone()
      .resize(480, 450)
      .webp({ quality: 80, alphaQuality: 80, effort: 6 })
      .toFile(destWebpMobile);
    const webpMobStat = fs.statSync(destWebpMobile);
    const webpMobSizeKB = (webpMobStat.size / 1024).toFixed(1);

    // 3. Desktop AVIF (800x750)
    const destAvifDesktop = path.join(publicDir, `app-mockup-${i}.avif`);
    await baseImage
      .clone()
      .resize(800, 750)
      .avif({ quality: 75, effort: 6 })
      .toFile(destAvifDesktop);
    const avifDeskStat = fs.statSync(destAvifDesktop);
    const avifDeskSizeKB = (avifDeskStat.size / 1024).toFixed(1);

    // 4. Mobile AVIF (480x450)
    const destAvifMobile = path.join(publicDir, `app-mockup-${i}-sm.avif`);
    await baseImage
      .clone()
      .resize(480, 450)
      .avif({ quality: 70, effort: 6 })
      .toFile(destAvifMobile);
    const avifMobStat = fs.statSync(destAvifMobile);
    const avifMobSizeKB = (avifMobStat.size / 1024).toFixed(1);

    results.push({
      image: `app-mockup-${i}`,
      rawSizeKB,
      webpDeskSizeKB,
      webpMobSizeKB,
      avifDeskSizeKB,
      avifMobSizeKB,
    });

    console.log(`✓ app-mockup-${i}: WebP ${webpDeskSizeKB} KB (desk) / ${webpMobSizeKB} KB (mob) | AVIF ${avifDeskSizeKB} KB (desk)`);
  }

  console.log('\n--- Summary ---');
  console.table(results);
}

optimizeImages().catch((err) => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
