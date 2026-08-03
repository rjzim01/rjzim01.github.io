import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function About() {
  const ref = useInView()

  return (
    <section id="about" ref={ref} className="py-24 container-inner">
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
              I'm a passionate software engineer with 5+ years of experience building web applications
              that solve real-world problems. My journey in tech started with curiosity and has evolved
              into a commitment to crafting exceptional user experiences.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open source,
              or sharing knowledge with the community. I believe in continuous learning and staying updated
              with industry best practices.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {['JavaScript', 'React', 'TypeScript', 'PHP', 'Laravel', 'MySQL', 'Git', 'REST APIs'].map((skill) => (
            <div
              key={skill}
              className="glass-panel p-4 text-center hover:border-accent-blue transition-colors"
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
