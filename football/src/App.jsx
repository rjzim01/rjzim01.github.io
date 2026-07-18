import { useState, useRef, useCallback } from 'react'
import Game from './components/Game'
import Menu from './components/Menu'
import Scoreboard from './components/Scoreboard'
import PauseOverlay from './components/PauseOverlay'
import GameOver from './components/GameOver'
import PortraitOverlay from './components/PortraitOverlay'
import DPad from './components/DPad'
import KickButton from './components/KickButton'

export default function App() {
  const [screen, setScreen] = useState('menu') // menu | playing | gameover
  const [difficulty, setDifficulty] = useState('medium')
  const [score, setScore] = useState({ player: 0, ai: 0 })
  const [timeLeft, setTimeLeft] = useState(60)
  const [paused, setPaused] = useState(false)
  const [winner, setWinner] = useState('')
  const [finalScore, setFinalScore] = useState('')
  const [soundMuted, setSoundMuted] = useState(false)

  const gameRef = useRef(null)

  const handleStart = useCallback(() => {
    setScore({ player: 0, ai: 0 })
    setTimeLeft(60)
    setPaused(false)
    setScreen('playing')
  }, [])

  const handleGameOver = useCallback((winnerText, finalScoreText) => {
    setWinner(winnerText)
    setFinalScore(finalScoreText)
    setScreen('gameover')
  }, [])

  const handleScoreUpdate = useCallback((newScore) => {
    setScore({ ...newScore })
  }, [])

  const handleTimeUpdate = useCallback((t) => {
    setTimeLeft(t)
  }, [])

  const handlePause = useCallback(() => {
    setPaused(p => !p)
  }, [])

  const handleToggleSound = useCallback(() => {
    setSoundMuted(m => !m)
  }, [])

  const handleMenu = useCallback(() => {
    setScreen('menu')
    setPaused(false)
  }, [])

  return (
    <>
      <PortraitOverlay />
      <div className="game-container">
        {screen === 'menu' && (
          <Menu
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            onStart={handleStart}
          />
        )}

        {screen === 'playing' && (
          <>
            <Scoreboard score={score} timeLeft={timeLeft} />
            <Game
              ref={gameRef}
              difficulty={difficulty}
              paused={paused}
              soundMuted={soundMuted}
              onScoreUpdate={handleScoreUpdate}
              onTimeUpdate={handleTimeUpdate}
              onGameOver={handleGameOver}
              onPause={handlePause}
            />
            <DPad />
            <KickButton gameRef={gameRef} />
            <button className="pause-btn" onClick={handlePause}>
              {paused ? '>' : '| |'}
            </button>
          </>
        )}

        {screen === 'playing' && paused && (
          <PauseOverlay
            soundMuted={soundMuted}
            onToggleSound={handleToggleSound}
          />
        )}

        {screen === 'gameover' && (
          <GameOver
            winner={winner}
            finalScore={finalScore}
            onRestart={handleStart}
            onMenu={handleMenu}
          />
        )}
      </div>
    </>
  )
}
