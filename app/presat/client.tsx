'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

export default function PreSATPageClient() {
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

  useEffect(() => {
    // Trigger animation for Book Club section when it enters viewport
    const bookClubSection = document.getElementById('bookclub')
    if (!bookClubSection) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in', 'fade-in', 'duration-1000')
            io.unobserve(entry.target)
          }
        })
      },
     { threshold: 0.3 }
    )

    io.observe(bookClubSection)
    return () => io.disconnect()
  }, [])

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
              alt="Pre-SAT Background"
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
                Pre-SAT
              </h1>
              <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed text-left">
                인터프렙은 시험보는 그날까지 책임집니다!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <Button 
                  size="lg" 
                  className="text-base px-8 py-6 hover:brightness-110 transition-all"
                  onClick={() => scrollToSection('program')}
                >
                  프로그램 소개
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-6 bg-white text-foreground border-white hover:bg-white/90 hover:border-white transition-colors"
                  onClick={() => scrollToSection('summer-2026')}
                >
                  2026 여름특강
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-6 bg-white text-foreground border-white hover:bg-white/90 hover:border-white transition-colors"
                  onClick={() => scrollToSection('ssat')}
                >
                  SSAT
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-6 bg-white text-foreground border-white hover:bg-white/90 hover:border-white transition-colors"
                  onClick={() => scrollToSection('bookclub')}
                >
                  Book Club
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why study Pre-SAT at Interprep */}
        <AnimatedSection id="program" className="pt-32 md:pt-40 pb-20 md:pb-28 bg-[#FFF5F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Start your SAT journey with <span className="text-[#952839]">Interprep</span>
                </h2>
                <h3 className="text-xl md:text-2xl text-muted-foreground">
                  SAT를 위한 첫 걸음을 <span className="text-[#952839]">인터프렙</span>에서
                </h3>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1 */}
                <AnimatedSection className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#952839]">
                  <h4 className="text-2xl font-bold text-foreground mb-4">학업 성공을 위한 기초</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    독해, 글쓰기, 시험 전략과 같은 핵심 영역을 체계적으로 훈련합니다. SAT·SSAT·TOEFL 등 주요시험은 물론, 이후 고등학교·대학까지 이어지는 학습의 기초를 탄탄하게 만드는 데 
                    <br />
                    집중한 프로그램입니다.
                  </p>
                </AnimatedSection>

                {/* Card 2 */}
                <AnimatedSection className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#952839]">
                  <h4 className="text-2xl font-bold text-foreground mb-4">연령 맞춤형 프로그램</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    고등학교 진학을 앞둔 학생들의 학습 단계와 사고 수준을 고려해 설계되었습니다. 
                    <br />
                    연령에 맞는 학습 난이도와 목표를 설정하여, 무리 없이 실력을 끌어올릴 수 있도록 단계별로 운영합니다.
                  </p>
                </AnimatedSection>

                {/* Card 3 */}
                <AnimatedSection className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#952839]">
                  <h4 className="text-2xl font-bold text-foreground mb-4">다양한 학습 기회</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    시험 대비 수업뿐 아니라 학문적 에세이, 독서 기반 토론 등 다양한 학습 활동을 제공합니다. 이를 통해 점수 향상에 그치지 않고 사고력,
                    <br />
                    표현력, 학습 역량을 함께 성장시키는 것을 <br /> 목표로 합니다.
                  </p>
                </AnimatedSection>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Button asChild size="lg" className="px-10 py-6 text-base">
                  <Link href="https://pf.kakao.com/_hxnxexfC" target="_blank" rel="noopener noreferrer">
                    문의하기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 3: 2026 PreSAT Summer Program */}
        <AnimatedSection id="summer-2026" className="pt-12 md:pt-16 pb-20 md:pb-28 bg-blue-50/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
                2026 인터프렙 PreSAT 여름특강
              </h2>

              {/* Info Block */}
              <div className="mb-6 text-left max-w-5xl mx-auto">
                <p className="text-base md:text-lg text-foreground font-semibold mb-1">■ 개강일</p>
                <p className="text-base md:text-lg text-muted-foreground">5월 18일 개강</p>
              </div>

              {/* PreSAT Schedule Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[20%]">
                          시간
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[80%]">
                          월-금
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          9:00-10:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocab Test/Review
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          10:00-12:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Critical Reading/ SAT Grammar/ Reading Discussion
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          12:00-13:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Practice Questions & Daily Review
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 4: SSAT Summer Program */}
        <AnimatedSection id="ssat" className="pt-0 md:pt-0 pb-32 md:pb-40 bg-muted/20">
          {/* Divider */}
          <div className="py-8 bg-blue-50/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-2">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#952839]" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
                SSAT 여름 특강
              </h2>

              {/* Program Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {/* Card 01 - Level */}
                <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    01
                  </div>
                  <div className="pt-8 text-center">
                    <h3 className="text-lg font-bold text-foreground mb-4">Level</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      레벨에 따라<br />
                      개념반/실전반 구성
                    </p>
                  </div>
                </div>

                {/* Card 02 - 수업 진행 */}
                <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    02
                  </div>
                  <div className="pt-8 text-center">
                    <h3 className="text-lg font-bold text-foreground mb-4">수업 진행</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      주 3회 수업/숙제 관리<br />
                      매주 모의고사 실시
                    </p>
                  </div>
                </div>

                {/* Card 03 - 오프라인 수업료 */}
                <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    03
                  </div>
                  <div className="pt-8 text-center">
                    <h3 className="text-lg font-bold text-foreground mb-4">오프라인 수업료</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      오프라인 수업실시<br />
                      매주 수강 가능
                    </p>
                  </div>
                </div>
              </div>

              {/* Class Management Section */}
              <div className="mb-20">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                  소수 정예, 특별 관리반
                </h3>

                <div className="max-w-2xl mx-auto space-y-4">
                  {[
                    { num: 1, text: '최대 인원 8명' },
                    { num: 2, text: '담임 및 TA 특별 관리' },
                    { num: 3, text: '보딩스쿨 진학 관리반' },
                    { num: 4, text: '1:1 개별 점수 관리' },
                    { num: 5, text: '1:1 어휘 및 영역별 관리' },
                    { num: 6, text: '1:1 오답 노트 관리' },
                  ].map((item) => (
                    <div key={item.num} className="flex items-center justify-center">
                      <div className="bg-[#952839] rounded-full px-6 py-3 flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow w-full max-w-md">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[#952839] font-bold text-lg">{item.num}</span>
                        </div>
                        <p className="text-white font-semibold text-base">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SSAT Schedule Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[15%]">
                          시간
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[21.25%]">
                          월
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[21.25%]">
                          수
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[21.25%]">
                          목
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[21.25%]">
                          금
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          10:00-10:30
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Review & Test
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Review & Test
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-white" rowSpan={3}>
                          Mock Test<br />10:00-12:30
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Review & Test
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          10:30-12:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Reading Comprehension
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Reading Comprehension
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Reading Comprehension
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-amber-100/30 font-medium text-center align-middle">
                          12:00-12:30
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-amber-700 text-center font-medium bg-amber-100/30 align-middle">
                          Lunch
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-amber-700 text-center font-medium bg-amber-100/30 align-middle">
                          Lunch
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-amber-700 text-center font-medium bg-amber-100/30 align-middle">
                          Lunch
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          12:30-14:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Verbal (Analogies/Synonym)
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Verbal (Analogies/Synonym)
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Lunch 12:40-1:30<br />Self - Study
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Verbal (Analogies/Synonym)
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          14:00-16:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Extra-Exercise
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Extra-Exercise
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Extra Exercise
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Math
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          16:00-17:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Check
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Check
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Check
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Check
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 5: Book Club */}
        <AnimatedSection id="bookclub" className="pt-0 md:pt-0 pb-32 md:pb-40 bg-blue-50/40">
          {/* Divider */}
          <div className="py-8 bg-blue-50/40">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-2">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#952839]" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
                Book Club
              </h2>

              {/* Program Description - Center Aligned */}
              <div className="mb-16 text-center max-w-4xl mx-auto">
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-4">
                  북클럽(Book Club)은 중학교 6·7·8학년 학생을 대상으로<br />
                  고등학교 영어 수업과 AP English 과정에 자연스럽게 대비하고,<br />
                  SAT 학습을 위한 탄탄한 기초를 쌓도록 설계된 프로그램입니다.
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  다양한 문학 작품을 기반으로 비판적 읽기, 분석적 사고, 논리적인 글쓰기 훈련을 진행하며,<br />
                  고등학교 이후 학업 전반에서 요구되는 영어 사고력과 표현력을 체계적으로 키워줍니다.
                </p>
              </div>

              {/* Subsection Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Book Club Highlights
              </h3>

              {/* Highlight Cards - 5 Cards in 2 Rows */}
              <div className="max-w-5xl mx-auto mb-10">
                {/* First Row: 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                  {/* Card 1 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      01
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4"> 폭넓은 문학 탐구</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        엄선된 고전 소설과 현대 문학 작품을 함께 읽으며
                        시대를 대표하는 작품부터 현대 주제의 텍스트까지 다양한 문체와 장르를 균형 있게 탐구합니다.
                        이를 통해 문학에 대한 폭넓은 이해와 독서 깊이를 동시에 키웁니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      02
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">비판적 읽기·분석 능력 강화</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        텍스트를 단순히 읽는 데서 그치지 않고
                        은유, 상징, 아이러니 등 핵심 문학적 장치를 분석하며
                        인물 전개, 주제, 모티프를 논리적으로 해석하는 방법을 체계적으로 학습합니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      03
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">글쓰기 및 커뮤니케이션 역량 향상</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        문학 작품을 바탕으로 통찰력 있는 에세이를 작성하고,
                        토론과 발표를 통해 자신의 생각을 명확하고 설득력 있게 표현하는 훈련을 진행합니다.
                        이는 학교 수업은 물론 이후 학업 전반에 필요한 핵심 역량으로 이어집니다.
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
                      <h4 className="text-lg font-bold text-foreground mb-4">어휘·문법 실력의 체계적 확장</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        문학 작품에 자주 등장하는 고급 어휘와 복합 문장 구조를 집중적으로 다루며,
                        학업 영어와 표준화 시험에서 요구되는 정확한 문해력과 문법 이해도를 함께 강화합니다.
                      </p>
                    </div>
                  </div>

                  {/* Card 5 */}
                  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      05
                    </div>
                    <div className="pt-8 text-center">
                      <h4 className="text-lg font-bold text-foreground mb-4">철저한 시험 대비</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        SAT, ACT, AP 시험에 자주 출제되는 유형의 지문을 분석하며
                        핵심 아이디어를 빠르게 파악하는 훈련과 함께
                        객관식 문제 해결 전략까지 단계적으로 학습합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Description - Center Aligned */}
              <div className="mb-16 text-center max-w-4xl mx-auto">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  이 프로그램은 영어 실력 향상에 그치지 않고,<br />
                  고등학교 및 그 이후 학업 과정에서 스스로 읽고 생각하고 표현할 수 있는<br />
                  자신감과 학습 도구를 함께 길러주는 것을 목표로 합니다.
                </p>
              </div>

              {/* Opening Information Block - Above Table */}
              <div className="mb-6 text-left max-w-5xl mx-auto">
                <p className="text-base md:text-lg text-foreground font-semibold mb-1">■ 개강정보</p>
                <p className="text-base md:text-lg text-muted-foreground mb-1">대상: 6·7·8학년</p>
                <p className="text-base md:text-lg text-muted-foreground mb-1">개강일: 5월 18일</p>
                <p className="text-base md:text-lg text-muted-foreground">강의 시간: 9:00–13:00</p>
              </div>

              {/* Book Club Schedule Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-4 text-center font-bold text-foreground bg-[#952839]/10" colSpan={3}>
                          월 / 화 / 수 / 목 / 금
                        </th>
                      </tr>
                      <tr>
                        <th className="border border-gray-200 px-4 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[20%]">
                          시간
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[40%]">
                          Morning
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[40%]">
                          Afternoon
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          09:00-09:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocab
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-white" rowSpan={4}>
                          자습
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          10:00-10:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Literature
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          11:00-11:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Writing
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          12:00-12:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Debate
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-amber-100/30 font-medium text-center">
                          12:50-14:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-amber-700 text-center font-medium bg-amber-100/30" colSpan={2}>
                          
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          14:00-14:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-white" rowSpan={4}>
                          자습
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocab
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          15:00-15:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Literature
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          16:00-16:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Writing
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          17:00-17:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Debate
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
