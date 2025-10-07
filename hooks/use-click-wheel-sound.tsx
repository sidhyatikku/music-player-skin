"use client"

import { createContext, useContext, useRef, useState, useCallback, useEffect, type ReactNode } from "react"

interface ClickWheelSoundContextType {
  playClick: (velocity?: number) => void
  setEnabled: (enabled: boolean) => void
  enabled: boolean
}

const ClickWheelSoundContext = createContext<ClickWheelSoundContextType | null>(null)

export function ClickWheelSoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const lastPlayTimeRef = useRef<number>(0)
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const velocityHistoryRef = useRef<number[]>([])

  // Initialize Web Audio API and load sound
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create AudioContext
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (!AudioContextClass) {
          console.warn("[v0] Web Audio API not supported")
          return
        }

        audioContextRef.current = new AudioContextClass()

        // Load the click sound
        const response = await fetch("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sound-click-wheel-RJkWTw6QVvISelmJwLSnePZ8Mud6ht.mov")
        const arrayBuffer = await response.arrayBuffer()
        audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer)

        console.log("[v0] Click sound loaded successfully")
      } catch (error) {
        console.error("[v0] Failed to load click sound:", error)
      }
    }

    initAudio()

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playClick = useCallback(
    (velocity = 1) => {
      if (!enabled || !audioContextRef.current || !audioBufferRef.current) {
        return
      }

      const now = performance.now()

      // Add velocity to history for tracking scroll speed
      velocityHistoryRef.current.push(velocity)
      if (velocityHistoryRef.current.length > 5) {
        velocityHistoryRef.current.shift()
      }

      // Calculate average velocity from recent history
      const avgVelocity = velocityHistoryRef.current.reduce((sum, v) => sum + v, 0) / velocityHistoryRef.current.length

      // Dynamic debounce: 25ms (fast) to 120ms (slow) based on velocity
      // Higher velocity = shorter debounce (more rapid clicks)
      const debounceTime = Math.max(25, 120 - avgVelocity * 95)

      // Check if enough time has passed since last click
      if (now - lastPlayTimeRef.current < debounceTime) {
        return
      }

      // Stop any currently playing click to prevent overlap
      if (currentSourceRef.current) {
        try {
          currentSourceRef.current.stop()
        } catch (e) {
          // Ignore if already stopped
        }
      }

      try {
        // Create new source node
        const source = audioContextRef.current.createBufferSource()
        source.buffer = audioBufferRef.current

        // Create gain node for volume control
        const gainNode = audioContextRef.current.createGain()

        // Dynamic volume curve: faster scrolling = softer clicks
        // Formula: volume = baseVolume * exp(-velocity / 400)
        const baseVolume = 0.6
        const volumeAttenuation = Math.exp(-avgVelocity / 0.4)
        const finalVolume = baseVolume * volumeAttenuation

        gainNode.gain.value = Math.max(0.2, Math.min(1, finalVolume))

        // Connect: source -> gain -> destination
        source.connect(gainNode)
        gainNode.connect(audioContextRef.current.destination)

        // Play the sound
        source.start(0)
        currentSourceRef.current = source

        // Clear reference when sound ends
        source.onended = () => {
          if (currentSourceRef.current === source) {
            currentSourceRef.current = null
          }
        }

        lastPlayTimeRef.current = now
      } catch (error) {
        console.error("[v0] Error playing click sound:", error)
      }
    },
    [enabled],
  )

  return (
    <ClickWheelSoundContext.Provider value={{ playClick, setEnabled, enabled }}>
      {children}
    </ClickWheelSoundContext.Provider>
  )
}

export function useClickWheelSound() {
  const context = useContext(ClickWheelSoundContext)
  if (!context) {
    throw new Error("useClickWheelSound must be used within ClickWheelSoundProvider")
  }
  return context
}
