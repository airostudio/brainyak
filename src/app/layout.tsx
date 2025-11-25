import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrainyAK - Discover Your IQ | Mensa-Style Intelligence Test',
  description: 'Take our scientifically designed IQ test based on Mensa International standards. Discover your cognitive abilities with our colorful, engaging test for just $1.99.',
  keywords: 'IQ test, intelligence test, Mensa, cognitive ability, brain test, mental assessment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
