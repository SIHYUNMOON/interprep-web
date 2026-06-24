'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Button } from '@/components/ui/button'

export default function SATPage() {
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
              alt="SAT Background"
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
                SAT
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
                  2026 여름특강
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: SAT 운영 시스템 */}
        <AnimatedSection id="program-intro" className="pt-32 md:pt-40 pb-20 md:pb-28 bg-[#FFF5F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Why study SAT at <span className="text-[#952839]">Interprep</span>?
                </h2>
                <h3 className="text-xl md:text-2xl text-muted-foreground">
                  SAT 준비는 왜 <span className="text-[#952839]">인터프렙</span>에서 해야 하나요?
                </h3>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Card 1 */}
                <AnimatedSection className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#952839]">
                  <h4 className="text-2xl font-bold text-foreground mb-4">철저한 관리</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    인터프렙은 체계적인 TA 밀착관리 시스템을 통해 학생 개개인의 목표 달성을 지속적으로 모니터링하고 SAT 학습 효율을 극대화합니다.
                  </p>
                </AnimatedSection>

                {/* Card 2 */}
                <AnimatedSection className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#952839]">
                  <h4 className="text-2xl font-bold text-foreground mb-4">자체 출판</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    최신 SAT 트렌드와 기출 분석이 반영된 자체 교재와 학습 자료를 통해 효과적인 학습 환경을 제공합니다.
                  </p>
                </AnimatedSection>

                {/* Card 3 */}
                <AnimatedSection className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#952839]">
                  <h4 className="text-2xl font-bold text-foreground mb-4">멘토링</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    디아이프렙 컨설턴트와의 정기 상담을 통해 대학 목표에 맞춘 SAT 전략 수립과 실질적인 입시 방향을 제시합니다.
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

        {/* Section 3: 2026 SAT 여름특강 */}
        <AnimatedSection id="summer-program" className="pt-12 md:pt-16 pb-32 md:pb-40 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  2026 인터프렙 SAT 여름특강
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  5월 18일 개강, Level Test 후 주단위 등록 가능, 단어시험 미통과 시 하원 불가
                </p>
              </div>

              {/* Schedule Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border border-gray-200 px-4 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[15%]">
                          R/W
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[42.5%]">
                          월-목
                        </th>
                        <th className="border border-gray-200 px-6 py-4 text-center font-bold text-foreground bg-[#952839]/10 w-[42.5%]">
                          금
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          09:00-10:05
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          R/W Test 1
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center" rowSpan={2}>
                          SAT 실전 모의고사
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          10:15-11:25
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Math Test 1
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          11:35-12:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Retest & Vocab
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                          Vocab
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-amber-100/30 font-medium text-center align-middle">
                          13:00-14:00
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-amber-700 text-center font-medium bg-amber-100/30 align-middle" colSpan={2}>
                          Lunch
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          14:00-14:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-gray-200/70" rowSpan={2}>
                          R/W Test Review
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-gray-200/70" rowSpan={3}>
                          모의고사 Review 수업
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          15:00-15:50
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          16:00-16:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-gray-200/70">
                          Grammar
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="border border-gray-200 px-4 py-3 text-sm text-muted-foreground bg-gray-50/50 font-medium text-center">
                          17:00-17:50
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center bg-gray-200/70">
                          Math Test Review
                        </td>
                        <td className="border border-gray-200 px-6 py-3 text-sm text-foreground text-center">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              <div className="px-2">
                <p className="text-xs text-muted-foreground mb-0.5">
                  *수업 순서는 상황에 따라 달라질 수 있습니다.
                </p>
                <p className="text-xs text-muted-foreground">
                  *매주 금요일 English & Math Full Test (디지털 모의고사), 금요일 성적으로 Level 변경 가능
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
