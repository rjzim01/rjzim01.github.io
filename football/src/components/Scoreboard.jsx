export default function Scoreboard({ score, timeLeft }) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div className="score-board">
      <div className="score player1">
        <span className="team-name">You</span>
        <span className="score-value">{score.player}</span>
      </div>
      <div className="timer">{timeStr}</div>
      <div className="score player2">
        <span className="team-name">AI</span>
        <span className="score-value">{score.ai}</span>
      </div>
    </div>
  )
}
