import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFontLoader } from '@/hooks/use-font-loader';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

// Simple professional logo component
const TerraFundLogo = ({ size = 100 }: { size?: number }) => {
  return (
    <View style={[styles.logoRoot, { width: size, height: size }]}>
      <MaterialIcons name="agriculture" size={size * 0.6} color="#11d421" />
    </View>
  );
};

// Reusable feature card component
const FeatureCard = ({
  icon,
  title,
  description,
  isDark,
}: {
  icon: string;
  title: string;
  description: string;
  isDark: boolean;
}) => {
  return (
    <View
      style={[
        styles.featureCard,
        {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#eeeeee',
        }
      ]}
    >
      <View style={styles.featureIconContainer}>
        <MaterialIcons name={icon as any} size={28} color="#11d421" />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={[styles.featureTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
          {title}
        </Text>
        <Text style={[styles.featureDescription, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

// Stats item component
const StatItem = ({ label, value, isDark }: { label: string; value: string; isDark: boolean }) => (
  <View style={styles.statItem}>
    <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#11d421' }]}>{value}</Text>
    <Text style={[styles.statLabel, { color: isDark ? '#888888' : '#666666' }]}>{label}</Text>
  </View>
);

export default function Index() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { fontsLoaded } = useFontLoader();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }]}>
        <ActivityIndicator size="large" color="#11d421" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#fcfcfc' }]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Decorative Background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={isDark ? ['#0a0a0a', '#1a1a1a'] : ['#fcfcfc', '#f0fdf4']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.decorativeBackground}>
          <View style={[styles.circle, styles.circleTopRight, { backgroundColor: isDark ? 'rgba(17, 212, 33, 0.05)' : 'rgba(17, 212, 33, 0.1)' }]} />
          <View style={[styles.circle, styles.circleBottomLeft, { backgroundColor: isDark ? 'rgba(17, 212, 33, 0.03)' : 'rgba(17, 212, 33, 0.05)' }]} />
        </View>
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Formal Header */}
        <View style={styles.headerBranding}>
          <Text style={[styles.brandText, { color: '#11d421' }]}>TerraFund</Text>
          <Pressable
            style={[styles.headerLoginButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={[styles.headerLoginText, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Log In</Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <TerraFundLogo size={90} />
              <Text style={[styles.headline, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                The Future of Agricultural Investing
              </Text>
              <Text style={[styles.tagline, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
                Invest in sustainable farmland and grow your portfolio alongside global food demand. Secure, transparent, and high-impact.
              </Text>

              <Pressable
                style={styles.heroPrimaryButton}
                onPress={() => router.push('/auth/signup')}
              >
                <Text style={styles.heroPrimaryButtonText}>Get Started Now</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#fff" />
              </Pressable>
            </View>

            {/* Stats Bar */}
            <View style={[styles.statsBar, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff', borderColor: isDark ? '#333' : '#eee' }]}>
              <StatItem label="Acres" value="12.5k+" isDark={isDark} />
              <View style={styles.divider} />
              <StatItem label="Investors" value="8.2k+" isDark={isDark} />
              <View style={styles.divider} />
              <StatItem label="Avg ROI" value="14.2%" isDark={isDark} />
            </View>

            {/* Why TerraFund */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Why TerraFund?</Text>

              <FeatureCard
                icon="verified-user"
                title="Asset Security"
                description="Licensed and regulated asset management ensuring your capital is protected by tangible land deeds."
                isDark={isDark}
              />
              <FeatureCard
                icon="trending-up"
                title="Sustainable Growth"
                description="Direct investment into high-yield agricultural projects with measurable environmental and social impact."
                isDark={isDark}
              />
              <FeatureCard
                icon="track-changes"
                title="Transparent Tracking"
                description="Real-time updates and satellite monitoring for every funded acre. Know exactly how your farm is performing."
                isDark={isDark}
              />
            </View>

            {/* How It Works */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>How it Works</Text>
              <View style={styles.stepsList}>
                {[
                  { step: '01', title: 'Choose Asset', desc: 'Select from verified farm projects with projected returns.' },
                  { step: '02', title: 'Start Investing', desc: 'Secure fractional ownership with professional legal backing.' },
                  { step: '03', title: 'Earn & Impact', desc: 'Receive crop sale payouts and track sustainability progress.' }
                ].map((item, idx) => (
                  <View key={idx} style={styles.stepRow}>
                    <Text style={styles.stepNumber}>{item.step}</Text>
                    <View style={styles.stepContent}>
                      <Text style={[styles.stepTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.title}</Text>
                      <Text style={[styles.stepDesc, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>{item.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Final CTA Area */}
            <View style={styles.finalCTA}>
              <Text style={[styles.ctaText, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Ready to grow your wealth?</Text>
              <Pressable
                style={styles.ctaButton}
                onPress={() => router.push('/auth/signup')}
              >
                <Text style={styles.ctaButtonText}>Create Your Account</Text>
              </Pressable>
            </View>

            <View style={{ height: 60 }} />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorativeBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 200,
    width: 300,
    height: 300,
  },
  circleTopRight: {
    top: -100,
    right: -100,
  },
  circleBottomLeft: {
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
  },
  headerBranding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    zIndex: 10,
  },
  brandText: {
    fontSize: 28,
    fontFamily: 'Aclonica_400Regular',
    color: '#11d421',
    letterSpacing: -1.5,
  },
  headerLoginButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  headerLoginText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 10,
  },
  logoRoot: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headline: {
    fontSize: 36,
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 20,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  heroPrimaryButton: {
    backgroundColor: '#11d421',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  heroPrimaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  statsBar: {
    flexDirection: 'row',
    paddingVertical: 24,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 48,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#eeeeee',
    alignSelf: 'center',
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIconContainer: {
    marginRight: 20,
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 22,
  },
  stepsList: {
    gap: 28,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#11d421',
    marginRight: 20,
    width: 45,
    textAlign: 'center',
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
  },
  stepDesc: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 22,
  },
  finalCTA: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(17, 212, 33, 0.05)',
    borderRadius: 32,
    marginTop: 20,
  },
  ctaText: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 16,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});


