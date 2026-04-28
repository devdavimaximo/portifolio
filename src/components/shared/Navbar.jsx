import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { config } from "../../data/config";

const navLinks = [
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contato", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", handler, { passive: true });

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);

    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#07070A]/70 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent",
        )}
      >
        <div className="section-padding h-[78px] flex items-center justify-between">
          {/* LOGO */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="group relative flex items-center"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col leading-none">
                

                <span
                  className="
                    text-[1rem]
                    font-semibold
                    tracking-[0.28em]
                    text-white
                  "
                >
                  PORTIFÓLIO
                </span>
              </div>

              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              <div className="hidden lg:flex flex-col leading-none">
                <span className="text-[0.7rem] uppercase tracking-[0.3em] text-zinc-600">
                  Full Stack
                </span>

                <span className="text-[0.7rem] uppercase tracking-[0.3em] text-violet-300/90 mt-1">
                  Engineer
                </span>
              </div>
            </div>

            <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="w-full h-full bg-violet-500/10 blur-2xl" />
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-4">
            <div
              className="
                flex
                items-center
                border
                border-white/[0.05]
                bg-white/[0.02]
                backdrop-blur-xl
              "
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="
                    group
                    relative
                    px-6
                    py-4
                    text-[0.73rem]
                    uppercase
                    tracking-[0.22em]
                    text-zinc-500
                    hover:text-white
                    transition-all
                    duration-300
                    cursor-pointer
                  "
                >
                  <span className="relative z-10">
                    {link.label}
                  </span>

                  <div
                    className="
                      absolute
                      left-0
                      bottom-0
                      h-px
                      w-0
                      bg-violet-400
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </button>
              ))}
            </div>

            <a
              href={`mailto:${config.email}`}
              className="
                group
                relative
                overflow-hidden
                border
                border-violet-500/20
                bg-violet-500/[0.08]
                px-6
                py-4
                text-[0.72rem]
                uppercase
                tracking-[0.22em]
                text-violet-200
                transition-all
                duration-300
                hover:border-violet-400/40
                hover:bg-violet-500/[0.14]
              "
            >
              <div className="relative z-10 flex items-center gap-3">
                Vamos Conversar

                <ArrowUpRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-[2px]
                    group-hover:-translate-y-[2px]
                  "
                />
              </div>

              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                  bg-gradient-to-r
                  from-violet-500/0
                  via-violet-500/10
                  to-violet-500/0
                "
              />
            </a>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              md:hidden
              flex
              items-center
              justify-center
              w-11
              h-11
              border
              border-white/10
              bg-white/[0.03]
              text-zinc-300
              backdrop-blur-md
            "
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="
              fixed
              top-[78px]
              inset-x-0
              z-40
              px-6
              md:hidden
            "
          >
            <div
              className="
                border
                border-white/[0.06]
                bg-[#0D0D11]/95
                backdrop-blur-2xl
              "
            >
              <nav className="flex flex-col p-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    onClick={() => handleNavClick(link.href)}
                    className="
                      flex
                      items-center
                      justify-between
                      px-5
                      py-5
                      text-left
                      text-[0.78rem]
                      uppercase
                      tracking-[0.2em]
                      text-zinc-400
                      border-b
                      border-white/[0.04]
                      hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    {link.label}

                    <ArrowUpRight size={15} />
                  </motion.button>
                ))}

                <a
                  href={`mailto:${config.email}`}
                  onClick={() => setMobileOpen(false)}
                  className="
                    mt-2
                    flex
                    items-center
                    justify-center
                    gap-2
                    border
                    border-violet-500/20
                    bg-violet-500/[0.08]
                    px-4
                    py-5
                    text-[0.75rem]
                    uppercase
                    tracking-[0.2em]
                    text-violet-200
                  "
                >
                  Vamos Conversar
                  <ArrowUpRight size={15} />
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}