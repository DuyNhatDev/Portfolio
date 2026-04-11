'use client'

import { createContext, useContext, useRef, RefObject } from 'react'

export type SectionId = 'home' | 'skill' | 'project' | 'experience' | 'education' | 'contact'

type SectionRefsContextType = {
  refs: Record<SectionId, RefObject<HTMLDivElement | null>>
  scrollTo: (id: SectionId) => void
}

const SectionRefsContext = createContext<SectionRefsContextType | null>(null)

export function SectionRefsProvider({ children }: { children: React.ReactNode }) {
  const homeRef = useRef<HTMLDivElement>(null)
  const skillRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const refs: Record<SectionId, RefObject<HTMLDivElement | null>> = {
    home: homeRef,
    skill: skillRef,
    project: projectRef,
    experience: experienceRef,
    education: educationRef,
    contact: contactRef
  }

  const scrollTo = (id: SectionId) => {
    const el = refs[id].current
    if (el) {
      const offset = 64
      const top = el.offsetTop - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return <SectionRefsContext.Provider value={{ refs, scrollTo }}>{children}</SectionRefsContext.Provider>
}

export function useSectionRefs() {
  const ctx = useContext(SectionRefsContext)
  if (!ctx) throw new Error('useSectionRefs must be used within SectionRefsProvider')
  return ctx
}

