import { useRef, useEffect } from 'react'

export default function KickButton({ gameRef }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const btn = container.querySelector('.kick-btn')
    if (!btn) return

    const handleKick = (e) => {
      if (e) e.preventDefault()
      if (e) e.stopPropagation()
      if (gameRef.current?.kick) {
        gameRef.current.kick()
      }
      btn.classList.add('pressed')
      setTimeout(() => btn.classList.remove('pressed'), 150)
    }

    btn.addEventListener('touchstart', handleKick, { passive: false })
    btn.addEventListener('click', handleKick)

    // Drag
    let dragging = false
    let dragStartX = 0, dragStartY = 0
    let containerStartX = 0, containerStartY = 0
    let moved = false
    const DRAG_THRESHOLD = 10

    function startDrag(x, y) {
      const rect = container.getBoundingClientRect()
      dragging = true
      moved = false
      dragStartX = x
      dragStartY = y
      containerStartX = rect.left
      containerStartY = rect.top
      container.classList.add('dragging')
    }

    function moveDrag(x, y) {
      if (!dragging) return
      const dx = x - dragStartX
      const dy = y - dragStartY
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) moved = true
      if (moved) {
        const cw = container.offsetWidth
        const ch = container.offsetHeight
        let newLeft = containerStartX + dx
        let newTop = containerStartY + dy
        newLeft = Math.max(0, Math.min(window.innerWidth - cw, newLeft))
        newTop = Math.max(0, Math.min(window.innerHeight - ch, newTop))
        container.style.left = newLeft + 'px'
        container.style.top = newTop + 'px'
        container.style.right = 'auto'
        container.style.bottom = 'auto'
      }
    }

    function endDrag() {
      dragging = false
      container.classList.remove('dragging')
      setTimeout(() => { moved = false }, 50)
    }

    container.addEventListener('touchstart', (e) => {
      const t = e.touches[0]
      startDrag(t.clientX, t.clientY)
    }, { passive: true })

    container.addEventListener('touchmove', (e) => {
      const t = e.touches[0]
      moveDrag(t.clientX, t.clientY)
      if (moved) e.preventDefault()
    }, { passive: false })

    container.addEventListener('touchend', endDrag)
    container.addEventListener('touchcancel', endDrag)
    container.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY))
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY))
    document.addEventListener('mouseup', endDrag)
    container.addEventListener('contextmenu', (e) => e.preventDefault())

    return () => {
      btn.removeEventListener('touchstart', handleKick)
      btn.removeEventListener('click', handleKick)
      container.removeEventListener('touchstart', startDrag)
      container.removeEventListener('touchmove', moveDrag)
      container.removeEventListener('touchend', endDrag)
      container.removeEventListener('touchcancel', endDrag)
      container.removeEventListener('mousedown', startDrag)
      container.removeEventListener('contextmenu', (e) => e.preventDefault())
    }
  }, [gameRef])

  return (
    <div className="kick-container" ref={containerRef}>
      <button className="kick-btn">KICK</button>
    </div>
  )
}
