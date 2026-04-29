import { useEffect, useRef } from 'react'

/*
 * Scroll → currentTime direto, sem lerp, sem loop contínuo.
 * Um único RAF por evento de scroll — para imediatamente após aplicar.
 *
 * Para seeking suave este vídeo deve ser codificado com todos
 * os frames como keyframes: ffmpeg -g 1 -keyint_min 1 -sc_threshold 0
 */
export default function HeroVideo({ sectionRef }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let pending = null
    let raf = null

    const applyTime = () => {
      raf = null
      if (pending !== null && video.duration) {
        video.currentTime = pending
        pending = null
      }
    }

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section || !video.duration) return
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, window.scrollY - section.offsetTop)
      pending = Math.min(1, scrolled / scrollable) * video.duration
      if (!raf) raf = requestAnimationFrame(applyTime)
    }

    const onReady = () => {
      video.pause()
      handleScroll()
    }

    if (video.readyState >= 1) {
      onReady()
    } else {
      video.addEventListener('loadedmetadata', onReady, { once: true })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sectionRef])

  return (
    <video
      ref={videoRef}
      src="/animacaoskills.mp4"
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      className="absolute inset-0 w-full h-full object-cover object-[80%_50%] md:object-center"
    />
  )
}
