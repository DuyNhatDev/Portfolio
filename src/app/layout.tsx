import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ParticleBackground from '@/components/ParticleBackground'
import Header from '@/components/layout/Header'
import { SectionRefsProvider } from '@/context/SectionRefsContext'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Nguyễn Nhật Duy - Software Developer',
  description: 'Nguyễn Nhật Duy - Software Developer'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className='flex min-h-full flex-col'>
        <SectionRefsProvider>
          <ParticleBackground />
          <Header />
          <main className='flex-1'>{children}</main>
        </SectionRefsProvider>
      </body>
    </html>
  )
}
