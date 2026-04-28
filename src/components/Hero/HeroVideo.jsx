import { useEffect, useRef } from 'react'

export default function HeroVideo({ sectionRef }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const state = {
      target: 0,
      current: 0,
      raf: null,
    }

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section || !video.duration) return
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, window.scrollY - section.offsetTop)
      const progress = Math.min(1, scrolled / scrollable)
      state.target = progress * video.duration
    }

    /*
     * Lerp suaviza a atualização do currentTime entre frames,
     * evitando saltos bruscos ao rolar rápido.
     */
    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      const diff = Math.abs(state.target - state.current)
      if (diff > 0.005) {
        state.current = lerp(state.current, state.target, 0.12)
        video.currentTime = state.current
      }
      state.raf = requestAnimationFrame(tick)
    }

    const onReady = () => {
      state.raf = requestAnimationFrame(tick)
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }

    if (video.readyState >= 1) {
      onReady()
    } else {
      video.addEventListener('loadedmetadata', onReady, { once: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (state.raf) cancelAnimationFrame(state.raf)
    }
  }, [sectionRef])

  return (
    <video
      ref={videoRef}
      src="/animacaoskills.mp4"
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover object-[80%_50%] md:object-center"
    />
  )
}
