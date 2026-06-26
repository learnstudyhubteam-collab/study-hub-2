import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Icon SVG — electric blue gradient with "SH" lettermark
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0066FF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <!-- Background rounded rect -->
  <rect width="1024" height="1024" rx="230" fill="url(#bg)"/>
  <!-- Shine overlay -->
  <rect width="1024" height="1024" rx="230" fill="url(#shine)"/>
  <!-- Open book shape -->
  <g transform="translate(512,430)" fill="white">
    <!-- Left page -->
    <path d="M-220,-160 C-220,-160 -240,0 -240,160 C-160,130 -80,120 0,120 L0,-120 C-80,-120 -160,-130 -220,-160 Z" opacity="0.95"/>
    <!-- Right page -->
    <path d="M220,-160 C220,-160 240,0 240,160 C160,130 80,120 0,120 L0,-120 C80,-120 160,-130 220,-160 Z" opacity="0.85"/>
    <!-- Spine line -->
    <rect x="-6" y="-130" width="12" height="260" rx="6" opacity="0.6"/>
    <!-- Sparkle star -->
    <g transform="translate(130,-180)" opacity="0.9">
      <path d="M0,-28 L6,-6 L28,0 L6,6 L0,28 L-6,6 L-28,0 L-6,-6 Z" fill="white"/>
    </g>
  </g>
  <!-- "AI" label -->
  <text x="512" y="700" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" font-weight="800" font-size="96" fill="white" opacity="0.9" letter-spacing="8">AI</text>
</svg>`

// Splash screen SVG — centered icon on light background
function splashSvg(w, h) {
  const iconSize = Math.min(w, h) * 0.28
  const cx = w / 2
  const cy = h / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="sbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0F6FF"/>
      <stop offset="100%" stop-color="#EBF3FF"/>
    </linearGradient>
    <linearGradient id="ibg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0066FF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sbg)"/>
  <!-- Blob accents -->
  <circle cx="${cx * 1.6}" cy="${cy * 0.3}" r="${Math.min(w,h)*0.35}" fill="#0066FF" opacity="0.04"/>
  <circle cx="${cx * 0.4}" cy="${cy * 1.7}" r="${Math.min(w,h)*0.3}" fill="#3B82F6" opacity="0.04"/>
  <!-- Icon background -->
  <rect x="${cx - iconSize/2}" y="${cy - iconSize/2 - iconSize*0.1}" width="${iconSize}" height="${iconSize}" rx="${iconSize * 0.224}" fill="url(#ibg)"/>
  <!-- Book shape (scaled) -->
  <g transform="translate(${cx}, ${cy - iconSize*0.08}) scale(${iconSize/1024})">
    <g transform="translate(0, -100)" fill="white">
      <path d="M-220,-160 C-220,-160 -240,0 -240,160 C-160,130 -80,120 0,120 L0,-120 C-80,-120 -160,-130 -220,-160 Z" opacity="0.95"/>
      <path d="M220,-160 C220,-160 240,0 240,160 C160,130 80,120 0,120 L0,-120 C80,-120 160,-130 220,-160 Z" opacity="0.85"/>
      <rect x="-6" y="-130" width="12" height="260" rx="6" opacity="0.6"/>
      <g transform="translate(130,-180)" opacity="0.9">
        <path d="M0,-28 L6,-6 L28,0 L6,6 L0,28 L-6,6 L-28,0 L-6,-6 Z" fill="white"/>
      </g>
    </g>
  </g>
  <!-- App name below icon -->
  <text x="${cx}" y="${cy + iconSize * 0.75}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-weight="800" font-size="${iconSize * 0.18}" fill="#0066FF">Study Hub</text>
  <text x="${cx}" y="${cy + iconSize * 0.95}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-weight="500" font-size="${iconSize * 0.10}" fill="#6B7280">AI-Powered Learning</text>
</svg>`
}

const iconSizes = [
  // PWA / web
  { size: 16,    file: 'favicon-16.png' },
  { size: 32,    file: 'favicon-32.png' },
  { size: 180,   file: 'apple-touch-icon.png' },
  { size: 192,   file: 'icon-192.png' },
  { size: 512,   file: 'icon-512.png' },
  // iOS App Store
  { size: 20,    file: 'ios/20.png' },
  { size: 29,    file: 'ios/29.png' },
  { size: 40,    file: 'ios/40.png' },
  { size: 58,    file: 'ios/58.png' },
  { size: 60,    file: 'ios/60.png' },
  { size: 76,    file: 'ios/76.png' },
  { size: 80,    file: 'ios/80.png' },
  { size: 87,    file: 'ios/87.png' },
  { size: 120,   file: 'ios/120.png' },
  { size: 152,   file: 'ios/152.png' },
  { size: 167,   file: 'ios/167.png' },
  { size: 180,   file: 'ios/180.png' },
  { size: 1024,  file: 'ios/1024.png' },
  // Android
  { size: 48,    file: 'android/48.png' },
  { size: 72,    file: 'android/72.png' },
  { size: 96,    file: 'android/96.png' },
  { size: 144,   file: 'android/144.png' },
  { size: 192,   file: 'android/192.png' },
  { size: 512,   file: 'android/512.png' },
]

const splashSizes = [
  // iPhone (portrait @2x, @3x)
  { w: 750,  h: 1334, file: 'splash-750x1334.png' },
  { w: 1125, h: 2436, file: 'splash-1125x2436.png' },
  { w: 1242, h: 2688, file: 'splash-1242x2688.png' },
  { w: 828,  h: 1792, file: 'splash-828x1792.png' },
  { w: 1170, h: 2532, file: 'splash-1170x2532.png' },
  { w: 1179, h: 2556, file: 'splash-1179x2556.png' },
  // iPad
  { w: 1536, h: 2048, file: 'splash-1536x2048.png' },
  { w: 2048, h: 2732, file: 'splash-2048x2732.png' },
  // Universal (landscape)
  { w: 2732, h: 2048, file: 'splash-2732x2048.png' },
]

const iconBase = join(ROOT, 'public', 'icons')
const splashBase = join(ROOT, 'public', 'splash')

mkdirSync(join(iconBase, 'ios'), { recursive: true })
mkdirSync(join(iconBase, 'android'), { recursive: true })
mkdirSync(splashBase, { recursive: true })

const iconBuf = Buffer.from(iconSvg)

async function run() {
  console.log('Generating icons…')
  for (const { size, file } of iconSizes) {
    const out = join(iconBase, file)
    await sharp(iconBuf)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(out)
    console.log(`  ✓ icons/${file} (${size}×${size})`)
  }

  console.log('\nGenerating splash screens…')
  for (const { w, h, file } of splashSizes) {
    const svg = splashSvg(w, h)
    const out = join(splashBase, file)
    await sharp(Buffer.from(svg))
      .resize(w, h)
      .png({ compressionLevel: 9 })
      .toFile(out)
    console.log(`  ✓ splash/${file} (${w}×${h})`)
  }

  // Copy apple-touch-icon to root public for broader compatibility
  await sharp(iconBuf).resize(180, 180).png().toFile(join(ROOT, 'public', 'apple-touch-icon.png'))

  console.log('\nAll done!')
}

run().catch((e) => { console.error(e); process.exit(1) })
