import { useRef, useEffect } from 'react'

export default function DPad({ gameRef }) {
  const dpadRef = useRef(null)

  useEffect(() => {
    const dpadEl = dpadRef.current
    if (!dpadEl) return

    dpadEl.addEventListener('contextmenu', (e) => e.preventDefault())

    let dragging = false
    let dragStartX = 0, dragStartY = 0
    let dpadStartX = 0, dpadStartY = 0
    let moved = false
    const DRAG_THRESHOLD = 10

    function getDpadState() {
      return gameRef.current?.dpadRef?.current || { up: false, down: false, left: false, right: false }
    }

    function startDrag(x, y) {
      const rect = dpadEl.getBoundingClientRect()
      dragging = true
      moved = false
      dragStartX = x
      dragStartY = y
      dpadStartX = rect.left
      dpadStartY = rect.top
      dpadEl.classList.add('dragging')
    }

    function moveDrag(x, y) {
      if (!dragging) return
      const dx = x - dragStartX
      const dy = y - dragStartY
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        moved = true
      }
      if (moved) {
        const dpadW = dpadEl.offsetWidth
        const dpadH = dpadEl.offsetHeight
        let newLeft = dpadStartX + dx
        let newTop = dpadStartY + dy
        newLeft = Math.max(0, Math.min(window.innerWidth - dpadW, newLeft))
        newTop = Math.max(0, Math.min(window.innerHeight - dpadH, newTop))
        dpadEl.style.left = newLeft + 'px'
        dpadEl.style.top = newTop + 'px'
        dpadEl.style.bottom = 'auto'
      }
    }

    function endDrag() {
      dragging = false
      dpadEl.classList.remove('dragging')
      setTimeout(() => { moved = false }, 50)
    }

    // Touch drag
    dpadEl.addEventListener('touchstart', (e) => {
      const t = e.touches[0]
      startDrag(t.clientX, t.clientY)
    }, { passive: true })

    dpadEl.addEventListener('touchmove', (e) => {
      const t = e.touches[0]
      moveDrag(t.clientX, t.clientY)
      if (moved) e.preventDefault()
    }, { passive: false })

    dpadEl.addEventListener('touchend', endDrag)
    dpadEl.addEventListener('touchcancel', endDrag)

    // Mouse drag
    dpadEl.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY))
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY))
    document.addEventListener('mouseup', endDrag)

    // Direction buttons
    const dirs = [
      { sel: '.dpad-up', key: 'up' },
      { sel: '.dpad-down', key: 'down' },
      { sel: '.dpad-left', key: 'left' },
      { sel: '.dpad-right', key: 'right' }
    ]

    const cleanups = []
    dirs.forEach(({ sel, key }) => {
      const btn = dpadEl.querySelector(sel)
      if (!btn) return

      const onStart = (e) => {
        e.stopPropagation()
        if (!moved) {
          const ds = getDpadState()
          ds[key] = true
          btn.classList.add('pressed')
        }
      }
      const onEnd = (e) => {
        e.stopPropagation()
        const ds = getDpadState()
        ds[key] = false
        btn.classList.remove('pressed')
      }

      btn.addEventListener('touchstart', onStart, { passive: true })
      btn.addEventListener('touchend', onEnd)
      btn.addEventListener('touchcancel', onEnd)
      btn.addEventListener('mousedown', onStart)
      btn.addEventListener('mouseup', onEnd)
      btn.addEventListener('mouseleave', onEnd)

      cleanups.push(() => {
        btn.removeEventListener('touchstart', onStart)
        btn.removeEventListener('touchend', onEnd)
        btn.removeEventListener('touchcancel', onEnd)
        btn.removeEventListener('mousedown', onStart)
        btn.removeEventListener('mouseup', onEnd)
        btn.removeEventListener('mouseleave', onEnd)
      })
    })

    return () => {
      cleanups.forEach(fn => fn())
      document.removeEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY))
      document.removeEventListener('mouseup', endDrag)
    }
  }, [gameRef])

  return (
    <div className="dpad" ref={dpadRef}>
      <button className="dpad-btn dpad-up">&#9650;</button>
      <button className="dpad-btn dpad-left">&#9664;</button>
      <button className="dpad-btn dpad-right">&#9654;</button>
      <button className="dpad-btn dpad-down">&#9660;</button>
    </div>
  )
}
