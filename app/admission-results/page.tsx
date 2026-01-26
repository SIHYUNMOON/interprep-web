'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdmissionResultsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const admissionData = [
    {
      year: '2024',
      students: 156,
      universities: [
        { name: 'Harvard University', count: 3 },
        { name: 'Stanford University', count: 4 },
        { name: 'MIT', count: 2 },
        { name: 'Yale University', count: 5 },
        { name: 'Princeton University', count: 3 },
        { name: 'Columbia University', count: 8 },
        { name: 'UC Berkeley', count: 12 },
        { name: 'UCLA', count: 15 },
      ]
    },
    {
      year: '2023',
      students: 142,
      universities: [
        { name: 'Harvard University', count: 2 },
        { name: 'Stanford University', count: 3 },
        { name: 'MIT', count: 3 },
        { name: 'Yale University', count: 4 },
        { name: 'Princeton University', count: 2 },
        { name: 'Columbia University', count: 7 },
        { name: 'UC Berkeley', count: 10 },
        { name: 'UCLA', count: 13 },
      ]
    },
    {
      year: '2022',
      students: 128,
      universities: [
        { name: 'Harvard University', count: 1 },
        { name: 'Stanford University', count: 2 },
        { name: 'MIT', count: 2 },
        { name: 'Yale University', count: 3 },
        { name: 'Princeton University', count: 1 },
        { name: 'Columbia University', count: 6 },
        { name: 'UC Berkeley', count: 9 },
        { name: 'UCLA', count: 11 },
      ]
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <AnimatedSection className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/overview-3.jpg"
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
        </AnimatedSection>

        {/* Results by Year */}
        <AnimatedSection className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {admissionData.map((yearData, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <CardTitle className="text-2xl md:text-3xl">
                      {yearData.year}년 입시 결과
                    </CardTitle>
                    <p className="text-white/90">
                      총 합격생: {yearData.students}명
                    </p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {yearData.universities.map((uni, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <span className="font-medium text-foreground">{uni.name}</span>
                          <span className="text-2xl font-bold text-primary">{uni.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Note Section */}
            <div className="max-w-6xl mx-auto mt-12 p-6 bg-muted rounded-lg">
              <h3 className="text-lg font-bold text-foreground mb-3">
                참고사항
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• 상기 합격 실적은 인터프렙에서 6개월 이상 수강한 학생들을 기준으로 집계되었습니다.</li>
                <li>• 합격 대학은 학생들이 최종 등록한 대학을 기준으로 작성되었습니다.</li>
                <li>• 보다 자세한 입시 결과는 상담을 통해 안내드립니다.</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              인터프렙과 함께 꿈의 대학에 합격하세요
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              체계적인 커리큘럼과 전문 강사진이 여러분의 대학 입시를 완벽하게 준비합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                상담 신청하기
              </a>
              <a
                href="/board"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                정보게시판 보기
              </a>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  )
}
