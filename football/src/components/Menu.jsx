import { useState } from 'react'

export default function Menu({ difficulty, onDifficultyChange, onStart }) {
  return (
    <div className="menu">
      <h2>2D Football</h2>
      <div className="difficulty">
        <p>Select Difficulty:</p>
        <div className="diff-buttons">
          {['easy', 'medium', 'hard'].map(level => (
            <button
              key={level}
              className={`diff-btn ${difficulty === level ? 'active' : ''}`}
              onClick={() => onDifficultyChange(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <button className="start-btn" onClick={onStart}>Start Game</button>
    </div>
  )
}
