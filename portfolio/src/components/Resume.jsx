import { workData, educationData } from '../data';
import { useExperienceCalculator, useTotalExperience } from '../hooks/useExperience';

const workPeriods = [
  { start: '2024-09-01', end: '2024-12-31' },
  { start: '2025-01-01', end: '2025-05-31' },
  { start: '2025-06-01', end: null }
];

export default function Resume() {
  const currentDuration = useExperienceCalculator('2025-06-01');
  const totalExp = useTotalExperience(workPeriods);

  return (
    <section id="resume" className="py-20 md:py-40 px-4 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-12 md:mb-20">
          <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-4 block">
            Qualifications
          </span>
          <h2 className="font-headline text-3xl md:text-5xl tracking-tight">Resume</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Work Experience */}
          <div>
            <h3 className="font-headline text-2xl mb-10 text-primary italic">Work Experience</h3>
            
            {workData.map((work, index) => (
              <div key={index} className="border-l-2 border-outline-variant pl-8 mb-10 relative">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-primary-container rounded-full"></div>
                <span className="text-primary text-xs uppercase tracking-[0.2em] font-label">
                  {work.period}
                  {work.isCurrent && ` (${currentDuration})`}
                </span>
                <h4 className="font-headline text-xl mt-2">{work.title}</h4>
                <p className="text-on-surface-variant text-sm mt-1">{work.company}</p>
                <ul className="text-on-surface-variant/70 text-sm mt-3 space-y-2 list-disc list-inside">
                  {work.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Summary Box */}
            <div className="bg-surface-container rounded-lg p-6 border border-outline-variant mt-8">
              <h3 className="font-headline text-xl mb-4 text-primary">Summary</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-primary text-xs uppercase tracking-wider">Total Experience</span>
                  <p className="text-on-surface text-lg font-medium">
                    {totalExp.main} <span className="text-xs font-normal opacity-50">{totalExp.detail}</span>
                  </p>
                </div>
                <div>
                  <span className="text-primary text-xs uppercase tracking-wider">Industry</span>
                  <p className="text-on-surface text-sm">Software Development</p>
                </div>
                <div>
                  <span className="text-primary text-xs uppercase tracking-wider">Current Role</span>
                  <p className="text-on-surface text-sm">Jr. Software Engineer</p>
                </div>
                <div>
                  <span className="text-primary text-xs uppercase tracking-wider">Education</span>
                  <p className="text-on-surface text-sm">M.Sc Running</p>
                </div>
              </div>
              <p className="text-on-surface-variant/70 text-sm leading-relaxed mb-4">
                Software engineer with hands-on experience in full-stack web development using Laravel, Django, and React. 
                Proven ability to lead teams, manage projects, and deliver solutions from concept to deployment. 
                Passionate about building scalable applications and continuously learning new technologies.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Problem Solving', 'Team Leadership', 'Agile/Scrum', 'REST APIs', 'Version Control'].map((skill) => (
                  <span key={skill} className="bg-surface-container-high px-3 py-1 rounded-full text-xs text-on-surface-variant">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Education */}
          <div>
            <h3 className="font-headline text-2xl mb-10 text-primary italic">Education</h3>
            
            {educationData.map((edu, index) => (
              <div key={index} className="border-l-2 border-outline-variant pl-8 mb-10 relative">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-primary-container rounded-full"></div>
                <span className="text-primary text-xs uppercase tracking-[0.2em] font-label">{edu.period}</span>
                <h4 className="font-headline text-xl mt-2">{edu.title}</h4>
                <p className="text-on-surface-variant text-sm mt-1">{edu.institution}</p>
                {edu.description && (
                  <p className="text-on-surface-variant/70 text-sm mt-3">{edu.description}</p>
                )}
                <p className="text-on-surface-variant text-sm mt-1">Result : {edu.result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
