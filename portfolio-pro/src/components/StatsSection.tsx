import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: 15, label: 'Projects Completed' },
  { number: 1, label: 'Years of Experience' },
  { number: 50, label: 'Happy Clients' },
  { number: 5, label: 'Technologies' },
]

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, idx) => {
        const element = counterRefs.current[idx]
        if (!element) return

        const obj = { value: 0 }

        gsap.to(obj, {
          value: stat.number,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            element.textContent = Math.floor(obj.value).toString()
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gradient-to-r from-slate-900/50 to-slate-900/30 border-y border-slate-800"
    >
      <div className="container-inner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                ref={(el) => {
                  if (el) counterRefs.current[idx] = el
                }}
                className="text-4xl md:text-5xl font-bold gradient-text mb-2"
              >
                0
              </div>
              <p className="text-slate-400 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
