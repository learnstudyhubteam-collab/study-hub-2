import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Study Hub — AI-Powered Learning',
  description:
    'Study any subject with an AI tutor. Flashcards, quizzes, step-by-step problem solving, and more.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Study Hub',
    startupImage: [
      { url: '/splash/splash-750x1334.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-1125x2436.png', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash/splash-1242x2688.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash/splash-828x1792.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-1170x2532.png', media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash/splash-1179x2556.png', media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash/splash-1536x2048.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash/splash-2048x2732.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)' },
    ],
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FBFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0F1E' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Study Hub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Study Hub" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16.png" />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        `}} />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        {/* Fixed liquid background — renders on every page */}
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F7FAFF]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230066FF' fill-opacity='0.055'%3E%3Crect x='15' y='8' width='2.5' height='16'/%3E%3Crect x='8' y='15' width='16' height='2.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px',
        }}>
          {/* Primary blue blob — top right */}
          <div className="liquid-blob bg-[#0066FF] w-[700px] h-[700px] opacity-[0.08]"
            style={{ top: '-220px', right: '-180px', animation: 'liquidBlob 28s ease-in-out infinite' }} />
          {/* Violet blob — bottom left */}
          <div className="liquid-blob bg-[#7C3AED] w-[560px] h-[560px] opacity-[0.07]"
            style={{ bottom: '-120px', left: '-140px', animation: 'liquidBlobAlt 36s ease-in-out infinite', animationDelay: '-8s' }} />
          {/* Pink blob — center right */}
          <div className="liquid-blob bg-[#EC4899] w-[340px] h-[340px] opacity-[0.055]"
            style={{ top: '28%', right: '8%', animation: 'liquidBlobSlow 40s ease-in-out infinite', animationDelay: '-14s' }} />
          {/* Teal blob — upper left */}
          <div className="liquid-blob bg-[#0D9488] w-[280px] h-[280px] opacity-[0.05]"
            style={{ top: '8%', left: '4%', animation: 'liquidBlob 24s ease-in-out infinite', animationDelay: '-5s' }} />
          {/* Orange blob — lower center */}
          <div className="liquid-blob bg-[#F97316] w-[220px] h-[220px] opacity-[0.04]"
            style={{ bottom: '30%', left: '35%', animation: 'liquidBlobAlt 32s ease-in-out infinite', animationDelay: '-20s' }} />
          {/* Indigo accent — lower right */}
          <div className="liquid-blob bg-[#6366F1] w-[200px] h-[200px] opacity-[0.05]"
            style={{ bottom: '10%', right: '4%', animation: 'liquidBlobAlt 20s ease-in-out infinite', animationDelay: '-12s' }} />
          {/* Sky accent — mid left */}
          <div className="liquid-blob bg-[#0EA5E9] w-[160px] h-[160px] opacity-[0.04]"
            style={{ top: '52%', left: '2%', animation: 'liquidBlobSlow 30s ease-in-out infinite', animationDelay: '-7s' }} />
        </div>
        {children}
      </body>
    </html>
  )
}
