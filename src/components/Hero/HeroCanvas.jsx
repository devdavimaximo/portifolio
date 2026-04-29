import { useEffect, useRef } from 'react'

const FRAME_COUNT = 96
const getFrameUrl = (i) => `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

export default function HeroCanvas({ sectionRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const state = {
      images: new Array(FRAME_COUNT).fill(null),
      current: -1,
      pending: 0,
      raf: null,
    }

    const drawFrame = (index) => {
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
        // mobile: shift right (equivalent to object-[80%_50%]), desktop: center
        const xPos = width < 768 ? 0.8 : 0.5
        dx = -(dw - width) * xPos
        dy = 0
      } else {
        dw = width
        dh = dw / imgAR
        dx = 0
        dy = -(dh - height) * 0.5
      }

      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    /*
     * RAF só dispara quando há um frame novo para desenhar.
     * Ao contrário do loop contínuo anterior, para imediatamente
     * após o render — zero CPU em idle.
     */
    const scheduleRender = () => {
      if (state.raf) return
      state.raf = requestAnimationFrame(() => {
        state.raf = null
        if (state.pending !== state.current) {
          state.current = state.pending
          drawFrame(state.current)
        }
      })
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      state.images[i] = img
      img.onload = () => {
        if (i === 0 && state.current === -1) {
          state.current = 0
          drawFrame(0)
        }
      }
      img.src = getFrameUrl(i + 1)
    }

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, window.scrollY - section.offsetTop)
      const progress = Math.min(1, scrolled / scrollable)
      const frame = Math.round(progress * (FRAME_COUNT - 1))
      if (frame !== state.pending) {
        state.pending = frame
        scheduleRender()
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (state.current >= 0) drawFrame(state.current)
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
