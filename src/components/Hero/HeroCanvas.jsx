import { useEffect, useRef } from 'react'

const FRAME_COUNT = 96
const getFrameUrl = (i) => `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

export default function HeroCanvas({ sectionRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const state = {
      images: new Array(FRAME_COUNT).fill(null),
      current: -1,
      pending: 0,
      raf: null,
    }

    const drawFrame = (index) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const img = state.images[index]
      if (!img?.complete || !img.naturalWidth) return

      const ctx = canvas.getContext('2d')
      const { width, height } = canvas
      const imgAR = img.naturalWidth / img.naturalHeight
      const canvasAR = width / height

      let dw, dh, dx, dy
      if (imgAR > canvasAR) {
        dh = height
        dw = dh * imgAR
        dx = (width - dw) / 2
        dy = 0
      } else {
        dw = width
        dh = dw / imgAR
        dx = 0
        dy = (height - dh) / 2
      }

      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    // Load all frames — src set after onload to avoid race
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      state.images[i] = img
      img.onload = () => {
        // Draw first frame as soon as it's ready
        if (i === 0 && state.current === -1) {
          state.current = 0
          drawFrame(0)
        }
        if (i === state.current) drawFrame(i)
      }
      img.src = getFrameUrl(i + 1)
    }

    // RAF loop — only redraws when frame changes
    const tick = () => {
      if (state.pending !== state.current) {
        state.current = state.pending
        drawFrame(state.current)
      }
      state.raf = requestAnimationFrame(tick)
    }
    state.raf = requestAnimationFrame(tick)

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.offsetTop
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, window.scrollY - sectionTop)
      const progress = Math.min(1, scrolled / scrollable)
      state.pending = Math.round(progress * (FRAME_COUNT - 1))
    }

    const resize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(state.current >= 0 ? state.current : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', resize)
    resize()
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resize)
      if (state.raf) cancelAnimationFrame(state.raf)
    }
  }, [sectionRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}
