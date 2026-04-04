import { useState, useEffect } from 'react';

const typedTexts = [
  "I'm a Software Engineer",
  "Expert in PHP (Laravel)",
  "Expert in JavaScript (React Js)",
  "Expert in SQL (MySQL, SQLite)"
];

export default function Hero() {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = typedTexts[textIndex];
    const speed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex === current.length) {
          setIsDeleting(true);
          setTimeout(() => {}, 2000);
        }
      } else {
        setText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typedTexts.length);
        }
      }
    }, charIndex === 0 && !isDeleting ? 500 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-4 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden hero-bg">
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30"></div>
      
      <div className="grid grid-cols-12 w-full max-w-[1920px] mx-auto relative z-10">
        <div className="col-span-12 lg:col-span-8">
          <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-4 md:mb-8 block">
            Software Engineer
          </span>
          
          <h1 className="font-headline text-[clamp(2.2rem,8vw,6rem)] leading-[0.9] -tracking-[0.03em] mb-8 md:mb-12 italic">
            RIFAT JAHAN <br/>
            <span className="not-italic text-on-surface-variant">ZIM</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            <a 
              className="bg-primary-container text-on-primary px-8 md:px-10 py-4 md:py-5 rounded-md font-medium tracking-tight hover:bg-primary-fixed-dim transition-all duration-300 active:scale-95 shadow-xl shadow-primary-container/10"
              href="#projects"
            >
              View Projects
            </a>
            <p className="max-w-md text-on-surface-variant font-body text-base md:text-lg leading-relaxed">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
