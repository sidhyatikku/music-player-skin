"use client"

import { useMusicPlayback } from "@/contexts/music-playback-context"
import { musicLibrary, type Artist, type Album, type Song } from "@/lib/music-library"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"

const getArtistName = (a: Artist | null | undefined) => a?.name ?? (a as any)?.title ?? ""
const getAlbumTitle = (a: Album | null | undefined) => (a as any)?.title ?? (a as any)?.name ?? (a as any)?.album ?? ""
const getSongTitle = (s: Song | null | undefined) => s?.title ?? (s as any)?.name ?? ""
const getSongArtist = (s: Song | null | undefined, artist: Artist | null | undefined) =>
  (s as any)?.artist ?? getArtistName(artist)
const getSongYear = (s: Song | null | undefined, album: Album | null | undefined) =>
  (s as any)?.year ?? (album as any)?.year ?? ""

export function SonyWalkmanNWA1000({
  isActive = true,
  deviceName = "Sony Walkman",
}: { isActive?: boolean; deviceName?: string }) {
  const {
    navigation,
    setNavigation,
    selectedIndex,
    setSelectedIndex,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    playerRef,
  } = useMusicPlayback()

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showVolumeIndicator, setShowVolumeIndicator] = useState(false)

  useEffect(() => {
    if (!isPlaying || !playerRef.current) return

    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const time = playerRef.current.getCurrentTime()
        const dur = playerRef.current.getDuration()
        setCurrentTime(time || 0)
        setDuration(dur || 0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, playerRef])

  useEffect(() => {
    if (showVolumeIndicator) {
      const timeout = setTimeout(() => {
        setShowVolumeIndicator(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [showVolumeIndicator])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
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

  const handleUpPress = () => {
    console.log("[v0] Up button pressed, current level:", navigation.level, "selectedIndex:", selectedIndex)
    if (navigation.level === "nowPlaying") {
      const songs = navigation.selectedAlbum?.songs || []
      const currentSongIndex = songs.findIndex((s) => s === navigation.selectedSong)
      console.log("[v0] In nowPlaying, currentSongIndex:", currentSongIndex)
      if (currentSongIndex > 0) {
        setNavigation({
          ...navigation,
          selectedSong: songs[currentSongIndex - 1],
        })
      }
    } else {
      console.log("[v0] Moving selection up from", selectedIndex, "to", Math.max(0, selectedIndex - 1))
      setSelectedIndex((prev) => Math.max(0, prev - 1))
    }
  }

  const handleDownPress = () => {
    if (navigation.level === "nowPlaying") {
      const songs = navigation.selectedAlbum?.songs || []
      const currentSongIndex = songs.findIndex((s) => s === navigation.selectedSong)
      if (currentSongIndex < songs.length - 1) {
        setNavigation({
          ...navigation,
          selectedSong: songs[currentSongIndex + 1],
        })
      }
    } else {
      const currentList = getCurrentList()
      setSelectedIndex((prev) => Math.min(currentList.length - 1, prev + 1))
    }
  }

  const handleSelectPress = () => {
    const currentList = getCurrentList()

    if (navigation.level === "nowPlaying") {
      setIsPlaying((prev) => !prev)
      return
    }

    if (navigation.level === "artists") {
      const artist = currentList[selectedIndex] as Artist
      setNavigation({
        level: "albums",
        selectedArtist: artist,
        selectedAlbum: null,
        selectedSong: null,
      })
      setSelectedIndex(0)
    } else if (navigation.level === "albums") {
      const album = currentList[selectedIndex] as Album
      setNavigation({
        ...navigation,
        level: "songs",
        selectedAlbum: album,
        selectedSong: null,
      })
      setSelectedIndex(0)
    } else if (navigation.level === "songs") {
      const song = currentList[selectedIndex] as Song
      setNavigation({
        ...navigation,
        level: "nowPlaying",
        selectedSong: song,
      })
      setIsPlaying(true)
    }
  }

  const handleBackPress = () => {
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

  const handleLeftPress = () => {
    if (navigation.level === "nowPlaying") {
      const songs = navigation.selectedAlbum?.songs || []
      const currentSongIndex = songs.findIndex((s) => s === navigation.selectedSong)
      if (currentSongIndex > 0) {
        setNavigation({
          ...navigation,
          selectedSong: songs[currentSongIndex - 1],
        })
      }
    }
  }

  const handleRightPress = () => {
    if (navigation.level === "nowPlaying") {
      const songs = navigation.selectedAlbum?.songs || []
      const currentSongIndex = songs.findIndex((s) => s === navigation.selectedSong)
      if (currentSongIndex < songs.length - 1) {
        setNavigation({
          ...navigation,
          selectedSong: songs[currentSongIndex + 1],
        })
      }
    }
  }

  const getListItemName = (item: Artist | Album | Song, level: string): string => {
    if (level === "artists") {
      return getArtistName(item as Artist)
    } else if (level === "albums") {
      return getAlbumTitle(item as Album)
    } else if (level === "songs") {
      return getSongTitle(item as Song)
    }
    return ""
  }

  const getVisibleItems = () => {
    const currentList = getCurrentList()
    const itemsToShow = 6

    let startIndex = Math.max(0, selectedIndex - Math.floor(itemsToShow / 2))

    if (startIndex + itemsToShow > currentList.length) {
      startIndex = Math.max(0, currentList.length - itemsToShow)
    }

    return {
      items: currentList.slice(startIndex, startIndex + itemsToShow),
      startIndex,
    }
  }

  const getScreenTitle = () => {
    switch (navigation.level) {
      case "artists":
        return "Artists"
      case "albums":
        return `${getArtistName(navigation.selectedArtist)} - Albums`
      case "songs":
        return `${getAlbumTitle(navigation.selectedAlbum)}`
      case "nowPlaying":
        return "Now Playing"
      default:
        return "Music"
    }
  }

  const handleVolumeUp = () => {
    setVolume(Math.min(100, volume + 10))
    setShowVolumeIndicator(true)
  }

  const handleVolumeDown = () => {
    setVolume(Math.max(0, volume - 10))
    setShowVolumeIndicator(true)
  }

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="relative w-64 h-[500px] rounded-3xl border-4 border-pink-300/50"
        style={{
          background: "linear-gradient(135deg, #f472b6 0%, #ec4899 30%, #db2777 60%, #be185d 100%)",
          boxShadow: `
            0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -2px 10px rgba(0, 0, 0, 0.2)
          `,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-32 rounded-t-3xl opacity-30 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
          }}
        />

        <div className="absolute top-4 left-0 right-0 text-center z-10">
          <div
            className="text-pink-100 text-sm font-medium tracking-normal font-rokkitt"
            style={{
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            SONY
          </div>
        </div>

        <div className="absolute top-12 left-4 right-4 h-80 rounded-lg overflow-hidden pointer-events-none">
          {isActive ? (
            <div className="p-3 h-full flex flex-col text-white font-bitcount text-xs relative z-10">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-pink-400/30">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-white/80 rounded-sm flex items-center justify-center">
                    <div
                      className="w-2 h-2 border-l-2 border-l-pink-500 border-y-2 border-y-transparent"
                      style={{ borderLeftWidth: 3 }}
                    />
                  </div>
                  <span className="text-[11px]">
                    {navigation.level === "nowPlaying" && isPlaying ? "Playing" : getScreenTitle()}
                  </span>
                </div>
              </div>

              {navigation.level === "nowPlaying" && navigation.selectedSong ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="mb-3 flex items-end gap-[3px] h-[28px]">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-[4px] bg-white rounded-t-sm ${isPlaying ? "animate-pulse" : ""}`}
                        style={{
                          height: isPlaying ? `${20 + Math.random() * 40}%` : "10%",
                          animationDelay: isPlaying ? `${i * 0.1}s` : "0s",
                          animationDuration: isPlaying ? `${0.6 + Math.random() * 0.4}s` : "0s",
                        }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between w-full px-1">
                    <div className="flex-1">
                      <div className="text-[14px] font-bold mb-1 line-clamp-2 leading-tight">
                        {getSongTitle(navigation.selectedSong)}
                      </div>
                      <div className="text-[12px] opacity-80">
                        {getSongArtist(navigation.selectedSong, navigation.selectedArtist)}
                      </div>
                      <div className="text-[11px] opacity-70 mt-0.5">
                        {getSongYear(navigation.selectedSong, navigation.selectedAlbum)}
                      </div>
                    </div>
                    <div className="ml-2">
                      {isPlaying ? (
                        <Pause size={24} fill="white" strokeWidth={0} />
                      ) : (
                        <Play size={24} fill="white" strokeWidth={0} />
                      )}
                    </div>
                  </div>

                  <div className="w-full mt-4 px-1">
                    <div className="flex justify-between text-[10px] opacity-70 mb-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>

                    <div
                      className="w-full h-1.5 rounded-full overflow-hidden"
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                          background: "linear-gradient(90deg, #fce7f3 0%, #fbcfe8 100%)",
                          boxShadow: "0 0 4px rgba(255, 255, 255, 0.5)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-[2px]">
                  {(() => {
                    const { items, startIndex } = getVisibleItems()
                    return items.map((item, index) => {
                      const actualIndex = startIndex + index
                      return (
                        <div
                          key={actualIndex}
                          className={`px-2 py-1.5 text-[13px] font-bold leading-tight rounded ${
                            actualIndex === selectedIndex ? "bg-white/10" : ""
                          }`}
                        >
                          {getListItemName(item, navigation.level)}
                        </div>
                      )
                    })
                  })()}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-pink-800 text-2xl font-bitcount tracking-tight">{deviceName}</div>
            </div>
          )}

          {showVolumeIndicator && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 z-50 pointer-events-none"
              style={{
                animation: "fadeIn 0.2s ease-in-out",
              }}
            >
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-black/60 backdrop-blur-sm">
                <div className="flex-1 h-2 rounded-full bg-white/30 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-200"
                    style={{
                      width: `${volume}%`,
                    }}
                  />
                </div>
                <div
                  className="w-4 h-4 rounded-full bg-white border-2 border-white shadow-lg"
                  style={{
                    boxShadow: "0 2px 8px rgba(255, 255, 255, 0.5)",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="relative w-24 h-24">
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #db2777 0%, #be185d 50%, #9f1239 100%)",
                boxShadow: `
                  0 6px 16px rgba(0, 0, 0, 0.4),
                  inset 0 2px 4px rgba(255, 255, 255, 0.2),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.3)
                `,
                border: "2px solid rgba(219, 39, 119, 0.4)",
              }}
            />

            <div
              className="absolute inset-2 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #9f1239 0%, #be185d 100%)",
                boxShadow: `
                  inset 0 2px 8px rgba(0, 0, 0, 0.5),
                  inset 0 -1px 2px rgba(255, 255, 255, 0.1)
                `,
              }}
            />

            <button
              onClick={handleUpPress}
              className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center text-white hover:text-pink-200 transition-all active:scale-95 z-40 pointer-events-auto"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              }}
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownPress}
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center text-white hover:text-pink-200 transition-all active:scale-95 z-40 pointer-events-auto"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              }}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <button
              onClick={handleLeftPress}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white hover:text-pink-200 transition-all active:scale-95 z-40 pointer-events-auto"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleRightPress}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white hover:text-pink-200 transition-all active:scale-95 z-40 pointer-events-auto"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleSelectPress}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all active:scale-95 z-40 pointer-events-auto"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
                boxShadow: `
                  0 4px 12px rgba(0, 0, 0, 0.4),
                  inset 0 1px 2px rgba(255, 255, 255, 0.3),
                  inset 0 -2px 4px rgba(0, 0, 0, 0.2)
                `,
                border: "2px solid rgba(236, 72, 153, 0.5)",
              }}
            >
              {navigation.level === "nowPlaying" ? (
                isPlaying ? (
                  <div className="flex gap-0.5">
                    <div
                      className="w-1 h-3 bg-white rounded-sm"
                      style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))" }}
                    />
                    <div
                      className="w-1 h-3 bg-white rounded-sm"
                      style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))" }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))" }}
                  />
                )
              ) : (
                <div className="text-[10px] font-bold" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}>
                  OK
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="absolute bottom-20 left-8 z-40">
          <button
            onClick={handleBackPress}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #db2777 0%, #be185d 50%, #9f1239 100%)",
              boxShadow: `
                0 6px 16px rgba(0, 0, 0, 0.4),
                inset 0 2px 4px rgba(255, 255, 255, 0.2),
                inset 0 -2px 8px rgba(0, 0, 0, 0.3)
              `,
              border: "2px solid rgba(219, 39, 119, 0.4)",
            }}
          >
            <span className="text-[8px] text-white font-bold" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}>
              BACK
            </span>
          </button>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center"></div>

        <button
          onClick={handleVolumeUp}
          className="absolute right-0 top-32 w-1 h-12 rounded-l-sm cursor-pointer hover:w-1.5 transition-all active:scale-95 z-40"
          style={{
            background: "linear-gradient(90deg, #9f1239 0%, #be185d 100%)",
            boxShadow: "inset 2px 0 4px rgba(0, 0, 0, 0.5), -1px 0 2px rgba(0, 0, 0, 0.3)",
          }}
          title="Volume Up"
        />
        <button
          onClick={handleVolumeDown}
          className="absolute right-0 top-48 w-1 h-8 rounded-l-sm cursor-pointer hover:w-1.5 transition-all active:scale-95 z-40"
          style={{
            background: "linear-gradient(90deg, #9f1239 0%, #be185d 100%)",
            boxShadow: "inset 2px 0 4px rgba(0, 0, 0, 0.5), -1px 0 2px rgba(0, 0, 0, 0.3)",
          }}
          title="Volume Down"
        />
      </div>
    </div>
  )
}
