import { motion } from 'framer-motion'

const skillCategories = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Next.js'],
  },
  {
    category: 'Backend',
    skills: ['PHP', 'Laravel', 'Node.js', 'REST APIs', 'Database Design'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Firebase'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 container-inner">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        <span className="gradient-text">Skills</span> & Expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-panel p-8"
          >
            <h3 className="text-xl font-bold mb-6 text-accent-blue">{category.category}</h3>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <motion.li
                  key={skill}
                  className="flex items-center gap-3 text-slate-300"
                  whileHover={{ x: 4 }}
                >
                  <span className="w-2 h-2 rounded-full bg-accent-blue" />
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
