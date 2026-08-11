import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workData } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedExperience() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.experience-item')
      if (!items) return

      items.forEach((item, idx) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Add left border animation
        const border = item.querySelector('.exp-border')
        if (border) {
          gsap.fromTo(
            border,
            { scaleY: 0, transformOrigin: 'top' },
            {
              scaleY: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={containerRef} className="py-24 container-inner">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        <span className="gradient-text">Professional</span> Experience
      </h2>

      <div className="space-y-8 relative">
        {workData.map((exp, index) => (
          <div key={`${exp.company}-${index}`} className="experience-item glass-panel p-8 hover:border-accent-indigo transition-colors group relative pl-6">
            <div className="exp-border absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-blue to-accent-purple opacity-0"></div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-accent-blue transition-colors">
                  {exp.title}
                </h3>
                <p className="text-accent-blue">{exp.company}</p>
              </div>
              <span className="text-slate-500 text-sm">{exp.period}</span>
            </div>
            <p className="text-slate-400">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
