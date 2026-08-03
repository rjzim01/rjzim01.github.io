import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management and payment integration.',
    tags: ['React', 'Laravel', 'PostgreSQL', 'Stripe'],
    image: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    links: { github: '#', live: '#' },
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization and custom reporting features.',
    tags: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    image: 'bg-gradient-to-br from-purple-500 to-pink-600',
    links: { github: '#', live: '#' },
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team collaboration features.',
    tags: ['React', 'Firebase', 'Tailwind', 'Socket.io'],
    image: 'bg-gradient-to-br from-green-500 to-emerald-600',
    links: { github: '#', live: '#' },
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 container-inner">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        Featured <span className="gradient-text">Projects</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group glass-panel overflow-hidden hover:border-accent-blue transition-colors"
          >
            <div className={`h-40 ${project.image} opacity-80 group-hover:opacity-100 transition-opacity`} />

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-slate-100">{project.title}</h3>
              <p className="text-slate-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-slate-800 text-accent-blue"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.a
                  href={project.links.github}
                  className="flex items-center gap-2 text-slate-400 hover:text-accent-blue transition-colors"
                  whileHover={{ x: -2 }}
                >
                  <Github size={18} /> Code
                </motion.a>
                <motion.a
                  href={project.links.live}
                  className="flex items-center gap-2 text-slate-400 hover:text-accent-blue transition-colors"
                  whileHover={{ x: 2 }}
                >
                  Live <ExternalLink size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
