'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

export default function AdmissionResultsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-267885-UEmkU4mNQfzVbjs7cIyfRFNGqrKT6K.jpg"
              alt="Admission Results"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              연도별 입시 결과
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              인터프렙 학생들의 우수한 대학 합격 실적을 확인하세요
            </p>
          </div>
        </section>

        {/* 2025 Results */}
        <AnimatedSection className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
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
                      <div className="text-xs text-muted-foreground mt-1">아이비리그 외 Top 20</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-[#952839] mb-2">9명</div>
                      <div className="text-sm text-muted-foreground">Top 30 School 합격자</div>
                      <div className="text-xs text-muted-foreground mt-1">동복합격 8명</div>
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
                        'Harvard University',
                        'Stanford University',
                        'Princeton University',
                        'Dartmouth College',
                        'Cornell University',
                        'Brown University',
                        'University of Chicago',
                        'Carnegie Mellon',
                        'Pomona College',
                        'Northwestern University',
                        'Vanderbilt University',
                        'Johns Hopkins University',
                        'Georgia Tech',
                        'USC',
                        'University of Michigan',
                        'UC Berkeley',
                        'UCLA',
                        'Emory University',
                        'Washington University',
                        'UVA',
                        'Notre Dame',
                        'Boston University',
                        'NYU',
                        'UC San Diego',
                        'UNC Chapel Hill',
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
            </div>
          </div>
        </AnimatedSection>

        {/* 2024 Results */}
        <AnimatedSection className="bg-white py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
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
                      디아이프렙 아이비리그 프로그램 등록 학생 총 17명 기준
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
                        'Harvard University',
                        'Yale University',
                        'Princeton University',
                        'Stanford University',
                        'MIT',
                        'Columbia University',
                        'UPenn',
                        'Cornell University',
                        'Brown University',
                        'Dartmouth College',
                        'Duke University',
                        'Northwestern University',
                        'Johns Hopkins University',
                        'University of Chicago',
                        'Caltech',
                        'UC Berkeley',
                        'UCLA',
                        'USC',
                        'Carnegie Mellon',
                        'NYU',
                        'Emory University',
                        'Georgetown University',
                        'Boston University',
                        'Tufts University',
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
            </div>
          </div>
        </AnimatedSection>

        {/* 2023 Results */}
        <AnimatedSection className="bg-gray-50 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div>
                <div className="bg-[#7a2030] text-white p-6 rounded-t-lg">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    2023 Admission Results
                  </h3>
                </div>

                <div className="bg-white p-8 rounded-b-lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                    {[
                      'Harvard University',
                      'Yale University',
                      'Princeton University',
                      'Stanford University',
                      'MIT',
                      'Columbia University',
                      'UPenn',
                      'Cornell University',
                      'Brown University',
                      'Dartmouth College',
                      'Duke University',
                      'Northwestern University',
                      'Johns Hopkins University',
                      'UC Berkeley',
                      'UCLA',
                      'Carnegie Mellon',
                      'Emory University',
                      'Georgetown University',
                      'NYU',
                      'Boston University',
                    ].map((school, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[#7a2030]">•</span>
                        <span>{school}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Art School Results */}
              <div className="mt-8">
                <div className="bg-gray-100 p-6 rounded-lg">
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
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
