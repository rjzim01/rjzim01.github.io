import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react'
import { personalInfo } from '../data'

export default function Contact() {
  const contactLinks = [
    { icon: Mail, label: 'Email', href: `mailto:${personalInfo.email}` },
    { icon: Github, label: 'GitHub', href: 'https://github.com/rjzim01' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rjzim/' },
    { icon: Phone, label: 'Phone', href: `tel:${personalInfo.phone}` },
  ]

  return (
    <section id="contact" className="py-24 container-inner">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Let's work <span className="gradient-text">together</span>
        </h2>

        <p className="text-xl text-slate-400 mb-12">
          I'm always interested in new opportunities and collaboration. Feel free to reach out via email or phone!
        </p>

        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="inline-block bg-accent-blue text-slate-950 px-10 py-4 rounded-lg font-semibold mb-12 hover:bg-accent-indigo transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send me an email
        </motion.a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 p-8 bg-slate-900/50 rounded-lg border border-slate-800">
          <div>
            <div className="flex items-center justify-center mb-4">
              <Mail className="text-accent-blue" size={24} />
            </div>
            <p className="text-slate-400 text-sm uppercase mb-2">Email</p>
            <a href={`mailto:${personalInfo.email}`} className="text-accent-blue hover:text-accent-indigo font-semibold">
              {personalInfo.email}
            </a>
          </div>
          <div>
            <div className="flex items-center justify-center mb-4">
              <Phone className="text-accent-blue" size={24} />
            </div>
            <p className="text-slate-400 text-sm uppercase mb-2">Phone</p>
            <p className="text-slate-200 font-semibold">{personalInfo.phone}</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-4">
              <MapPin className="text-accent-blue" size={24} />
            </div>
            <p className="text-slate-400 text-sm uppercase mb-2">Location</p>
            <p className="text-slate-200 font-semibold">{personalInfo.location}</p>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-accent-blue transition-colors"
              whileHover={{ y: -4 }}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <link.icon size={28} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
