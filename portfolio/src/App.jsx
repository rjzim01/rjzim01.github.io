import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="fixed inset-0 noise-overlay pointer-events-none z-[100]"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
