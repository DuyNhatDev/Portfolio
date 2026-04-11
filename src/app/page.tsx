'use client'

import ContactSection from '@/app/components/ContactSection'
import EducationSection from '@/app/components/EducationSection'
import ExperienceSection from '@/app/components/ExperienceSection'
import HomeSection from '@/app/components/HeroSection'
import ProjectSection from '@/app/components/ProjectSection'
import SkillSection from '@/app/components/SkillSection'
import { useSectionStore, type SectionId } from '@/stores/useSectionStore'

const sectionItems: { id: SectionId; content: React.ReactNode }[] = [
  { id: 'hero', content: <HomeSection /> },
  { id: 'skill', content: <SkillSection /> },
  { id: 'project', content: <ProjectSection /> },
  { id: 'experience', content: <ExperienceSection /> },
  { id: 'education', content: <EducationSection /> },
  { id: 'contact', content: <ContactSection /> }
]

export default function Page() {
  const register = useSectionStore((s) => s.register)

  return (
    <div className='flex min-h-screen flex-col'>
      {sectionItems.map((section) => (
        <div
          key={section.id}
          ref={(el) => register(section.id, el)}
          className='mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-20'
        >
          {section.content}
        </div>
      ))}
    </div>
  )
}
