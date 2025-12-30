import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSubscription } from '../context/SubscriptionContext';
import { colors, gradients, shadows, spacing, borderRadius } from '../theme/colors';

const { width, height } = Dimensions.get('window');

// Адаптивные размеры для разных экранов
// iPhone SE: 375x667, iPhone 14: 390x844, iPhone 14 Pro Max: 430x932
const isSmallDevice = width < 380;
const isMediumDevice = width >= 380 && width < 414;
const isLargeDevice = width >= 414;
const isShortDevice = height < 700; // iPhone SE

// Адаптивные отступы
const horizontalPadding = isSmallDevice ? 16 : isLargeDevice ? 28 : 24;

interface PlanProps {
  title: string;
  price: string;
  period: string;
  pricePerMonth?: string;
  savings?: string;
  isSelected: boolean;
  isBestValue: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanProps> = ({
  title,
  price,
  period,
  pricePerMonth,
  savings,
  isSelected,
  isBestValue,
  onSelect,
}) => (
  <TouchableOpacity
    style={[
      styles.planCard,
      isSelected && styles.planCardSelected,
    ]}
    onPress={onSelect}
    activeOpacity={0.7}
  >
    {isBestValue && (
      <LinearGradient
        colors={gradients.gold}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bestValueBadge}
      >
        <Ionicons name="flame" size={12} color="#000" />
        <Text style={styles.bestValueText}>ЛУЧШАЯ ЦЕНА</Text>
      </LinearGradient>
    )}
    <View style={styles.planContent}>
      <View style={styles.planLeft}>
        <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
          {isSelected && (
            <LinearGradient
              colors={gradients.cta}
              style={styles.radioInner}
            />
          )}
        </View>
        <View style={styles.planInfo}>
          <Text style={[styles.planTitle, isSelected && styles.planTitleSelected]}>{title}</Text>
          {pricePerMonth && <Text style={styles.pricePerMonth}>{pricePerMonth}</Text>}
          {savings && (
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsText}>{savings}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.planRight}>
        <Text style={[styles.planPrice, isSelected && styles.planPriceSelected]}>{price}</Text>
        <Text style={styles.planPeriod}>{period}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

interface FeatureItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  iconColor?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, iconColor = colors.primary }) => (
  <View style={styles.featureItem}>
    <LinearGradient
      colors={[`${iconColor}30`, `${iconColor}10`]}
      style={styles.featureIconContainer}
    >
      <Ionicons name={icon} size={20} color={iconColor} />
    </LinearGradient>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

export const PaywallScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const { subscribe } = useSubscription();

  const handleStartTrial = () => {
    subscribe();
    Alert.alert(
      'Добро пожаловать в Premium!',
      'Ваша бесплатная пробная версия активирована. Наслаждайтесь премиум-контентом!',
      [
        {
          text: 'Начать медитацию',
          onPress: () => navigation.navigate('Meditations'),
        },
      ]
    );
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Яркий глубокий космический фон */}
      <LinearGradient 
        colors={['#0F0A1F', '#1A1333', '#0F0A1F']} 
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Кнопка закрытия */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <View style={styles.closeButtonInner}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {/* Заголовок */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={gradients.premium}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGradient}
              >
                <MaterialCommunityIcons name="meditation" size={40} color="#FFF" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>ZenPulse</Text>
            <Text style={styles.titlePremium}>Premium</Text>
            <Text style={styles.subtitle}>
              Разблокируйте полный доступ к осознанности и внутреннему покою
            </Text>
          </View>

          {/* Список преимуществ */}
          <View style={styles.featuresContainer}>
            <FeatureItem 
              icon="headset" 
              text="100+ эксклюзивных медитаций" 
              iconColor={colors.primary}
            />
            <FeatureItem 
              icon="moon" 
              text="Сессии для глубокого сна" 
              iconColor={colors.secondary}
            />
            <FeatureItem 
              icon="sparkles" 
              text="AI персональные рекомендации" 
              iconColor={colors.teal}
            />
            <FeatureItem 
              icon="stats-chart" 
              text="Трекинг прогресса и аналитика" 
              iconColor={colors.success}
            />
            <FeatureItem 
              icon="notifications-off" 
              text="Без рекламы и ограничений" 
              iconColor={colors.warning}
            />
            <FeatureItem 
              icon="refresh" 
              text="Еженедельный новый контент" 
              iconColor="#FF6B6B"
            />
          </View>

          {/* Тарифы */}
          <View style={styles.plansContainer}>
            <PlanCard
              title="Годовой"
              price="2 990 ₽"
              period="в год"
              pricePerMonth="249 ₽/мес"
              savings="Экономия 70%"
              isSelected={selectedPlan === 'yearly'}
              isBestValue={true}
              onSelect={() => setSelectedPlan('yearly')}
            />
            <PlanCard
              title="Месячный"
              price="499 ₽"
              period="в месяц"
              isSelected={selectedPlan === 'monthly'}
              isBestValue={false}
              onSelect={() => setSelectedPlan('monthly')}
            />
          </View>

          {/* Кнопка подписки */}
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handleStartTrial}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={gradients.cta}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.subscribeGradient}
            >
              <Text style={styles.subscribeText}>Попробовать 7 дней бесплатно</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.subscribeIcon} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Условия */}
          <Text style={styles.termsText}>
            Затем {selectedPlan === 'yearly' ? '2 990 ₽/год' : '499 ₽/месяц'}. Отмена в любой момент.
          </Text>

          {/* Гарантии */}
          <View style={styles.guaranteesContainer}>
            <View style={styles.guaranteeItem}>
              <Ionicons name="shield-checkmark" size={18} color={colors.success} />
              <Text style={styles.guaranteeText}>Безопасная оплата</Text>
            </View>
            <View style={styles.guaranteeDivider} />
            <View style={styles.guaranteeItem}>
              <Ionicons name="refresh-circle" size={18} color={colors.success} />
              <Text style={styles.guaranteeText}>Возврат 30 дней</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
    opacity: 0.25,
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: horizontalPadding,
    paddingBottom: isShortDevice ? 24 : 40,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: isSmallDevice ? 4 : 8,
  },
  closeButtonInner: {
    width: isSmallDevice ? 28 : 32,
    height: isSmallDevice ? 28 : 32,
    borderRadius: isSmallDevice ? 14 : 16,
    backgroundColor: colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  header: {
    alignItems: 'center',
    marginTop: isShortDevice ? 4 : 8,
    marginBottom: isShortDevice ? 20 : 32, // Больше воздуха на больших экранах
  },
  logoContainer: {
    marginBottom: isShortDevice ? 12 : 20,
    ...shadows.glow,
  },
  logoGradient: {
    width: isSmallDevice ? 64 : isLargeDevice ? 88 : 80,
    height: isSmallDevice ? 64 : isLargeDevice ? 88 : 80,
    borderRadius: isSmallDevice ? 18 : 24, // Мягкие скругления
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: isSmallDevice ? 28 : isLargeDevice ? 38 : 34,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'System',
  },
  titlePremium: {
    fontSize: isSmallDevice ? 16 : 20,
    fontWeight: '600',
    color: colors.secondary,
    marginTop: 4,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'System',
  },
  subtitle: {
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
    paddingHorizontal: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  featuresContainer: {
    marginBottom: 28,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureText: {
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  plansContainer: {
    marginBottom: 24,
    gap: 12,
  },
  planCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    overflow: 'visible',
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.cardBackgroundLight,
    ...shadows.medium,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -12,
    left: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  bestValueText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  planContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  planTitleSelected: {
    color: colors.textPrimary,
  },
  pricePerMonth: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  savingsBadge: {
    backgroundColor: `${colors.success}20`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  savingsText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  planRight: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'System',
  },
  planPriceSelected: {
    color: colors.textPrimary,
  },
  planPeriod: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  subscribeButton: {
    marginBottom: 16,
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.large,
  },
  subscribeGradient: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  subscribeIcon: {
    marginLeft: 8,
  },
  termsText: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontSize: 13,
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  guaranteesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guaranteeDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.separator,
    marginHorizontal: 16,
  },
  guaranteeText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
});
