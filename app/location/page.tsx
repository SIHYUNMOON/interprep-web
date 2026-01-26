'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MapPin, Train, Bus } from 'lucide-react'

export default function LocationPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-background py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Location
              </h1>
              <div className="w-24 h-px bg-border mx-auto" />
            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="py-8 md:py-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Google Map */}
                <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
                  <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.290965783493!2d127.0485581893951!3d37.5010550558389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e94b9ce345%3A0x9dbcb9e8cefb2157!2zKOyjvCkg7J247YSw7ZSE66CZIOyWtO2VmeybkA!5e0!3m2!1sko!2skr!4v1769135652803!5m2!1sko!2skr"
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: 'absolute', inset: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Interprep Location Map"
                      className="rounded"
                    />
                  </div>
                </div>

                {/* Right: Address Information */}
                <div className="bg-white border border-border rounded-lg p-8 md:p-10 space-y-2 flex flex-col">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#952839] flex-shrink-0 mt-1" />
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">도로명 주소</p>
                        <p className="text-base md:text-lg font-medium text-foreground">
                          서울특별시 강남구 역삼로 424, 진영빌딩 4층
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">지번 주소</p>
                        <p className="text-base md:text-lg font-medium text-foreground">
                          서울특별시 강남구 대치동 909-3, 진영빌딩 4층
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">우편번호</p>
                        <p className="text-base md:text-lg font-medium text-foreground">
                          06200
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">도로명주소(영문)</p>
                        <p className="text-base md:text-lg font-medium text-foreground">
                          4th floor of Jinyoung Building, Yeoksam-ro 424, Gangnam-gu, Seoul
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border mt-auto pt-3">
                    <p className="text-base md:text-lg text-foreground">
                      <span className="font-semibold text-[#952839]">2호선/수인분당선 선릉역, 수인분당선 한티역</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">도보 10분 내외</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subway Guide with Map */}
        <section className="py-16 md:py-20 bg-background pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Train className="w-6 h-6 text-[#952839]" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">지하철</h2>
              </div>

              {/* Map and Directions Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Map Image */}
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <div className="relative w-full aspect-square">
                    <Image
                      src="/images/map.jpg"
                      alt="인터프렙 위치 지도"
                      fill
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </div>
                </div>

                {/* Right: Subway Directions */}
                <div className="space-y-6">
                  {/* 선릉역 1번 출구 */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                      선릉역 1번 출구
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      지하철역 선릉역 (2호선/수인분당선) 1번 출구
                    </p>
                    <ul className="space-y-1.5 text-xs md:text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>1번출구 직진, 금강타워(신한은행) 우측 골목</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>장독대김치찌개 선릉점 방면으로 횡단보도 건너기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>소풍 분식, 하이베스트 문구 대치점까지 직진</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>왕가네왕만두 방면으로 횡단보도 건너기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>건너서 좌측 (이강학원 방향)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span className="font-semibold">이강학원 옆건물 진영빌딩 4층</span>
                      </li>
                    </ul>
                  </div>

                  {/* 선릉역 2번 출구 */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                      선릉역 2번 출구
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      지하철역 선릉역 (2호선/수인분당선) 2번 출구
                    </p>
                    <ul className="space-y-1.5 text-xs md:text-sm text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>2번출구 도성초교 사거리</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>LG유플러스 대치동 선릉역점 방면으로 횡단보도 건너기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>우주약국까지 직진, 좌측 방면</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>소풍 분식, 하이베스트 문구 대치점까지 직진</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>왕가네왕만두 방면으로 횡단보도 건너기</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span>건너서 좌측 (이강학원 방향)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#952839] mt-0.5">•</span>
                        <span className="font-semibold">이강학원 옆건물 진영빌딩 4층</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bus Guide */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Bus className="w-6 h-6 text-[#952839]" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">버스</h2>
              </div>

              <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-border">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <span className="text-[#952839] font-bold text-lg flex-shrink-0 w-16">강남07</span>
                    <div>
                      <p className="text-base font-medium text-foreground">도성초등학교앞 하차</p>
                      <p className="text-sm text-muted-foreground">도보 306m</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <span className="text-[#952839] font-bold text-lg flex-shrink-0 w-16">3422</span>
                    <div>
                      <p className="text-base font-medium text-foreground">도성초교사거리 하차</p>
                      <p className="text-sm text-muted-foreground">도보 140m</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#952839] font-bold text-lg flex-shrink-0 w-16">472</span>
                    <div>
                      <p className="text-base font-medium text-foreground">역삼e-편한세상아파트 하차</p>
                      <p className="text-sm text-muted-foreground">도보 387m</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
