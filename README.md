# Mood Room - 3D Personality Space

A Next.js application that creates personalized 3D rooms based on mood and personality. Built with React Three Fiber, Zustand, and Tailwind CSS.

## Features

- 🎨 **Interactive 3D Room**: Realistic room with floating objects
- 🎭 **Mood-Driven Visuals**: Colors, lighting, and effects change with mood
- 🎲 **Random Object Placement**: Objects spawn in random positions for each mood
- 🖱️ **Smooth Navigation**: Mouse controls for camera movement
- ♿ **Accessibility**: Keyboard shortcuts, reduced motion support
- 📱 **Responsive**: Works on desktop and mobile
- 🎯 **Easter Eggs**: Hidden duck and interactive elements

## Tech Stack

- **Next.js 14** (App Router)
- **React Three Fiber** (3D rendering)
- **Drei** (R3F helpers)
- **Zustand** (State management)
- **Tailwind CSS** (Styling)
- **TypeScript** (Type safety)

## Deployment to Netlify

### Method 1: Git-based Deployment (Recommended)

1. **Push to GitHub/GitLab**:
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Netlify will automatically detect the settings from `netlify.toml`

3. **Deploy**:
   - Netlify will build and deploy automatically
   - Your site will be available at `https://your-site-name.netlify.app`

### Method 2: Drag & Drop Deployment

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag the `out` folder to the deploy area
   - Your site will be live instantly

### Method 3: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy**:
   ```bash
   netlify login
   netlify deploy --prod --dir=out
   ```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Project Structure

```
├── app/
│   ├── (marketing)/page.tsx     # Landing page
│   ├── configurator/page.tsx    # Main 3D room
│   └── layout.tsx               # Root layout
├── components/
│   └── canvas/SceneCanvas.tsx   # R3F Canvas wrapper
├── features/
│   ├── mood/                    # Mood state management
│   ├── room/                    # 3D room components
│   └── ui/                      # UI components
├── styles/
│   └── globals.css              # Global styles
├── netlify.toml                 # Netlify configuration
└── next.config.js               # Next.js configuration
```

## Environment Variables

No environment variables required for basic functionality.

## Performance Notes

- Static export for optimal Netlify performance
- Optimized 3D assets and low-poly geometry
- Mobile-friendly DPR clamping
- Reduced motion support for accessibility

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this project for learning and inspiration!