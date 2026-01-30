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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <AnimatedSection className="bg-background py-6 md:py-10">
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
        <AnimatedSection className="pt-6 pb-8 md:pt-8 md:pb-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-sm md:prose-base max-w-none text-foreground leading-relaxed space-y-4">
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
      </main>
      <Footer />
    </div>
  )
}
