import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
  PixelRatio,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSubscription } from '../context/SubscriptionContext';
import { meditations, Meditation, aiAffirmations } from '../data/meditations';
import { colors, gradients, shadows, spacing, borderRadius } from '../theme/colors';

const { width, height } = Dimensions.get('window');

// Адаптивные размеры для разных экранов
// iPhone SE: 375x667, iPhone 14: 390x844, iPhone 14 Pro Max: 430x932
const isSmallDevice = width < 380; // iPhone SE, iPhone 8
const isMediumDevice = width >= 380 && width < 414;
const isLargeDevice = width >= 414;

// Функция масштабирования для разных экранов
const scale = (size: number) => {
  const baseWidth = 390; // iPhone 14 как базовый
  return Math.round((width / baseWidth) * size);
};

// Адаптивные отступы
const horizontalPadding = isSmallDevice ? 16 : isLargeDevice ? 24 : 20;
const CARD_GAP = isSmallDevice ? 10 : 12;
const CARD_WIDTH = (width - (horizontalPadding * 2) - CARD_GAP) / 2;

type Mood = 'happy' | 'neutral' | 'sad';

interface MoodConfig {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
}

const moodConfigs: Record<Mood, MoodConfig> = {
  happy: { icon: 'sunny', color: '#FFCC00', label: 'Радостно' }, // Apple Yellow
  neutral: { icon: 'partly-sunny', color: '#5AC8FA', label: 'Нейтрально' }, // Apple Teal
  sad: { icon: 'rainy', color: '#AF52DE', label: 'Грустно' }, // Apple Purple
};

interface MeditationCardProps {
  meditation: Meditation;
  isLocked: boolean;
  onPress: () => void;
}

const MeditationCard: React.FC<MeditationCardProps> = ({
  meditation,
  isLocked,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <TouchableOpacity
      style={styles.meditationCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardImageContainer}>
        {imageError ? (
          <LinearGradient
            colors={['#5856D6', '#007AFF']}
            style={styles.cardImagePlaceholder}
          >
            <MaterialCommunityIcons name="meditation" size={32} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        ) : (
          <Image
            source={{ uri: meditation.imageUrl }}
            style={[styles.cardImage, isLocked && styles.cardImageLocked]}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        )}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.cardGradient}
      />
      {isLocked && (
        <View style={styles.lockedOverlay}>
          <View style={styles.lockIconContainer}>
            <Ionicons name="lock-closed" size={22} color="#FFF" />
          </View>
          <View style={styles.premiumBadgeContainer}>
            <LinearGradient
              colors={gradients.gold}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.premiumBadgeGradient}
            >
              <Ionicons name="star" size={10} color="#000" />
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </LinearGradient>
          </View>
        </View>
      )}
      <View style={styles.durationBadge}>
        <Ionicons name="time-outline" size={12} color="#FFF" />
        <Text style={styles.durationText}>{meditation.duration} мин</Text>
      </View>
    </View>
    <View style={styles.cardContent}>
      <Text style={[styles.cardTitle, isLocked && styles.cardTitleLocked]} numberOfLines={2}>
        {meditation.title}
      </Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {meditation.description}
      </Text>
    </View>
  </TouchableOpacity>
  );
};

const MoodButton: React.FC<{
  mood: Mood;
  isSelected: boolean;
  onPress: () => void;
}> = ({ mood, isSelected, onPress }) => {
  const config = moodConfigs[mood];
  
  return (
    <TouchableOpacity
      style={[styles.moodButton, isSelected && styles.moodButtonSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isSelected ? (
        <LinearGradient
          colors={[`${config.color}40`, `${config.color}20`]}
          style={styles.moodButtonGradient}
        >
          <Ionicons name={config.icon} size={22} color={config.color} />
          <Text style={[styles.moodLabel, { color: config.color }]}>{config.label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.moodButtonInner}>
          <Ionicons name={config.icon} size={22} color={colors.textSecondary} />
          <Text style={styles.moodLabel}>{config.label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const MeditationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isSubscribed } = useSubscription();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMeditationPress = (meditation: Meditation) => {
    const isLocked = meditation.isPremium && !isSubscribed;
    
    if (isLocked) {
      navigation.navigate('Paywall');
    } else {
      Alert.alert(
        meditation.title,
        `Готовы начать ${meditation.duration}-минутную сессию?\n\n${meditation.description}`,
        [
          { text: 'Отмена', style: 'cancel' },
          { text: 'Начать', onPress: () => console.log('Start meditation') },
        ]
      );
    }
  };

  const generateAiAffirmation = async (mood: Mood) => {
    setSelectedMood(mood);
    setIsLoading(true);
    setAiResponse(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const affirmations = aiAffirmations[mood];
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    
    setAiResponse(affirmations[randomIndex]);
    setIsLoading(false);
  };

  const handlePaywallPress = () => {
    navigation.navigate('Paywall');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.main} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ZenPulse</Text>
            {!isSubscribed ? (
              <TouchableOpacity
                style={styles.premiumButton}
                onPress={handlePaywallPress}
              >
                <LinearGradient
                  colors={gradients.gold}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.premiumGradient}
                >
                  <Ionicons name="sparkles" size={14} color="#000" />
                  <Text style={styles.premiumButtonText}>Premium</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.subscribedBadge}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.subscribedText}>Premium</Text>
              </View>
            )}
          </View>

          {/* AI Настрой дня */}
          <View style={styles.aiSection}>
            <LinearGradient
              colors={gradients.premiumSubtle}
              style={styles.aiGradientBg}
            />
            <View style={styles.aiHeader}>
              <View style={styles.aiIconContainer}>
                <LinearGradient
                  colors={gradients.cta}
                  style={styles.aiIconGradient}
                >
                  <MaterialCommunityIcons name="robot-outline" size={24} color="#FFF" />
                </LinearGradient>
              </View>
              <View style={styles.aiHeaderText}>
                <Text style={styles.aiTitle}>AI Настрой дня</Text>
                <Text style={styles.aiSubtitle}>Как ты себя чувствуешь сегодня?</Text>
              </View>
            </View>

            <View style={styles.moodContainer}>
              <MoodButton
                mood="happy"
                isSelected={selectedMood === 'happy'}
                onPress={() => generateAiAffirmation('happy')}
              />
              <MoodButton
                mood="neutral"
                isSelected={selectedMood === 'neutral'}
                onPress={() => generateAiAffirmation('neutral')}
              />
              <MoodButton
                mood="sad"
                isSelected={selectedMood === 'sad'}
                onPress={() => generateAiAffirmation('sad')}
              />
            </View>

            {isLoading && (
              <View style={styles.aiResponseContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.loadingText}>AI генерирует для тебя...</Text>
              </View>
            )}

            {aiResponse && !isLoading && (
              <View style={styles.aiResponseContainer}>
                <LinearGradient
                  colors={gradients.ai}
                  style={styles.aiResponseGradient}
                >
                  <View style={styles.aiResponseHeader}>
                    <Ionicons name="sparkles" size={16} color={colors.secondary} />
                    <Text style={styles.aiResponseLabel}>Твоя аффирмация</Text>
                  </View>
                  <Text style={styles.aiResponseText}>{aiResponse}</Text>
                </LinearGradient>
              </View>
            )}
          </View>

          {/* Секция медитаций */}
          <View style={styles.meditationsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Медитации</Text>
              <View style={styles.statusBadge}>
                {isSubscribed ? (
                  <>
                    <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                    <Text style={[styles.statusText, { color: colors.success }]}>Полный доступ</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="lock-open-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.statusText}>{meditations.filter(m => !m.isPremium).length} из {meditations.length}</Text>
                  </>
                )}
              </View>
            </View>

            <View style={styles.meditationsGrid}>
              {meditations.map((meditation) => {
                const isLocked = meditation.isPremium && !isSubscribed;
                return (
                  <MeditationCard
                    key={meditation.id}
                    meditation={meditation}
                    isLocked={isLocked}
                    onPress={() => handleMeditationPress(meditation)}
                  />
                );
              })}
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
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: horizontalPadding,
    paddingBottom: isSmallDevice ? 80 : 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: isSmallDevice ? 4 : 8,
    marginBottom: isSmallDevice ? 16 : 20,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 22 : isLargeDevice ? 26 : 24,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'System',
  },
  premiumButton: {
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.small,
  },
  premiumGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 5,
  },
  premiumButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  subscribedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: `${colors.success}20`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribedText: {
    color: colors.success,
    fontWeight: '600',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  aiSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  aiGradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  aiIconContainer: {
    marginRight: 12,
    ...shadows.small,
  },
  aiIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiHeaderText: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'System',
  },
  aiSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  moodContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  moodButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    borderColor: colors.primary,
  },
  moodButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    gap: 6,
  },
  moodButtonInner: {
    paddingVertical: 12,
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.cardBackgroundLight,
  },
  moodLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  aiResponseContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: 8,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  aiResponseGradient: {
    borderRadius: 12,
    padding: 14,
    width: '100%',
  },
  aiResponseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  aiResponseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  aiResponseText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  meditationsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'System',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  meditationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: CARD_GAP,
  },
  meditationCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.cardBackground,
    borderRadius: isSmallDevice ? 16 : 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.medium,
  },
  cardImageContainer: {
    position: 'relative',
    height: isSmallDevice ? 110 : isLargeDevice ? 140 : 130, // Адаптивная высота
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.cardBackgroundLight,
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageLocked: {
    opacity: 0.4,
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIconContainer: {
    width: isSmallDevice ? 40 : 48,
    height: isSmallDevice ? 40 : 48,
    borderRadius: isSmallDevice ? 20 : 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  premiumBadgeContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  premiumBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  premiumBadgeText: {
    color: '#000',
    fontSize: isSmallDevice ? 10 : 11,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isSmallDevice ? 6 : 8,
    paddingVertical: isSmallDevice ? 3 : 4,
    borderRadius: 10,
    gap: 4,
  },
  durationText: {
    color: '#FFF',
    fontSize: isSmallDevice ? 10 : 11,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  cardContent: {
    padding: isSmallDevice ? 10 : 14,
  },
  cardTitle: {
    fontSize: isSmallDevice ? 13 : 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
  cardTitleLocked: {
    color: colors.textTertiary,
  },
  cardDescription: {
    fontSize: isSmallDevice ? 11 : 12,
    color: colors.textSecondary,
    lineHeight: isSmallDevice ? 15 : 17,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'System',
  },
});
