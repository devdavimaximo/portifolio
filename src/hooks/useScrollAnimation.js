import { useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, margin: '-100px', ...options })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return { ref, controls }
}
