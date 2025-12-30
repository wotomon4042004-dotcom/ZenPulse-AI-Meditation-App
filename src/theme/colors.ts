// Цветовая палитра для медитационного приложения
// Apple-style: чистый, яркий, минималистичный

export const colors = {
  // Основная палитра - Apple system colors
  primary: '#007AFF', // Apple Blue
  primaryLight: '#5AC8FA', // Apple Light Blue
  primaryDark: '#0051D5',
  
  // Вторичные цвета - Apple palette
  secondary: '#FF2D55', // Apple Pink
  secondaryLight: '#FF6482',
  
  // Акцентные цвета - чистые Apple цвета
  accent: '#FF9500', // Apple Orange
  accentLight: '#FFCC00', // Apple Yellow
  success: '#34C759', // Apple Green
  warning: '#FF9500', // Apple Orange
  teal: '#5AC8FA', // Apple Teal
  purple: '#AF52DE', // Apple Purple
  indigo: '#5856D6', // Apple Indigo
  
  // Текст - чистый белый
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.45)',
  textMuted: 'rgba(255, 255, 255, 0.25)',
  
  // Фоны - чистый тёмный Apple style
  background: '#000000', // Pure black (OLED)
  backgroundElevated: '#1C1C1E', // Apple elevated dark
  backgroundSecondary: '#2C2C2E', // Apple secondary dark
  backgroundTertiary: '#3A3A3C', // Apple tertiary dark
  cardBackground: 'rgba(255, 255, 255, 0.08)',
  cardBackgroundLight: 'rgba(255, 255, 255, 0.12)',
  cardBackgroundHover: 'rgba(255, 255, 255, 0.18)',
  
  // Glass effect - чистый
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  
  // Границы - минималистичные
  border: 'rgba(255, 255, 255, 0.15)',
  borderLight: 'rgba(255, 255, 255, 0.25)',
  separator: 'rgba(255, 255, 255, 0.1)',
  
  // Состояния
  locked: 'rgba(255, 255, 255, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.75)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
};

export const gradients = {
  // Основной фон - чистый чёрный
  main: ['#000000', '#1C1C1E', '#000000'] as const,
  
  // Премиум градиенты - Apple style
  premium: ['#007AFF', '#5856D6'] as const, // Blue to Indigo
  premiumSubtle: ['rgba(0, 122, 255, 0.3)', 'rgba(88, 86, 214, 0.15)'] as const,
  
  // Sunset - тёплые тона
  sunset: ['#FF2D55', '#FF9500'] as const, // Pink to Orange
  
  // Ocean - холодные тона
  ocean: ['#5AC8FA', '#007AFF'] as const, // Teal to Blue
  
  // Золотой для премиума
  gold: ['#FFCC00', '#FF9500'] as const, // Yellow to Orange
  
  // Calm - спокойные
  calm: ['#5856D6', '#AF52DE'] as const, // Indigo to Purple
  calmSubtle: ['rgba(88, 86, 214, 0.25)', 'rgba(175, 82, 222, 0.1)'] as const,
  
  // Карточки
  card: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'] as const,
  cardHover: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)'] as const,
  
  // CTA кнопка - яркий Apple градиент
  cta: ['#007AFF', '#5856D6'] as const,
  ctaPressed: ['#0051D5', '#4240B0'] as const,
  
  // AI секция
  ai: ['rgba(175, 82, 222, 0.2)', 'rgba(88, 86, 214, 0.1)'] as const,
  
  // Дополнительные
  mint: ['#34C759', '#5AC8FA'] as const, // Green to Teal
  fire: ['#FF9500', '#FF2D55'] as const, // Orange to Pink
};

// Тени - чистые, без цвета (Apple style)
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  glowPink: {
    shadowColor: '#FF2D55',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  glowCyan: {
    shadowColor: '#5AC8FA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
};

// Адаптивные размеры для разных экранов (iPhone SE 375px - Pro Max 430px)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Радиусы скругления - мягкие формы (рекомендация из статьи)
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 9999,
};
