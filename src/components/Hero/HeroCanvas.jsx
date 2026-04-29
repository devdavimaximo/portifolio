import { useEffect, useRef } from 'react'

const FRAME_COUNT = 191
const getFrameUrl = (i) => `/redketchup/${String(i).padStart(3, '0')}.webp`

// Frame 0 (001.webp) é preto — nunca exibido
const FIRST_FRAME = 1

export default function HeroCanvas({ sectionRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Aceita ImageBitmap (GPU) ou HTMLImageElement (fallback)
    const bitmaps = new Array(FRAME_COUNT).fill(null)
    const state = { target: FIRST_FRAME, current: FIRST_FRAME, raf: null }
    let lastRender = 0
    const FRAME_MS = 1000 / 30

    const draw = (frameIndex) => {
      const idx = Math.round(Math.max(FIRST_FRAME, Math.min(FRAME_COUNT - 1, frameIndex)))

      // Exibe o frame mais próximo disponível em vez de tela preta
      let bmp = null
      for (let r = 0; r <= 20; r++) {
        if (idx - r >= FIRST_FRAME && bitmaps[idx - r]) { bmp = bitmaps[idx - r]; break }
        if (idx + r < FRAME_COUNT && bitmaps[idx + r]) { bmp = bitmaps[idx + r]; break }
      }
      if (!bmp) return

      const bmpW = bmp.naturalWidth ?? bmp.width
      const bmpH = bmp.naturalHeight ?? bmp.height
      const { width, height } = canvas
      const scale = Math.max(width / bmpW, height / bmpH)
      const dw = bmpW * scale
      const dh = bmpH * scale
      const xPos = width < 768 ? 0.8 : 0.5
      const dx = -(dw - width) * xPos
      const dy = -(dh - height) * 0.5

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(bmp, dx, dy, dw, dh)
    }

    const tick = (now) => {
      const diff = state.target - state.current

      if (Math.abs(diff) < 0.5) {
        state.current = state.target
        draw(state.current)
        state.raf = null
        return
      }

      if (now - lastRender >= FRAME_MS) {
        state.current += diff * 0.3
        draw(state.current)
        lastRender = now
      }

      state.raf = requestAnimationFrame(tick)
    }

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, window.scrollY - section.offsetTop)
      const progress = Math.min(1, scrolled / scrollable)
      state.target = FIRST_FRAME + progress * (FRAME_COUNT - 1 - FIRST_FRAME)

      if (!state.raf) state.raf = requestAnimationFrame(tick)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw(state.current)
    }

    // Carrega via Image (usa cache HTTP do browser) → decodifica na GPU com createImageBitmap
    const loadFrame = (i) => new Promise((resolve) => {
      if (bitmaps[i]) return resolve()
      const img = new Image()

      img.onload = () => {
        const done = (bmp) => {
          bitmaps[i] = bmp
          if (i === FIRST_FRAME) draw(FIRST_FRAME)
          resolve()
        }

        if (typeof createImageBitmap !== 'undefined') {
          createImageBitmap(img).then(done).catch(() => done(img))
        } else {
          done(img)
        }
      }

      img.onerror = () => resolve()
      img.src = getFrameUrl(i + 1)
    })

    const init = async () => {
      // Prioridade máxima: frame inicial visível
      await loadFrame(FIRST_FRAME)

      // Alta prioridade: primeiros 20 frames (início do scroll)
      await Promise.all(
        Array.from({ length: 20 }, (_, j) => loadFrame(FIRST_FRAME + 1 + j))
      )

      // Background: todos os restantes em paralelo
      // HTTP/2 (Vercel) multiplexes tudo numa única conexão
      for (let i = FIRST_FRAME + 21; i < FRAME_COUNT; i++) loadFrame(i)
    }
    init()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', resize)
    resize()
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resize)
      if (state.raf) cancelAnimationFrame(state.raf)
      bitmaps.forEach((bmp) => bmp?.close?.())
    }
  }, [sectionRef])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
