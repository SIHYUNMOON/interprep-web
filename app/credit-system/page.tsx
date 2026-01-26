'use client'

import { useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

export default function CreditSystemPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <AnimatedSection className="bg-background py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                인터프렙 크레딧 제도 안내
              </h1>
              <div className="w-24 h-px bg-border mx-auto" />
            </div>
          </div>
        </AnimatedSection>

        {/* Credit System Description */}
        <AnimatedSection className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-sm md:prose-base max-w-none text-foreground leading-relaxed space-y-6">
                <p className="text-base md:text-lg">
                  <span className="text-[#952839] font-semibold">[크레딧]</span>은 인터프렙에서 제공하는 내부 적립금입니다.
                </p>

                <p className="text-base md:text-lg">
                  인터프렙의 모의고사 응시비 및 컨설턴트 상담 비용 결제 시{' '}
                  <span className="text-[#952839] font-semibold">현금처럼 사용</span>할 수 있습니다.
                </p>

                <p className="text-base md:text-lg">
                  다만, 크레딧은 <span className="text-[#952839] font-semibold">현금 환전 불가</span>이며 외부 결제에 사용되지는 않습니다.
                </p>

                <p className="text-base md:text-lg">
                  인터프렙 서비스 내에서만 사용 가능한 결제 수단입니다.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Refund Policy Section */}
        <AnimatedSection className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Section Title */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">특강</h2>
                <p className="text-sm text-muted-foreground">
                  ▼ 수강료 환불 요청 시 교육청 환불 규정에 따라 처리해 드립니다.
                </p>
              </div>

              {/* Refund Table */}
              <div className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-6 py-4 text-left text-sm md:text-base font-semibold text-foreground w-1/2">
                          기준
                        </th>
                        <th className="px-6 py-4 text-right text-sm md:text-base font-semibold text-foreground w-1/2">
                          환불
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-6 py-4 text-sm md:text-base text-foreground">
                          수업 시작 전
                        </td>
                        <td className="px-6 py-4 text-right text-sm md:text-base font-medium text-[#952839]">
                          전액 환불
                        </td>
                      </tr>
                      <tr className="border-b border-border bg-muted/20">
                        <td className="px-6 py-4 text-sm md:text-base text-foreground">
                          수업 시작 후 1/3 이전
                        </td>
                        <td className="px-6 py-4 text-right text-sm md:text-base font-medium text-muted-foreground">
                          2/3 환불
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-6 py-4 text-sm md:text-base text-foreground">
                          수업 시작 후 1/2 이전
                        </td>
                        <td className="px-6 py-4 text-right text-sm md:text-base font-medium text-muted-foreground">
                          1/2 환불
                        </td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="px-6 py-4 text-sm md:text-base text-foreground">
                          수업 시작 후 1/2 경과
                        </td>
                        <td className="px-6 py-4 text-right text-sm md:text-base font-medium text-muted-foreground">
                          환불 불가
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footnote */}
              <p className="text-xs md:text-sm text-muted-foreground mt-4">
                * 3주 이하 등록 시 크레딧이 적용되지 않습니다.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </>
  )
}
