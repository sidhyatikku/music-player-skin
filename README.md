# 🎧 Music Player Skins

> A nostalgic, interactive music player built with modern web technologies — featuring beautifully recreated **classic device UIs** like the iPod Classic, iPod Nano, Nokia 3310, and Sony Walkman.

🌐 **Live Project:** [music.sidhyatikku.com](https://music.sidhyatikku.com)  
👨‍💻 **Portfolio:** [sidhyatikku.com](https://sidhyatikku.com)  
🐦 **Connect on X:** [@sidhyatikku](https://x.com/sidhyatikku)

---

## 🪩 Overview

Step back into the golden era of portable music players — now in your browser.  
This project brings together design nostalgia and web performance with a **Next.js + Tailwind** setup, powered by **Vercel v0** for seamless deployment.

- 🎵 Choose between multiple iconic skins  
- 💿 Browse artists, albums, and songs  
- 📱 Fully responsive + optimized for mobile  
- 🌗 Dark/light theme support  
- 🎚️ Smooth animations + working audio player  
- 💻 Built with React, TypeScript, and Tailwind CSS

---

## 🧱 Tech Stack

| Category   | Technology |
|------------|------------|
| Framework  | [Next.js 14](https://nextjs.org) |
| UI Library | [React 18](https://react.dev) |
| Styling    | [Tailwind CSS](https://tailwindcss.com) |
| Components | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) |
| Icons      | [Lucide React](https://lucide.dev) |
| Deployment | [Vercel](https://vercel.com) |

---

## ⚙️ Getting Started

### 🔑 Prerequisites

- [Node.js](https://nodejs.org) 18.x or higher  
- npm or yarn package manager

### 🧩 Installation

1) **Fork this repository**

   Click the **Fork** button on the top-right of this page.

2) **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/music-player-skin.git
   cd music-player-skin
   ```

3) **Install dependencies**

   ```bash
   npm install
   ```
   **or**
   ```bash
   yarn install
   ```

4) **Run the development server**

   ```bash
   npm run dev
   ```
   **or**
   ```bash
   yarn dev
   ```

5) **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) 🎧

---

## 📁 Project Structure

```text
music-player-skin/
├─ app/                    # Next.js app directory
│  ├─ layout.tsx          # Root layout
│  ├─ page.tsx            # Main entry point
│  └─ globals.css         # Global styles
├─ components/             # Device components + UI elements
│  ├─ device-carousel.tsx
│  ├─ ipod-classic.tsx
│  ├─ ipod-nano-6.tsx
│  ├─ nokia-3310.tsx
│  ├─ sony-walkman-nw-a1000.tsx
│  └─ ui/                 # Shared UI components
├─ contexts/               # React context (music playback, etc.)
├─ lib/                    # Music library data + types
├─ public/                 # Static assets (album art, icons, etc.)
└─ scripts/                # Node/JS utility scripts
```

---

## 🚀 Deployment

This project is **auto-deployed** via [Vercel](https://vercel.com).  
Every commit pushed to `main` triggers a new deployment.

🪄 **Live Demo:** [music.sidhyatikku.com](https://music.sidhyatikku.com)

Want your own? Click below to deploy your fork 👇

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sidhyatikku/music-player-skin)

---

## 🤝 Contributing

Pull Requests are welcome!  
If you have ideas for new device skins, animations, or improvements — fork the repo, make your changes, and submit a PR.  
Let’s bring more retro music joy to the web 🎶

---

## 🧠 Troubleshooting & Support

If something’s not working right or you have questions:

- Open an **issue** on GitHub  
- Or reach out via **[sidhyatikku.com](https://sidhyatikku.com)**  

Happy to help or collaborate 💬

---

## 📜 License

This project is open-source and available under the **MIT License**.  
Feel free to remix, modify, and make it your own.

---

### ⭐️ If you like this project...

Give it a **star** on GitHub to show your support!  
It helps others discover it and keeps the nostalgia alive 💫
