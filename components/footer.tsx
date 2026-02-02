import Link from 'next/link'

export function Footer() {
  const familySites = [
    { label: '인터프렙 어학원', href: '/', isInternal: true },
    { label: '인터프렙TV', href: 'https://www.youtube.com/channel/UCn2YirQit1wbD1vpflBIkIw/featured' },
    { label: '컨설팅', href: 'https://theiprep.com/' },
  ]

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-foreground mb-4">연락처</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>☎ 02-547-2039</p>
              <p>☎ 070-8656-8883</p>
              <p>이메일: interprep@interprep.kr</p>
              <p className="pt-2">
                주소: 서울특별시 강남구 역삼로 424,
                <br />
                진영빌딩 4층
              </p>
            </div>
          </div>

          {/* Business Information */}
          <div>
            <h3 className="font-bold text-foreground mb-4">사업자 정보</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>학원명: 인터프렙어학원</p>
              <p>상호: (주)아이홀딩즈</p>
              <p>사업자등록번호: 261-81-13185</p>
              <p>학원설립운영등록번호: 제10713호</p>
              <p>통신판매업신고번호: 제2014-서울강남-00447호</p>
              <p>개인정보관리책임자: 유희정</p>
            </div>
          </div>

          {/* Family Sites */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Family Site</h3>
            <div className="space-y-2">
              {familySites.map((site, idx) => (
                <Link
                  key={idx}
                  href={site.href}
                  {...(!site.isInternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {site.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Interprep. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/board/archive" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              게시판 전체 아카이브
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
