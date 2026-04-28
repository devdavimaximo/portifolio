import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function SectionWrapper({ children, className, delay = 0, id }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={delay ? { ...variants, visible: { ...variants.visible, transition: { ...variants.visible.transition, delay } } } : variants}
      className={cn('section-padding py-20 md:py-28 border-t border-white/[0.04]', className)}
    >
      {children}
    </motion.section>
  )
}
