# IPod Classic Interface

A nostalgic music player interface featuring classic device skins including iPod Classic, BlackBerry Curve, and Walkman designs. Built with Next.js, React, and Tailwind CSS.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/sidhyu-8335s-projects/v0-ip-od-classic-interface)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/b8Th7TxtH4l)

## Features

- Multiple retro device skins (iPod Classic, BlackBerry Curve, Walkman)
- Fully functional music player with playlist support
- Audio visualizer
- Responsive design with mobile support
- Dark/light theme support

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Fork the repository**
   
   Click the "Fork" button at the top right of this repository to create your own copy.

2. **Clone your forked repository**

   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/v0-ip-od-classic-interface.git
   cd v0-ip-od-classic-interface
   \`\`\`

3. **Install dependencies**

   \`\`\`bash
   npm install
   \`\`\`

   Or if you prefer yarn:

   \`\`\`bash
   yarn install
   \`\`\`

4. **Run the development server**

   \`\`\`bash
   npm run dev
   \`\`\`

   Or with yarn:

   \`\`\`bash
   yarn dev
   \`\`\`

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

- `npm run dev` - Starts the development server on port 3000
- `npm run build` - Creates an optimized production build
- `npm run start` - Runs the production server
- `npm run lint` - Runs ESLint to check code quality

## Project Structure

\`\`\`
├── app/                  # Next.js app directory
│   ├── page.tsx         # Main page component
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── device-carousel.tsx
│   ├── ipod-classic.tsx
│   ├── blackberry-curve.tsx
│   ├── walkman.tsx
│   └── ui/             # shadcn/ui components
├── public/             # Static assets
│   └── music/         # Audio files and album art
└── scripts/           # Utility scripts
\`\`\`

## Deployment

This project is automatically deployed to Vercel. Any changes pushed to the main branch will trigger a new deployment.

**Live Demo:** [https://vercel.com/sidhyu-8335s-projects/v0-ip-od-classic-interface](https://vercel.com/sidhyu-8335s-projects/v0-ip-od-classic-interface)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/v0-ip-od-classic-interface)

## Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [React 18](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Lucide React](https://lucide.dev/) - Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

Built with [v0.app](https://v0.app) - Continue building at [https://v0.app/chat/projects/b8Th7TxtH4l](https://v0.app/chat/projects/b8Th7TxtH4l)
