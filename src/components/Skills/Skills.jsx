import { motion } from 'framer-motion'
import SectionWrapper from '../shared/SectionWrapper'
import SkillBadge from './SkillBadge'
import { skillCategories } from '../../data/skills'

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-[#07070c]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-primary-light font-medium tracking-wider uppercase">
            Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
            Stack técnica
          </h2>
          <p className="text-text-muted max-w-xl">
            Foco principal em backend com C# e .NET. Conhecimento em frontend para entregar
            aplicações completas — sem depender de outra pessoa para colocar no ar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 pb-2 border-b border-border"
              >
                <span className="text-sm font-semibold text-text">{category.label}</span>
                <span className="text-xs text-text-muted">({category.skills.length})</span>
              </motion.div>
              <div className="flex flex-col gap-2">
                {category.skills.map((skill, i) => (
                  <SkillBadge key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
