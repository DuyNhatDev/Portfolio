'use client'

import HamburgerButton from '@/components/ui/HamburgerButton'
import { useSectionStore, type SectionId } from '@/stores/useSectionStore'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useWindowScroll } from 'react-use'

const linkItems: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'skill', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'project', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { y } = useWindowScroll()
  const scrollTo = useSectionStore((s) => s.scrollTo)
  const scrolled = y > 10

  const handleNavClick = (id: SectionId) => {
    scrollTo(id)
    setMenuOpen(false)
  }

  return (
    <header className='sticky top-0 z-50 h-16'>
      <div
        className={`absolute inset-0 border-b border-white/10 bg-gray-900/80 backdrop-blur-md transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className='relative mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4'>
        <Link href='/' className='group flex items-center gap-3'>
          <Image src='/logo.svg' alt='logo' width={30} height={30} />
          <span className='font-display logo-text'>Nguyen Nhat Duy</span>
        </Link>

        <nav className='hidden items-center gap-8 lg:flex'>
          {linkItems.map(({ id, label }) => (
            <span key={id} className='nav-link font-display' onClick={() => handleNavClick(id)}>
              {label}
            </span>
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
        {linkItems.map(({ id, label }) => (
          <div
            key={id}
            onClick={() => handleNavClick(id)}
            className='font-display flex items-center px-5 py-3.5 text-sm tracking-widest text-white/75 transition-colors duration-200 hover:bg-sky-500/5 hover:text-sky-400'
          >
            {label}
          </div>
        ))}
      </div>
    </header>
  )
}
