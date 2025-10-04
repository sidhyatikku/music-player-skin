"use client"

import type React from "react"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"
import type { Artist, Album, Song } from "@/lib/music-library"
import { musicLibrary } from "@/lib/music-library"

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
  const hasUserInteractedRef = useRef(false)
  const pendingPlayRef = useRef(false)

  const playNextSong = () => {
    if (!navigation.selectedSong || !navigation.selectedAlbum || !navigation.selectedArtist) {
      return
    }

    const currentArtist = navigation.selectedArtist
    const currentAlbum = navigation.selectedAlbum
    const currentSong = navigation.selectedSong

    // Find current indices
    const artistIndex = musicLibrary.findIndex((a) => a.name === currentArtist.name)
    const albumIndex = currentArtist.albums.findIndex((a) => a.name === currentAlbum.name)
    const songIndex = currentAlbum.songs.findIndex((s) => s.id === currentSong.id)

    // Try to play next song in current album
    if (songIndex < currentAlbum.songs.length - 1) {
      const nextSong = currentAlbum.songs[songIndex + 1]
      console.log("[v0] Autoplay: Next song in album:", nextSong.title)
      setNavigation({
        ...navigation,
        selectedSong: nextSong,
      })
      setIsPlaying(true)
      return
    }

    // Try to play first song of next album
    if (albumIndex < currentArtist.albums.length - 1) {
      const nextAlbum = currentArtist.albums[albumIndex + 1]
      const nextSong = nextAlbum.songs[0]
      console.log("[v0] Autoplay: Next album:", nextAlbum.name, "- First song:", nextSong.title)
      setNavigation({
        ...navigation,
        selectedAlbum: nextAlbum,
        selectedSong: nextSong,
      })
      setIsPlaying(true)
      return
    }

    // Try to play first song of first album of next artist
    if (artistIndex < musicLibrary.length - 1) {
      const nextArtist = musicLibrary[artistIndex + 1]
      const nextAlbum = nextArtist.albums[0]
      const nextSong = nextAlbum.songs[0]
      console.log("[v0] Autoplay: Next artist:", nextArtist.name, "- Album:", nextAlbum.name, "- Song:", nextSong.title)
      setNavigation({
        level: "nowPlaying",
        selectedArtist: nextArtist,
        selectedAlbum: nextAlbum,
        selectedSong: nextSong,
      })
      setIsPlaying(true)
      return
    }

    // Loop back to first artist, first album, first song
    const firstArtist = musicLibrary[0]
    const firstAlbum = firstArtist.albums[0]
    const firstSong = firstAlbum.songs[0]
    console.log(
      "[v0] Autoplay: Looping back to first artist:",
      firstArtist.name,
      "- Album:",
      firstAlbum.name,
      "- Song:",
      firstSong.title,
    )
    setNavigation({
      level: "nowPlaying",
      selectedArtist: firstArtist,
      selectedAlbum: firstAlbum,
      selectedSong: firstSong,
    })
    setIsPlaying(true)
  }

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
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
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
              hasUserInteractedRef.current = true
            } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
              isLoadingRef.current = false
              isPlayingRef.current = false
              setIsPlaying(false)
            } else if (event.data === (window as any).YT.PlayerState.ENDED) {
              console.log("[v0] Song ended, playing next...")
              isLoadingRef.current = false
              isPlayingRef.current = false
              setIsPlaying(false)
              playNextSong()
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

        try {
          playerRef.current.cueVideoById({
            videoId: navigation.selectedSong.id,
            startSeconds: 0,
          })

          if (isPlaying) {
            // Small delay to ensure video is cued
            setTimeout(() => {
              if (playerRef.current && playerRef.current.playVideo) {
                console.log("[v0] Calling playVideo() after cue")
                playerRef.current.playVideo()
              }
            }, 100)
          }
        } catch (error) {
          console.log("[v0] Error loading video:", error)
          isLoadingRef.current = false
        }
      }
    }
  }, [navigation.selectedSong, playerReady, isPlaying])

  useEffect(() => {
    if (playerReady && playerRef.current) {
      console.log("[v0] isPlaying state changed to:", isPlaying, "actual player state:", isPlayingRef.current)

      // Only send command if the desired state differs from actual player state
      if (isPlaying && !isPlayingRef.current) {
        console.log("[v0] Calling playVideo()")
        try {
          const attemptPlay = () => {
            if (playerRef.current && playerRef.current.playVideo) {
              playerRef.current.playVideo()

              setTimeout(() => {
                if (playerRef.current && playerRef.current.getPlayerState) {
                  const state = playerRef.current.getPlayerState()
                  console.log("[v0] Player state after play attempt:", state)

                  // If not playing or buffering, try again
                  if (state !== 1 && state !== 3 && !hasUserInteractedRef.current) {
                    console.log("[v0] Play failed, may need user interaction on mobile")
                  }
                }
              }, 500)
            }
          }

          attemptPlay()
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
