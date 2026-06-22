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
          <div
            className="liquid-blob bg-[#0066FF] w-[700px] h-[700px] opacity-[0.065]"
            style={{
              top: '-200px',
              right: '-200px',
              animation: 'liquidBlob 28s ease-in-out infinite',
            }}
          />
          <div
            className="liquid-blob bg-[#4D94FF] w-[500px] h-[500px] opacity-[0.055]"
            style={{
              bottom: '-100px',
              left: '-150px',
              animation: 'liquidBlob 35s ease-in-out infinite',
              animationDelay: '-10s',
            }}
          />
          <div
            className="liquid-blob bg-[#0088FF] w-[350px] h-[350px] opacity-[0.04]"
            style={{
              top: '35%',
              right: '15%',
              animation: 'liquidBlob 24s ease-in-out infinite',
              animationDelay: '-18s',
            }}
          />
        </div>
        {children}
      </body>
    </html>
  )
}
