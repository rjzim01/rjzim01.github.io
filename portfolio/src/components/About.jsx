import { useState, useEffect } from 'react';

export default function About() {
  const [bmi, setBmi] = useState({ value: 0, category: '' });

  useEffect(() => {
    const heightStr = "5'8\"";
    const weightKg = 89;
    const heightParts = heightStr.match(/(\d+)'(\d+)/);
    
    if (heightParts) {
      const feet = parseInt(heightParts[1], 10);
      const inches = parseInt(heightParts[2], 10);
      const totalInches = (feet * 12) + inches;
      const heightMeters = totalInches * 0.0254;
      
      if (heightMeters > 0) {
        const bmiValue = weightKg / (heightMeters * heightMeters);
        let category = '';
        
        if (bmiValue < 18.5) category = 'Underweight';
        else if (bmiValue < 25) category = 'Normal';
        else if (bmiValue < 30) category = 'Overweight';
        else category = 'Obese';
        
        setBmi({ value: bmiValue.toFixed(1), category });
      }
    }
  }, []);

  return (
    <section id="about" className="py-20 md:py-40 px-4 md:px-12">
      <div className="max-w-[1920px] mx-auto grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 lg:col-span-5">
          <img 
            src="assets/img/zim_01_49kb.webp" 
            className="rounded-lg w-full max-w-sm md:max-w-md opacity-80 hover:opacity-100 transition-opacity duration-500 mx-auto lg:mx-0" 
            alt="RJ ZIM" 
          />
        </div>
        
        <div className="col-span-12 lg:col-span-7">
          <span className="font-label text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.2em] text-primary mb-4 md:mb-8 block">
            About Me
          </span>
          
          <h2 className="font-headline text-3xl md:text-5xl leading-tight mb-6 md:mb-8 italic">
            Junior Software Developer
          </h2>
          
          <p className="text-on-surface-variant text-base md:text-xl font-body leading-relaxed mb-6 md:mb-8">
            Hello, I'm RIFAT JAHAN ZIM, a graduate from Daffodil International University, under Computer Science and Engineering Department. Currently I live in Dhaka, Bangladesh. My home town is Manikgonj. Passionate about software development with a vision to explore diverse domains, contribute as a team player, and continuously expand knowledge while sharing expertise.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <div>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">Date of Birth:</span> 06-Sep-1998
              </p>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">Height:</span> 5'8"
              </p>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">Phone:</span> 01302917207
              </p>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">City:</span> Dhaka, Bangladesh
              </p>
            </div>
            <div>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">Degree:</span> Bsc
              </p>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">Email:</span> rjzim01@gmail.com
              </p>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">Freelance:</span> Available
              </p>
              <p className="text-on-surface-variant text-sm mb-3">
                <span className="text-primary font-medium">BMI:</span> {bmi.value} ({bmi.category})
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
