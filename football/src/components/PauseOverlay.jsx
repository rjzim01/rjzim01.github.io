import { getSoundMuted, setSoundMuted } from '../engine/sound'

export default function PauseOverlay({ soundMuted, onToggleSound }) {
  const handleToggle = () => {
    setSoundMuted(!soundMuted)
    onToggleSound()
  }

  return (
    <div className="pause-overlay">
      <h2>PAUSED</h2>
      <button className="pause-sound-btn" onClick={handleToggle}>
        {soundMuted ? '🔇 Unmute Sound' : '🔊 Mute Sound'}
      </button>
    </div>
  )
}
