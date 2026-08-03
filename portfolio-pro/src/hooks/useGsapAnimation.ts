import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapAnimation(
  callback: (ctx: gsap.Context) => void,
  dependencies: any[] = []
) {
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(ctx.current!)
    })

    return () => ctx.current?.revert()
  }, dependencies)
}

export function useScrollReveal(element: React.RefObject<HTMLElement>) {
  useGsapAnimation(() => {
    if (!element.current) return

    gsap.fromTo(
      element.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [element])
}

export function useParallax(element: React.RefObject<HTMLElement>) {
  useGsapAnimation(() => {
    if (!element.current) return

    gsap.to(element.current, {
      y: -100,
      scrollTrigger: {
        trigger: element.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    })
  }, [element])
}

export function useCountUp(
  element: React.RefObject<HTMLElement>,
  end: number,
  duration: number = 2
) {
  useGsapAnimation(() => {
    if (!element.current) return

    const obj = { value: 0 }

    gsap.to(obj, {
      value: end,
      duration,
      scrollTrigger: {
        trigger: element.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        if (element.current) {
          element.current.textContent = Math.floor(obj.value).toString()
        }
      },
    })
  }, [element, end, duration])
}
