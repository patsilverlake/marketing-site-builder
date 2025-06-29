# Marketing Site Builder MVP

A drag-and-drop landing page builder created as a test MVP using **Claude Code**. This project demonstrates the capabilities of AI-assisted development for creating complex, production-ready applications.

## 🚀 Project Overview

This is a **test MVP** built entirely with Claude Code to showcase:
- Full-stack application development with AI assistance
- Complex UI/UX implementation with modern frameworks
- Complete feature implementation from concept to production

**Built with Claude Code:** This entire project was developed using Anthropic's Claude Code assistant, demonstrating the power of AI-driven development workflows.

## ✨ Features

### Core Functionality
- **🎨 Drag & Drop Builder**: Intuitive interface for building landing pages
- **📱 Responsive Design**: Mobile-first approach with comprehensive breakpoints
- **🎯 30+ Section Variations**: Hero, Features, Pricing, Testimonials, CTA, About, FAQ, Stats, Newsletter
- **💾 Export to HTML**: Generate clean, production-ready static files
- **🔄 Undo/Redo**: Full history management with 50-state buffer
- **💾 Save/Load**: Persistent storage for page configurations

### Advanced Features
- **🎭 Framer Motion Animations**: Beautiful micro-interactions throughout
- **🎨 Theme Customization**: Color themes, fonts, and spacing controls
- **📋 Template Gallery**: 6+ professional templates across different industries
- **🎯 Onboarding Flow**: Interactive 6-step guided tour for new users
- **⌨️ Keyboard Shortcuts**: Power user features (Ctrl+Z, Ctrl+S, etc.)
- **📱 Device Preview**: Test designs on different screen sizes
- **🔍 Live Preview**: Real-time preview with full-screen mode

### UI/UX Excellence
- **🎨 World-Class Design**: Production-grade interface with gradient backgrounds
- **⚡ Loading States**: Comprehensive loading animations (spinner, dots, pulse, skeleton)
- **💡 Tooltips & Help**: Contextual guidance throughout the interface
- **♿ Accessibility**: ARIA labels, keyboard navigation, touch optimization
- **🎮 Interactive Elements**: Hover effects, smooth transitions, and micro-animations

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui with custom enhancements
- **State Management**: Zustand
- **Icons**: Lucide React
- **Drag & Drop**: @dnd-kit

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketing-site-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📖 How to Use

### Building Your First Page

1. **Start with Onboarding**: New users get an interactive 6-step tour
2. **Add Sections**: Use the sidebar to browse and add section variations
3. **Customize Content**: Click any section to edit text, images, and settings
4. **Drag to Reorder**: Rearrange sections by dragging the handles
5. **Apply Themes**: Use toolbar to change colors, fonts, and spacing
6. **Preview & Export**: Test on different devices, then export HTML files

### Keyboard Shortcuts

- `Ctrl+Z` / `Cmd+Z` - Undo last action
- `Ctrl+Y` / `Cmd+Y` - Redo action  
- `Ctrl+S` / `Cmd+S` - Save page
- `Ctrl+E` / `Cmd+E` - Toggle edit mode
- `Ctrl+P` / `Cmd+P` - Full preview mode

### Template Gallery

Choose from professionally designed templates:
- **SaaS**: Modern design for tech products
- **Portfolio**: Creative showcase layouts
- **E-commerce**: Product-focused designs
- **Agency**: Corporate and professional
- **Startup**: High-converting launch pages
- **Blog**: Clean content-focused layouts

## 🏗 Architecture

### Project Structure
```
marketing-site-builder/
├── app/                    # Next.js App Router
├── components/             # React components
│   ├── page-builder/      # Core builder interface
│   ├── sections/          # Landing page sections
│   ├── ui/                # Reusable UI components
│   ├── templates/         # Template gallery
│   └── onboarding/        # User onboarding
├── lib/                   # Utilities and stores
├── styles/                # Global styles and responsive utilities
└── tasks/                 # Development todo list
```

### Key Components

- **Builder Interface**: Toolbar, sidebar, and main canvas
- **Section System**: Modular, reusable landing page sections
- **State Management**: Zustand stores for app state
- **Export System**: HTML/CSS generation with SEO optimization
- **Theme System**: Consistent design tokens and customization

## 🎯 Development Process

This project was built as a comprehensive test of Claude Code's capabilities:

### What Was Accomplished
- ✅ **Complete MVP**: Full-featured landing page builder
- ✅ **30+ Components**: Extensive section library with variations
- ✅ **Production Quality**: Professional UI/UX with animations
- ✅ **Responsive Design**: Mobile-first with comprehensive breakpoints
- ✅ **Advanced Features**: Templates, onboarding, keyboard shortcuts
- ✅ **Quality Assurance**: Testing, accessibility, performance optimization

### Claude Code Advantages Demonstrated
- **Rapid Development**: Complex features implemented quickly
- **Code Quality**: TypeScript, modern patterns, best practices
- **Comprehensive Features**: From basic functionality to advanced UX
- **Problem Solving**: Real-time debugging and optimization
- **Documentation**: Clear, maintainable code with proper organization

## 🔧 Customization

### Adding New Sections
1. Create component in `components/sections/[category]/`
2. Register in `lib/sections/[category].ts`
3. Export from `lib/section-registry.ts`

### Creating Themes
1. Define colors in `lib/theme-store.ts`
2. Add CSS variables for consistent theming
3. Test across all components

### Template Development
1. Design section combination in builder
2. Export configuration to `components/templates/template-gallery.tsx`
3. Add preview image and metadata

## 📈 Performance

- **Lighthouse Score**: Optimized for performance, accessibility, and SEO
- **Bundle Size**: Efficient code splitting with Next.js
- **Animations**: Hardware-accelerated with Framer Motion
- **Responsive**: Mobile-first CSS with efficient breakpoints

## 🤝 Contributing

This is a test MVP created with Claude Code. For similar projects:

1. Use Claude Code for rapid prototyping
2. Follow the established patterns and architecture
3. Maintain TypeScript strict mode
4. Add comprehensive tests for new features
5. Ensure accessibility compliance

## 📄 License

This project is created as a test MVP for demonstrating Claude Code capabilities. Use as reference for your own projects.

## 🙏 Acknowledgments

- **Claude Code**: This entire project was developed using Anthropic's Claude Code assistant
- **Next.js**: For the excellent React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For beautiful animations
- **shadcn/ui**: For the component system foundation

---

**🤖 Built entirely with Claude Code** - Demonstrating the future of AI-assisted development.