import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { techCards } from '../../data/skills'

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
  </svg>
)

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#339933" strokeWidth="1.4" fill="none" />
    <path d="M12 2v20M2 7l10 5 10-5" stroke="#339933" strokeWidth="1.4" />
  </svg>
)

const JSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path d="M7 17.5c.5.8 1.2 1.4 2.3 1.4 1.2 0 2-.6 2-1.5 0-1-.6-1.4-1.7-1.9l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.4 0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.2 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.5l.6.3c2 .8 3.1 1.7 3.1 3.6 0 2-1.6 3.2-3.8 3.2-2.1 0-3.5-1-4.2-2.4l1.4-.5zM16.5 17.3c.4.7.7 1.3 1.5 1.3.8 0 1.2-.3 1.2-1.5v-7.1h2v7.2c0 2.4-1.4 3.5-3.4 3.5-1.8 0-2.9-.9-3.4-2l2.1-1.4z" fill="#333" />
  </svg>
)

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15C19.67 12 21.33 10.67 22 8c-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zM7 12C4.33 12 2.67 13.33 2 16c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15C14.67 18 16.33 16.67 17 14c-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.51 12 7 12z" fill="#06B6D4" />
  </svg>
)

const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M15 3l6 6-6 6M9 21l-6-6 6-6" stroke="#F05032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 9H8a5 5 0 000 10h1" stroke="#F05032" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const iconMap = {
  React: ReactIcon,
  'Node.js': NodeIcon,
  JavaScript: JSIcon,
  TailwindCSS: TailwindIcon,
  Git: GitIcon,
}

const cardPositions = [
  { top: '8%', left: '30%' },
  { top: '30%', left: '2%' },
  { top: '30%', right: '2%' },
  { bottom: '20%', left: '10%' },
  { bottom: '8%', right: '15%' },
]

function TechCard({ tech, index }) {
  const Icon = iconMap[tech.name] || (() => null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.4 + index * 0.12 },
        scale: { duration: 0.5, delay: 0.4 + index * 0.12 },
        y: { duration: 3.5 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.7, repeatType: 'loop' },
      }}
      style={{
        position: 'absolute',
        ...cardPositions[index],
        boxShadow: `0 0 20px ${tech.glowColor}, 0 0 40px ${tech.glowColor.replace('0.25', '0.1')}`,
      }}
      className="glass rounded-2xl px-4 py-3 flex items-center gap-3 select-none"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${tech.glowColor.replace('0.25', '0.15')}`, border: `1px solid ${tech.color}30` }}
      >
        <Icon />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-text leading-tight">{tech.name}</span>
        <span className="text-xs text-text-muted leading-tight">Technology</span>
      </div>
    </motion.div>
  )
}

export default function HeroVisual() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [6, -6]), { stiffness: 100, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-6, 6]), { stiffness: 100, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{ perspective: 800, rotateX, rotateY }}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] hidden md:block"
    >
      {/* Background glow orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)' }}
        />
      </div>

      {/* Secondary glow - cyan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="w-48 h-48 rounded-full translate-x-16 translate-y-8"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)' }}
        />
      </div>

      {/* Center display card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-3xl p-6 w-52 shadow-glow-purple"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text-purple">DM</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Full Stack Dev</p>
            <p className="text-xs text-text-muted mt-0.5">React · Node.js</p>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating tech cards */}
      {techCards.map((tech, i) => (
        <TechCard key={tech.name} tech={tech} index={i} />
      ))}
    </motion.div>
  )
}
