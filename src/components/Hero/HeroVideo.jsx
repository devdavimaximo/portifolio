import { useEffect, useRef } from 'react'

/*
 * ENCODING REQUIREMENT — ALL-I (all-intra) MP4
 *
 * H.264 padrão agrupa frames em GOPs: 1 keyframe a cada ~2s, os demais
 * são P/B-frames (delta). Ao fazer seek para um P-frame, o decoder precisa
 * reconstruir a partir do keyframe anterior — isso causa o stutter visível.
 *
 * ALL-I: cada frame é um keyframe independente. Qualquer currentTime resolve
 * instantaneamente, sem stall de decoder. Trade-off: arquivo ~2–3× maior;
 * compense com CRF alto (28–32) e 720p/24fps.
 *
 * ffmpeg -i input.mp4 -c:v libx264 -preset veryfast -crf 28 \
 *        -g 1 -keyint_min 1 -sc_threshold 0 -an output.mp4
 *
 * Spec ideal: 720p, 24fps, sem áudio, sem GOP (ALL-I).
 */

// 20% do gap por frame a 60fps — responsivo sem parecer travado
const LERP = 0.2
// ~1 frame a 60fps: ignora seeks menores que isso para não sobrecarregar o decoder
const THRESHOLD = 0.015

export default function HeroVideo({ sectionRef }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Dispositivos touch usam scroll com inércia: lerp adicionaria lag
    // perceptível. Seeking direto é mais adequado nesses casos.
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    let target = 0
    let current = 0
    let rafId = null
    let ready = false

    // Loop de interpolação: roda apenas enquanto há diferença significativa,
    // auto-para ao convergir. Evita RAF ocioso quando o usuário não scrolla.
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
      if (isMobile) {
        if (ready && Math.abs(target - video.currentTime) >= THRESHOLD) {
          video.currentTime = target
        }
      } else if (!rafId) {
        rafId = requestAnimationFrame(tick)
      }
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

  return (
    <video
      ref={videoRef}
      src="/Aanimacaoleve.mp4"
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      className="absolute inset-0 w-full h-full object-cover object-[80%_50%] md:object-center"
      style={{ willChange: 'transform' }}
    />
  )
}
