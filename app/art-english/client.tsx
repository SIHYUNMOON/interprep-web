'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

export default function ArtEnglishPageClient() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 96
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative h-[70vh] md:h-[80vh] flex items-end overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sat-hero-bg.jpg"
              alt="Art + English Immersion Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content - Lower Left Aligned */}
          <div className="container mx-auto px-4 pb-24 md:pb-32 relative z-10">
            <div className="max-w-4xl ml-8 md:ml-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-left">
                Art + English Immersion
              </h1>
              <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed text-left">
                미국 미술 학교에서의 성공적인 시작을 준비합니다
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-base px-8 py-6 hover:brightness-110 transition-all"
                  onClick={() => scrollToSection('program-intro')}
                >
                  프로그램 소개
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-6 bg-white text-foreground border-white hover:bg-white/90 hover:border-white transition-colors"
                  onClick={() => scrollToSection('program-details')}
                >
                  2026 여름특강
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Why Elements of Writing */}
        <AnimatedSection id="program-intro" className="pt-32 md:pt-40 pb-32 md:pb-40 bg-[#FFF5F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Why Elements of Writing?
                </h2>
                <div className="flex justify-center">
                  <div className="w-64 h-0.5 bg-[#952839]"></div>
                </div>
              </div>

              {/* Center-aligned description text */}
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
                  Art and English Immersion은<br />
                  미국 미술 학교에서의 성공적인 학업 적응과 성장을 목표로,<br />
                  학생들에게 학문적 자신감과 실질적인 영어 커뮤니케이션 능력을 제공합니다.
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  학생들은 자신의 예술적 비전과 아이디어를<br />
                  영어로 명확하고 설득력 있게 표현하는 방법을 배우며,<br />
                  미국 미술 학교에서 요구하는 학업 환경에 자연스럽게 대비할 수 있습니다.<br />
                  새로운 학업 여정을 시작하는 학생들에게,<br />
                  이 프로그램은 도전과 성장의 출발점이 되는 준비 과정입니다.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 03: Program Overview */}
        <AnimatedSection id="program-details" className="pt-20 md:pt-28 pb-16 md:pb-20 bg-blue-50/40">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Main Section Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
                Art + English Immersion<br />
                (Writing & Reading & Critique)
              </h2>

              {/* Opening Information Block with Image */}
              <div className="mb-20 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-16 justify-center">
                  {/* Circular Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src="/images/fragonard-reader.jpg" 
                      alt="The Reader by Fragonard" 
                      className="w-56 h-56 rounded-full object-cover shadow-lg"
                    />
                  </div>
                  
                  {/* Information Text */}
                  <div className="text-left">
                    <p className="text-base md:text-lg text-foreground font-semibold mb-3">■ 개강정보</p>
                    <p className="text-base md:text-lg text-muted-foreground mb-1">대상: 미술 전공을 희망하는 학부 및 대학원 진학 예정 학생들</p>
                    <p className="text-base md:text-lg text-muted-foreground mb-1">개강일: 5월 18일</p>
                    <p className="text-base md:text-lg text-muted-foreground">강의 시간: 16:00–18:00 (월·수·금)</p>
                  </div>
                </div>
              </div>

              {/* Program Description - Center Aligned */}
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-4">
                  Art and English Immersion은<br />
                  미술 전공을 희망하는 학부 및 대학원 진학 예정 학생을 위해 설계된<br />
                  전공 특화 영어·학업 준비 프로그램입니다.
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  미국 미술 학교 수업에서 실제로 사용되는 영어와 학문적 기술을 중심으로,<br />
                  예술 작품의 해석과 비평, 토론, 글쓰기에 필요한 언어 능력을 체계적으로 훈련합니다.<br />
                  이를 통해 학생들은 입학 이후 바로 마주하게 될<br />
                  미술 학교의 학업 방식과 커뮤니케이션 환경에 자신 있게 적응할 수 있는 기반을 갖추게 됩니다.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 04: Elements of Writing Highlights */}
        <AnimatedSection className="pt-16 md:pt-20 pb-32 md:pb-40 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Subsection Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Elements of Writing Highlights
              </h3>

              {/* Highlight Cards - 5 Cards in 2 Rows */}
              <div className="max-w-5xl mx-auto">
                {/* First Row: 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                  {/* Card 1 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      01
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">미술 학교 필수 자료 이해 능력 강화</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        미술 학교 수업에서 자주 다루는 텍스트와 자료를 분석하며,
                        작품 설명, 이론 글, 비평문 등 예술 교육 환경에서 사용되는 영어에 익숙해지도록 훈련합니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      02
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">작품 중심 글쓰기·비평 역량 향상</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        자신의 작품은 물론, 주요 작가와 작품을 주제로
                        논리적이고 설득력 있는 글쓰기 및 비평문 작성 능력을 체계적으로 기릅니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      03
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">예술 전공 영어 및 전문 어휘 습득</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        예술 담론에서 실제로 사용되는 전문 용어와 표현을 학습하여,
                        수업 토론·발표·크리틱 상황에서도 자신 있게 의견을 전달할 수 있도록 지원합니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Row: 2 Cards Centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {/* Card 4 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      04
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">비평·토론 중심 커뮤니케이션 훈련</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        작품의 미적·개념적 요소를 비판적으로 분석하고,
                        동료 및 강사와의 크리틱 세션을 통해 설득력 있는 토론 능력과 사고력을 함께 강화합니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      05
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">미국 미술 학교 학업 준비 완성</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        입학 이후 바로 요구되는
                        글쓰기·비평·토론 중심 수업에 대비하여,
                        미술 학교 학업 환경에 자신 있게 적응할 수 있는 실질적인 준비를 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
