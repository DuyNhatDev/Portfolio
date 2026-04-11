'use client'

import { cn } from '@/lib/utils'

type HamburgerButtonProps = {
  open: boolean
  onToggle: () => void
  className?: string
}

export default function HamburgerButton({ open, onToggle, className }: HamburgerButtonProps) {
  return (
    <button
      type='button'
      aria-label='Toggle menu'
      aria-expanded={open}
      onClick={onToggle}
      className={cn('flex flex-col gap-[5px] p-1.5 lg:hidden', className)}
    >
      {/* Top */}
      <span
        className={cn(
          'block h-[1.5px] w-[22px] origin-center bg-white/85 transition-all duration-250',
          open && 'translate-y-[6.5px] rotate-45'
        )}
      />

      {/* Middle */}
      <span
        className={cn(
          'block h-[1.5px] w-[22px] bg-white/85 transition-all duration-250',
          open && 'scale-x-0 opacity-0'
        )}
      />

      {/* Bottom */}
      <span
        className={cn(
          'block h-[1.5px] w-[22px] origin-center bg-white/85 transition-all duration-250',
          open && '-translate-y-[6.5px] -rotate-45'
        )}
      />
    </button>
  )
}
