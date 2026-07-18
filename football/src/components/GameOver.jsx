export default function GameOver({ winner, finalScore, onRestart, onMenu }) {
  return (
    <div className="game-over">
      <h2>{winner}</h2>
      <p>{finalScore}</p>
      <button className="menu-btn" onClick={onRestart}>Play Again</button>
      <button className="menu-btn" onClick={onMenu}>Main Menu</button>
    </div>
  )
}
