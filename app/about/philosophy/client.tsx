'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

export default function PhilosophyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <AnimatedSection className="bg-gradient-to-b from-[#952839] to-[#7a2030] text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              인터프렙의 교육 이념
            </h1>
            <div className="space-y-4 text-lg md:text-xl leading-relaxed opacity-95">
              <p>인터프렙은 SAT 점수를 단기간에 올리는 방법보다</p>
              <p>왜, 어떤 구조로 교육해야 안정적인 성과가 나오는가를 먼저 고민해 온 학원입니다.</p>
              <p className="mt-6">13년 동안 수많은 학생을 지도하며 쌓아온 경험은 하나의 결론으로 이어졌습니다.</p>
              <p>SAT는 요령이나 운이 아니라,</p>
              <p>합리적인 구조와 검증된 데이터, 사람 중심의 관계 위에서 가장 안정적으로 결과가 만들어진다는 사실입니다.</p>
              <p className="mt-12 font-bold text-white">이 기준은 지금도, 그리고 앞으로도</p>
              <p className="font-bold text-white">인터프렙 교육의 중심에 놓여 있습니다.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 2: 4 Core Principles */}
      <AnimatedSection className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#952839]">
              인터프렙 4대 핵심 교육 원칙
            </h2>
            
            <div className="space-y-12">
              {/* Principle 1 */}
              <div className="bg-muted/30 rounded-lg p-8 md:p-10 border-l-4 border-[#952839]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#952839] text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">업계 최저 수강료</h3>
                    <p className="text-lg font-semibold mb-4 text-[#952839]">
                      교육의 가치는 가격이 아니라 구조로 증명됩니다.
                    </p>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>인터프렙은 SAT 교육 시장에 관행처럼 자리 잡은 고가 수강료 구조를 따르지 않습니다.</p>
                      <p className="mt-4">불법 기출, 과도한 마케팅, 강사 네임밸류에 비용을 쓰기보다</p>
                      <p>커리큘럼, 관리 시스템, 데이터 축적에 집중해 왔습니다.</p>
                      <p className="mt-4">합리적인 수강료는 저가 전략이 아니라 교육 구조에 대한 자신감의 결과입니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principle 2 */}
              <div className="bg-muted/30 rounded-lg p-8 md:p-10 border-l-4 border-[#952839]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#952839] text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">13년 동안 업계 최대 수강생</h3>
                    <p className="text-lg font-semibold mb-4 text-[#952839]">
                      많은 학생이 오래 선택해 왔다는 사실 자체가 검증입니다.
                    </p>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>인터프렙은 13년간 누적 수강생 수 기준, 업계 최대 규모를 유지해 왔습니다.</p>
                      <p className="mt-4">이는 단기적인 홍보가 아니라 재등록, 지인 추천, 성적 데이터의 축적으로 만들어진 결과입니다.</p>
                      <p className="mt-4">많다는 것은 우연이 아니라, 실패 확률이 낮다는 가장 현실적인 증거입니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principle 3 */}
              <div className="bg-muted/30 rounded-lg p-8 md:p-10 border-l-4 border-[#952839]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#952839] text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">형 같은 멘토, 언니 같은 선생님</h3>
                    <p className="text-lg font-semibold mb-4 text-[#952839]">
                      점수는 기술로 올리지만, 지속은 관계에서 나옵니다.
                    </p>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>인터프렙은 일방적으로 가르치고 끝나는 수업을 지향하지 않습니다.</p>
                      <p className="mt-4">학생에게 필요한 것은 질문하기 쉬운 관계, 시험 전 멘탈을 이해하는 멘토</p>
                      <p>그리고 수업 밖에서도 이어지는 관리입니다.</p>
                      <p className="mt-4">선생님과의 친근한 관계 속에서 학생은 압박이 아닌 안정감을 가지고 시험을 준비합니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principle 4 */}
              <div className="bg-muted/30 rounded-lg p-8 md:p-10 border-l-4 border-[#952839]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#952839] text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">많은 기출문제 확보</h3>
                    <p className="text-lg font-semibold mb-4 text-[#952839]">
                      SAT는 충분한 문제 풀이를 통해 정확도를 완성하는 시험입니다.
                    </p>
                    <div className="space-y-3 text-muted-foreground leading-relaxed">
                      <p>인터프렙은 축적된 기출 유형 데이터와</p>
                      <p>자체 제작 문항을 기반으로 충분한 양의 문제를 제공합니다.</p>
                      <p className="mt-4">문제는 출제 의도와 유형에 따라 정리되어</p>
                      <p>학습 효과를 높이는 순서로 제시됩니다.</p>
                      <p className="mt-4">중요한 것은 많은 문제를 반복해 풀고 정리하는 방식입니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section 4: Closing */}
      <AnimatedSection className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-51159-M69MauHqcg8jw1lbIJ6rEZNKpAPlSw.jpg"
            alt="Educational Philosophy Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/85" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#952839]">
              인터프렙이 추구하는 교육
            </h2>
            
            {/* Decorative Divider */}
            <div className="flex justify-center mb-12">
              <div className="w-64 h-0.5 bg-[#952839]"></div>
            </div>

            <div className="space-y-4 text-center text-lg md:text-xl leading-relaxed text-muted-foreground">
              <p>인터프렙은 비싸 보이는 학원이 되기보다,</p>
              <p>오래 믿을 수 있는 학원이 되고자 합니다.</p>
              <p className="mt-8">합리적인 수강료,</p>
              <p>검증된 규모,</p>
              <p>사람 중심의 관계,</p>
              <p>데이터로 축적된 문제 구조.</p>
              <p className="mt-8">이 네 가지 원칙은</p>
              <p>13년 동안 변하지 않았고,</p>
              <p>앞으로도 변하지 않을 인터프렙의 기준입니다.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
    <Footer />
    </>
  )
}
