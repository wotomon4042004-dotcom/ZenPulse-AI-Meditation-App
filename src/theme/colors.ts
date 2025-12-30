// Цветовая палитра для медитационного приложения
// ЯРКИЙ, ДОРОГОЙ дизайн в стиле медитаций (по ТЗ)

export const colors = {
  // Основная палитра - ЯРКИЕ насыщенные тона
  primary: '#7C3AED', // Насыщенный фиолетовый (премиум)
  primaryLight: '#A78BFA',
  primaryDark: '#5B21B6',
  
  // Вторичные цвета - яркие акценты
  secondary: '#EC4899', // Яркий розовый/маджента
  secondaryLight: '#F472B6',
  
  // Акцентные цвета (яркие, заметные)
  accent: '#FBBF24', // Яркий золотой (премиум)
  accentLight: '#FCD34D',
  success: '#10B981', // Яркий изумрудный
  warning: '#F59E0B', // Яркий оранжевый
  teal: '#06B6D4', // Яркий бирюзовый
  
  // Текст
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.4)',
  textMuted: 'rgba(255, 255, 255, 0.2)',
  
  // Фоны - единый тёмный стиль (без полос!)
  background: '#1A1A2E', // Глубокий фиолетово-синий
  backgroundElevated: '#1A1A2E',
  backgroundSecondary: '#16213E',
  backgroundTertiary: '#0F3460',
  cardBackground: 'rgba(255, 255, 255, 0.08)',
  cardBackgroundLight: 'rgba(255, 255, 255, 0.12)',
  cardBackgroundHover: 'rgba(255, 255, 255, 0.16)',
  
  // Glass effect
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  
  // Границы
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.2)',
  separator: 'rgba(255, 255, 255, 0.1)',
  
  // Состояния
  locked: 'rgba(255, 255, 255, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',
};

export const gradients = {
  // Основной фон - ЕДИНЫЙ градиент (без полос!)
  main: ['#1A1A2E', '#16213E', '#1A1A2E'] as const,
  
  // Премиум градиенты - ЯРКИЕ
  premium: ['#7C3AED', '#EC4899'] as const,
  premiumSubtle: ['rgba(124, 58, 237, 0.3)', 'rgba(236, 72, 153, 0.15)'] as const,
  
  // Золотой для акцентов (премиум стиль)
  gold: ['#FBBF24', '#F59E0B'] as const,
  
  // Для медитаций
  calm: ['#7C3AED', '#06B6D4'] as const,
  calmSubtle: ['rgba(124, 58, 237, 0.2)', 'rgba(6, 182, 212, 0.1)'] as const,
  
  // Карточки
  card: ['rgba(124, 58, 237, 0.15)', 'rgba(124, 58, 237, 0.05)'] as const,
  cardHover: ['rgba(124, 58, 237, 0.25)', 'rgba(124, 58, 237, 0.1)'] as const,
  
  // Кнопка CTA - яркий градиент
  cta: ['#7C3AED', '#EC4899'] as const,
  ctaPressed: ['#6D28D9', '#DB2777'] as const,
  
  // AI секция
  ai: ['rgba(236, 72, 153, 0.2)', 'rgba(124, 58, 237, 0.1)'] as const,
};

// Тени - мягкие, не резкие
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6B7FD7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
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
