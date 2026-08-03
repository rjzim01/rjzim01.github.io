import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import gsap from 'gsap'
import { personalInfo } from '../data'

export default function AnimatedHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'back.out' },
        0
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.4
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out' },
          0.6
        )
        .fromTo(
          '.hero-social',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
          0.8
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="min-h-screen flex items-center pt-20 container-inner relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse"></div>

      <motion.div className="w-full max-w-3xl relative z-10">
        <motion.div className="mb-8">
          <span className="text-accent-blue text-sm font-semibold tracking-widest">
            ← Welcome to my portfolio
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold mb-6 leading-tight perspective"
        >
          I'm {personalInfo.name} <span className="gradient-text"></span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed"
        >
          {personalInfo.title} • Full-stack developer with expertise in Laravel, React, and Python.
          I craft performant, scalable web applications and digital solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <motion.a
            href="#projects"
            className="hero-cta inline-flex items-center gap-2 bg-accent-blue text-slate-950 px-8 py-4 rounded-lg font-semibold hover:bg-accent-indigo transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View my work <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="#contact"
            className="hero-cta inline-flex items-center gap-2 border border-slate-700 text-slate-100 px-8 py-4 rounded-lg font-semibold hover:border-accent-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
          </motion.a>
        </div>

        <div className="flex gap-6">
          {[
            { icon: Github, label: 'GitHub', href: 'https://github.com/rjzim01' },
            { icon: Linkedin, label: 'LinkedIn', href: '#' },
            { icon: Mail, label: 'Email', href: `mailto:${personalInfo.email}` },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="hero-social text-slate-400 hover:text-accent-blue transition-colors"
              whileHover={{ y: -3 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
