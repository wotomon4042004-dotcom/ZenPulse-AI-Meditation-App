// Цветовая палитра для медитационного приложения
// ЯРКИЕ ВЫСОКОКОНТРАСТНЫЕ цвета (тренд 2025)
// Схема: яркие градиенты + неоновые акценты

export const colors = {
  // Основная палитра - НЕОНОВЫЕ насыщенные тона
  primary: '#8B5CF6', // Яркий неоновый фиолетовый
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',
  
  // Вторичные цвета - ВЫСОКОКОНТРАСТНЫЕ
  secondary: '#F472B6', // Яркий неоновый розовый
  secondaryLight: '#FB7185',
  
  // Акцентные цвета - НЕОНОВЫЕ (бирюзовый, зелёный, оранжевый)
  accent: '#FACC15', // Яркий жёлтый/золотой
  accentLight: '#FDE047',
  success: '#34D399', // Неоновый зелёный
  warning: '#FB923C', // Неоновый оранжевый
  teal: '#22D3EE', // Яркий неоновый бирюзовый (cyan)
  coral: '#FF6B6B', // Яркий коралловый
  lime: '#A3E635', // Неоновый лайм
  
  // Текст
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.75)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',
  textMuted: 'rgba(255, 255, 255, 0.3)',
  
  // Фоны - глубокий тёмный с фиолетовым оттенком
  background: '#0F0A1F', // Глубокий космический тёмный
  backgroundElevated: '#1A1333',
  backgroundSecondary: '#15102B',
  backgroundTertiary: '#231A42',
  cardBackground: 'rgba(139, 92, 246, 0.12)',
  cardBackgroundLight: 'rgba(139, 92, 246, 0.18)',
  cardBackgroundHover: 'rgba(139, 92, 246, 0.25)',
  
  // Glass effect - яркий
  glass: 'rgba(139, 92, 246, 0.15)',
  glassBorder: 'rgba(139, 92, 246, 0.3)',
  
  // Границы - с фиолетовым оттенком
  border: 'rgba(139, 92, 246, 0.2)',
  borderLight: 'rgba(139, 92, 246, 0.35)',
  separator: 'rgba(139, 92, 246, 0.15)',
  
  // Состояния
  locked: 'rgba(255, 255, 255, 0.25)',
  overlay: 'rgba(15, 10, 31, 0.85)',
  overlayLight: 'rgba(15, 10, 31, 0.6)',
};

export const gradients = {
  // Основной фон - глубокий космический
  main: ['#0F0A1F', '#1A1333', '#0F0A1F'] as const,
  
  // Премиум градиенты - ЯРКИЕ НЕОНОВЫЕ
  premium: ['#8B5CF6', '#EC4899', '#F472B6'] as const,
  premiumSubtle: ['rgba(139, 92, 246, 0.4)', 'rgba(236, 72, 153, 0.2)'] as const,
  
  // Закатные яркие градиенты (тренд!)
  sunset: ['#F472B6', '#FB923C', '#FACC15'] as const,
  
  // Океанские яркие градиенты
  ocean: ['#22D3EE', '#8B5CF6'] as const,
  
  // Золотой для акцентов (премиум)
  gold: ['#FACC15', '#FB923C'] as const,
  
  // Для медитаций - успокаивающие но яркие
  calm: ['#8B5CF6', '#22D3EE'] as const,
  calmSubtle: ['rgba(139, 92, 246, 0.3)', 'rgba(34, 211, 238, 0.15)'] as const,
  
  // Карточки - с неоновым свечением
  card: ['rgba(139, 92, 246, 0.2)', 'rgba(236, 72, 153, 0.1)'] as const,
  cardHover: ['rgba(139, 92, 246, 0.35)', 'rgba(236, 72, 153, 0.2)'] as const,
  
  // Кнопка CTA - яркий неоновый градиент
  cta: ['#8B5CF6', '#EC4899'] as const,
  ctaPressed: ['#7C3AED', '#DB2777'] as const,
  
  // AI секция - яркий контраст
  ai: ['rgba(34, 211, 238, 0.25)', 'rgba(139, 92, 246, 0.15)'] as const,
  
  // Дополнительные эффектные градиенты
  neon: ['#22D3EE', '#8B5CF6', '#EC4899'] as const,
  fire: ['#FB923C', '#F472B6', '#8B5CF6'] as const,
};

// Тени - мягкие ЦВЕТНЫЕ (тренд 2025)
export const shadows = {
  small: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  glow: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 10,
  },
  glowPink: {
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  glowCyan: {
    shadowColor: '#22D3EE',
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
