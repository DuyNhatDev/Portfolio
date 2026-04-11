'use client'

import ContactSection from '@/app/components/ContactSection'
import EducationSection from '@/app/components/EducationSection'
import ExperienceSection from '@/app/components/ExperienceSection'
import HomeSection from '@/app/components/HomeSection'
import ProjectSection from '@/app/components/ProjectSection'
import SkillSection from '@/app/components/SkillSection'
import { useSectionRefs, type SectionId } from '@/context/SectionRefsContext'

const sectionItems: { id: SectionId; content: React.ReactNode }[] = [
  { id: 'home', content: <HomeSection /> },
  { id: 'skill', content: <SkillSection /> },
  { id: 'project', content: <ProjectSection /> },
  { id: 'experience', content: <ExperienceSection /> },
  { id: 'education', content: <EducationSection /> },
  { id: 'contact', content: <ContactSection /> }
]

export default function Home() {
  const { refs } = useSectionRefs()

  return (
    <div className='flex min-h-screen flex-col'>
      {sectionItems.map((section) => (
        <div key={section.id} ref={refs[section.id]} className='mx-auto w-full max-w-6xl px-6 py-20'>
          {section.content}
        </div>
      ))}
    </div>
  )
}

