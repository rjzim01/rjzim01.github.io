import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedAbout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const skillsGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (skillsGridRef.current) {
        const items = skillsGridRef.current.querySelectorAll('.skill-item')

        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={containerRef} className="py-24 container-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            About <span className="gradient-text">me</span>
          </h2>
          <div className="space-y-4 text-slate-400 text-lg">
            <p>
              {personalInfo.bio}
            </p>
            <p>
              I'm a junior software engineer with experience across full-stack development. Currently working at B2B Solver,
              I've built educational platforms, ticketing systems, and streaming applications using modern web technologies.
              I'm passionate about clean code, scalable architecture, and continuous learning.
            </p>
            <div className="pt-4">
              <p className="text-slate-300 text-base">
                <span className="font-semibold text-accent-blue">📍 Location:</span> {personalInfo.location}
              </p>
              <p className="text-slate-300 text-base mt-2">
                <span className="font-semibold text-accent-blue">🎓 Education:</span> M.Sc in CSE (Running) at Jahangirnagar University
              </p>
            </div>
          </div>
        </motion.div>

        <div ref={skillsGridRef} className="grid grid-cols-2 gap-4">
          {personalInfo.expertise.map((skill) => (
            <div
              key={skill}
              className="skill-item glass-panel p-4 text-center hover:border-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20 cursor-pointer group"
            >
              <span className="group-hover:text-accent-blue transition-colors">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
