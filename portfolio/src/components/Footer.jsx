export default function Footer() {
  return (
    <footer className="bg-[#131313] w-full py-12 md:py-20 px-4 md:px-12 border-t border-[#3b494b]/15">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 w-full max-w-[1920px] mx-auto">
        <div className="font-['Newsreader'] text-xl text-[#e5e2e1]">RJ ZIM</div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <a 
            className="font-['Manrope'] uppercase tracking-[0.2em] text-[10px] text-[#e5e2e1]/40 hover:text-[#00edff] transition-colors duration-500" 
            href="https://github.com/rjzim01/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            className="font-['Manrope'] uppercase tracking-[0.2em] text-[10px] text-[#e5e2e1]/40 hover:text-[#00edff] transition-colors duration-500" 
            href="https://www.linkedin.com/in/rifat-jahan-zim-48b1081a1/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            className="font-['Manrope'] uppercase tracking-[0.2em] text-[10px] text-[#e5e2e1]/40 hover:text-[#00edff] transition-colors duration-500" 
            href="https://twitter.com/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a 
            className="font-['Manrope'] uppercase tracking-[0.2em] text-[10px] text-[#e5e2e1]/40 hover:text-[#00edff] transition-colors duration-500" 
            href="https://facebook.com/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a 
            className="font-['Manrope'] uppercase tracking-[0.2em] text-[10px] text-[#e5e2e1]/40 hover:text-[#00edff] transition-colors duration-500" 
            href="#hero"
          >
            Back to Top
          </a>
        </div>
        
        <p className="font-['Manrope'] uppercase tracking-[0.2em] text-[10px] text-[#e5e2e1]/50">
          &copy; 2024 RJ ZIM. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
