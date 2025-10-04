"use client"

import type React from "react"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"
import type { Artist, Album, Song } from "@/lib/music-library"

type NavigationLevel = "artists" | "albums" | "songs" | "nowPlaying"

interface NavigationState {
  level: NavigationLevel
  selectedArtist: Artist | null
  selectedAlbum: Album | null
  selectedSong: Song | null
}

interface MusicPlaybackContextType {
  navigation: NavigationState
  setNavigation: (state: NavigationState) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  volume: number
  setVolume: (volume: number) => void
  playerRef: React.MutableRefObject<any>
}

const MusicPlaybackContext = createContext<MusicPlaybackContextType | undefined>(undefined)

export function MusicPlaybackProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<NavigationState>({
    level: "artists",
    selectedArtist: null,
    selectedAlbum: null,
    selectedSong: null,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const playerRef = useRef<any>(null)
  const [playerReady, setPlayerReady] = useState(false)
  const previousSongRef = useRef<Song | null>(null)
  const isPlayingRef = useRef(false)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    ;(window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("youtube-player", {
        height: "0",
        width: "0",
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1, // Enable inline playback on iOS
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            setPlayerReady(true)
            console.log("[v0] YouTube player ready")
          },
          onStateChange: (event: any) => {
            console.log("[v0] Player state changed:", event.data)
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              isLoadingRef.current = false
              isPlayingRef.current = true
              setIsPlaying(true)
            } else if (
              event.data === (window as any).YT.PlayerState.PAUSED ||
              event.data === (window as any).YT.PlayerState.ENDED
            ) {
              isLoadingRef.current = false
              isPlayingRef.current = false
              setIsPlaying(false)
            }
          },
          onError: (event: any) => {
            console.log("[v0] Player error:", event.data)
            isLoadingRef.current = false
          },
        },
      })
    }
  }, [])

  useEffect(() => {
    if (playerReady && playerRef.current && navigation.selectedSong) {
      const songChanged = previousSongRef.current?.id !== navigation.selectedSong.id

      console.log("[v0] Song effect triggered. Changed:", songChanged, "Loading:", isLoadingRef.current)

      if (songChanged && !isLoadingRef.current) {
        console.log("[v0] Loading song:", navigation.selectedSong.title, navigation.selectedSong.id)

        previousSongRef.current = navigation.selectedSong
        isLoadingRef.current = true

        // loadVideoById loads and plays the video in one call, avoiding race conditions
        try {
          playerRef.current.loadVideoById({
            videoId: navigation.selectedSong.id,
            startSeconds: 0,
          })
          // Update refs to reflect that we're now playing
          isPlayingRef.current = true
        } catch (error) {
          console.log("[v0] Error loading video:", error)
          isLoadingRef.current = false
        }
      }
    }
  }, [navigation.selectedSong, playerReady])

  useEffect(() => {
    if (playerReady && playerRef.current) {
      console.log("[v0] isPlaying state changed to:", isPlaying, "actual player state:", isPlayingRef.current)

      // Only send command if the desired state differs from actual player state
      if (isPlaying && !isPlayingRef.current) {
        console.log("[v0] Calling playVideo()")
        try {
          playerRef.current.playVideo()
        } catch (error) {
          console.log("[v0] Error playing video:", error)
        }
      } else if (!isPlaying && isPlayingRef.current) {
        console.log("[v0] Calling pauseVideo()")
        try {
          playerRef.current.pauseVideo()
        } catch (error) {
          console.log("[v0] Error pausing video:", error)
        }
      }
    }
  }, [isPlaying, playerReady])

  useEffect(() => {
    if (playerReady && playerRef.current) {
      playerRef.current.setVolume(volume)
    }
  }, [volume, playerReady])

  return (
    <MusicPlaybackContext.Provider
      value={{
        navigation,
        setNavigation,
        selectedIndex,
        setSelectedIndex,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        playerRef,
      }}
    >
      <div id="youtube-player" style={{ display: "none" }}></div>
      {children}
    </MusicPlaybackContext.Provider>
  )
}

export function useMusicPlayback() {
  const context = useContext(MusicPlaybackContext)
  if (context === undefined) {
    throw new Error("useMusicPlayback must be used within a MusicPlaybackProvider")
  }
  return context
}
