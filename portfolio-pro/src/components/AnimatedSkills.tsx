import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    category: 'Frontend',
    skills: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    category: 'Backend',
    skills: ['PHP', 'Laravel', 'Python', 'Django', 'REST APIs', 'MySQL'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Docker', 'Linux', 'MySQL', 'PostgreSQL'],
  },
]

export default function AnimatedSkills() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.skill-card')
      if (!cards) return

      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotateY: -20 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: idx * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Skills list animation
        const skills = card.querySelectorAll('.skill-item')
        gsap.fromTo(
          skills,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={containerRef} className="py-24 container-inner">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        <span className="gradient-text">Skills</span> & Expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <motion.div
            key={category.category}
            className="skill-card glass-panel p-8 hover:border-accent-indigo transition-all duration-300 hover:shadow-lg hover:shadow-accent-indigo/20"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-6 text-accent-blue">{category.category}</h3>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <motion.li
                  key={skill}
                  className="skill-item flex items-center gap-3 text-slate-300 hover:text-accent-blue transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full bg-accent-blue"
                    whileHover={{ scale: 1.5 }}
                  />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
