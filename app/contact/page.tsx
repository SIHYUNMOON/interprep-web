'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Phone } from 'lucide-react'

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Section 1: Hero Consultation Intro */}
        <AnimatedSection className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/pexels-mingyang-liu-301813241-28412565.jpg"
              alt="Library background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark overlay for text readability */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.48), rgba(0,0,0,0.52))'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
                수강생이 선택한<br />
                <span className="text-[#952839]">인터프렙</span>
              </h1>

              {/* Body Text */}
              <p className="text-lg md:text-xl font-medium mb-8" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>
                인터프렙만의 치밀하게 구성된 시험 대비 코스와<br />
                풍부한 입시자료 및 온라인 콘텐츠는 여러분을 탁월함으로 인도합니다
              </p>

              {/* Emphasis Line */}
              <p className="text-2xl md:text-3xl font-semibold text-white">
                궁금하신 모든 부분들을 자세히 상담해 드립니다
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Phone Bar Sub-section */}
        <AnimatedSection className="bg-gray-100 py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-[#952839]" />
              <span className="text-lg md:text-xl text-foreground">
                상담 전화{' '}
                <span className="font-bold text-[#952839]">02-547-2039</span>
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2: KakaoTalk Consultation */}
        <AnimatedSection className="bg-[#FFE812] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Panel - Text Content */}
                <div className="text-foreground">
                  {/* Intro */}
                  <p className="text-lg md:text-xl leading-relaxed mb-6">
                    안녕하세요, 좀 더 빠른 안내를 드리기 위해 카카오톡만으로 연락을 받고 있습니다.
                  </p>

                  {/* Body */}
                  <p className="text-base md:text-lg leading-relaxed mb-8">
                    카카오톡 ID{' '}
                    <span className="font-bold text-[#952839]">: iprepconsulting</span>
                    <br />
                    친구 등록해주시고 상담 양식 내용을 기재하여 문의해주시면 근무시간 내 확인하는 대로 연락드리겠습니다. 감사합니다.
                  </p>

                  {/* Consultation Form - Text Only */}
                  <div className="bg-white rounded-lg p-6 md:p-8 mt-8">
                    <h3 className="text-lg font-bold text-foreground mb-6 text-center">
                      [상담 양식]
                    </h3>
                    
                    <div className="space-y-4 text-sm md:text-base text-foreground">
                      <div>학생 이름:</div>
                      <div>학부모 이름:</div>
                      <div>학생 전화번호:</div>
                      <div>학부모 전화번호:</div>
                      <div>학생 이메일:</div>
                      <div>학부모 이메일:</div>
                      <div>학년(메시지 작성일 기준):</div>
                      <div>체류중 학교:</div>
                      <div>인터프렙을 알게 된 계기:</div>
                      <div className="pl-4 text-xs md:text-sm">
                        학부모 지인/학생 지인/네이버 검색/구글 검색/유튜브/기타
                      </div>
                      <div>지망 대학 국가 및 전공:</div>
                      <div>학교 내신:</div>
                      <div>묻고자 하는 내용:</div>
                      <div className="pl-4 text-xs md:text-sm">
                        (SAT/ACT/AP/IB/GPA/TOEFL/기타)
                      </div>
                      <div>상담 희망 요일:</div>
                      <div>상담 희망 시간:</div>
                      <div>상담 희망 형태:</div>
                      <div className="pl-4 text-xs md:text-sm">
                        (전화, 줌, 방문 등)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel - KakaoTalk Image */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-2xl aspect-auto">
                    <Image
                      src="/customer-kakao.png"
                      alt="KakaoTalk consultation guide"
                      width={800}
                      height={1600}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  )
}
