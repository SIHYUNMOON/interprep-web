'use client'

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useEffect } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const faculty = [
    {
      name: 'Max Joo',
      subject: 'Consulting / College Essay',
      credentials: [
        '디아이프렙 총괄 원장',
        'Columbia University, Law School 졸업',
        'Washington College of Law, phD',
      ],
    },
    {
      name: 'Monika Chang',
      subject: 'College, Transfer, Graduate School Consulting, College Essay, Art Portfolio Consulting',
      credentials: [
        '디아이프렙 총괄 원장',
        'MICA (BFA, Painting)',
        '(전) 해커스 GRE 강사, 컨설팅 디렉터',
        '(전) 에세이라인, 원장',
        '(전) 아이비라인, 부원장',
      ],
    },
    {
      name: 'Joe Shim',
      subject: 'Consulting / College Essay / Competitions',
      credentials: ['Harvard University, BA (Economics)'],
    },
    {
      name: 'Grace',
      subject: 'Boarding School Consulting, Boarding School Advising Consulting',
      credentials: [
        '디아이프렙 보딩스쿨 원장',
        'University of Texas, Austin (BA, Economics)',
        '(전) CBIS K 교무처장',
        '(전) Little School 부원장',
        '(전) 토스잉글리시 원장',
        '(전) 애임플러스 교육 유학컨설팅 과장',
        '(전) 세이스 유학 컨설턴트',
      ],
    },
    {
      name: 'Evelyn Nam',
      subject: 'College Consulting, College Essay, SAT Reading & Writing',
      credentials: [
        'Cornell (BS, Industrial and Labor Relations)',
        'Harvard University, MA (Theological Studies)',
        'Harvard University, Kennedy School, MPA',
        'Columbia University, MS (Business Journalism)',
        '(전) Crimson Education, 컨설턴트',
        '(전) 아주경제, 리포터',
        '(전) 블룸버그, localization data specialist',
        '(전) 하버드 비즈니스 리뷰, staff writer',
      ],
    },
    {
      name: '홍다인 (Gabrielle)',
      subject: 'College Counselling, College Essay, Graduate School Consulting',
      credentials: [
        'Duke University (B.A., Political Science)',
        '(현) Arirang TV, Global Broadcaster',
        '(전) Morgan Stanley, Summer Analyst',
        '(전) Law Firm Manhattan, Paralegal',
      ],
    },
    {
      name: '한우리',
      subject: 'College Consulting, Pre-Dental / Pharm. School Consulting, EC Consulting, College Essay',
      credentials: [
        'University College of London, BSc (Information Management)',
        '영국 Concord College 보딩스쿨',
      ],
    },
    {
      name: '이대민',
      subject: 'SAT Reading & Writing, College Counselling, College Essay, AP Psychology, Computer Science, Statistics',
      credentials: [
        'University of Chicago',
        'BA (East Asian Languages and Civilization)',
        'Georgetown University, MA (Asian Studies)',
        'Johns Hopkins University, MA (Political Science)',
        '(전) American STEM Education, 교사',
      ],
    },
    {
      name: 'Aiden Song',
      subject: 'Research Advisor, SAT Math, AP Calculus, Economics, Statistics',
      credentials: [
        'City University of New York, Ph.D. in Financial Economics',
        '(현) Lehman College, Faculty',
        '(현) New York University, Instructor',
        '(전) Columbia University, Instructor',
      ],
    },
    {
      name: '박지혜',
      subject: 'College Counselling, College Essay, Competition Advisor',
      credentials: [
        'UIUC (BA, Global Studies; French)',
        'Columbia Teachers College (Certificate of College Counseling)',
        '(전) Crimson Education (ANZ and APAC regional manager)',
      ],
    },
    {
      name: 'Rita Obelleiro',
      subject: 'Boarding School, College, Transfer, Graduate School Consulting, College Essay, Art Portfolio Consulting',
      credentials: [
        '(전) Phillips Academy Andover, Teacher, Coach, Counselor',
        'University of Pennsylvania, MFA (Painting)',
        'SAIC, MAT (Art Education)',
        'MICA, BFA (Painting)',
      ],
    },
    {
      name: 'Michael Kim',
      subject: '',
      credentials: [
        'Cornell University, BA (Government)',
        'Stony Brook University, MBA',
        'Brooklyn Law School',
        '실리콘밸리 (삼성전자 / Various Venture Firms), 15 years',
        '계명대학교 Professor, 2 years',
      ],
    },
    {
      name: '김세준',
      subject: '',
      credentials: [
        'Holyname Catholic High School (Massachusetts) 졸업',
        '이화여대 국제학부',
      ],
    },
    {
      name: '강이원',
      subject: 'College Counselling, College Essay',
      credentials: [
        '인터프렙 SAT, AP English Literature & Language 강의',
        'Columbia University, BA (Creative Writing)',
      ],
    },
    {
      name: '이경은',
      subject: 'SAT Math / RW, IB Mathematics AA / AI SL, Japanese B SL / HL, Chemistry SL, Physics SL, MYP, AP Precalculus, AP Chemistry, AP Physics 1',
      credentials: ['New York University, BS (Mathematics)'],
    },
    {
      name: '이선규 (Sean)',
      subject: 'College Consulting, College Essay, SAT Reading',
      credentials: [
        'Emory University (BA, Philosophy)',
        'Emory University, Laney Graduate School (MA, Bioethics)',
        '(전) 인사이트 강남 컨설팅, 에세이스트',
      ],
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Header section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            강사진
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            인터프렙의 All Stars 강사진을 소개합니다.
          </p>
          <div className="w-24 h-px bg-border mx-auto" />
        </div>

        {/* Faculty cards grid */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {faculty.map((member, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
              >
                {/* Red accent line */}
                <div className="w-16 h-1 bg-primary mb-4" />

                {/* Name */}
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {member.name}
                </h3>

                {/* Subject */}
                {member.subject && (
                  <>
                    <div className="h-px bg-border mb-3" />
                    <div className="mb-4">
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-medium text-muted-foreground">과목 : </span>
                        {member.subject}
                      </p>
                    </div>
                  </>
                )}

                {/* Credentials */}
                <div className="h-px bg-border mb-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    주요경력
                  </p>
                  <div className="space-y-0.5">
                    {member.credentials.map((credential, idx) => (
                      <p key={idx} className="text-sm text-foreground leading-snug">
                        {credential}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
