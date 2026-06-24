'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { useCountUp } from '@/hooks/use-count-up'
import { Button } from '@/components/ui/button'

// Add custom styles for animations
const customStyles = `
  @keyframes slideInFromLeftNear {
    from {
      opacity: 0;
      transform: translateX(-8%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInFromRightNear {
    from {
      opacity: 0;
      transform: translateX(8%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Initial state: Always start in offset position */
  .animate-slide-in-left-near {
    opacity: 0;
    transform: translateX(-8%);
  }
  
  /* Animation plays only when animate-play class is added */
  .animate-slide-in-left-near.animate-play {
    animation: slideInFromLeftNear 1s ease-out 0.15s forwards;
  }
  
  /* Initial state: Always start in offset position */
  .animate-slide-in-right-near {
    opacity: 0;
    transform: translateX(8%);
  }
  
  /* Animation plays only when animate-play class is added */
  .animate-slide-in-right-near.animate-play {
    animation: slideInFromRightNear 1s ease-out 0.2s forwards;
  }
`

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    // Inject custom styles
    const style = document.createElement('style')
    style.textContent = customStyles
    document.head.appendChild(style)

    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.animate-slide-in-left-near, .animate-slide-in-right-near'))
    if (!nodes.length) return

    if (prefersReduced) {
      nodes.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'translateX(0)'
      })
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting && !el.classList.contains('animate-play')) {
            // Trigger animation by adding animate-play class
            el.classList.add('animate-play')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - EXPANDED */}
        <section className="bg-background py-32 md:py-40">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                학원소개
              </h1>
              
              <div className="w-24 h-px bg-border mx-auto mb-12" />
              
              <p className="text-lg md:text-xl text-muted-foreground mb-16 leading-relaxed">
                Interprep provides the optimal education service and counseling for students preparing for overseas university admission
              </p>
              
              <p className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-24">
                결과로 증명하는 <span className="text-[#952839]">INTERPREP</span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 - 인터프렙 핵심 특징 */}
        <AnimatedSection className="bg-[#0f1115] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Title Block - TIGHTER SPACING */}
              <div className="text-center mb-10 pt-2 md:pt-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  SAT/ACT 학원
                </h2>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  <span className="text-white">최적의 교육 서비스</span>와 수년간의 <span className="text-white">컨설팅 노하우</span>로 완성한 대학 진학 시스템
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Left: Image - Slide in from left */}
                <div className="relative order-2 lg:order-1 animate-slide-in-left-near will-change-transform">
                  <div className="aspect-square relative">
                    <Image
                      src="/images/intro-img.png"
                      alt="인터프렙 교육 시스템"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right: 5 Core Features - Slide in from right */}
                <div className="space-y-7 order-1 lg:order-2 animate-slide-in-right-near will-change-transform">
                  {[
                    {
                      number: '01',
                      title: '10년 이상 축적된 SAT ACT 입시 컨설팅 노하우',
                      desc: '다양한 입시정보와 수년간 검증된 컨설턴트들의 입시방향 설계',
                    },
                    {
                      number: '02',
                      title: 'Ivy League/명문대 출신 전임 강사진',
                      desc: 'Full Time 전임강사로 학생들의 눈높이에 맞추어진 강의와 애정어린 멘토링',
                    },
                    {
                      number: '03',
                      title: '검증된 체계적 교육 시스템',
                      desc: '매달 강사평가를 진행해 학생들의 니즈에 맞는 강사진 구성',
                    },
                    {
                      number: '04',
                      title: '실력에 맞춘 수준별 맞춤 수업',
                      desc: '테스트를 통한 실력별 분반 배정과 수준별 맞춤 수업진행',
                    },
                    {
                      number: '05',
                      title: '수업 이후까지 이어지는 Care System',
                      desc: '수업 외 자습시간에도 강사 및 TA가 자습 지도 및 질의응답',
                    },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-5 items-start">
                      <div className="text-4xl md:text-5xl font-black text-[#952839] flex-shrink-0 leading-none">
                        {feature.number}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2 - 거품을 제거한 SAT 수강료 */}
        <AnimatedSection className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground inline-block relative">
                  거품을 제거한 SAT 수강료
                  <span className="absolute bottom-0 left-[-0.5rem] right-[-0.5rem] h-3 bg-yellow-300 opacity-50 -z-10"></span>
                </h2>
              </div>

              <div className="space-y-6 text-center text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                <p>
                  인터프렙은 지난 10여 년간 압구정·대치동 지역에서 
                  <br />합리적인 수강료 정책을 일관되게 유지해 온<br />
                  해외대학 입시 전문 교육기관입니다.
                </p>

                <p>
                  그동안 수많은 유학생, 국제학교 학생들과 학부모님들이<br />
                  인터프렙의 수강료 정책을 통해<br />
                  불필요한 비용 부담 없이 효율적인 SAT 학습의 기회를 누려왔습니다.
                </p>

                <p>
                  디지털 SAT 환경에서는<br />
                  더 이상 고액의 불법 기출문제에 의존할 필요도,<br />
                  장기간의 비효율적인 학습에 시간을 투자할 이유도 없습니다.
                </p>

                <p>
                  인터프렙은 2개월 집중 트레이닝 시스템을 통해<br />
                  누구나 1500점 이상을 목표로 도전할 수 있도록<br />
                  현실적이고 검증된 커리큘럼을 제공합니다.
                </p>

                <p>
                  절약된 시간과 비용은<br />
                  SAT 점수 외에 더 중요한 대학 입시 요소에<br />
                  집중할 수 있는 여유로 이어집니다.
                </p>

                <p className="font-semibold text-foreground">
                  인터프렙의 거품을 걷어낸 수강료 정책이<br />
                  이 모든 것을 가능하게 만듭니다.
                </p>
              </div>

              <div className="mt-16 pt-8 border-t border-border">
                <div className="space-y-4 text-center text-sm text-muted-foreground/80 leading-relaxed max-w-3xl mx-auto">
                  <p>
                    Say goodbye to exorbitant tuition fees –<br />
                    Interprep's fair fee policy has been redefining SAT education.
                  </p>

                  <p>
                    For over a decade, Interprep has remained committed to offering<br />
                    the most economical and effective SAT programs in Apgujeong and Daechi-dong,<br />
                    earning the trust of international students and parents alike.
                  </p>

                  <p>
                    With Interprep's digital SAT strategy,<br />
                    there is no longer a need for costly illicit materials or long-term study plans.<br />
                    A top score of 1500+ is achievable through just two months of focused training.
                  </p>

                  <p>
                    Interprep's budget-friendly pricing empowers families<br />
                    to invest confidently in all aspects of their child's college admissions journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 3 - 인터프렙 토탈 솔루션 */}
        <AnimatedSection className="bg-gray-50 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                {/* Left: Director Image */}
                <div className="lg:col-span-2">
                  <div className="relative aspect-[3/4] max-w-md mx-auto lg:sticky lg:top-24">
                    <Image
                      src="/images/maxjoo.png"
                      alt="Max Joo 원장"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right: All Content */}
                <div className="lg:col-span-3 space-y-8">
                  {/* Title - BRAND EMPHASIZED WITH LINE BREAK */}
                  <div>
                    <h2 className="font-bold leading-tight">
                      <span className="block text-3xl md:text-4xl lg:text-5xl text-[#952839] mb-2">
                        Interprep,
                      </span>
                      <span className="block text-xl md:text-2xl lg:text-3xl text-foreground">
                        Your Key to Successful SAT Scores
                      </span>
                    </h2>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>
                      인터프렙은 시험 점수만을 관리하지 않습니다.<br />
                      해외 명문대 합격에 필요한 모든 핵심 요소를 통합적으로 관리합니다.
                    </p>

                    <p>
                      GPA 관리, SAT·ACT·AP·TOEFL 시험 준비,<br />
                      Activity와 Extracurricular 설계,<br />
                      Essay와 Application 완성까지.
                    </p>

                    <p className="font-semibold text-foreground text-lg">
                      인터프렙은 학생 개개인의 입시 전 과정을<br />
                      책임지는 토탈 솔루션을 제공합니다.
                    </p>
                  </div>

                  {/* Service Cards - 2x2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'GPA 관리',
                      'SAT·ACT·AP·TOEFL',
                      'Activity',
                      'Essay & Application',
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-[#952839] text-center hover:shadow-md transition-shadow"
                      >
                        <h4 className="text-sm md:text-base font-bold text-foreground">
                          {item}
                        </h4>
                      </div>
                    ))}
                  </div>

                  {/* Button - Right Aligned */}
                  <div className="flex justify-end pt-4">
                    <Button
                      asChild
                      className="bg-[#952839] hover:bg-[#7a2030] text-white transition-colors px-4 py-2 text-sm h-auto"
                    >
                      <Link
                        href="https://theiprep.com/theicollege/college_consulting.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap"
                      >
                        미국 명문대학 컨설팅 디아이프렙 자세히 알아보기 &gt;
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 4 - 실제 합격 결과 */}
        <AnimatedSection className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  결과가 말해줍니다. 직접 확인하세요
                </h2>
                <p className="text-xl text-muted-foreground">
                  실제 인터프렙 × 디아이프렙 학생들의<br />
                  공식 합격 결과를 투명하게 공개합니다.
                </p>
              </div>

              {/* 2025 Results */}
              <div className="mb-16">
                <div className="bg-[#952839] text-white p-6 rounded-t-lg">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    2025 The I Prep Admission Results
                  </h3>
                  <p className="text-sm mt-2 opacity-90">
                    2025년 4월 7일 기준 확정 데이터
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-b-lg space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">8명</div>
                      <div className="text-sm text-muted-foreground">HYPS 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">중복합격 없음</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">11명</div>
                      <div className="text-sm text-muted-foreground">Top 20 School 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">중복합격 4명</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">9명</div>
                      <div className="text-sm text-muted-foreground">Top 30 School 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">중복합격 없음</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-foreground">
                      아이비리그 HYPS: Harvard, Stanford, Princeton, Dartmouth, Cornell, Brown, University of Chicago
                    </p>
                    <p className="text-sm text-muted-foreground">
                      이 외에 Accelerated Medical Program (의대), Accelerated Dental Program (치대), Pharmacy Program (약대) 등 다양한 professional school 합격
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-bold text-foreground mb-4">보딩 스쿨 합격 리스트</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-foreground mb-2">Top 10위 총 3명</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground ml-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Philips Exeter Academy (2명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>The Lawrenceville School (1명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>The Loomis Chaffee School (1명)</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-foreground mb-2">Top 25위 School 총 4명</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground ml-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Milton Academy (1명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Cranbrook Schools (2명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Blair Academy (1명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Webb Schools (1명)</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-foreground mb-2">Top 10위 Junior Boarding School</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground ml-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Eaglebrook School (2명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Fay School (4명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Fessenden School (1명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Indian Mountain School (1명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Rumsey Hall School (1명)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>Rectory School (1명)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-bold text-foreground mb-4">미국 대학 합격 리스트</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                      {[
                        'Harvard University (1명)',
                        'Stanford University (2명)',
                        'Princeton University (1명)',
                        'Dartmouth College (1명)',
                        'Cornell University (1명)',
                        'Brown University (1명)',
                        'University of Chicago (1명)',
                        'Carnegie Mellon (1명)',
                        'Pomona College (1명)',
                        'Northwestern University (3명)',
                        'Vanderbilt University (1명)',
                        'Johns Hopkins University (1명)',
                        'Georgia Tech (1명)',
                        'USC (4명)',
                        'University of Michigan (1명)',
                        'UC Berkeley (1명)',
                        'UCLA (1명)',
                        'Emory University (2명)',
                        'Washington University (1명)',
                        'UVA (1명)',
                        'Notre Dame (1명)',
                        'Boston University (1명)',
                        'NYU (3명)',
                        'UC San Diego (1명)',
                        'UNC Chapel Hill (1명)',
                      ].map((school, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[#952839]">•</span>
                          <span>{school}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2024 Results */}
              <div className="mb-16">
                <div className="bg-[#952839] text-white p-6 rounded-t-lg">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    2024 The I Prep Admission Results
                  </h3>
                  <p className="text-sm mt-2 opacity-90">
                    2024년 4월 1일 기준 (편입 결과 및 일부 누락된 합격 결과는 추후 업데이트 예정)
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-b-lg space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">5명</div>
                      <div className="text-sm text-muted-foreground">HYPS 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">합격률 30%</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">10명</div>
                      <div className="text-sm text-muted-foreground">아이비리그 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">합격률 59%</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">15명</div>
                      <div className="text-sm text-muted-foreground">아이비리그 플러스 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">합격률 88%</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      디아이프렙 '아이비리그 프로그램' 등록 학생 총 17명 기준
                    </p>
                    <p className="text-sm text-muted-foreground">
                      아이비리그 플러스: 아이비리그 8개교 + MIT, Stanford, Caltech, Duke, Johns Hopkins, University of Chicago
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      NYU BA/DDS 7년제 치과대학 합격
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-bold text-foreground mb-4">Top 30 대학 합격 리스트</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                      {[
                        'Harvard University (3명)',
                        'Yale University (1명)',
                        'Stanford University (3명)',
                        'MIT (1명)',
                        'Columbia University (2명)',
                        'University of Oxford, UK (1명)',
                        'UPenn (4명)',
                        'Cornell University (1명)',
                        'Brown University (3명)',
                        'Dartmouth College (1명)',
                        'Duke University (2명)',
                        'Northwestern University (2명)',
                        'Johns Hopkins University (3명)',
                        'University of Chicago (1명)',
                        'Vanderbilt University (1명)',
                        'Rice University (1명)',
                        'UCLA (4명)',
                        'Carnegie Mellon (1명)',
                        'NYU (1명)',
                        'Georgetown University (2명)',
                      ].map((school, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[#952839]">•</span>
                          <span>{school}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2023 Results */}
              <div>
                <div className="bg-[#952839] text-white p-6 rounded-t-lg">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    2023 Admission Results
                  </h3>
                </div>

                <div className="bg-gray-50 p-8 rounded-b-lg space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">11명</div>
                      <div className="text-sm text-muted-foreground">HYPS 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">중복합격 1명</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">6명</div>
                      <div className="text-sm text-muted-foreground">Top 15 School 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">중복합격 없음</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">69명</div>
                      <div className="text-sm text-muted-foreground">Top 50 School 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">중복합격 기재</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-foreground">
                      미술 전공반 3명 전원 Top tier School 합격
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-bold text-foreground mb-4">미국 대학 합격 리스트</h4>
                    
                    <div className="mb-6">
                      <p className="font-semibold text-foreground mb-3">아이비리그 / HYPS</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground ml-4">
                        {[
                          'Harvard University (2명)',
                          'Princeton University (1명)',
                          'Stanford University (1명)',
                          'Columbia University (3명)',
                          'University of Pennsylvania (1명)',
                          'Brown University (1명)',
                          'Cornell University (2명)',
                        ].map((school, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>{school}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="font-semibold text-foreground mb-3">Top 15 School</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground ml-4">
                        {[
                          'University of Chicago (1명)',
                          'Johns Hopkins University (1명)',
                          'Vanderbilt University (1명)',
                          'Washington University in St. Louis (3명)',
                        ].map((school, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>{school}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-foreground mb-3">Top 50 School</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground ml-4">
                        {[
                          'University of Notre Dame (1명)',
                          'UC Berkeley (5명)',
                          'UCLA (5명)',
                          'University of California (28명)',
                          'Carnegie Mellon University (1명)',
                          'Georgetown University (2명)',
                          'New York University (1명)',
                          'University of Michigan, Ann Arbor (2명)',
                          'University of Southern California (2명)',
                          'University of North Carolina at Chapel Hill (3명)',
                          'Boston College (1명)',
                          'University of Texas at Austin (1명)',
                          'University of Wisconsin–Madison (1명)',
                          'Boston University (3명)',
                          'University of Illinois Urbana-Champaign (7명)',
                          'Case Western Reserve University (2명)',
                          'Georgia Institute of Technology (2명)',
                          'Ohio State University (1명)',
                          'University of Georgia (1명)',
                        ].map((school, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-[#952839]">•</span>
                            <span>{school}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 ml-4 italic">
                        * University of California (28명): Berkeley·LA 제외 UC 전체
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Art School Results */}
              <div className="mt-8 bg-gray-100 p-6 rounded-lg">
                <h4 className="font-bold text-foreground mb-4">Art School Admission Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground">
                  {[
                    'Rhode Island School of Design (RISD)',
                    'Parsons School of Design',
                    'Pratt Institute',
                    'School of Visual Arts (SVA)',
                    'California Institute of the Arts (CalArts)',
                    'Art Center College of Design',
                    'Savannah College of Art and Design (SCAD)',
                    'Fashion Institute of Technology (FIT)',
                  ].map((school, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#952839]">•</span>
                      <span>{school}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 5 - 누적 수강생 수 & 신뢰 메시지 */}
        <CountUpSection />
      </main>

      <Footer />
    </div>
  )
}

function CountUpSection() {
  const { ref, count } = useCountUp(12802, 2500, true)

  return (
    <div ref={ref} className="relative bg-[#1a1d24] text-white py-24 md:py-32 overflow-hidden">
      {/* Background Image with High Opacity Overlay - ALWAYS VISIBLE */}
      <div className="absolute inset-0 z-0 opacity-100">
        <Image
          src="/images/section5-bg.jpg"
          alt="Background"
          fill
          className="object-cover object-[center_15%]"
          priority={true}
        />
        <div className="absolute inset-0 bg-[#1a1d24]/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#952839]">{count.toLocaleString()}</span>명의 수강생이 선택한
            <br />
            대한민국 1위 인터프렙
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            인터프렙만의 치밀하게 구성된 시험 대비 코스와
            풍부한 입시 자료는
            <br />
            여러분을 탁월함으로 인도합니다.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-400">
            <div className="flex items-center gap-3">
              <Image src="/images/icon_01.png" alt="Phone" width={32} height={32} className="flex-shrink-0" />
              <span>02-547-2039</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/images/icon_02.png" alt="Phone" width={32} height={32} className="flex-shrink-0" />
              <span>070-8656-8883</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/images/icon_03.png" alt="Email" width={32} height={32} className="flex-shrink-0" />
              <span>interprep@interprep.kr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
