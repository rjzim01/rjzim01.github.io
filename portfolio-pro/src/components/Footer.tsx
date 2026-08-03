import { motion } from 'framer-motion'
import { personalInfo } from '../data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800/50 py-12 container-inner">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <p className="text-slate-500">
          © {currentYear} {personalInfo.name}. All rights reserved.
        </p>
        <p className="text-slate-500">
          Built with <span className="text-accent-blue">React</span> • <span className="text-accent-indigo">TypeScript</span> • <span className="text-accent-purple">GSAP</span>
        </p>
      </motion.div>
    </footer>
  )
}
