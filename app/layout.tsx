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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
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
