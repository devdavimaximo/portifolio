import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { config } from "../../data/config";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function HeroText() {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="
        relative
        flex
        flex-col
        max-w-[520px]
        pt-16
      "
    >
      {/* AMBIENT */}
      <div className="absolute -left-24 top-12 w-56 h-56 bg-violet-500/[0.04] hidden md:block blur-[100px] pointer-events-none" />

      {/* HEADER INFO */}
      <div className="flex flex-col gap-4">
        {/* STATUS */}
        <motion.div
          variants={item}
          className="flex items-center gap-2"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-70" />
          </div>

          <span
            className="
              text-[0.62rem]
              uppercase
              tracking-[0.22em]
              text-zinc-400
            "
          >
            Disponível para projetos
          </span>
        </motion.div>

        {/* ROLE */}
        <motion.div
          variants={item}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-px bg-gradient-to-r from-violet-400 to-transparent" />

          <span
            className="
              text-[0.62rem]
              uppercase
              tracking-[0.28em]
              text-violet-300
            "
          >
            Full Stack Engineer
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.div variants={item}>
          <h1
            className="
              text-[3.4rem]
              sm:text-[4.5rem]
              lg:text-[5.3rem]
              font-semibold
              leading-[0.9]
              tracking-[-0.08em]
              text-white
            "
          >
            Davi
            <br />

            <span className="text-zinc-400">
              Maximo
            </span>
          </h1>
        </motion.div>
      </div>

      {/* DESCRIPTION */}
      <motion.div
        variants={item}
        className="mt-6"
      >
        <p
          className="
            max-w-[470px]
            text-[0.96rem]
            leading-[1.9]
            text-zinc-300
          "
        >
          Desenvolvedor Full Stack com foco em C# e .NET. Construindo aplicações sólidas, do backend à interface.
        </p>

        {/* STACK */}
        <div className="flex flex-wrap gap-2 mt-6">
          {["C#", ".NET", "React", "Next.js", "Node"].map((tech) => (
            <div
              key={tech}
              className="
                px-3
                py-1.5
                border
                border-white/[0.05]
                bg-white/[0.02]
                text-[0.6rem]
                uppercase
                tracking-[0.16em]
                text-zinc-300
              "
            >
              {tech}
            </div>
          ))}
        </div>
      </motion.div>

      {/* BUTTONS */}
      <motion.div
        variants={item}
        className="flex flex-wrap gap-3 mt-8"
      >
        <button
          onClick={() => handleScroll("#projects")}
          className="
            group
            flex
            items-center
            gap-2
            border
            border-violet-500/20
            bg-violet-500/[0.08]
            px-6
            py-3.5
            text-[0.64rem]
            uppercase
            tracking-[0.22em]
            text-white
            transition-all
            duration-300
            hover:border-violet-400/40
            hover:bg-violet-500/[0.14]
          "
        >
          Ver Projetos

          <ArrowRight
            size={13}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </button>

        <a
          href={config.github}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-center
            gap-2
            border
            border-white/[0.06]
            bg-white/[0.02]
            px-6
            py-3.5
            text-[0.64rem]
            uppercase
            tracking-[0.22em]
            text-zinc-200
            transition-all
            duration-300
            hover:border-white/[0.12]
            hover:text-white
          "
        >
          <GithubIcon size={13} />

          GitHub
        </a>
      </motion.div>

      {/* STATS */}
      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10"
      >
        {config.stats.map((stat, i) => (
          <div key={i}>
            <span className="text-[1.8rem] font-semibold text-white">
              {stat.value}
            </span>

            <p
              className="
                mt-1.5
                text-[0.58rem]
                uppercase
                tracking-[0.2em]
                text-zinc-400
              "
            >
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}