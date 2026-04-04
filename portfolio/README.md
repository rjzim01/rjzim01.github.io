# RJ ZIM Portfolio - React Version

A modern React portfolio built with Vite and Tailwind CSS.

## Setup

1. **Copy image assets** to `public/assets/img/`:
   - `hero-bg_48kb.webp`
   - `zim_01_49kb.webp`
   - `projects/project_1_mentor.png`
   - `projects/project_2_tikki.png`
   - `projects/project_3_pos.png`
   - `projects/project_4_video.png`
   - `projects/project_5_blog.png`

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy:**
   - Push to `main` branch
   - GitHub Actions will automatically deploy to GitHub Pages
   - Site will be available at: https://rjzim01.github.io/portfolio/

## Project Structure

```
src/
├── components/     # React components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Summary.jsx
│   ├── Resume.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── data/          # Data files
│   └── index.js   # Work, Education, Skills, Projects data
├── hooks/          # Custom React hooks
│   └── useExperience.js
├── App.jsx
├── main.jsx
└── index.css
```

## Features

- Dynamic experience calculator
- Responsive design
- Dark mode
- Tailwind CSS styling
- Data-driven content management
- Easy to update via data files
