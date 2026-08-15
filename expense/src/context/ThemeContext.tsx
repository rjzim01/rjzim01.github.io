import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  name: string;
  id: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    success: string;
    error: string;
    warning: string;
    border: string;
    borderLight: string;
    inputBg: string;
    inputBorder: string;
    hoverBg: string;
    placeholder: string;
    divider: string;
    cardBg: string;
    shadowColor: string;
  };
}

const themes: Record<string, Theme> = {
  modernPremium: {
    name: 'Modern Premium',
    id: 'modernPremium',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      tertiary: '#f5f7fa',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#555555',
      accent: '#667eea',
      success: '#4CAF50',
      error: '#FF6B6B',
      warning: '#f59e0b',
      border: '#e8e8e8',
      borderLight: '#f0f0f0',
      inputBg: '#ffffff',
      inputBorder: '#e8e8e8',
      hoverBg: 'rgba(102, 126, 234, 0.08)',
      placeholder: '#999999',
      divider: '#e0e0e0',
      cardBg: '#ffffff',
      shadowColor: 'rgba(102, 126, 234, 0.25)',
    },
  },
  darkMode: {
    name: 'Dark Mode',
    id: 'darkMode',
    colors: {
      primary: '#00d4ff',
      secondary: '#0099ff',
      tertiary: '#1a1a2e',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)',
      surface: '#16213e',
      text: '#e0e0e0',
      textSecondary: '#a0a0a0',
      accent: '#00d4ff',
      success: '#00ff88',
      error: '#ff3366',
      warning: '#ffaa00',
      border: '#2a2a4e',
      borderLight: '#1f1f3a',
      inputBg: '#1a1a2e',
      inputBorder: '#2a2a4e',
      hoverBg: 'rgba(0, 212, 255, 0.1)',
      placeholder: '#707090',
      divider: '#2a2a4e',
      cardBg: '#1f1f3a',
      shadowColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
  minimalist: {
    name: 'Minimalist',
    id: 'minimalist',
    colors: {
      primary: '#333333',
      secondary: '#666666',
      tertiary: '#f9f9f9',
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      accent: '#333333',
      success: '#2ecc71',
      error: '#e74c3c',
      warning: '#f39c12',
      border: '#e0e0e0',
      borderLight: '#f0f0f0',
      inputBg: '#ffffff',
      inputBorder: '#d0d0d0',
      hoverBg: '#f5f5f5',
      placeholder: '#999999',
      divider: '#e8e8e8',
      cardBg: '#ffffff',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  materialDesign: {
    name: 'Material Design',
    id: 'materialDesign',
    colors: {
      primary: '#6200EE',
      secondary: '#03DAC6',
      tertiary: '#f5f5f5',
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
      surface: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#666666',
      accent: '#BB86FC',
      success: '#1db679',
      error: '#CF6679',
      warning: '#ffb74d',
      border: '#e0e0e0',
      borderLight: '#f5f5f5',
      inputBg: '#ffffff',
      inputBorder: '#dcdcdc',
      hoverBg: '#f5f5f5',
      placeholder: '#999999',
      divider: '#e8e8e8',
      cardBg: '#ffffff',
      shadowColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
  glassmorphism: {
    name: 'Glassmorphism',
    id: 'glassmorphism',
    colors: {
      primary: '#7c5ac2',
      secondary: '#ec4899',
      tertiary: '#f3e8ff',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      surface: 'rgba(255, 255, 255, 0.25)',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      accent: '#fbbf24',
      success: '#86efac',
      error: '#fca5a5',
      warning: '#fed7aa',
      border: 'rgba(255, 255, 255, 0.3)',
      borderLight: 'rgba(255, 255, 255, 0.2)',
      inputBg: 'rgba(255, 255, 255, 0.15)',
      inputBorder: 'rgba(255, 255, 255, 0.3)',
      hoverBg: 'rgba(255, 255, 255, 0.2)',
      placeholder: 'rgba(255, 255, 255, 0.6)',
      divider: 'rgba(255, 255, 255, 0.2)',
      cardBg: 'rgba(255, 255, 255, 0.15)',
      shadowColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  softPastel: {
    name: 'Soft Pastel',
    id: 'softPastel',
    colors: {
      primary: '#a78bfa',
      secondary: '#f472b6',
      tertiary: '#fdf2f8',
      background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 100%)',
      surface: '#ffffff',
      text: '#4b5563',
      textSecondary: '#8b92a9',
      accent: '#c4b5fd',
      success: '#86efac',
      error: '#fb7185',
      warning: '#fcd34d',
      border: '#e9d5ff',
      borderLight: '#f3e8ff',
      inputBg: '#fdf2f8',
      inputBorder: '#e9d5ff',
      hoverBg: '#f3e8ff',
      placeholder: '#c084fc',
      divider: '#e9d5ff',
      cardBg: '#ffffff',
      shadowColor: 'rgba(167, 139, 250, 0.15)',
    },
  },
  cyberpunk: {
    name: 'Cyberpunk',
    id: 'cyberpunk',
    colors: {
      primary: '#ff006e',
      secondary: '#00f5ff',
      tertiary: '#0a0e27',
      background: 'linear-gradient(135deg, #0a0e27 0%, #16213e 100%)',
      surface: '#1a1f3a',
      text: '#00f5ff',
      textSecondary: '#ff006e',
      accent: '#ffbe0b',
      success: '#00ff00',
      error: '#ff006e',
      warning: '#ffbe0b',
      border: '#ff006e',
      borderLight: '#0f3460',
      inputBg: '#0f3460',
      inputBorder: '#ff006e',
      hoverBg: 'rgba(255, 0, 110, 0.1)',
      placeholder: '#00f5ff',
      divider: '#ff006e',
      cardBg: '#0f3460',
      shadowColor: 'rgba(255, 0, 110, 0.3)',
    },
  },
  corporate: {
    name: 'Corporate',
    id: 'corporate',
    colors: {
      primary: '#1e40af',
      secondary: '#1e3a8a',
      tertiary: '#f0f4f8',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#475569',
      accent: '#3b82f6',
      success: '#059669',
      error: '#dc2626',
      warning: '#d97706',
      border: '#cbd5e1',
      borderLight: '#e2e8f0',
      inputBg: '#ffffff',
      inputBorder: '#cbd5e1',
      hoverBg: '#f1f5f9',
      placeholder: '#94a3b8',
      divider: '#cbd5e1',
      cardBg: '#ffffff',
      shadowColor: 'rgba(30, 64, 175, 0.1)',
    },
  },
  tropical: {
    name: 'Tropical',
    id: 'tropical',
    colors: {
      primary: '#ff6b35',
      secondary: '#f7b801',
      tertiary: '#fffbea',
      background: 'linear-gradient(135deg, #fffbea 0%, #fff8dc 100%)',
      surface: '#ffffff',
      text: '#2d3436',
      textSecondary: '#636e72',
      accent: '#ff6b35',
      success: '#00b894',
      error: '#ff7675',
      warning: '#fdcb6e',
      border: '#ffd89b',
      borderLight: '#ffe5b4',
      inputBg: '#fffef9',
      inputBorder: '#ffc87c',
      hoverBg: '#fff8dc',
      placeholder: '#daa520',
      divider: '#ffd89b',
      cardBg: '#ffffff',
      shadowColor: 'rgba(255, 107, 53, 0.15)',
    },
  },
};

const themeList = Object.values(themes);

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedThemeId = localStorage.getItem('selectedTheme');
    return savedThemeId && themes[savedThemeId] ? themes[savedThemeId] : themes.modernPremium;
  });

  useEffect(() => {
    applyTheme(currentTheme);
    localStorage.setItem('selectedTheme', currentTheme.id);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes[themeId];
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    const colors = theme.colors;

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-tertiary', colors.tertiary);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-error', colors.error);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-border-light', colors.borderLight);
    root.style.setProperty('--color-input-bg', colors.inputBg);
    root.style.setProperty('--color-input-border', colors.inputBorder);
    root.style.setProperty('--color-hover-bg', colors.hoverBg);
    root.style.setProperty('--color-placeholder', colors.placeholder);
    root.style.setProperty('--color-divider', colors.divider);
    root.style.setProperty('--color-card-bg', colors.cardBg);
    root.style.setProperty('--color-shadow', colors.shadowColor);

    if (theme.colors.background.includes('gradient')) {
      document.body.style.background = theme.colors.background;
    } else {
      document.body.style.background = theme.colors.background;
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: themeList }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
