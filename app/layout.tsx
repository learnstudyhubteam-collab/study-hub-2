import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Study Hub — AI-Powered Learning',
  description:
    'Study any subject with an AI tutor. Flashcards, quizzes, step-by-step problem solving, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
