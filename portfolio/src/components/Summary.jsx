export default function Summary() {
  return (
    <section id="summary" className="py-20 md:py-32 px-4 md:px-12 bg-surface-container-low">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-4 block">
            Overview
          </span>
          <h2 className="font-headline text-3xl md:text-5xl tracking-tight">Summary of Experience</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="bg-surface-container rounded-lg p-8 border border-outline-variant">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">code</span>
            <h3 className="font-headline text-xl mb-3">Software Development</h3>
            <p className="text-on-surface-variant/70 text-sm">
              Building scalable web applications using Laravel, Django, and React with focus on clean architecture and maintainable code.
            </p>
          </div>
          
          <div className="bg-surface-container rounded-lg p-8 border border-outline-variant">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">database</span>
            <h3 className="font-headline text-xl mb-3">Database Design</h3>
            <p className="text-on-surface-variant/70 text-sm">
              Designing efficient database schemas, optimizing queries, and managing data integrity with MySQL and SQLite.
            </p>
          </div>
          
          <div className="bg-surface-container rounded-lg p-8 border border-outline-variant">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">group</span>
            <h3 className="font-headline text-xl mb-3">Team Collaboration</h3>
            <p className="text-on-surface-variant/70 text-sm">
              Working effectively in team environments, leading development initiatives, and coordinating with cross-functional teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
