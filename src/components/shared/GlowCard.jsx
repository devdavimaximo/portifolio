import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const glowMap = {
  purple: 'hover:shadow-glow-purple-sm hover:border-primary/30',
  cyan: 'hover:shadow-glow-cyan hover:border-accent/30',
  none: '',
}

export default function GlowCard({ children, className, glow = 'purple', animate = true }) {
  const Comp = animate ? motion.div : 'div'
  const motionProps = animate
    ? { whileHover: { y: -4, scale: 1.01 }, transition: { duration: 0.2, ease: 'easeOut' } }
    : {}

  return (
    <Comp
      className={cn(
        'glass rounded-2xl transition-all duration-300',
        glowMap[glow],
        className
      )}
      {...motionProps}
    >
      {children}
    </Comp>
  )
}
