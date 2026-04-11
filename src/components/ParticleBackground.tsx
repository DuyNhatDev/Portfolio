'use client'

import ParticleNetwork from '@/components/ParticleNetwork'

export default function ParticleBackground() {
  return (
    <div className='fixed inset-0 -z-10'>
      <ParticleNetwork
        particleCount={80}
        speed={0.8}
        connectDistance={130}
        color='99,179,237'
        bgColor='#0a0f1e'
        mouseAttract={true}
      />
    </div>
  )
}
