'use client'

import React from "react"

import { useEffect, useRef, useState } from 'react'

type ScrollDir = 'down' | 'up'

export function useScrollAnimation() {
  const ref = useRef<HTMLElement | null>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  // 스크롤 방향 추적
  const lastYRef = useRef(0)
  const dirRef = useRef<ScrollDir>('down')

  useEffect(() => {
    // 초기값 세팅
    lastYRef.current = window.scrollY

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        dirRef.current = y > lastYRef.current ? 'down' : 'up'
        lastYRef.current = y
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        const dir = dirRef.current

        // entry.rootBounds는 일부 환경에서 null일 수 있어 fallback 처리
        const rootTop = entry.rootBounds?.top ?? 0
        const rootBottom = entry.rootBounds?.bottom ?? window.innerHeight

        // "아래에서 들어오는지" 판별:
        // - 관측 대상의 top이 viewport top보다 아래쪽에서 교차하면 below-entry로 간주
        const enteringFromBelow = entry.boundingClientRect.top > rootTop

        if (entry.isIntersecting) {
          if (dir === 'down' && enteringFromBelow) {
            // ✅ 내려갈 때 + 아래에서 올라올 때만 애니메이션
            setShouldAnimate(true)
            setIsVisible(true)
          } else {
            // ✅ 올라갈 때는 이미 떠있는 상태로 "그대로" 보여야 함 (애니메이션 금지)
            setShouldAnimate(false)
            setIsVisible(true)
          }
          return
        }

        // ❗️여기가 핵심: "올라갈 때"는 다시 숨기지 않기
        if (dir === 'up') {
          // 위로 이동 중 섹션이 관측에서 빠져도 visible 유지
          // (다시 내려올 때 애니메이션 되게 하려면 이 블록을 유지)
          return
        }

        // ✅ 내려가는 중일 때만 리셋해서 "다시 내려올 때 재등장" 가능하게
        // 섹션이 화면 위로 지나가며 빠진 경우(top < 0)만 hidden 처리
        const passedAboveViewport = entry.boundingClientRect.bottom < 0
        // 또는 너무 민감하면 top 기준으로:
        // const passedAboveViewport = entry.boundingClientRect.top < 0

        if (passedAboveViewport) {
          setIsVisible(false)
          setShouldAnimate(false)
        }

        // 참고: 아래로 내려갈 때 섹션이 "아래로" 빠지는 경우(거의 없음)는 굳이 숨길 필요 없음
        // 하지만 필요하면 조건 추가 가능:
        // const passedBelowViewport = entry.boundingClientRect.top > rootBottom
      },
      {
        // 애니메이션 타이밍 조절: 화면에 어느 정도 들어왔을 때 발동할지
        threshold: 0.15,
        // 아래에서 올라오는 느낌을 더 주고 싶으면 rootMargin을 아래쪽에 약간 줘도 됨
        // rootMargin: '0px 0px -10% 0px',
      }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, isVisible, shouldAnimate }
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  const { ref, isVisible, shouldAnimate } = useScrollAnimation()

  return (
    <section
      id={id}
      ref={ref}
      className={`${shouldAnimate ? 'transition-all duration-700 ease-out' : ''} ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </section>
  )
}
