import { useRef } from 'react'
import HeroText from './HeroText'
import HeroVideo from './HeroVideo'

export default function Hero() {
  const sectionRef = useRef(null)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative md:h-[230vh] h-screen"
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        <HeroVideo sectionRef={sectionRef} />

        {/* Mobile: gradiente lateral — escuro à esquerda (texto), abre à direita (animação) */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none md:hidden"
          style={{
            background:
              'linear-gradient(to right, rgba(5,5,8,0.97) 0%, rgba(5,5,8,0.92) 38%, rgba(5,5,8,0.45) 60%, rgba(5,5,8,0.05) 80%)',
          }}
        />

        {/* Desktop: gradiente lateral — escuro à esquerda (texto), abre à direita (animação) */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(5,5,8,0.82) 0%, rgba(5,5,8,0.55) 40%, rgba(5,5,8,0.18) 70%, rgba(5,5,8,0.08) 100%)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,5,8,0.92))' }}
        />

        {/* Hero text */}
        <div className="relative z-10 flex items-center h-full section-padding">
          <div className="max-w-xl">
            <HeroText />
          </div>
        </div>

        {/* Scroll indicator — apenas desktop */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2">
          <span className="text-xs text-text-muted tracking-widest uppercase opacity-60">
            Scroll para explorar
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-text-muted/60 to-transparent" />
        </div>

      </div>
    </section>
  )
}
