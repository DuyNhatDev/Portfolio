'use client'

import HamburgerButton from '@/components/ui/HamburgerButton'
import Link from 'next/link'
import { useState } from 'react'
import { useWindowScroll } from 'react-use'

const linkItems = [
  { href: '#', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' }
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { y } = useWindowScroll()
  const scrolled = y > 10

  return (
    <header className='fixed top-0 right-0 left-0 z-50 h-16'>
      <div
        className={`absolute inset-0 border-b border-white/10 bg-gray-900/80 backdrop-blur-md transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className='relative mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4'>
        <Link href='/' className='text-sm font-medium tracking-widest transition-opacity duration-200 hover:opacity-60'>
          &lt;NA /&gt;
        </Link>

        <nav className='hidden items-center gap-8 lg:flex'>
          {linkItems.map(({ href, label }, index) => (
            <Link
              key={index}
              href={href}
              className='relative text-sm tracking-widest transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:text-sky-500 hover:after:w-full'
            >
              {label}
            </Link>
          ))}
        </nav>

        <HamburgerButton open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
      </div>

      {/* Mobile dropdown */}
      <div
        className={`absolute top-16 right-0 left-0 overflow-hidden border-t border-white/10 bg-gray-900/90 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {linkItems.map(({ href, label }, index) => (
          <Link
            key={index}
            href={href}
            onClick={() => setMenuOpen(false)}
            className='flex items-center px-5 py-3.5 text-sm tracking-widest text-white/75 transition-colors duration-200 hover:bg-sky-500/5 hover:text-sky-400'
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}

