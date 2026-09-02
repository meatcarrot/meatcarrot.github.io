import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lee Heeyeon — Backend Developer",
  description:
    "믿고 쓸 수 있는 시스템을 만들기 위해 정합성·성능·복구 가능성을 검증하는 백엔드 개발자 이희연의 포트폴리오.",
  metadataBase: new URL("https://meatcarrot.github.io"),
  openGraph: {
    title: "Lee Heeyeon — Backend Developer",
    description:
      "Java / Spring Backend · 신뢰성 · 성능 · 검증",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#fbfbfa",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${geistMono.variable} bg-background`}>
      <body>{children}</body>
    </html>
  )
}
