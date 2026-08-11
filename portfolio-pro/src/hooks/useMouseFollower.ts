import { useEffect } from 'react'
import gsap from 'gsap'

export function useMouseFollower(element: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = element.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(el, {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        duration: 0.3,
      } as any)
    }

    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [element])
}
