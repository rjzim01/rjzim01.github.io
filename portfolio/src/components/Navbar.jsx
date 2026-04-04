import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#resume', label: 'Resume' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#1c1b1b]/60 backdrop-blur-xl shadow-2xl shadow-black/50">
        <div className="flex justify-between items-center px-4 md:px-12 py-4 md:py-6 w-full max-w-[1920px] mx-auto">
          <div className="font-['Newsreader'] font-bold text-2xl tracking-tighter text-[#e5e2e1]">
            RJ ZIM
          </div>
          
          <div className="hidden md:flex gap-12 items-center">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`font-['Newsreader'] italic text-2xl tracking-tight transition-opacity duration-300 hover:opacity-80 ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#00edff] border-b border-[#00edff] pb-1'
                    : 'text-[#e5e2e1]/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden text-on-surface"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 px-4 pb-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#e5e2e1]/70 hover:text-[#e5e2e1] font-['Newsreader'] italic text-xl"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
