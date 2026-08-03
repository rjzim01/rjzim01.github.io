import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="min-h-screen flex items-center pt-20 container-inner">
      <motion.div
        className="w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <span className="text-accent-blue text-sm font-semibold tracking-widest">
            ← Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
        >
          I build elegant <span className="gradient-text">digital products</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed"
        >
          Full-stack software engineer with expertise in React, Laravel, and TypeScript.
          I craft performant, accessible, and beautiful web experiences.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 bg-accent-blue text-slate-950 px-8 py-4 rounded-lg font-semibold hover:bg-accent-indigo transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View my work <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 border border-slate-700 text-slate-100 px-8 py-4 rounded-lg font-semibold hover:border-accent-blue transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-6">
          {[
            { icon: Github, label: 'GitHub', href: '#' },
            { icon: Linkedin, label: 'LinkedIn', href: '#' },
            { icon: Mail, label: 'Email', href: '#' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="text-slate-400 hover:text-accent-blue transition-colors"
              whileHover={{ y: -3 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
