import { useTheme } from '../context/ThemeContext';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <div className="theme-switcher">
      <h3>🎨 Choose Theme</h3>
      <div className="theme-grid">
        {availableThemes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-option ${currentTheme.id === theme.id ? 'active' : ''}`}
            onClick={() => setTheme(theme.id)}
            title={`Switch to ${theme.name}`}
          >
            <div
              className="theme-preview"
              style={{
                background: theme.colors.background.includes('gradient')
                  ? theme.colors.background
                  : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
              }}
            />
            <span className="theme-name">{theme.name}</span>
            {currentTheme.id === theme.id && <span className="theme-checkmark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
