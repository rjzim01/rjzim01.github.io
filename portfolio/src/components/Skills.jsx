import { skillsData, frameworkMap } from '../data';

const excluded = ["HTML", "CSS", "Blade", "Vue", "SCSS", "EJS", "Hack", "TypeScript"];

export default function Skills() {
  const filteredLangs = skillsData
    .filter(lang => parseFloat(lang.percent) > 0)
    .filter(lang => !excluded.includes(lang.name))
    .sort((a, b) => b.percent - a.percent);

  return (
    <section id="skills" className="bg-surface-container-low py-20 md:py-32 px-4 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-20">
          <div>
            <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-4 block">
              Expertise
            </span>
            <h2 className="font-headline text-3xl md:text-5xl tracking-tight">Skills</h2>
          </div>
        </div>
        
        <p className="text-on-surface-variant text-base md:text-lg max-w-3xl mb-10 md:mb-16">
          Proficient in a range of programming languages and frameworks including PHP (Laravel), Python (Django), JavaScript (React), and Java for Android development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <h3 className="font-headline text-2xl mb-8 text-primary">Languages</h3>
            {filteredLangs.map((lang) => (
              <div key={lang.name} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold uppercase tracking-wider text-on-surface">
                    {lang.name}
                  </span>
                  <span className="text-xs font-medium text-outline">
                    {lang.percent}%
                  </span>
                </div>
                <div className="w-full rounded-full bg-surface-container-high h-2.5">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${lang.percent}%`, 
                      background: 'linear-gradient(90deg, #00edff, #00dbec)' 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-headline text-2xl mb-8 text-primary">Frameworks & Tools</h3>
            {filteredLangs.map((lang) => (
              frameworkMap[lang.name] && (
                <div key={lang.name} className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold uppercase tracking-wider text-on-surface">
                      {frameworkMap[lang.name]}
                    </span>
                    <span className="text-xs font-medium text-outline">
                      {lang.percent}%
                    </span>
                  </div>
                  <div className="w-full rounded-full bg-surface-container-high h-2.5">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${lang.percent}%`, 
                        background: 'linear-gradient(90deg, #ffd237, #edc225)' 
                      }}
                    />
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
