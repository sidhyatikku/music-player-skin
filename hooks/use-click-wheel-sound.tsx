"use client"

import { createContext, useContext, useEffect, useRef, useState, useCallback, type ReactNode } from "react"

interface ClickWheelSoundContextType {
  playClick: (velocity?: number) => void
  setEnabled: (enabled: boolean) => void
  enabled: boolean
}

const ClickWheelSoundContext = createContext<ClickWheelSoundContextType | null>(null)

interface ClickWheelSoundProviderProps {
  children: ReactNode
  soundUrl?: string
  enableSound?: boolean
}

export function ClickWheelSoundProvider({
  children,
  soundUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sound-click-wheel-kD3huCaZ1BgiqjhcGpaEw70OB5sWaI.mov",
  enableSound = true,
}: ClickWheelSoundProviderProps) {
  const [enabled, setEnabled] = useState(enableSound)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const lastPlayTimeRef = useRef<number>(0)
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null)

  // Initialize Web Audio API
  useEffect(() => {
    // Check if Web Audio API is supported
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) {
      console.warn("[v0] Web Audio API not supported, click sounds disabled")
      return
    }

    // Create audio context
    audioContextRef.current = new AudioContextClass()

    // Load the sound file
    fetch(soundUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContextRef.current?.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        audioBufferRef.current = audioBuffer
        console.log("[v0] Click sound loaded successfully")
      })
      .catch((error) => {
        console.error("[v0] Error loading click sound:", error)
      })

    // Cleanup
    return () => {
      if (audioContextRef.current?.state !== "closed") {
        audioContextRef.current?.close()
      }
    }
  }, [soundUrl])

  const playClick = useCallback(
    (velocity = 0) => {
      if (!enabled || !audioContextRef.current || !audioBufferRef.current) {
        return
      }

      const now = Date.now()
      const timeSinceLastPlay = now - lastPlayTimeRef.current

      // Calculate debounce interval based on velocity
      // velocity ranges from 0 (slow) to 1 (fast)
      // interval ranges from 120ms (slow) to 25ms (fast)
      const minInterval = 25
      const maxInterval = 120
      const debounceInterval = maxInterval - velocity * (maxInterval - minInterval)

      // Prevent overlapping clicks
      if (timeSinceLastPlay < debounceInterval) {
        return
      }

      // Stop any currently playing sound
      if (currentSourceRef.current) {
        try {
          currentSourceRef.current.stop()
        } catch (e) {
          // Ignore errors if already stopped
        }
      }

      // Create new source
      const source = audioContextRef.current.createBufferSource()
      source.buffer = audioBufferRef.current

      // Create gain node for volume control
      const gainNode = audioContextRef.current.createGain()

      // Calculate volume based on velocity
      // Faster scrolling = softer clicks (exponential decay)
      // baseVolume = 0.6, decreases as velocity increases
      const baseVolume = 0.6
      const volume = baseVolume * Math.exp(-velocity / 0.4)
      gainNode.gain.value = Math.max(0.1, Math.min(1, volume))

      // Connect nodes: source -> gain -> destination
      source.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      // Play the sound
      source.start(0)
      currentSourceRef.current = source

      // Update last play time
      lastPlayTimeRef.current = now

      // Clear reference when sound ends
      source.onended = () => {
        if (currentSourceRef.current === source) {
          currentSourceRef.current = null
        }
      }
    },
    [enabled],
  )

  const value: ClickWheelSoundContextType = {
    playClick,
    setEnabled,
    enabled,
  }

  return <ClickWheelSoundContext.Provider value={value}>{children}</ClickWheelSoundContext.Provider>
}

export function useClickWheelSound() {
  const context = useContext(ClickWheelSoundContext)
  if (!context) {
    throw new Error("useClickWheelSound must be used within a ClickWheelSoundProvider")
  }
  return context
}
