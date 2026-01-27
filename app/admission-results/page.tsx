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
