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
        <AnimatedSection className="bg-[#3a4a5a] py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Title */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  2025
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  The I Prep Admission Results
                </h3>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: 보딩 스쿨 */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-[#d4a574] mb-2">보딩 스쿨</h4>
                    <p className="text-sm text-white/70 mb-6">2025.04.07 기준 확정 데이터</p>
                    
                    <div className="space-y-6 text-white">
                      <div>
                        <p className="text-[#d4a574] mb-2">Top 10위 총 3명 (동복 합격 1명)</p>
                        <p className="text-sm mb-1">Top 30위 총 4명 (동복 합격 1명)</p>
                        <p className="text-sm">Top 50위 총 3명 (동복 합격 1명)</p>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-[#d4a574] mb-3">Top 10위 총 3명 (동복 합격 1명)</h5>
                        <div className="space-y-1 text-sm">
                          <p>Philips Exeter Academy (2명)</p>
                          <p>The Lawrenceville School (1명)</p>
                          <p>The Loomis Chaffee School (1명)</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-white mb-3">Top 25위 School 총 4명 (동복 합격 1명)</h5>
                        <div className="space-y-1 text-sm">
                          <p>Milton Academy (1명)</p>
                          <p>Cranbrook Schools (2명)</p>
                          <p>Blair Academy (1명)</p>
                          <p>Webb Schools (1명)</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-white mb-3">Top 50위 School 총 3명 (동복 합격 1명)</h5>
                        <div className="space-y-1 text-sm">
                          <p>Pomfret School (1명)</p>
                          <p>Idani School (1명)</p>
                          <p>Berkshire School (1명)</p>
                          <p>Brooks School (1명)</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-white mb-3">Top 75위 School 총 3명 (동복 합격 1명)</h5>
                        <div className="space-y-1 text-sm">
                          <p>Williston Northampton School (1명)</p>
                          <p>Western Reserve Academy (2명)</p>
                          <p>Cushing Academy (1명)</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-white mb-3">Top 10위 Junior Boarding School</h5>
                        <div className="space-y-1 text-sm">
                          <p>Eaglebrook School (2명)</p>
                          <p>Fay School (4명)</p>
                          <p>Fessenden School (1명)</p>
                          <p>Indian Mountain School (1명)</p>
                          <p>Rumsey Hall School (1명)</p>
                          <p>Rectory School (1명)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: 미국 대학 */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-[#d4a574] mb-2">미국 대학</h4>
                    <p className="text-sm text-white/70 mb-6">2025.04.07 기준 확정 데이터</p>
                    
                    <div className="space-y-6 text-white">
                      <div>
                        <p className="text-[#d4a574] mb-2">아이비리그 HYPS 총 8명 (동복합격 8명)</p>
                        <p className="text-sm mb-1">아이비리그 외 Top 20 School 11명 (동복 합격 4명)</p>
                        <p className="text-sm">Top 30 School 9명 (동복 합격 8명)</p>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-[#d4a574] mb-3">아이비리그 HYPS 총 8명</h5>
                        <div className="space-y-1 text-sm">
                          <p>Harvard (regular 1명) (해외국제고)</p>
                          <p>Stanford (early 1명, regular 1명) (해외국제고, 미국고)</p>
                          <p>Princeton (regular 1명) (해외국제고)</p>
                          <p>Dartmouth (early 1명) (국내국제고)</p>
                          <p>Cornell (early 1명) (국내국제고)</p>
                          <p>Brown University (early 1명)</p>
                          <p>University of Chicago (early 1명) (국내국제고)</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-white mb-3">Top 20 School 총 11명 (동복 합격 4명)</h5>
                        <div className="space-y-1 text-sm">
                          <p>Carnegie Mellon (early 1명)</p>
                          <p>Pomona (regular 1명)</p>
                          <p>Northwestern (early 1명, regular 2명)</p>
                          <p>Vanderbilt (early 11명)</p>
                          <p>Johns Hopkins (early 1명)</p>
                          <p>Georgia Tech (early 1명)</p>
                          <p>USC (early 2명, regular 2명)</p>
                          <p>University of Michigan (early 1명)</p>
                          <p>UC Berkeley (regular 1명)</p>
                          <p>UCLA (early 1명)</p>
                          <p>Emory (early 1명, regular 1명)</p>
                          <p>Washington University (regular 1명)</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-lg text-white mb-3">Top 30 School 총 9명 (동복 8명)</h5>
                        <div className="space-y-1 text-sm">
                          <p>UVA (early 1명)</p>
                          <p>Notre Dame (early 1명)</p>
                          <p>Boston University (early 1명)</p>
                          <p>NYU Pre-dental (regular 1명)</p>
                          <p>NYU (early 1명, regular 2명)</p>
                          <p>UC San Diego (regular 1명)</p>
                          <p>UNC Chapel Hill (regular 1명)</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/20">
                        <p className="text-sm text-white/80">
                          이 외에 Accelerated Medical Program (의대), Accelerated Dental Program (치대), Pharmacy Program (약대) 등 다양한 professional school 합격
                        </p>
                      </div>
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
