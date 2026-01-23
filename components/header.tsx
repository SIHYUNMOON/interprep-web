'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { 
      label: '학원 소개', 
      href: '/about',
      dropdown: [
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
    { label: '정보게시판', href: '#board' },
    { label: '상담 및 문의', href: '#contact' },
  ]

  const familySites = [
    { label: '인터프렙 어학원', href: '#' },
    { label: '잉글스토리 인강', href: 'https://englstory.co.kr/' },
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
                target="_blank"
                rel="noopener noreferrer"
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
              className="flex items-center"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'auto' })
                }, 50)
              }}
            >
              <Image
                src="/interprep-logo.svg"
                alt="Interprep 인터프렙"
                width={91}
                height={41}
                className="h-10 md:h-12 w-auto"
                priority
              />
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
              <Button asChild size="lg">
                <Link href="/login">로그인</Link>
              </Button>
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
              <Button asChild className="w-full">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  로그인
                </Link>
              </Button>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
