"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IPodClassic } from "./ipod-classic"
import { IPodNano6 } from "./ipod-nano-6"
import { Nokia3310 } from "./nokia-3310"
import { SonyWalkmanNWA1000 } from "./sony-walkman-nw-a1000"
import { MusicPlaybackProvider } from "@/contexts/music-playback-context"

type DeviceType = "ipod-classic" | "ipod-nano-6" | "nokia-3310" | "sony-walkman"

interface Device {
  id: DeviceType
  name: string
  component: React.ComponentType<{ isActive: boolean; deviceName: string }>
}

const devices: Device[] = [
  { id: "nokia-3310", name: "Nokia 3310", component: Nokia3310 },
  { id: "ipod-nano-6", name: "iPod Nano", component: IPodNano6 },
  { id: "ipod-classic", name: "iPod Classic", component: IPodClassic },
  {
    id: "sony-walkman",
    name: "Sony Walkman",
    component: SonyWalkmanNWA1000,
  },
]

export function DeviceCarousel() {
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(2) // Start with iPod Classic (now at index 2)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(2)

  const handlePrevious = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setScrollPosition((prev) => prev - 1)
    setCurrentDeviceIndex((prev) => (prev - 1 + devices.length) % devices.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }

  const handleNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setScrollPosition((prev) => prev + 1)
    setCurrentDeviceIndex((prev) => (prev + 1) % devices.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }

  // Render devices in a wider range (-3 to +3) to allow smooth exit/entry
  const renderRange = 3
  const renderedDevices = []

  for (let offsetPos = -renderRange; offsetPos <= renderRange; offsetPos++) {
    const virtualIndex = scrollPosition + offsetPos
    const deviceIndex = ((virtualIndex % devices.length) + devices.length) % devices.length
    const device = devices[deviceIndex]
    const DeviceComponent = device.component
    const isActive = offsetPos === 0
    const isVisible = Math.abs(offsetPos) <= 2

    renderedDevices.push(
      <div
        key={`${device.id}-${virtualIndex}`}
        className="absolute transition-all duration-700 ease-in-out"
        style={{
          opacity: isActive ? 1 : isVisible ? 0.5 : 0,
          transform: `translateX(${offsetPos * 500}px) scale(${isActive ? 1 : 0.8})`,
          zIndex: isActive ? 10 : 1,
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        <DeviceComponent isActive={isActive} deviceName={device.name} />
      </div>,
    )
  }

  return (
    <MusicPlaybackProvider>
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Device Display Area */}
        <div className="relative flex items-center justify-center">{renderedDevices}</div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <button
            onClick={handlePrevious}
            disabled={isTransitioning}
            className="w-16 h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous device"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-16 h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next device"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </MusicPlaybackProvider>
  )
}
