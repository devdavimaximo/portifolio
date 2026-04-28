import { motion } from 'framer-motion'
import { config } from '../../data/config'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export default function About() {
  return (
    <section id="about" className="section-padding py-16 md:py-20 relative overflow-hidden border-t border-white/[0.04] bg-[#07070c]">

      <div className="absolute top-0 left-1/3 w-[400px] h-[200px] bg-violet-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Label row */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp} custom={0}
          className="flex items-center gap-5 mb-8"
        >
          <span className="text-[0.58rem] uppercase tracking-[0.28em] text-zinc-600">Sobre mim</span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
          <span className="text-[0.58rem] uppercase tracking-[0.2em] text-zinc-700">02</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp} custom={0.05}
          className="mb-8"
        >
          <h2 className="text-[1.8rem] sm:text-[2.4rem] lg:text-[3rem] font-semibold leading-[0.95] tracking-[-0.04em]">
            <span className="text-white">Desenvolvedor Full Stack</span>
            <span className="text-zinc-600"> em busca da</span>
            <br />
            <span className="text-white">primeira oportunidade real.</span>
          </h2>
        </motion.div>

        <div className="h-px bg-white/[0.05] mb-8" />

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 mb-8">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} custom={0.1}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[3px] h-3.5 bg-violet-500" />
              <span className="text-[0.57rem] uppercase tracking-[0.24em] text-violet-400">Backend · C# &amp; .NET</span>
            </div>
            <p className="text-zinc-400 text-[0.88rem] leading-[1.8]">
              Meu foco principal é backend com{' '}
              <span className="text-zinc-200">C# e .NET</span>. Tenho construído
              aplicações com ASP.NET Core, APIs REST, SQL Server e Entity Framework —
              onde concentro mais esforço e quero me especializar.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp} custom={0.15}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[3px] h-3.5 bg-cyan-500/70" />
              <span className="text-[0.57rem] uppercase tracking-[0.24em] text-cyan-400/80">Frontend · Objetivos</span>
            </div>
            <p className="text-zinc-400 text-[0.88rem] leading-[1.8]">
              Conhecimento em{' '}
              <span className="text-zinc-200">React e JavaScript</span> para entregar
              projetos completos. Buscando a primeira vaga para crescer dentro de um
              time e evoluir rápido.
            </p>
          </motion.div>

        </div>

        <div className="h-px bg-white/[0.05] mb-7" />

        {/* Stats */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp} custom={0.2}
          className="flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          {config.stats.map((stat, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="text-[1.4rem] font-semibold leading-none text-white">{stat.value}</span>
              <span className="text-[0.55rem] uppercase tracking-[0.2em] text-zinc-600">{stat.label}</span>
            </div>
          ))}
          <div className="hidden md:block w-px h-5 bg-white/[0.07] mx-1" />
          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-zinc-700">
            Pronto para crescer num time
          </p>
        </motion.div>

      </div>
    </section>
  )
}
