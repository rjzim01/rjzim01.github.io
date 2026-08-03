import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.project-card')
      if (!cards) return

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
            duration: 0.3,
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
            duration: 0.3,
          })
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={containerRef} className="py-24 container-inner">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        Featured <span className="gradient-text">Projects</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <div
            key={project.title}
            className="project-card glass-panel overflow-hidden hover:border-accent-blue transition-colors group"
          >
            <div className={`h-40 ${project.image} opacity-80 group-hover:opacity-100 transition-opacity`} />

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-slate-100">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-slate-800 text-accent-blue"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.a
                  href="#"
                  className="flex items-center gap-2 text-slate-400 hover:text-accent-blue transition-colors"
                  whileHover={{ x: -2 }}
                >
                  <Github size={18} /> Code
                </motion.a>
                <motion.a
                  href="#"
                  className="flex items-center gap-2 text-slate-400 hover:text-accent-blue transition-colors"
                  whileHover={{ x: 2 }}
                >
                  Details <ExternalLink size={18} />
                </motion.a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
