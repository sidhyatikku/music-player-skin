import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Amiri, Fragment_Mono as Bitcount_Mono_Single, Rokkitt } from "next/font/google"
import "./globals.css"

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amiri",
})

const bitcount = Bitcount_Mono_Single({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bitcount",
})

const rokkitt = Rokkitt({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rokkitt",
})

export const metadata: Metadata = {
  title: "iPod Classic Interface",
  description: "Interactive iPod Classic with music library",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${amiri.variable} ${bitcount.variable} ${rokkitt.variable}`}>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
