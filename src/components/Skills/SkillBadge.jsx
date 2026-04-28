import { motion } from 'framer-motion'

export default function SkillBadge({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.06 }}
      className="flex flex-col gap-3 p-4 rounded-2xl bg-bg-secondary border border-border hover:border-border-light transition-colors duration-200 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}80` }}
          />
          <span className="text-sm font-medium text-text">{skill.name}</span>
        </div>
        <span className="text-xs text-text-muted">{skill.level}%</span>
      </div>

      <div className="h-1 rounded-full bg-bg-tertiary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 + index * 0.06 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${skill.color}99, ${skill.color})` }}
        />
      </div>
    </motion.div>
  )
}
