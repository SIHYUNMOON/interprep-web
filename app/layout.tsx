import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Interprep 인터프렙 - SAT 전문 학원",
  description:
    "SAT 전문 학원 인터프렙. 체계적인 커리큘럼, 철저한 관리, 검증된 학습 자료로 학생 개개인의 SAT 잠재력을 극대화합니다. 2007년 설립, 누적 수강생 9,215명.",
  keywords: "SAT학원, SAT전문학원, 인터프렙, Interprep, SAT준비, SAT점수향상, 강남SAT학원",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
