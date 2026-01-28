# NXTGEN'26 International Hackathon Hub

A modern, interactive website for the NXTGEN'26 International Hackathon under TEXUS 2026, the flagship tech fest of SRM Institute of Science and Technology, Ramapuram.

## 🚀 Features

- **Interactive Hero Section** with WebGL background (FaultyTerminal) and video integration
- **Animated Sections** with GSAP, Framer Motion, and custom animations
- **Responsive Design** optimized for all devices
- **Modern UI Components** including StaggeredMenu, interactive cards, and lightbox gallery
- **Smooth Animations** throughout the site with scroll-based reveals
- **Video Loading Screen** with intro video support

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Animations**: GSAP, Framer Motion
- **WebGL**: OGL (for 3D effects)
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── FaultyTerminal.tsx
│   │   ├── SplitText.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── HyperText.tsx
│   │   ├── StaggeredMenu.tsx
│   │   ├── GradualBlur.tsx
│   │   └── ...
│   └── sections/        # Page sections
│       ├── HeroSection.tsx
│       ├── PitchSection.tsx
│       ├── VisionSection.tsx
│       ├── TracksSection.tsx
│       └── ...
├── pages/
│   └── Index.tsx        # Main page
└── App.tsx              # App root
```

## 🎨 Sections

1. **Hero Section** - Main landing with video and countdown
2. **Pitch Section** - One-liner about the hackathon
3. **Vision Section** - About NXTGEN'26
4. **Tracks Section** - Hackathon tracks (EcoTech, HealthTech, etc.)
5. **Prizes Section** - Rewards and prizes
6. **Timeline Section** - Event schedule (Jan 17 - Feb 22, 2026)
7. **Format Section** - How it works (4 steps)
8. **Mentors & Judges** - Industry experts and faculty
9. **Workshops Section** - Pre-event workshops
10. **Venue Section** - Location information
11. **Apply Section** - Registration form
12. **Sponsors Section** - Event sponsors
13. **Gallery Section** - Previous hackathon moments
14. **FAQ Section** - Frequently asked questions
15. **Location Section** - Maps and directions
16. **Support Section** - Help and resources
17. **Contact Section** - Contact form
18. **Footer** - Links and social media

## 🎯 Key Components

- **FaultyTerminal**: WebGL terminal background effect
- **StaggeredMenu**: Animated navigation menu
- **GradualBlur**: Gradient blur transitions
- **SplitText**: Animated text splitting
- **ScrollReveal**: Scroll-based animations
- **HyperText**: Interactive text effects
- **GalleryLightbox**: Image lightbox viewer

## 🎬 Video Integration

The intro video is located at `/public/assets/video/intro.MP4` and plays:
1. On initial page load (loading screen)
2. Once in the hero section after loading screen fades
3. Fades out in the last 2 seconds to reveal content

## 📝 Customization

### Update Event Dates
Edit `src/components/sections/TimelineSection.tsx` and `src/components/sections/HeroSection.tsx`

### Update Content
Most content can be edited directly in the respective section files in `src/components/sections/`

### Update Images
- Logo: `/public/assets/logo/logo.png`
- Gallery: `/public/assets/previous/*.jpg`
- Video: `/public/assets/video/intro.MP4`

## 🌐 Deployment

The project can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repo
- **GitHub Pages**: Use GitHub Actions
- **Traditional hosting**: Upload `dist/` folder after `npm run build`

## 📄 License

This project is created for NXTGEN'26 Hackathon under TEXUS 2026.

## 👥 Credits

Built for SRM Institute of Science and Technology, Ramapuram Campus.
