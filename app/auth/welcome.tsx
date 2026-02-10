import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { height } = Dimensions.get('window');

// TerraFund Logo Component - Simple version using View
const TerraFundLogo = ({ size = 120 }: { size?: number }) => (
  <View style={[styles.logoContainer, { width: size, height: size }]}>
    <View style={styles.logoFlag}>
      <View style={styles.logoPole} />
      <View style={styles.logoFlagShape} />
    </View>
    <View style={styles.logoLand}>
      <View style={styles.logoField} />
      <View style={styles.logoField} />
      <View style={styles.logoField} />
    </View>
  </View>
);

export default function WelcomeScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <TerraFundLogo size={100} />
          <Text style={[styles.appName, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
            TerraFund
          </Text>
          <Text style={[styles.tagline, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            Invest in Agriculture, Grow Your Wealth
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Features - Minimalistic */}
        <View style={styles.featuresSection}>
          <View style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={[styles.featureText, { color: isDark ? '#d1d5db' : '#4b5563' }]}>
              Secure & Transparent
            </Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={[styles.featureText, { color: isDark ? '#d1d5db' : '#4b5563' }]}>
              High Returns on Investment
            </Text>
          </View>
          <View style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={[styles.featureText, { color: isDark ? '#d1d5db' : '#4b5563' }]}>
              Support Sustainable Farming
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/auth/signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { 
              borderColor: isDark ? '#374151' : '#e5e7eb'
            }]}
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.7}
          >
            <Text style={[styles.secondaryButtonText, { color: isDark ? '#d1d5db' : '#4b5563' }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: height * 0.08,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
    width: 4,
    height: '100%',
    backgroundColor: '#11d421',
    borderRadius: 2,
  },
  logoFlagShape: {
    position: 'absolute',
    left: '24%',
    top: 0,
    width: '60%',
    height: '40%',
    backgroundColor: '#11d421',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  logoLand: {
    position: 'absolute',
    bottom: '10%',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-end',
  },
  logoField: {
    width: 16,
    height: 12,
    backgroundColor: '#11d421',
    opacity: 0.4,
    borderRadius: 2,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  featuresSection: {
    gap: 16,
    marginBottom: 48,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#11d421',
  },
  featureText: {
    fontSize: 15,
    fontWeight: '500',
  },
  actionSection: {
    gap: 14,
  },
  primaryButton: {
    backgroundColor: '#11d421',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
