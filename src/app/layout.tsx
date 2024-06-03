import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {Header, Providers} from "@/components"

const inter = Inter({subsets: ["latin"], display: "swap"})

export const metadata: Metadata = {
  title: "You App - MBTI, BaZi, Astrology, Numerology and More!",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </Providers>
    </html>
  )
}
