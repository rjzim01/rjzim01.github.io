import React, { useRef, useEffect, useCallback, useImperativeHandle } from 'react'
import { CONFIG } from '../engine/config'
import { initGameObjects, resetPositions, moveEntity, updateBall, checkCollision, kickBall } from '../engine/physics'
import { updateAI } from '../engine/ai'
import { drawField, drawPlayer, drawBall } from '../engine/renderer'
import { SFX, startAmbient, stopAmbient, setSoundMuted } from '../engine/sound'

const Game = ({ difficulty, paused, soundMuted, onScoreUpdate, onTimeUpdate, onGameOver, onPause }, ref) => {
  const canvasRef = useRef(null)
  const objectsRef = useRef(null)
  const keysRef = useRef({})
  const dpadRef = useRef({ up: false, down: false, left: false, right: false })
  const stateRef = useRef({ running: false, timeLeft: CONFIG.gameDuration, score: { player: 0, ai: 0 } })
  const timerRef = useRef(null)
  const aiUpdateRef = useRef(null)
  const mobileSpeedRef = useRef(1)
  const swipeRef = useRef(null)

  // Expose kick and dpad via imperative handle
  useImperativeHandle(ref, () => ({
    kick: () => {
      if (!objectsRef.current || !stateRef.current.running || stateRef.current.paused) return
      const { player, ball } = objectsRef.current
      if (kickBall(player, ball, CONFIG.kickPower, () => SFX.kick())) {
        if (navigator.vibrate) navigator.vibrate(30)
      }
    },
    dpadRef
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = CONFIG.fieldWidth
    canvas.height = CONFIG.fieldHeight

    const objects = initGameObjects()
    objectsRef.current = objects

    stateRef.current = { running: true, timeLeft: CONFIG.gameDuration, score: { player: 0, ai: 0 } }
    onScoreUpdate(stateRef.current.score)
    onTimeUpdate(stateRef.current.timeLeft)

    startAmbient()
    SFX.whistle()

    // Timer
    timerRef.current = setInterval(() => {
      const s = stateRef.current
      if (!s.running || s.paused) return
      s.timeLeft--
      onTimeUpdate(s.timeLeft)
      if (s.timeLeft <= 5 && s.timeLeft > 0) SFX.countdown()
      if (s.timeLeft <= 0) {
        s.running = false
        stopAmbient()
        SFX.whistleLong()
        let w
        if (s.score.player > s.score.ai) w = 'You Win!'
        else if (s.score.ai > s.score.player) w = 'AI Wins!'
        else w = "It's a Draw!"
        onGameOver(w, `Final Score: ${s.score.player} - ${s.score.ai}`)
      }
    }, 1000)

    // AI update factory
    aiUpdateRef.current = updateAI(objects.ball, objects.ai, false, () => SFX.kick())

    // Canvas resize
    const resizeCanvas = () => {
      const isFullscreen = !!document.fullscreenElement || !!document.webkitFullscreenElement
      const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window

      if (isFullscreen && isMobile) {
        canvas.style.width = window.innerWidth + 'px'
        canvas.style.height = window.innerHeight + 'px'
        canvas.style.margin = '0'
        canvas.style.display = 'block'
      } else {
        const headerHeight = 250
        const maxWidth = Math.min(window.innerWidth - 20, 800)
        const maxHeight = window.innerHeight - headerHeight
        const aspectRatio = CONFIG.fieldWidth / CONFIG.fieldHeight
        let width = maxWidth
        let height = width / aspectRatio
        if (height > maxHeight) {
          height = maxHeight
          width = height * aspectRatio
        }
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        canvas.style.margin = ''
        canvas.style.display = ''
      }

      if (isMobile) {
        const screenScale = window.innerWidth / 800
        mobileSpeedRef.current = Math.max(0.8, Math.min(1.2, screenScale))
      } else {
        mobileSpeedRef.current = 1
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('fullscreenchange', resizeCanvas)
    document.addEventListener('webkitfullscreenchange', resizeCanvas)

    // Keyboard
    const onKeyDown = (e) => {
      keysRef.current[e.code] = true
      if (e.code === 'Space' && stateRef.current.running && !stateRef.current.paused) {
        e.preventDefault()
        const { player, ball } = objects
        if (kickBall(player, ball, CONFIG.kickPower, () => SFX.kick())) {
          if (navigator.vibrate) navigator.vibrate(30)
        }
      }
      if (e.code === 'Escape' && stateRef.current.running) {
        onPause()
      }
    }
    const onKeyUp = (e) => { keysRef.current[e.code] = false }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    // Swipe-to-kick
    const onTouchStart = (e) => {
      const touch = e.touches[0]
      if (touch.clientX > window.innerWidth / 2) {
        swipeRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
      }
    }
    const onTouchEnd = (e) => {
      if (!swipeRef.current || !stateRef.current.running || stateRef.current.paused) {
        swipeRef.current = null
        return
      }
      const touch = e.changedTouches[0]
      const dx = touch.clientX - swipeRef.current.x
      const dy = touch.clientY - swipeRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const elapsed = Date.now() - swipeRef.current.time
      if (dist > 30 && elapsed < 300) {
        const { player, ball } = objects
        kickBall(player, ball, CONFIG.kickPower, () => SFX.kick())
        if (navigator.vibrate) navigator.vibrate(20)
      }
      swipeRef.current = null
    }
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })

    // Prevent touch scroll during gameplay
    const onTouchMove = (e) => {
      if (stateRef.current.running && !stateRef.current.paused) e.preventDefault()
    }
    document.addEventListener('touchmove', onTouchMove, { passive: false })

    // Game loop
    let animId
    const gameLoop = (time) => {
      ctx.clearRect(0, 0, CONFIG.fieldWidth, CONFIG.fieldHeight)
      drawField(ctx)

      const s = stateRef.current
      if (s.running && !s.paused) {
        // Handle input
        let dx = 0, dy = 0
        const k = keysRef.current
        const d = dpadRef.current
        if (k['KeyW'] || k['ArrowUp'] || d.up) dy = -1
        if (k['KeyS'] || k['ArrowDown'] || d.down) dy = 1
        if (k['KeyA'] || k['ArrowLeft'] || d.left) dx = -1
        if (k['KeyD'] || k['ArrowRight'] || d.right) dx = 1

        if (dx !== 0 || dy !== 0) {
          const len = Math.sqrt(dx * dx + dy * dy)
          moveEntity(objects.player, dx / len, dy / len, mobileSpeedRef.current)
        }

        // AI
        aiUpdateRef.current(difficulty)

        // Ball
        updateBall(objects.ball, (scorer) => {
          if (scorer === 'player') s.score.player++
          else s.score.ai++
          onScoreUpdate({ ...s.score })
          SFX.goal(scorer)
          // Show goal animation
          showGoalAnimation(scorer)
          resetPositions(objects)
        })

        checkCollision(objects.player, objects.ball)
        checkCollision(objects.ai, objects.ball)
      }

      const displayW = parseFloat(canvas.style.width) || CONFIG.fieldWidth
      const displayH = parseFloat(canvas.style.height) || CONFIG.fieldHeight
      drawPlayer(ctx, objects.player, true, displayW, displayH)
      drawPlayer(ctx, objects.ai, false, displayW, displayH)
      drawBall(ctx, objects.ball, displayW, displayH, time)

      animId = requestAnimationFrame(gameLoop)
    }

    const showGoalAnimation = (scorer) => {
      const div = document.createElement('div')
      div.className = `goal-animation ${scorer === 'player' ? 'goal-good' : 'goal-bad'}`
      div.textContent = scorer === 'player' ? 'GOAL!' : 'CONCEDED!'
      document.querySelector('.game-container').appendChild(div)
      setTimeout(() => div.remove(), 1500)
    }

    animId = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(timerRef.current)
      stopAmbient()
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('fullscreenchange', resizeCanvas)
      document.removeEventListener('webkitfullscreenchange', resizeCanvas)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchmove', onTouchMove)
    }
  }, [difficulty])

  // Handle pause state changes
  useEffect(() => {
    if (objectsRef.current) {
      stateRef.current.paused = paused
    }
  }, [paused])

  // Handle sound mute
  useEffect(() => {
    setSoundMuted(soundMuted)
  }, [soundMuted])

  return <canvas ref={canvasRef} id="gameCanvas" />
}

export default React.forwardRef(Game)
