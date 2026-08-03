import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company Inc.',
    period: '2023 - Present',
    description: 'Leading frontend development with React and TypeScript. Mentoring junior developers and improving code quality.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Agency',
    period: '2021 - 2023',
    description: 'Built and maintained web applications using React and Laravel. Improved performance and user experience.',
  },
  {
    title: 'Junior Developer',
    company: 'Web Studios',
    period: '2019 - 2021',
    description: 'Started my career learning fundamentals of web development. Worked on various client projects.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 container-inner">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        <span className="gradient-text">Professional</span> Experience
      </h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 hover:border-accent-indigo transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{exp.title}</h3>
                <p className="text-accent-blue">{exp.company}</p>
              </div>
              <span className="text-slate-500 text-sm">{exp.period}</span>
            </div>
            <p className="text-slate-400">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
