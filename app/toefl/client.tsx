'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

export default function TOEFLPageClient() {
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
              alt="TOEFL Background"
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
                TOEFL
              </h1>
              <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed text-left">
                인터프렙은 시험보는 그날까지 책임집니다!
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
                  onClick={() => scrollToSection('summer-program')}
                >
                  TOEFL 여름특강
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why study TOEFL at Interprep */}
        <AnimatedSection id="program-intro" className="pt-32 md:pt-40 pb-20 md:pb-28 bg-[#FFF5F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Why study TOEFL at <span className="text-[#952839]">Interprep</span>?
                </h2>
                <h3 className="text-xl md:text-2xl text-muted-foreground">
                  TOEFL 준비는 왜 <span className="text-[#952839]">인터프렙</span>에서 해야 하나요?
                </h3>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1 */}
                <AnimatedSection className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#952839]">
                  <h4 className="text-2xl font-bold text-foreground mb-4">학업 성공을 위한 기초</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    독해, 글쓰기, 시험 전략과 같은 핵심 영역을 체계적으로 훈련합니다. SAT·SSAT·TOEFL 등 주요시험은 물론, 고등학교·대학까지 이어지는 학습의 기초를 탄탄하게 만드는 데 
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

        {/* Section 3: TOEFL Summer Program */}
        <AnimatedSection id="summer-program" className="pt-12 md:pt-16 pb-32 md:pb-40 bg-blue-50/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
                TOEFL 여름 특강
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
                  소그룹 수업, 특별 관리
                </h3>

                <div className="max-w-2xl mx-auto space-y-4">
                  {[
                    { num: 1, text: '최대 인원 8명' },
                    { num: 2, text: '1:1 개별 관리' },
                    { num: 3, text: '1:1 어휘 및 영역별 점수 관리' },
                    { num: 4, text: '오답 노트 관리' },
                    { num: 5, text: '담임/부담임 관리' },
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

              {/* Schedule Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[15%]">
                          시간
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[21.25%]">
                          화
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
                          10:30-11:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Test
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-white" rowSpan={3}>
                          오답노트 관리
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Test
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocabulary Test
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          11:00-12:20
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Micro Exercise
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Micro Exercise
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Micro Exercise
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-amber-100/30 font-medium text-center align-middle">
                          12:20-13:00
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
                          13:00-14:30
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Reading/Listening
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Lunch 13:00-13:40
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Reading/Listening
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Reading/Listening
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          14:30-16:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Speaking/Writing
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-white" rowSpan={3}>
                          Mock Test
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Speaking/Writing
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Speaking/Writing
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
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          17:00-18:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          HW
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          HW
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          HW
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
