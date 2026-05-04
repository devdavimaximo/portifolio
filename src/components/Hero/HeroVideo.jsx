import { useEffect, useRef } from 'react'

/*
 * ENCODING REQUIREMENT — ALL-I (all-intra) MP4
 *
 * H.264 padrão usa GOP: 1 keyframe a cada ~2s, demais frames são P/B (delta).
 * Seeking para um P-frame força o decoder a reconstruir do keyframe anterior —
 * stutter visível. ALL-I: cada frame é keyframe, qualquer seek é instantâneo.
 *
 * Trade-off: arquivo ~2–3× maior. Compense com CRF alto (28–32) e 720p/24fps.
 *
 * ffmpeg -i input.mp4 -c:v libx264 -preset veryfast -crf 28 \
 *        -g 1 -keyint_min 1 -sc_threshold 0 -an output.mp4
 */

const LERP = 0.2
const THRESHOLD = 0.015

// Touch/coarse-pointer = mobile: scroll inertia torna o lerp contraproducente.
// Nesses dispositivos usamos autoplay em loop — sem RAF, sem seeking.
const isMobileDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

export default function HeroVideo({ sectionRef }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isMobileDevice()) {
      // Mobile: autoplay em loop, sem nenhuma manipulação de currentTime
      video.play().catch(() => {})
      return
    }

    // Desktop: scroll-sync com lerp e loop de RAF auto-gerenciado
    let target = 0
    let current = 0
    let rafId = null
    let ready = false

    const tick = () => {
      rafId = null
      if (!ready) return
      const diff = target - current
      if (Math.abs(diff) < THRESHOLD) return
      current += diff * LERP
      video.currentTime = current
      rafId = requestAnimationFrame(tick)
    }

    const computeTarget = () => {
      const section = sectionRef.current
      if (!ready || !section) return
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const scrolled = Math.max(0, window.scrollY - section.offsetTop)
      target = Math.min(scrolled / scrollable, 1) * video.duration
    }

    const handleScroll = () => {
      computeTarget()
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const onReady = () => {
      ready = true
      video.pause()
      computeTarget()
      current = target
      if (isFinite(video.duration)) video.currentTime = current
    }

    if (video.readyState >= 1) {
      onReady()
    } else {
      video.addEventListener('loadedmetadata', onReady, { once: true })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [sectionRef])

  const mobile = isMobileDevice()

  return (
    <video
      ref={videoRef}
      src="/Aanimacaoleve.mp4"
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      // autoPlay + loop apenas no mobile — desktop controla via currentTime
      autoPlay={mobile}
      loop={mobile}
      className="absolute inset-0 w-full h-full object-cover object-[80%_50%] md:object-center"
      style={{ willChange: 'transform' }}
    />
  )
}
