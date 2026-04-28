import { motion } from 'framer-motion'
import SectionWrapper from '../shared/SectionWrapper'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="bg-[#050508]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-primary-light font-medium tracking-wider uppercase">
            Portfólio
          </p>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Projetos selecionados
            </h2>
            <div className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-r from-border to-transparent" />
          </div>
          <p className="text-text-muted max-w-xl">
            Uma seleção de trabalhos que demonstram minha capacidade técnica e atenção aos detalhes.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariant}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
