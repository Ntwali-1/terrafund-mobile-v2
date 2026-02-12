import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

const TerraFundLogo = ({ size = 140 }: { size?: number }) => {
  const scaleAnim = new Animated.Value(0);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.logoContainer,
        {
          width: size,
          height: size,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <Animated.View style={{ transform: [{ rotate }] }}>
        <View style={styles.logoFlag}>
          <LinearGradient
            colors={['#11d421', '#0fb31c', '#0d9618']}
            style={[styles.logoPole, styles.logoGlow]}
          />
          <LinearGradient
            colors={['#11d421', '#0fb31c']}
            style={[styles.logoFlagShape, styles.logoGlow]}
          />
        </View>
      </Animated.View>
      <View style={styles.logoLand}>
        <View style={[styles.logoField, { opacity: 0.4 }]} />
        <View style={[styles.logoField, { opacity: 0.6 }]} />
        <View style={[styles.logoField, { opacity: 0.8 }]} />
      </View>
    </Animated.View>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  isDark,
  delay
}: {
  icon: string;
  title: string;
  description: string;
  isDark: boolean;
  delay: number;
}) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Animated.View
        style={[
          styles.featureCard,
          {
            backgroundColor: isDark ? 'rgba(17, 17, 17, 0.6)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.15)',
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: pressed ? 0.98 : 1 }
            ],
          }
        ]}
      >
        <LinearGradient
          colors={['#11d421', '#0fb31c']}
          style={styles.featureIconContainer}
        >
          <MaterialIcons name={icon as any} size={26} color="#ffffff" />
        </LinearGradient>
        <View style={styles.featureTextContainer}>
          <Text style={[styles.featureTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
            {title}
          </Text>
          <Text style={[styles.featureDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            {description}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={20} color={isDark ? '#11d421' : '#11d421'} />
      </Animated.View>
    </Pressable>
  );
};

export default function WelcomeScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [primaryPressed, setPrimaryPressed] = useState(false);
  const [secondaryPressed, setSecondaryPressed] = useState(false);

  const titleFadeAnim = new Animated.Value(0);
  const titleSlideAnim = new Animated.Value(-20);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.spring(titleSlideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={isDark
          ? ['#0a0a0a', '#1a1a1a', '#0f1f0f', '#0a0a0a']
          : ['#f8fafc', '#ffffff', '#f0fdf4', '#f8fafc']
        }
        locations={[0, 0.3, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.decorativeBackground}>
        <LinearGradient
          colors={isDark
            ? ['rgba(17, 212, 33, 0.12)', 'rgba(17, 212, 33, 0.02)']
            : ['rgba(17, 212, 33, 0.15)', 'rgba(17, 212, 33, 0.03)']
          }
          style={[styles.decorativeCircle, styles.decorativeCircle1]}
        />
        <LinearGradient
          colors={isDark
            ? ['rgba(17, 212, 33, 0.08)', 'rgba(17, 212, 33, 0.01)']
            : ['rgba(17, 212, 33, 0.1)', 'rgba(17, 212, 33, 0.02)']
          }
          style={[styles.decorativeCircle, styles.decorativeCircle2]}
        />
        <LinearGradient
          colors={isDark
            ? ['rgba(245, 158, 11, 0.06)', 'rgba(245, 158, 11, 0.01)']
            : ['rgba(245, 158, 11, 0.08)', 'rgba(245, 158, 11, 0.01)']
          }
          style={[styles.decorativeCircle, styles.decorativeCircle3]}
        />
      </View>

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <TerraFundLogo size={150} />
          <Animated.View
            style={{
              opacity: titleFadeAnim,
              transform: [{ translateY: titleSlideAnim }],
            }}
          >
            <Text style={[styles.appName, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
              TerraFund
            </Text>
            <Text style={[styles.tagline, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              Invest in Agriculture, Harvest Your Future
            </Text>
          </Animated.View>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresSection}>
          <FeatureCard
            icon="verified-user"
            title="Secure & Transparent"
            description="Blockchain-verified transactions"
            isDark={isDark}
            delay={600}
          />
          <FeatureCard
            icon="trending-up"
            title="High Returns"
            description="Up to 25% annual returns"
            isDark={isDark}
            delay={750}
          />
          <FeatureCard
            icon="eco"
            title="Sustainable Impact"
            description="Support eco-friendly farming"
            isDark={isDark}
            delay={900}
          />
        </View>

        {/* Stats Banner */}
        <View style={[styles.statsBanner, {
          backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.08)',
          borderColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.15)',
        }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#11d421' }]}>5K+</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#d1d5db' : '#6b7280' }]}>
              Investors
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#11d421' }]}>$2M+</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#d1d5db' : '#6b7280' }]}>
              Invested
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#11d421' }]}>98%</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#d1d5db' : '#6b7280' }]}>
              Success
            </Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.actionSection}>
          <Pressable
            onPress={() => router.push('/auth/signup')}
            onPressIn={() => setPrimaryPressed(true)}
            onPressOut={() => setPrimaryPressed(false)}
          >
            <LinearGradient
              colors={['#11d421', '#0fb31c', '#0d9618']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.primaryButton,
                { transform: [{ scale: primaryPressed ? 0.97 : 1 }] }
              ]}
            >
              <Text style={styles.primaryButtonText}>Get Started Free</Text>
              <View style={styles.buttonIconContainer}>
                <MaterialIcons name="arrow-forward" size={22} color="white" />
              </View>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => router.push('/auth/login')}
            onPressIn={() => setSecondaryPressed(true)}
            onPressOut={() => setSecondaryPressed(false)}
          >
            <View style={[styles.secondaryButton, {
              borderColor: isDark ? '#374151' : 'rgba(17, 212, 33, 0.3)',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
              transform: [{ scale: secondaryPressed ? 0.98 : 1 }]
            }]}>
              <Text style={[styles.secondaryButtonText, {
                color: isDark ? '#d1d5db' : '#11d421'
              }]}>
                I Have an Account
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorativeBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  decorativeCircle1: {
    width: 350,
    height: 350,
    top: -140,
    right: -120,
  },
  decorativeCircle2: {
    width: 300,
    height: 300,
    bottom: -120,
    left: -100,
  },
  decorativeCircle3: {
    width: 200,
    height: 200,
    top: height * 0.4,
    right: -60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.06,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  logoFlag: {
    position: 'relative',
    width: '60%',
    height: '60%',
  },
  logoPole: {
    position: 'absolute',
    left: '20%',
    top: 0,
    width: 5,
    height: '100%',
    borderRadius: 2.5,
  },
  logoFlagShape: {
    position: 'absolute',
    left: '25%',
    top: 0,
    width: '60%',
    height: '40%',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  logoGlow: {
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  logoLand: {
    position: 'absolute',
    bottom: '8%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  logoField: {
    width: 18,
    height: 14,
    backgroundColor: '#11d421',
    borderRadius: 3,
  },
  appName: {
    fontSize: 48,
    fontFamily: 'Aclonica_400Regular',
    color: '#11d421',
    letterSpacing: -1,
    textAlign: 'center',
    marginBottom: 12,
  },
  tagline: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '600',
    letterSpacing: 0.3,
    fontFamily: 'Poppins_500Medium',
  },
  featuresSection: {
    gap: 14,
    paddingVertical: 10,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  featureIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.3,
    fontFamily: 'Poppins_700Bold',
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: 'Poppins_400Regular',
  },
  statsBanner: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'space-around',
    marginVertical: 8,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 4,
    letterSpacing: -0.5,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(17, 212, 33, 0.2)',
  },
  actionSection: {
    gap: 14,
    paddingBottom: 8,
  },
  primaryButton: {
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: 'Poppins_800ExtraBold',
  },
  buttonIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
    fontFamily: 'Poppins_700Bold',
  },
});
