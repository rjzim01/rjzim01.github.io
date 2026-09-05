import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

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
  const heroRef = useRef(null);
  const bgRef = useRef(null);

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

  useEffect(() => {
    let useOrientation = false;
    let baseGamma = 0;
    let baseBeta = 0;
    let calibrationSet = false;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const applyTilt = (rx, ry) => {
      if (!bgRef.current) return;
      gsap.to(bgRef.current, {
        rotationX: rx,
        rotationY: ry,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
        transformPerspective: 1000
      });
    };

    const setTiltFromPoint = (x, y) => {
      const rect = heroRef.current.getBoundingClientRect();
      const nx = (x - rect.left) / rect.width;
      const ny = (y - rect.top) / rect.height;
      applyTilt((ny - 0.5) * 20, (nx - 0.5) * 20);
    };

    const handleOrientation = (e) => {
      if (e.gamma == null || e.beta == null) return;
      if (!calibrationSet) {
        baseGamma = e.gamma;
        baseBeta = e.beta;
        calibrationSet = true;
        return;
      }
      const dy = (e.gamma - baseGamma);
      const dx = (e.beta - baseBeta);
      applyTilt(Math.max(-15, Math.min(15, dx * 0.5)), Math.max(-15, Math.min(15, dy * 0.5)));
    };

    const enableOrientation = async () => {
      if (typeof DeviceOrientationEvent === 'undefined') return;
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const res = await DeviceOrientationEvent.requestPermission();
          if (res !== 'granted') return;
        } catch { return; }
      }
      useOrientation = true;
      window.addEventListener('deviceorientation', handleOrientation);
    };

    const resetTilt = () => applyTilt(0, 0);

    const handleMouseMove = (e) => setTiltFromPoint(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (t) setTiltFromPoint(t.clientX, t.clientY);
    };

    const hero = heroRef.current;
    if (!hero) return;

    if (isTouch && typeof DeviceOrientationEvent !== 'undefined') {
      const onFirstTouch = async () => {
        await enableOrientation();
        hero.removeEventListener('touchstart', onFirstTouch);
      };
      hero.addEventListener('touchstart', onFirstTouch, { once: true });
    } else {
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', resetTilt);
    }
    hero.addEventListener('touchmove', handleTouchMove, { passive: true });
    hero.addEventListener('touchend', resetTilt);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', resetTilt);
      hero.removeEventListener('touchmove', handleTouchMove);
      hero.removeEventListener('touchend', resetTilt);
      if (useOrientation) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen md:min-h-screen md:flex md:items-center px-0 md:px-12 pt-0 md:pt-32 pb-10 md:pb-24 overflow-hidden hero-bg">
      <div ref={bgRef} className="hero-image" style={{ transformStyle: 'preserve-3d' }}></div>
      <div className="absolute inset-0 z-[1] md:bg-gradient-to-r md:from-background/95 md:via-background/70 md:to-background/40 bg-gradient-to-b from-background/30 via-background/70 to-background pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto md:grid md:grid-cols-12 flex flex-col justify-end min-h-screen md:min-h-0 px-4 md:px-0 pt-28 md:pt-0">
        <div className="col-span-12 lg:col-span-8">
          <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-3 md:mb-8 block">
            Software Engineer
          </span>

          <h1 className="font-headline text-[clamp(2.4rem,9vw,6rem)] leading-[0.9] -tracking-[0.03em] mb-6 md:mb-12 italic">
            RIFAT JAHAN <br/>
            <span className="not-italic text-on-surface-variant">ZIM</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center mb-4 md:mb-0">
            <a
              className="bg-primary-container text-on-primary px-8 md:px-10 py-4 md:py-5 rounded-md font-medium tracking-tight hover:bg-primary-fixed-dim transition-all duration-300 active:scale-95 shadow-xl shadow-primary-container/20"
              href="#projects"
            >
              View Projects
            </a>
            <p className="max-w-md text-on-surface-variant font-body text-base md:text-lg leading-relaxed min-h-[3.5rem] md:min-h-0">
              {text}
              <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle animate-pulse"></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
