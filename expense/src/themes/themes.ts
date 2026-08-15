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
  };
}

export const themes: Record<string, Theme> = {
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
    },
  },
};

export const themeList = Object.values(themes);
