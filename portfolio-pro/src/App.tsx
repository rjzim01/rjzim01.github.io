import Navigation from './components/Navigation'
import AnimatedHero from './components/AnimatedHero'
import StatsSection from './components/StatsSection'
import AnimatedAbout from './components/AnimatedAbout'
import AnimatedExperience from './components/AnimatedExperience'
import AnimatedProjects from './components/AnimatedProjects'
import AnimatedSkills from './components/AnimatedSkills'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      <main className="overflow-hidden">
        <AnimatedHero />
        <StatsSection />
        <AnimatedAbout />
        <AnimatedExperience />
        <AnimatedProjects />
        <AnimatedSkills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
