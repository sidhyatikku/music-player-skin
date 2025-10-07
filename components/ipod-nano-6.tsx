"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useMusicPlayback } from "@/contexts/music-playback-context"
import { musicLibrary, type Artist, type Album, type Song } from "@/lib/music-library"
import { ChevronLeft, Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { useClickWheelSound } from "@/hooks/use-click-wheel-sound"

const albumLabel = (a?: Album | null) => a?.title || (a as any)?.name || ""

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function IPodNano6({
  isActive = true,
  deviceName = "iPod Nano 6th Gen",
}: { isActive?: boolean; deviceName?: string }) {
  const {
    navigation,
    setNavigation,
    selectedIndex,
    setSelectedIndex,
    isPlaying,
    setIsPlaying,
    playerRef,
    volume,
    setVolume,
  } = useMusicPlayback()
  const { playClick } = useClickWheelSound()
  const [showVolumeUI, setShowVolumeUI] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!isPlaying || !playerRef.current) return

    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const time = playerRef.current.getCurrentTime()
        const dur = playerRef.current.getDuration()
        setCurrentTime(time)
        setDuration(dur)
      }
    }, 100) // Update every 100ms for smooth progress

    return () => clearInterval(interval)
  }, [isPlaying, playerRef])

  useEffect(() => {
    if (showVolumeUI) {
      const timer = setTimeout(() => {
        setShowVolumeUI(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showVolumeUI])

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const seekTime = percentage * duration

    playerRef.current.seekTo(seekTime, true)
    setCurrentTime(seekTime)
  }

  const handleItemSelect = (index: number) => {
    playClick()
    const currentList = getCurrentList()

    if (navigation.level === "artists") {
      const artist = currentList[index] as Artist
      setNavigation({
        level: "albums",
        selectedArtist: artist,
        selectedAlbum: null,
        selectedSong: null,
      })
      setSelectedIndex(0)
    } else if (navigation.level === "albums") {
      const album = currentList[index] as Album
      setNavigation({
        ...navigation,
        level: "songs",
        selectedAlbum: album,
        selectedSong: null,
      })
      setSelectedIndex(0)
    } else if (navigation.level === "songs") {
      const song = currentList[index] as Song
      setNavigation({
        ...navigation,
        level: "nowPlaying",
        selectedSong: song,
      })
      setIsPlaying(true)
    }
  }

  const handleBack = () => {
    playClick()
    if (navigation.level === "nowPlaying") {
      setNavigation({
        ...navigation,
        level: "songs",
      })
    } else if (navigation.level === "songs") {
      setNavigation({
        ...navigation,
        level: "albums",
        selectedAlbum: null,
      })
      setSelectedIndex(0)
    } else if (navigation.level === "albums") {
      setNavigation({
        level: "artists",
        selectedArtist: null,
        selectedAlbum: null,
        selectedSong: null,
      })
      setSelectedIndex(0)
    }
  }

  const handleNext = () => {
    playClick()
    if (navigation.level === "nowPlaying" && navigation.selectedAlbum) {
      const songs = navigation.selectedAlbum.songs
      const currentIndex = songs.findIndex((s) => s.id === navigation.selectedSong?.id)
      if (currentIndex < songs.length - 1) {
        setNavigation({
          ...navigation,
          selectedSong: songs[currentIndex + 1],
        })
        setIsPlaying(true)
      }
    }
  }

  const handlePrevious = () => {
    playClick()
    if (navigation.level === "nowPlaying" && navigation.selectedAlbum) {
      const songs = navigation.selectedAlbum.songs
      const currentIndex = songs.findIndex((s) => s.id === navigation.selectedSong?.id)
      if (currentIndex > 0) {
        setNavigation({
          ...navigation,
          selectedSong: songs[currentIndex - 1],
        })
        setIsPlaying(true)
      }
    }
  }

  const handlePlayPause = () => {
    playClick()
    setIsPlaying(!isPlaying)
  }

  const handleVolumeUp = () => {
    playClick()
    setVolume((prev) => Math.min(100, prev + 10))
    setShowVolumeUI(true)
  }

  const handleVolumeDown = () => {
    playClick()
    setVolume((prev) => Math.max(0, prev - 10))
    setShowVolumeUI(true)
  }

  const getCurrentList = () => {
    switch (navigation.level) {
      case "artists":
        return musicLibrary
      case "albums":
        return navigation.selectedArtist?.albums || []
      case "songs":
        return navigation.selectedAlbum?.songs || []
      default:
        return []
    }
  }

  const getScreenTitle = () => {
    switch (navigation.level) {
      case "artists":
        return "Artists"
      case "albums":
        return navigation.selectedArtist?.name || "Albums"
      case "songs":
        return albumLabel(navigation.selectedAlbum) || "Songs"
      case "nowPlaying":
        return "Now Playing"
      default:
        return "Music"
    }
  }

  return (
    <div className="relative z-10 flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute w-[355px] h-[355px] bg-black/20 rounded-[20px] blur-lg"></div>

      {/* iPod Nano 6th Gen Body - Square aluminum design */}
      <div className="relative w-[340px] h-[340px] bg-gradient-to-br from-[#8a8a92] via-[#6a6a72] to-[#4a4a52] rounded-[27px] shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] border-[1px] border-[#2a2a32]">
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-white/10 to-transparent rounded-t-[27px] pointer-events-none"></div>

        {/* Clip at top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[90px] h-[12px] bg-gradient-to-b from-[#9a9aa2] to-[#7a7a82] rounded-t-lg shadow-[0_2px_4px_rgba(0,0,0,0.3)]"></div>

        {/* Volume Up Button */}
        <button
          onClick={handleVolumeUp}
          className="absolute -right-[3px] top-16 w-[6px] h-12 bg-gradient-to-r from-[#6a6a72] to-[#8a8a92] rounded-r-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] hover:brightness-110 active:brightness-90 transition-all"
        ></button>

        {/* Volume Down Button */}
        <button
          onClick={handleVolumeDown}
          className="absolute -right-[3px] top-32 w-[6px] h-12 bg-gradient-to-r from-[#6a6a72] to-[#8a8a92] rounded-r-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] hover:brightness-110 active:brightness-90 transition-all"
        ></button>

        {/* Screen bezel */}
        <div className="absolute inset-[9px] bg-black rounded-[21px] shadow-[0_2px_8px_rgba(0,0,0,0.6)_inset] overflow-hidden">
          {isActive ? (
            <>
              {/* Touchscreen display */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0f0f1e] to-[#1a1a2e]">
                {navigation.level === "nowPlaying" ? (
                  // Now Playing Screen
                  <div className="absolute inset-0 flex flex-col">
                    {/* Header with back button */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                      <button
                        onClick={handleBack}
                        className="text-white/80 hover:text-white active:scale-95 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-[11px] text-white/80 font-sans">{getScreenTitle()}</span>
                      <div className="w-5"></div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
                      {navigation.selectedAlbum?.coverUrl ? (
                        <img
                          src={navigation.selectedAlbum.coverUrl || "/placeholder.svg"}
                          alt={navigation.selectedAlbum.title}
                          className="w-28 h-28 rounded-lg shadow-lg mb-2"
                        />
                      ) : (
                        <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg mb-2"></div>
                      )}

                      <div className="text-center mb-2">
                        <div className="text-white text-[11px] font-sans mb-0.5 line-clamp-1 px-2">
                          {navigation.selectedSong?.title || "Song Title"}
                        </div>
                        <div className="text-white/90 text-[10px] font-sans line-clamp-1 px-2 mb-0.5">
                          {albumLabel(navigation.selectedAlbum) || "Album"}
                        </div>
                        <div className="text-white/60 text-[9px] font-sans line-clamp-1 px-2">
                          {navigation.selectedArtist?.name || "Artist"}
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-8 mb-3">
                        <button
                          onClick={handlePrevious}
                          className="text-white hover:text-white/80 active:scale-95 transition-all"
                        >
                          <SkipBack className="w-6 h-6 fill-white" />
                        </button>
                        <button
                          onClick={handlePlayPause}
                          className="text-white hover:text-white/80 active:scale-95 transition-all"
                        >
                          {isPlaying ? (
                            <Pause className="w-7 h-7 fill-white" />
                          ) : (
                            <Play className="w-7 h-7 fill-white ml-0.5" />
                          )}
                        </button>
                        <button
                          onClick={handleNext}
                          className="text-white hover:text-white/80 active:scale-95 transition-all"
                        >
                          <SkipForward className="w-6 h-6 fill-white" />
                        </button>
                      </div>

                      <div className="w-full px-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white/60 text-[9px] font-mono min-w-[32px]">
                            {formatTime(currentTime)}
                          </span>
                          <div
                            className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer"
                            onClick={handleSeek}
                          >
                            <div
                              className="absolute left-0 top-0 h-full bg-white/60 rounded-full transition-all duration-100"
                              style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                            ></div>
                            <div
                              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg transition-all duration-100"
                              style={{ left: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
                            ></div>
                          </div>
                          <span className="text-white/60 text-[9px] font-mono min-w-[32px] text-right">
                            {formatTime(duration)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View for Artists, Albums, or Songs
                  <div className="absolute inset-0 flex flex-col">
                    {navigation.level !== "artists" && (
                      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                        <button
                          onClick={handleBack}
                          className="text-white/80 hover:text-white active:scale-95 transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-[11px] text-white/80 font-sans">{getScreenTitle()}</span>
                        <div className="w-5"></div>
                      </div>
                    )}

                    {navigation.level === "artists" && (
                      <div className="flex items-center justify-center px-3 py-2 border-b border-white/10">
                        <span className="text-[11px] text-white/80 font-sans">{getScreenTitle()}</span>
                      </div>
                    )}

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto">
                      {getCurrentList().map((item, index) => {
                        const isArtist = navigation.level === "artists"
                        const isAlbum = navigation.level === "albums"
                        const isSong = navigation.level === "songs"

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleItemSelect(index)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 active:bg-white/10 transition-colors border-b border-white/5"
                          >
                            {/* Thumbnail */}
                            {(isArtist || isAlbum) && (
                              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                {(item as Artist).photoUrl || (item as Album).coverUrl ? (
                                  <img
                                    src={(item as Artist).photoUrl || (item as Album).coverUrl}
                                    alt={(item as Artist).name || (item as Album).title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                )}
                              </div>
                            )}

                            {/* Text */}
                            <div className="flex-1 text-left min-w-0">
                              <div className="text-white text-[15px] font-medium font-sans truncate px-1">
                                {isArtist && (item as Artist).name}
                                {isAlbum && albumLabel(item as Album)}
                                {isSong && (item as Song).title}
                              </div>
                              {isSong && (
                                <div className="text-white/60 text-[11px] font-sans truncate mt-0.5 px-1">
                                  {(item as Song).duration}
                                </div>
                              )}
                            </div>

                            {/* Chevron for navigation */}
                            {!isSong && <ChevronLeft className="w-4 h-4 text-white/50 rotate-180 flex-shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {showVolumeUI && (
                <div className="absolute inset-0 flex items-end justify-center pb-6 z-50 transition-opacity duration-300">
                  <div className="w-[180px] px-4 py-3 bg-[#1a1a1a]/95 rounded-2xl shadow-2xl">
                    {/* Volume Slider */}
                    <div className="relative h-8 flex items-center">
                      {/* Track Background */}
                      <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                          {/* Blue Fill */}
                          <div
                            className="h-full bg-[#007AFF] rounded-full transition-all duration-150"
                            style={{ width: `${volume}%` }}
                          ></div>
                        </div>
                      </div>
                      {/* Knob */}
                      <div
                        className="absolute w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-150 -ml-3.5"
                        style={{ left: `${volume}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Screen glass effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
              <div className="text-white/90 text-lg font-sans tracking-tight text-center px-4">{deviceName}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
