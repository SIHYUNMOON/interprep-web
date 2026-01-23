'use client'

import { AnimatedSection } from '@/components/animated-section'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Calendar, PenTool, MessageSquare, FileText, File, FolderPlus } from 'lucide-react'

export default function IPassClient() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Section 1: iPass Title + Hexagons */}
        <AnimatedSection className="min-h-[calc(100vh-4rem)] flex items-start justify-center pt-20 md:pt-24 pb-2 md:pb-2.5">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Title Area */}
              <div className="text-center mb-12 md:mb-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  인터프렙 iPass
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  대학 진학을 위한 최적의 패키지 프로그램
                </p>
              </div>

              {/* Hexagon Diagram */}
              <div>
                {/* Hexagons Container - Single Row with Staggered Vertical Positions */}
                <div className="flex flex-nowrap justify-center items-start gap-x-2 md:gap-x-4 lg:gap-x-6 overflow-x-auto pb-4">
                  {/* Hexagon 1: GPA & Activity (down) */}
                  <div className="flex flex-col items-start mt-8 flex-shrink-0">
                    <div className="relative w-28 h-32 md:w-36 md:h-40 flex flex-col items-center justify-center bg-[#952839] text-white shadow-lg mb-3" 
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <Calendar className="w-8 h-8 md:w-10 md:h-10 mb-2" strokeWidth={1.5} />
                      <div className="w-16 h-px bg-white/50 mb-2" />
                      <div className="text-center px-2">
                        <div className="font-bold text-xs md:text-sm">GPA &</div>
                        <div className="font-bold text-xs md:text-sm">Activity</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 max-w-[120px]">
                      <div className="w-0.5 h-full bg-[#952839] flex-shrink-0 mt-1" style={{ minHeight: '2rem' }}></div>
                      <p className="text-xs text-left text-foreground font-bold leading-tight">
                        학생의 성실성 및<br />커뮤니티 기여도
                      </p>
                    </div>
                  </div>

                  {/* Hexagon 2: SAT/ACT (up) */}
                  <div className="flex flex-col items-start flex-shrink-0">
                    <div className="flex items-start gap-1.5 max-w-[120px] mb-3">
                      <div className="w-0.5 h-full bg-[#952839] flex-shrink-0 mt-1" style={{ minHeight: '2rem' }}></div>
                      <p className="text-xs text-left text-foreground font-bold leading-tight">
                        수학(修學)<br />능력 검증
                      </p>
                    </div>
                    <div className="relative w-28 h-32 md:w-36 md:h-40 flex flex-col items-center justify-center bg-[#3a3a3a] text-white shadow-lg" 
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <PenTool className="w-8 h-8 md:w-10 md:h-10 mb-2" strokeWidth={1.5} />
                      <div className="w-16 h-px bg-white/50 mb-2" />
                      <div className="text-center px-2">
                        <div className="font-bold text-sm md:text-base">SAT / ACT</div>
                      </div>
                    </div>
                  </div>

                  {/* Hexagon 3: Essay & Interview (down) */}
                  <div className="flex flex-col items-start mt-8 flex-shrink-0">
                    <div className="relative w-28 h-32 md:w-36 md:h-40 flex flex-col items-center justify-center bg-[#952839] text-white shadow-lg mb-3" 
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <MessageSquare className="w-8 h-8 md:w-10 md:h-10 mb-2" strokeWidth={1.5} />
                      <div className="w-16 h-px bg-white/50 mb-2" />
                      <div className="text-center px-2">
                        <div className="font-bold text-xs md:text-sm">Essay &</div>
                        <div className="font-bold text-xs md:text-sm">Interview</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 max-w-[120px]">
                      <div className="w-0.5 h-full bg-[#952839] flex-shrink-0 mt-1" style={{ minHeight: '2rem' }}></div>
                      <p className="text-xs text-left text-foreground font-bold leading-tight">
                        창의력 / 사고력<br />인성 / 적성
                      </p>
                    </div>
                  </div>

                  {/* Hexagon 4: AP (up) */}
                  <div className="flex flex-col items-start flex-shrink-0">
                    <div className="flex items-start gap-1.5 max-w-[120px] mb-3">
                      <div className="w-0.5 h-full bg-[#952839] flex-shrink-0 mt-1" style={{ minHeight: '2rem' }}></div>
                      <p className="text-xs text-left text-foreground font-bold leading-tight">
                        전공 적합성 &<br />Academic Challenge
                      </p>
                    </div>
                    <div className="relative w-28 h-32 md:w-36 md:h-40 flex flex-col items-center justify-center bg-[#3a3a3a] text-white shadow-lg" 
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <FileText className="w-8 h-8 md:w-10 md:h-10 mb-2" strokeWidth={1.5} />
                      <div className="w-16 h-px bg-white/50 mb-2" />
                      <div className="text-center px-2">
                        <div className="font-bold text-lg md:text-xl">AP</div>
                      </div>
                    </div>
                  </div>

                  {/* Hexagon 5: TOEFL (down) */}
                  <div className="flex flex-col items-start mt-8 flex-shrink-0">
                    <div className="relative w-28 h-32 md:w-36 md:h-40 flex flex-col items-center justify-center bg-[#952839] text-white shadow-lg mb-3" 
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <File className="w-8 h-8 md:w-10 md:h-10 mb-2" strokeWidth={1.5} />
                      <div className="w-16 h-px bg-white/50 mb-2" />
                      <div className="text-center px-2">
                        <div className="font-bold text-lg md:text-xl">TOEFL</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5 max-w-[120px]">
                      <div className="w-0.5 h-full bg-[#952839] flex-shrink-0 mt-1" style={{ minHeight: '2rem' }}></div>
                      <p className="text-xs text-left text-foreground font-bold leading-tight">
                        대학별 / 국가별<br />Requirement분석
                      </p>
                    </div>
                  </div>

                  {/* Hexagon 6: IB 디플로마 (up) */}
                  <div className="flex flex-col items-start flex-shrink-0">
                    <div className="flex items-start gap-1.5 max-w-[130px] mb-3">
                      <div className="w-0.5 h-full bg-[#952839] flex-shrink-0 mt-1" style={{ minHeight: '2rem' }}></div>
                      <p className="text-xs text-left text-foreground font-bold leading-tight">
                        자기주도 학습의<br />장기적 프로젝트
                      </p>
                    </div>
                    <div className="relative w-28 h-32 md:w-36 md:h-40 flex flex-col items-center justify-center bg-[#3a3a3a] text-white shadow-lg" 
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                      <FolderPlus className="w-8 h-8 md:w-10 md:h-10 mb-2" strokeWidth={1.5} />
                      <div className="w-16 h-px bg-white/50 mb-2" />
                      <div className="text-center px-2">
                        <div className="font-bold text-xs md:text-sm">IB 디플로마</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2: 아이패스란? + Description */}
        <AnimatedSection className="py-20 md:py-28 bg-[#FFF5F5]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Section Title with Divider */}
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  아이패스란?
                </h2>
                <div className="flex justify-center">
                  <div className="w-48 h-0.5 bg-[#952839]"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <div className="space-y-6 text-base md:text-lg text-foreground leading-relaxed">
                  <p>
                    아이패스(IPASS)는<br />
                    SAT, ACT, TOEFL, AP, IB, 디플로마 등<br />
                    미국·아시아·국내 대학 진학을 위해 다양한 평가 시스템을 준비하는 학생들을 위해 설계된<br />
                    <span className="font-semibold text-[#952839]">통합 패키지 프로그램</span>입니다.
                  </p>

                  <p>
                    학생의 목표 대학과 학업 경로에 맞춰<br />
                    시험 준비부터 학업 관리까지 체계적인 지원을 제공합니다.
                  </p>

                  <p>
                    아이패스 회원은 프로그램이 제공하는 모든 수업·관리·컨설팅 서비스를 제한 없이 이용할 수 있으며,<br />
                    서비스 이용 기간은 <span className="font-semibold text-[#952839]">대학에 입학하는 그 순간까지</span> 이어집니다.
                  </p>

                  <p>
                    아이패스는<br />
                    단기 시험 대비가 아닌<br />
                    <span className="font-semibold text-[#952839]">입시 전 과정을 함께 설계하고 책임지는 장기 진학 프로그램</span>입니다.
                  </p>
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
