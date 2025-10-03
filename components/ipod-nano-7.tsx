"use client"

import { useState } from "react"
import { useMusicPlayback } from "@/contexts/music-playback-context"
import { Music, Video, Heart, Podcast, ImageIcon, Radio, ChevronLeft } from "lucide-react"

export function IPodNano7() {
  const { navigation, setNavigation, isPlaying, setIsPlaying } = useMusicPlayback()
  const [currentScreen, setCurrentScreen] = useState<"home" | "music">("home")

  const handleMusicTap = () => {
    setCurrentScreen("music")
  }

  const handleBack = () => {
    setCurrentScreen("home")
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative z-10 flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute w-[130px] h-[260px] bg-black/20 rounded-[24px] blur-lg"></div>

      {/* iPod Nano 7th Gen Body - Tall thin aluminum design */}
      <div className="relative w-[120px] h-[250px] bg-gradient-to-br from-[#8a8a92] via-[#6a6a72] to-[#4a4a52] rounded-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] border-[1px] border-[#2a2a32]">
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-white/10 to-transparent rounded-t-[22px] pointer-events-none"></div>

        {/* Screen bezel */}
        <div className="absolute inset-[5px] bg-black rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.6)_inset] overflow-hidden">
          {/* Touchscreen display */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0f0f1e] to-[#1a1a2e]">
            {currentScreen === "home" ? (
              <>
                {/* Status bar */}
                <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-3 text-[8px] text-white/80">
                  <span>9:41 AM</span>
                  <div className="flex gap-1 items-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12.01" y2="20" />
                    </svg>
                    <div className="w-3 h-2 border border-white/60 rounded-[1px] relative">
                      <div className="absolute inset-[1px] bg-white/80 rounded-[0.5px]"></div>
                    </div>
                  </div>
                </div>

                {/* App Grid - iOS 7 style */}
                <div className="absolute inset-0 flex flex-col items-center pt-8 px-3">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {/* Music App */}
                    <button
                      onClick={handleMusicTap}
                      className="flex flex-col items-center gap-1 active:scale-95 transition-transform"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] shadow-lg flex items-center justify-center">
                        <Music className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[9px] text-white font-sans">Music</span>
                    </button>

                    {/* Videos App */}
                    <button className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4a90e2] to-[#5ba3f5] shadow-lg flex items-center justify-center">
                        <Video className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[9px] text-white font-sans">Videos</span>
                    </button>

                    {/* Fitness App */}
                    <button className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e74c3c] to-[#ff6b6b] shadow-lg flex items-center justify-center">
                        <Heart className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[9px] text-white font-sans">Fitness</span>
                    </button>

                    {/* Podcasts App */}
                    <button className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9b59b6] to-[#b370cf] shadow-lg flex items-center justify-center">
                        <Podcast className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[9px] text-white font-sans">Podcasts</span>
                    </button>

                    {/* Photos App */}
                    <button className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3498db] to-[#5dade2] shadow-lg flex items-center justify-center">
                        <ImageIcon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[9px] text-white font-sans">Photos</span>
                    </button>

                    {/* Radio App */}
                    <button className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#34495e] to-[#5d6d7e] shadow-lg flex items-center justify-center">
                        <Radio className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[9px] text-white font-sans">Radio</span>
                    </button>
                  </div>

                  {/* Page dots */}
                  <div className="flex gap-1 mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Music Player Screen - iOS 7 style */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                    <button onClick={handleBack} className="text-blue-400 text-[10px] flex items-center gap-1">
                      <ChevronLeft className="w-3 h-3" />
                      <span>Back</span>
                    </button>
                    <span className="text-white text-[10px] font-sans">Now Playing</span>
                    <div className="w-8"></div>
                  </div>

                  {/* Album Art */}
                  <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-xl mb-4"></div>

                    {/* Song Info */}
                    <div className="text-center mb-4 w-full">
                      <div className="text-white text-[11px] font-sans mb-1 truncate">Song Title</div>
                      <div className="text-white/60 text-[9px] font-sans truncate">Artist Name</div>
                      <div className="text-white/40 text-[8px] font-sans truncate">Album Name</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full mb-3">
                      <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-white rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-[7px] text-white/50 mt-1">
                        <span>1:23</span>
                        <span>3:45</span>
                      </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="flex items-center justify-center gap-8 mb-4">
                      <button className="text-white/80 hover:text-white active:scale-95 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                        </svg>
                      </button>
                      <button
                        onClick={handlePlayPause}
                        className="text-white hover:text-white/90 active:scale-95 transition-all"
                      >
                        {isPlaying ? (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                      <button className="text-white/80 hover:text-white active:scale-95 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 18h2V6h-2v12zm-11-7l8.5-6v12z" />
                        </svg>
                      </button>
                    </div>

                    {/* Volume Control */}
                    <div className="w-full flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                      <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-white rounded-full"></div>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Screen glass effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        </div>

        {/* Physical buttons on sides */}
        <div className="absolute -left-[2px] top-12 w-[2px] h-8 bg-gradient-to-r from-[#3a3a42] to-[#5a5a62] rounded-l-sm"></div>
        <div className="absolute -left-[2px] top-24 w-[2px] h-8 bg-gradient-to-r from-[#3a3a42] to-[#5a5a62] rounded-l-sm"></div>
        <div className="absolute -right-[2px] top-16 w-[2px] h-12 bg-gradient-to-l from-[#3a3a42] to-[#5a5a62] rounded-r-sm"></div>

        {/* Home button at bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-b from-[#2a2a32] to-[#1a1a22] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border border-white/10"></div>
        </div>

        {/* Lightning port at bottom */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#1a1a22] rounded-sm"></div>
      </div>
    </div>
  )
}
