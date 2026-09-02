import type { Metadata } from "next"
import { Noto_Sans_KR, Geist_Mono } from "next/font/google"
import "./globals.css"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lee Heeyeon — Backend Developer",
  description:
    "기능 구현에서 멈추지 않고, 시스템의 신뢰성을 검증하고 개선하는 Java/Spring 백엔드 개발자 이희연의 엔지니어링 케이스 스터디 포트폴리오.",
  metadataBase: new URL("https://meatcarrot.github.io"),
  openGraph: {
    title: "Lee Heeyeon — Backend Developer",
    description:
      "Java / Spring Backend · AI Service Engineering. 신뢰성·성능·검증을 중심으로 한 엔지니어링 케이스 스터디.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
