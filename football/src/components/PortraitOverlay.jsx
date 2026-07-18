import { useState, useEffect, useCallback } from 'react'

export default function PortraitOverlay() {
  const [show, setShow] = useState(false)

  const isMobileDevice = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 0 && window.innerWidth <= 1024)

  const isLandscape = useCallback(() => {
    return window.innerWidth > window.innerHeight
  }, [])

  useEffect(() => {
    if (!isMobileDevice) {
      setShow(false)
      return
    }

    const update = () => setShow(!isLandscape())
    update()

    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', () => setTimeout(update, 150))
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [isMobileDevice, isLandscape])

  const handleForce = async () => {
    try {
      const elem = document.documentElement
      const requestFS = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen
      if (requestFS) await requestFS.call(elem)
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape-primary')
      }
    } catch (e) {}
    setTimeout(() => setShow(!isLandscape()), 500)
  }

  if (!show) return null

  return (
    <div className="portrait-overlay">
      <div className="portrait-prompt">
        <div className="portrait-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4dabf7" strokeWidth="1.5">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <line x1="8" y1="12" x2="8" y2="12.01" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2>2D Football</h2>
        <p className="portrait-msg">Rotate your device to <strong>landscape</strong> to play</p>
        <p className="portrait-sub">This game requires landscape mode on mobile</p>
        <button className="portrait-btn" onClick={handleForce}>
          <span className="portrait-btn-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 2l4 4-4 4"/>
              <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
              <path d="M7 22l-4-4 4-4"/>
              <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
            </svg>
          </span>
          Force Landscape
        </button>
      </div>
    </div>
  )
}
