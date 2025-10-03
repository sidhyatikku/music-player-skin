import { DeviceCarousel } from "@/components/device-carousel"
import { GradientBackground } from "@/components/gradient-background"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
      <GradientBackground />
      <DeviceCarousel />
    </main>
  )
}
