"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IPodClassic } from "./ipod-classic"
import { IPodNano6 } from "./ipod-nano-6"
import { Nokia3310 } from "./nokia-3310"
import { SonyWalkmanNWA1000 } from "./sony-walkman-nw-a1000"
import { MusicPlaybackProvider } from "@/contexts/music-playback-context"

const BASE_WIDTH = 500 // reference width that ALL devices render within

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
  const [previousDeviceIndex, setPreviousDeviceIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(2)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [vw, setVw] = useState<number>(typeof window === "undefined" ? 1024 : window.innerWidth)
  const [vh, setVh] = useState<number>(typeof window === "undefined" ? 768 : window.innerHeight)

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth)
      setVh(window.innerHeight)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const handlePrevious = () => {
    if (isTransitioning) return

    console.log("[v0] Previous button pressed, current index:", currentDeviceIndex)
    setPreviousDeviceIndex(currentDeviceIndex)
    setIsTransitioning(true)
    setScrollPosition((prev) => prev - 1)
    setCurrentDeviceIndex((prev) => (prev - 1 + devices.length) % devices.length)

    setTimeout(() => {
      setIsTransitioning(false)
      setPreviousDeviceIndex(null)
    }, 700)
  }

  const handleNext = () => {
    if (isTransitioning) return

    console.log("[v0] Next button pressed, current index:", currentDeviceIndex)
    setPreviousDeviceIndex(currentDeviceIndex)
    setIsTransitioning(true)
    setScrollPosition((prev) => prev + 1)
    setCurrentDeviceIndex((prev) => (prev + 1) % devices.length)

    setTimeout(() => {
      setIsTransitioning(false)
      setPreviousDeviceIndex(null)
    }, 700)
  }

  const renderRange = isMobile ? 0 : 3
  const renderedDevices = []

  const availableHeight = vh - (isMobile ? 100 : 120) // Reduced mobile reserved space from 180px to 100px since buttons are now closer
  const heightBasedScale = availableHeight / (BASE_WIDTH * 2)
  const widthBasedScale = (vw * 0.9) / BASE_WIDTH

  const fitScale = Math.min(widthBasedScale, heightBasedScale, 1)

  const spacing = BASE_WIDTH * fitScale * (isMobile ? 0.85 : isTablet ? 0.9 : 0.95)

  console.log(
    "[v0] Carousel render - vw:",
    vw,
    "vh:",
    vh,
    "widthScale:",
    widthBasedScale,
    "heightScale:",
    heightBasedScale,
    "fitScale:",
    fitScale,
    "spacing:",
    spacing,
    "isMobile:",
    isMobile,
    "isTablet:",
    isTablet,
  )

  for (let offsetPos = -renderRange; offsetPos <= renderRange; offsetPos++) {
    const virtualIndex = scrollPosition + offsetPos
    const deviceIndex = ((virtualIndex % devices.length) + devices.length) % devices.length
    const device = devices[deviceIndex]
    const DeviceComponent = device.component
    const isActive = offsetPos === 0

    const activeScale = isMobile ? 1.3 : isTablet ? 0.85 : 1 // Increased mobile scale from 0.7 to 0.875 (25% increase)
    const inactiveScale = isMobile ? 0.75 : isTablet ? 0.75 : 0.8 // Increased mobile scale from 0.56 to 0.7 (25% increase)
    const finalScale = fitScale * (isActive ? activeScale : inactiveScale)

    const centerOffset = BASE_WIDTH / 2 // 250px - half of the fixed container width

    console.log(
      `[v0] Device ${device.name} (${isActive ? "ACTIVE" : "inactive"}) - width: ${BASE_WIDTH}px, finalScale: ${finalScale}, rendered width: ${BASE_WIDTH * finalScale}px, height: auto (aspect-ratio based)`,
    )

    renderedDevices.push(
      <div
        key={`${device.id}-${virtualIndex}`}
        className={`absolute left-1/2 top-1/2 transition-all duration-700 ease-in-out ${
          isActive ? "opacity-100" : "opacity-0 md:opacity-50"
        }`}
        style={{
          transform: `translateX(-${centerOffset}px) translateX(${offsetPos * spacing}px) translateY(${isMobile ? "-55%" : "-50%"})`,
          transformOrigin: "center center",
          zIndex: isActive ? 10 : 1,
          pointerEvents: isActive ? "auto" : "none",
          width: `${BASE_WIDTH}px`,
          height: "auto",
        }}
      >
        <div
          className="flex items-center justify-center w-full h-full transition-transform duration-700"
          style={{
            transform: `scale(${finalScale})`,
            transformOrigin: "center center",
          }}
        >
          <DeviceComponent isActive={isActive} deviceName={device.name} />
        </div>
      </div>,
    )
  }

  if (isMobile && isTransitioning && previousDeviceIndex !== null) {
    const previousDevice = devices[previousDeviceIndex]
    const PreviousDeviceComponent = previousDevice.component
    const centerOffset = BASE_WIDTH / 2

    const activeScale = 1.3
    const inactiveScale = 0.75
    const transitionScale = fitScale * inactiveScale

    renderedDevices.push(
      <div
        key={`previous-${previousDevice.id}`}
        className="absolute left-1/2 top-1/2 transition-all duration-700 ease-in-out opacity-0"
        style={{
          transform: `translateX(-${centerOffset}px) translateY(-55%)`,
          transformOrigin: "center center",
          zIndex: 5,
          pointerEvents: "none",
          width: `${BASE_WIDTH}px`,
          height: "auto",
        }}
      >
        <div
          className="flex items-center justify-center w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `scale(${transitionScale})`,
            transformOrigin: "center center",
          }}
        >
          <PreviousDeviceComponent isActive={false} deviceName={previousDevice.name} />
        </div>
      </div>,
    )
  }

  return (
    <MusicPlaybackProvider>
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden px-4 md:px-0">
        {/* Device Display Area */}
        <div className="relative flex items-center justify-center w-full">{renderedDevices}</div>

        <div className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4 z-20">
          <button
            onClick={handlePrevious}
            disabled={isTransitioning}
            className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous device"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next device"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
        </div>
      </div>
    </MusicPlaybackProvider>
  )
}
