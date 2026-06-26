import type { Metadata } from 'next'
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FBFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0F1E' },
  ],
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
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F8FBFF]">
          {/* Primary large blob — top right */}
          <div
            className="liquid-blob bg-[#0066FF] w-[750px] h-[750px] opacity-[0.07]"
            style={{
              top: '-250px',
              right: '-200px',
              animation: 'liquidBlob 28s ease-in-out infinite',
            }}
          />
          {/* Secondary blob — bottom left */}
          <div
            className="liquid-blob bg-[#3B82F6] w-[580px] h-[580px] opacity-[0.06]"
            style={{
              bottom: '-140px',
              left: '-160px',
              animation: 'liquidBlobAlt 36s ease-in-out infinite',
              animationDelay: '-8s',
            }}
          />
          {/* Accent blob — center */}
          <div
            className="liquid-blob bg-[#818CF8] w-[380px] h-[380px] opacity-[0.045]"
            style={{
              top: '30%',
              right: '12%',
              animation: 'liquidBlobSlow 42s ease-in-out infinite',
              animationDelay: '-16s',
            }}
          />
          {/* Small electric blob — upper left */}
          <div
            className="liquid-blob bg-[#0EA5E9] w-[260px] h-[260px] opacity-[0.04]"
            style={{
              top: '10%',
              left: '5%',
              animation: 'liquidBlob 22s ease-in-out infinite',
              animationDelay: '-5s',
            }}
          />
          {/* Tiny violet accent — lower right */}
          <div
            className="liquid-blob bg-[#6366F1] w-[180px] h-[180px] opacity-[0.035]"
            style={{
              bottom: '20%',
              right: '5%',
              animation: 'liquidBlobAlt 18s ease-in-out infinite',
              animationDelay: '-12s',
            }}
          />
        </div>
        {children}
      </body>
    </html>
  )
}
