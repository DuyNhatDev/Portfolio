import { create } from 'zustand'

export type SectionId = 'home' | 'skill' | 'project' | 'experience' | 'education' | 'contact'

type SectionStore = {
  elements: Partial<Record<SectionId, HTMLDivElement>>
  register: (id: SectionId, el: HTMLDivElement | null) => void
  scrollTo: (id: SectionId) => void
}

export const useSectionStore = create<SectionStore>((set, get) => ({
  elements: {},
  register: (id, el) => {
    set((state) => {
      if (!el) {
        const newElements = { ...state.elements }
        delete newElements[id]
        return { elements: newElements }
      }

      return {
        elements: { ...state.elements, [id]: el }
      }
    })
  },
  scrollTo: (id) => {
    get().elements[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}))
