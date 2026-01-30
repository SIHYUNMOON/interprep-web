'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { LoginModal } from '@/components/board/login-modal'
import { useAuth } from '@/lib/auth-context'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBoardLogin, setShowBoardLogin] = useState(false)
  const { isAdminLoggedIn, login, logout, isLoading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBoardLogin = async (username: string, password: string) => {
    try {
      await login(username, password)
      setShowBoardLogin(false)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const handleBoardLogout = async () => {
    await logout()
  }

  const navItems = [
    { 
      label: '학원 소개', 
      href: '/about',
      dropdown: [
        { label: '교육 이념', href: '/about/philosophy' },
        { label: '학원 소개', href: '/about' },
        { label: '강사진', href: '/team' },
        { label: '찾아오시는 길', href: '/location' },
      ]
    },
    { 
      label: '강의', 
      href: '#programs',
      dropdown: [
        { label: 'SAT', href: '/sat' },
        { label: 'PreSAT', href: '/presat' },
        { label: 'TOEFL', href: '/toefl' },
        { label: 'Art + English Immersion', href: '/art-english' },
        { label: 'iPass', href: '/ipass' },
      ]
    },
    { 
      label: '유학 · 입시 가이드', 
      href: '/board',
      dropdown: [
        { label: '정보게시판', href: '/board' },
        { label: '연도별 입시 결과', href: '/admission-results' },
      ]
    },
    { 
      label: '상담 및 문의', 
      href: '/contact',
      dropdown: [
        { label: '상담 문의', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: '크레딧 제도', href: '/credit-system' },
        { label: '환불 규정', href: '/refund-policy' },
      ]
    },
  ]

  const familySites = [
    { label: '인터프렙 어학원', href: '/', isInternal: true },
    { label: '인터프렙TV', href: 'https://www.youtube.com/channel/UCn2YirQit1wbD1vpflBIkIw/featured' },
    { label: '컨설팅', href: 'https://theiprep.com/' },
  ]

  return (
    <>
      {/* Family Site Bar - INCREASED SIZE */}
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 h-11 flex items-center justify-end">
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            {familySites.map((site, idx) => (
              <Link
                key={idx}
                href={site.href}
                {...(!site.isInternal && { target: '_blank', rel: 'noopener noreferrer' })}
                className="hover:text-foreground transition-colors"
              >
                {site.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-sm shadow-sm'
            : 'bg-background'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - INCREASED SIZE */}
            <Link 
              href="/" 
              className="flex items-center shrink-0 relative h-10 md:h-12"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'auto' })
                }, 50)
              }}
            >
              <div className="relative h-full w-[180px] md:w-[220px]">
                <Image
                  src="/images/interprep-logo.png"
                  alt="Interprep 인터프렙"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation - INCREASED SIZE */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="relative group"
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                      >
                        {item.label}
                      </button>
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible translate-y-[-10px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out"
                      >
                        <div className="bg-primary text-white rounded-md shadow-lg py-2 min-w-[180px]">
                          {item.dropdown.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm hover:bg-[#A53030] transition-colors"
                              onClick={() => {
                                if (subItem.href.startsWith('/')) {
                                  setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: 'auto' })
                                  }, 50)
                                }
                              }}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              {!isLoading && (
                isAdminLoggedIn ? (
                  <Button 
                    onClick={handleBoardLogout}
                    variant="outline"
                    size="lg"
                    className="text-red-700 border-red-200"
                  >
                    로그아웃
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setShowBoardLogin(true)}
                    size="lg"
                  >
                    로그인
                  </Button>
                )
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t border-border py-4 flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <div key={idx}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subItem.href}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {!isLoading && (
                isAdminLoggedIn ? (
                  <Button 
                    onClick={() => {
                      handleBoardLogout()
                      setMobileMenuOpen(false)
                    }}
                    variant="outline"
                    className="w-full text-red-700 border-red-200"
                  >
                    로그아웃
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setShowBoardLogin(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full"
                  >
                    로그인
                  </Button>
                )
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showBoardLogin}
        onClose={() => setShowBoardLogin(false)}
        onLogin={handleBoardLogin}
        isLoading={false}
      />
    </>
  )
}

export default Header
