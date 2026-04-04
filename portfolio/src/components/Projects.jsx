import { projectsData } from '../data';

export default function Projects() {
  return (
    <section id="projects" className="bg-surface-container-low py-20 md:py-32 px-4 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-20">
          <div>
            <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-4 block">
              Portfolio
            </span>
            <h2 className="font-headline text-3xl md:text-5xl tracking-tight">Projects</h2>
          </div>
        </div>
        
        <p className="text-on-surface-variant text-base md:text-lg max-w-3xl mb-10 md:mb-16">
          Personal portfolio projects showcasing knowledge in Laravel and Django with Bootstrap templates for frontend.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {projectsData.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-lg mb-8 bg-surface-container-highest relative">
                <img 
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                  src={project.image} 
                  alt={project.name} 
                />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-surface-container-lowest to-transparent">
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-label uppercase tracking-widest mb-2 inline-block">
                    {project.tech}
                  </span>
                </div>
              </div>
              <h3 className="font-headline text-2xl mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
              <p className="text-on-surface-variant font-body text-sm uppercase tracking-widest">{project.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
