import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { CheckCircle2, BookOpen, Users, LineChart, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-muted/30 to-background py-24 md:py-40 mb-16">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/student-hands.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-black/[0.32]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F5] mb-6 text-balance">
                SAT 전문 학원 <span className="text-[#C63A3A]">인터프렙</span>
                <br />
                점수로 실력을 증명합니다
              </h1>
              <p className="text-lg md:text-xl text-[rgba(245,245,245,0.85)] font-medium mb-8 leading-relaxed text-pretty">
                <span className="text-[#C63A3A]">인터프렙</span>은 SAT 점수 향상을 목표로 한 전문 학원입니다.
                <br />
                체계적인 커리큘럼, 철저한 관리, 검증된 학습 자료로
                <br />
                학생 개개인의 SAT 잠재력을 극대화합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button size="lg" className="hover:brightness-110 transition-[filter]" asChild>
                  <Link href="#contact">SAT 상담 문의</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-[#1a1a1a] border-gray-200 hover:bg-[#f8f8f8] transition-colors" asChild>
                  <Link href="#programs">프로그램 안내 보기</Link>
                </Button>
              </div>
              <p className="text-sm text-[rgba(245,245,245,0.7)]">
                2007년 설립 · 누적 수강생 9,215명
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <AnimatedSection id="about" className="py-24 md:py-32 bg-background mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                왜 인터프렙인가요?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-pretty">
                인터프렙은 2007년 설립된 국내 대표 SAT 전문 학원입니다.
                체계적인 교육 프로그램, 지속적인 성적 관리, 그리고 자체 제작한
                학습 자료를 통해 측정 가능한 점수 향상을 제공합니다.
                우리는 규칙적인 학습 습관과 데이터 기반 피드백을 중심으로
                학생들의 SAT 목표 달성을 돕습니다.
              </p>
              <div className="flex flex-col md:flex-row gap-8 max-w-[1200px] mx-auto px-2">
                <div className="flex-1">
                  <img
                    src="/images/overview-1.jpg"
                    alt="학습 환경"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <img
                    src="/images/overview-3.jpg"
                    alt="학생 성과"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Performance Metrics Section */}
        <AnimatedSection className="py-24 md:py-32 mb-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                성적으로 증명하는 인터프렙
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">
                      9,215명
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">누적 수강생</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">
                      341점
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">8주 평균 점수 향상</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-primary">
                      67%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      수강생 평균 200점 이상 향상
                    </p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                모든 수치는 실제 수강생 데이터를 기반으로 정리되었습니다.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Program Focus Section */}
        <AnimatedSection id="programs" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                인터프렙의 SAT 수업 특징
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <BookOpen className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>체계적인 SAT 커리큘럼</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Reading, Writing, Math 영역별 전문화된 커리큘럼으로
                      기초부터 고득점까지 단계적으로 학습합니다.
                      각 영역의 핵심 개념과 문제 해결 전략을 체계적으로 습득합니다.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Target className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>자체 제작 SAT 교재 및 학습 자료</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      실전 SAT 시험을 철저히 분석하여 제작한 자체 교재와
                      학습 자료를 제공합니다. 최신 출제 경향을 반영한
                      실전 문제로 효율적인 학습이 가능합니다.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>소수 정예 관리형 수업</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      학생 개개인의 학습 수준과 목표에 맞춘 소수 정예 수업으로
                      진행됩니다. 강사의 세심한 관리와 피드백으로
                      학습 효율을 극대화합니다.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <LineChart className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>학습 진도 및 성취도 정기 점검</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      정기적인 모의고사와 진단 평가를 통해 학습 진도와
                      성취도를 객관적으로 점검합니다. 데이터 기반의
                      맞춤형 학습 전략을 제시합니다.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* About Us Section */}
        <AnimatedSection className="py-24 md:py-32 pb-6 md:pb-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                  <img
                    src="/images/about-01.jpg"
                    alt="인터프렙 학습 공간"
                    className="w-[85%] h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    About Interprep
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-pretty">
                    2007년 설립 이래, 인터프렙은 한 가지 목표에 집중해 왔습니다.
                    바로 SAT 점수 향상입니다. 우리는 탄탄한 기본기, 꾸준함,
                    그리고 피드백 중심의 코칭이 신뢰할 수 있는 결과를 만든다고 믿습니다.
                  </p>
                  <Link
                    href="/about"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    자세히 보기
                    <CheckCircle2 className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Our Team Section */}
        <AnimatedSection id="team" className="pt-6 md:pt-8 pb-24 md:pb-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                  <img
                    src="/images/about-02.jpg"
                    alt="인터프렙 팀"
                    className="w-[85%] h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Our Team
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-pretty">
                    인터프렙의 강사진은 미국 및 해외 명문 대학 출신으로 구성되어 있습니다.
                    하지만 우리의 채용 기준은 출신 학교가 아닌, 인성, 교육 능력,
                    그리고 헌신입니다. 강사들은 단순한 교육자가 아닌,
                    학생들의 학업 멘토로서 함께합니다.
                  </p>
                  <Link
                    href="/team"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    자세히 보기
                    <CheckCircle2 className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Final CTA Section */}
        <AnimatedSection id="contact" className="py-24 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                SAT 준비, 방향이 명확해야 점수가 오릅니다
              </h2>
              <p className="text-lg mb-8 opacity-90 leading-relaxed text-pretty">
                지금의 학습 방식이 점수 향상으로 이어지고 있는지
                <br />
                전문가와 함께 점검해 보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#contact">SAT 상담 신청</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="#contact">상담 및 문의로 이동</Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
