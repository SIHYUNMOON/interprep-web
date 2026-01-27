'use client'

import { useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

export default function RefundPolicyPage() {
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
                환불 규정
              </h1>
              <div className="w-24 h-px bg-border mx-auto" />
            </div>
          </div>
        </AnimatedSection>

        {/* SECTION 1: OFFLINE COURSE REFUND POLICY */}
        <AnimatedSection className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Main Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
                오프라인 강좌 환불규정
              </h2>

              {/* Full Refund Subsection */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-[#952839] mb-4">
                  전액 환불
                </h3>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  수강 시작 전 환불 요청 시 전액 환불됩니다.
                </p>
              </div>

              {/* Partial Refund Subsection */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-[#952839] mb-4">
                  부분 환불
                </h3>
                <div className="text-base md:text-lg text-foreground leading-relaxed space-y-4">
                  <p>
                    환불 금액은 수업 개월 수를 기준으로 1개월 단위로 산정됩니다.
                    <br />
                    각 월별 수업 진행 상황에 따라 환불 비율이 개별적으로 적용됩니다.
                  </p>

                  <p>
                    예를 들어, 2개월 수업(1개월 차 + 2개월 차)에 등록한 경우,
                    <br />
                    1개월 차 수업이 시작된 후 1주일이 지난 시점에 환불을 요청하면 다음과 같이 처리됩니다.
                  </p>

                  <div className="pl-4 md:pl-6 space-y-2">
                    <p>- 1개월 차 수업료: 수업 진행률이 1/3 이전이므로 해당 월 수강료의 2/3 환불</p>
                    <p>- 2개월 차 수업료: 아직 수업이 시작되지 않았으므로 전액 환불</p>
                  </div>

                  <p>
                    즉, 이미 진행 중인 월은 환불 규정에 따라 부분 환불되며,
                    <br />
                    아직 시작되지 않은 월의 수업료는 전액 환불됩니다.
                  </p>
                </div>
              </div>

              {/* Table 1: Offline Refund Schedule */}
              <div className="mb-12">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">
                  수강료등 반환기준 (제18조 제3항 관련)
                </h3>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-6 py-4 text-center font-semibold text-foreground border-r border-border">
                            구분
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-foreground border-r border-border">
                            반환사유 발생일
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-foreground">
                            반환금액
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Row 1 */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            제18조 제2장 제1호 및 제2호의 반환사유에 해당하는 경우
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            교습을 할 수 없거나 교습 장소를 제공할 수 없게 된 날
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground">
                            이미 납부한 수강료를 일괄 계산한 금액
                          </td>
                        </tr>

                        {/* Row 2 - Spanning row */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border" rowSpan={4}>
                            <div className="py-2">
                              <div className="font-semibold mb-2">수강기간이</div>
                              <div className="mb-3">1개월 이내인</div>
                              <div className="font-semibold">경우</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            총 수강시간의 1/3 경과 전
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground font-medium">
                            수강료의 2/3 환불
                          </td>
                        </tr>

                        {/* Row 3 */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            총 수강시간의 1/2 경과 전
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground font-medium">
                            수강료의 1/2 환불
                          </td>
                        </tr>

                        {/* Row 4 */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            총 수강시간의 1/2 경과 후
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground">
                            환불없음
                          </td>
                        </tr>

                        {/* Row 5 */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            <div className="py-2">
                              <div className="mb-2">수강기간이</div>
                              <div className="mb-3">1개월 초과하는</div>
                              <div>경우</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            수강 시작 후
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground">
                            <div className="space-y-2">
                              <p>반환사유가 발생한 해당 월의 반환금</p>
                              <p>해당 월의 반환사유가 발생한 까지의 경과된 수강시간을 기준으로 반환금액을 산정한 금액</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 1 Footnotes */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    * 총 수강시간은 수강기간 중의 총 수강시간을 말하며, 반환금액의 산정은 반환사유가 발생한 날까지 경과된 수강시간을 기준으로 한다.
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    * 원격수강의 경우 반환금액은 교습내용을 실제 수강한 부분(인터넷으로 수강하거나 학습기기로 저장한 것을 말한다)에 해당하는 금액을 뺀 금액으로 한다.
                  </p>
                </div>
              </div>

              {/* Important Notes - Offline */}
              <div className="bg-gray-50/50 rounded-lg p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#952839] mb-4">
                  강좌 환불 시 유의사항
                </h3>
                <div className="text-base md:text-lg text-foreground leading-relaxed space-y-4">
                  <p>
                    수강 등록 시 제공된 혜택들(조기등록할인, 패키지할인, 온라인연계수강할인 등)은
                    <br />
                    환불 시 모두 철회된 후 정상 수강료 기준으로 환불 금액을 산출합니다.
                  </p>

                  <p>
                    미성년자인 경우, 부모님 동의 하에(유선 확인) 환불 내용을 확인한 후
                    <br />
                    환불 규정에 따라 처리됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* SECTION 2: ONLINE COURSE REFUND POLICY */}
        <AnimatedSection className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Main Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
                온라인 강좌 환불규정
              </h2>

              {/* Full Refund Subsection */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-[#952839] mb-4">
                  전액 환불
                </h3>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  <span className="text-[#952839] font-semibold">결제 완료 후 7일 이내에 환불을 신청하고 수강 내역이 없는 경우,<br />전액 환불 처리됩니다.</span>
                </p>
              </div>

              {/* Partial Refund Subsection */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-[#952839] mb-4">
                  부분 환불
                </h3>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  결제 완료 후부터 환불 요청일 기준으로 아래 정책에 따라 산출한 환불 금액이 적용됩니다.
                </p>
              </div>

              {/* Table 2: Online Refund Schedule */}
              <div className="mb-12">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">
                  수강 시작일 = 결제 완료일
                </h3>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-6 py-4 text-center font-semibold text-foreground border-r border-border">
                            구분
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-foreground border-r border-border">
                            반환사유 발생일
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-foreground">
                            반환금액
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Row 1 */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            제18조 제2장 제1호 및 제2호의 반환사유에 해당하는 경우
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            교습을 할 수 없거나 교습 장소를 제공할 수 없게 된 날
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground">
                            이미 납부한 수강료를 일괄 계산한 금액
                          </td>
                        </tr>

                        {/* Row 2 - Base row */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border" rowSpan={5}>
                            <div className="py-2">
                              <div className="mb-2">수강기간이</div>
                              <div className="mb-3">1개월 이내인</div>
                              <div className="font-semibold">경우</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            총 수강시간의 1/3 경과 전
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground font-medium">
                            수강료의 2/3 환불
                          </td>
                        </tr>

                        {/* Row 3 */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            총 수강시간의 1/2 경과 전
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground font-medium">
                            수강료의 1/2 환불
                          </td>
                        </tr>

                        {/* Row 4 */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            총 수강시간의 1/2 경과 후
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground">
                            환불없음
                          </td>
                        </tr>

                        {/* Row 5 - Extended span */}
                        <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground border-r border-border">
                            수강 시작 후
                          </td>
                          <td className="px-6 py-4 text-center text-sm md:text-base text-foreground">
                            <div className="space-y-2">
                              <p>반환사유가 발생한 해당 월의 반환금</p>
                              <p>해당 월의 반환사유가 발생한 까지의 경과된 수강시간을 기준으로 반환금액을 산정한 금액</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2 Footnotes */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    * 총 수강시간은 수강기간 중의 총 수강시간을 말하며, 반환금액의 산정은 반환사유가 발생한 날까지 경과된 수강시간을 기준으로 한다.
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    * 원격 수강의 경우 반환금액은 교습내용을 실제 수강한 부분(인터넷으로 수강하거나 학습기기로 저장한 것을 말한다)에 해당하는 금액을 뺀 금액으로 한다.
                  </p>
                </div>
              </div>

              {/* Important Notes - Online */}
              <div className="bg-gray-50/50 rounded-lg p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#952839] mb-4">
                  강좌 환불 시 유의사항
                </h3>
                <div className="text-base md:text-lg text-foreground leading-relaxed space-y-4">
                  <p>
                    강좌 구매 시 제공된 혜택들(패키지할인, 오프라인연계수강할인, 수강기간 연장, 사은품 등)은
                    <br />
                    환불 시 모두 철회된 후 각 일반(단과) 강좌 정가 기준으로 환불 금액을 산출합니다.
                  </p>

                  <p>
                    다운로드 강의는 다운로드 시 해당 강의를 수강한 것으로 처리됩니다.
                    <br />
                    실제 수강한 강의 수가 단기간 내 과도할 경우,
                    <br />
                    경과된 수강기간이 아닌 수강 강의 수 기준으로 학습량을 산정하여
                    <br />
                    공제 금액이 더 많아질 수 있습니다.
                  </p>

                  <p>
                    환불 요청 시 제공된 추가 혜택(할인, 수강 연장, 사은품, 포인트 등)은 반환되어야 하며,
                    <br />
                    이미 사용되었거나 상품 가치가 감소한 경우 환불 금액에서 공제됩니다.
                  </p>

                  <p>
                    미성년자인 경우, 부모님 동의 하에(유선 확인) 환불 내용을 확인한 후
                    <br />
                    환불 규정에 따라 처리됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Customer Service Button */}
        <AnimatedSection className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex justify-center">
              <a
                href="tel:02-547-2039"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#952839] hover:bg-[#7a2030] text-white rounded-full text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                고객센터 02-547-2039
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </>
  )
}
