'use client'

import React from "react"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

interface FAQItem {
  id: string
  question: string
  answer: string | React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    id: 'q1',
    question: 'SAT/ACT반은 어떻게 구성이 되어있나요?',
    answer: 'SAT/ACT 과정은 기본이론반(정규반)과 문제풀이반(심화반)으로 구성됩니다. 반 배정 기준은 SAT 1300점, ACT 27점입니다. 기준 점수 이상이면 문제풀이반을 권장하며, 미만이면 기본이론반으로 배정됩니다.',
  },
  {
    id: 'q2',
    question: '분반은 어떻게 이루어지나요?',
    answer: '분반은 학생이 보유한 SAT/ACT 공식 점수 또는 학원 모의고사 점수로 진행됩니다. 모의고사는 금요일 9시~13시에 응시할 수 있습니다. 모의고사 비용은 1회 10만원이며, 수업 등록생은 무료입니다.',
  },
  {
    id: 'q3',
    question: '아이가 7~9학년인데 SAT/ACT를 시작해도 될까요?',
    answer: '영어 실력이 충분히 뛰어난 학생이라면 7~9학년에도 SAT/ACT 시작이 가능합니다. 다만 기초가 부족한 경우, 7~9학년 대상 주니어 프로그램을 권장합니다. 주니어 프로그램은 \'효율적으로 읽고 이해하는 능력\'을 강화해 SAT/ACT 고득점 준비의 기반을 만들어줍니다.',
  },
  {
    id: 'q4',
    question: 'SAT와 ACT의 다른점?',
    answer: 'SAT는 Reading, Writing, Math로 구성되며 만점은 1600점입니다. ACT는 Reading, English, Math, Science로 구성되며 만점은 36점입니다. 난이도 측면에서는 SAT의 Reading이 논리·추리형 비중이 높아 상대적으로 어렵게 느껴질 수 있습니다. 반면 ACT는 시험 시간이 더 촘촘해 빠른 풀이 속도가 요구됩니다 (ACT 75문제/45분, SAT 52문제/65분).',
  },
  {
    id: 'q5',
    question: 'SAT/ACT 한반의 구성원은?',
    answer: 'SAT/ACT 반 정원은 15명입니다.',
  },
  {
    id: 'q6',
    question: '대학입시 컨설팅을 받고 싶은데요 어떻게 해야 하나요?',
    answer: '대학입시 컨설팅은 원장님과의 전화 상담 또는 내원 상담 후 진행됩니다. 상담은 /contact 페이지의 안내에 따라 문의해 주세요.',
  },
  {
    id: 'q7',
    question: '1:1 튜터링은 어떻게 진행이 되나요?',
    answer: '1:1 튜터링은 인터프렙 강사진과 진행됩니다. 비용은 시간당 15만원이며, 선입금 150만원(10시간) 결제 후 시작됩니다. 수업 중 불만 또는 개인 사정 등으로 튜터링을 중단하는 경우, 미진행분은 전액 환불됩니다(튜터링에 한함).',
  },
  {
    id: 'q8',
    question: '점심식사는 제공인가요? 별도인가요?',
    answer: '학원 내 식사 제공은 없습니다. 학원은 대치동 학원가에 위치해 있어 주변 식사/편의 시설 이용이 가능합니다.',
  },
  {
    id: 'q9',
    question: '환불규정은 어떻게 되나요?',
    answer: (
      <div className="space-y-4 text-left">
        <p>
          <span className="font-semibold">전액 환불:</span> 수강 시작 전 환불 요청 시 전액 환불됩니다.
        </p>
        <p>
          <span className="font-semibold">부분 환불:</span> 환불 금액은 '1개월 단위'로 산정되며, 각 월별 진행 상황에 따라 환불 비율이 개별 적용됩니다.
        </p>
        <div>
          <p className="font-semibold mb-2">예시)</p>
          <p className="text-sm leading-relaxed mb-3">
            6주 수업(첫째 달 + 2주)을 등록한 뒤, 첫째 달 수업이 1/2 경과한 시점에 환불을 요청하면:
          </p>
          <ul className="text-sm space-y-1 mb-3 ml-4">
            <li>- 첫째 달 수업료: 1/2 경과 전 기준으로 해당 월 수강료의 1/2 환불</li>
            <li>- 둘째 달 수업료: 아직 시작 전이므로 전액 환불</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">환불 비율(해당 월 기준)</p>
          <ul className="text-sm space-y-1 ml-4">
            <li>- 수강 시작일로부터 1/3 경과 전: 수강료의 2/3 환불</li>
            <li>- 수강 시작일로부터 1/2 경과 전: 수강료의 1/2 환불</li>
            <li>- 수강 시작일로부터 1/2 경과 후: 환불 없음</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">유의사항</p>
          <p className="text-sm leading-relaxed">
            수강 등록 시 제공된 혜택(조기 등록 할인, 패키지 할인 등)은 환불 시 모두 철회된 후, 정상 수강료 기준으로 환불 금액을 산출합니다.
          </p>
        </div>
        <p className="text-sm text-muted-foreground italic">
          자세한 내용은 '환불 규정' 페이지를 참고해 주세요.
        </p>
      </div>
    ),
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        aria-controls={`answer-${item.id}`}
        aria-expanded={isOpen}
        className="w-full flex items-start gap-4 py-6 px-2 text-left hover:bg-muted/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#952839] focus:ring-offset-2 rounded"
      >
        <span className="flex-shrink-0 text-xl font-bold text-[#952839] mt-0.5">Q</span>
        <span className="flex-1 text-base md:text-lg font-semibold text-foreground">{item.question}</span>
        <span className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div id={`answer-${item.id}`} className="px-2 pt-4 pb-6 md:px-14 md:pt-5 animate-in fade-in duration-300">
          <div className="text-sm md:text-base text-foreground/80 leading-relaxed">
            {typeof item.answer === 'string' ? (
              <p>{item.answer}</p>
            ) : (
              item.answer
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <AnimatedSection className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">인터프렙 FAQ</h1>
              <p className="text-lg text-muted-foreground">
                자주 묻는 질문들을 확인하세요
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-0">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  )
}
