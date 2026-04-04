export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-40 px-4 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-4 md:mb-8 block">
          Get In Touch
        </span>
        
        <h2 className="font-headline text-3xl md:text-5xl leading-tight mb-8 md:mb-12 italic max-w-2xl">
          Let's build something extraordinary together.
        </h2>
        
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
            <div>
              <p className="text-on-surface-variant text-sm uppercase tracking-widest font-label mb-1">Location</p>
              <p className="text-on-surface text-lg">Dhaka, Bangladesh</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-primary text-3xl">mail</span>
            <div>
              <p className="text-on-surface-variant text-sm uppercase tracking-widest font-label mb-1">Email</p>
              <a className="text-on-surface text-lg hover:text-primary transition-colors" href="mailto:rjzim01@gmail.com">
                rjzim01@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-primary text-3xl">call</span>
            <div>
              <p className="text-on-surface-variant text-sm uppercase tracking-widest font-label mb-1">Phone</p>
              <p className="text-on-surface text-lg">01302917207</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
