import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';

const { height } = Dimensions.get('window');

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [resending, setResending] = useState(false);

  const handleResendEmail = async () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      Alert.alert('Success', 'Verification email sent successfully');
    }, 1500);
  };

  const handleContinue = () => {
    router.push('/auth/role-selection');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#fcfcfc' }]} edges={['top', 'bottom']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <View style={styles.decorativeBackground}>
        <View style={[styles.decorativeCircle, styles.circle1, { backgroundColor: isDark ? '#1a1a1a' : '#f0fdf4' }]} />
        <View style={[styles.decorativeCircle, styles.circle2, { backgroundColor: isDark ? '#11d4210a' : '#11d42110' }]} />
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={isDark ? '#ffffff' : '#0a0a0a'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Verify Email</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandHeader}>
          <Text style={styles.magnatBrand}>TerraFund</Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff', borderColor: isDark ? '#333333' : '#eeeeee' }]}>
            <MaterialIcons name="mark-email-read" size={64} color="#11d421" />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.textSection}>
          <Text style={[styles.title, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
            Verify Your Email
          </Text>
          <Text style={[styles.description, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </Text>
        </View>

        {/* Email Info Card */}
        <View style={[styles.emailCard, {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          borderColor: isDark ? '#333333' : '#eeeeee'
        }]}>
          <View style={styles.emailIconWrapper}>
            <MaterialIcons name="email" size={20} color="#11d421" />
          </View>
          <Text style={[styles.emailText, { color: isDark ? '#ffffff' : '#4a4a4a' }]}>
            user@terrafund.com
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={[styles.instructionsTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
            What's next?
          </Text>
          <View style={styles.instructionsList}>
            {[
              { id: 1, text: 'Check your email inbox' },
              { id: 2, text: 'Click the verification link' },
              { id: 3, text: 'Return here to continue' }
            ].map((step) => (
              <View key={step.id} style={styles.instructionItem}>
                <View style={[styles.stepNumber, { backgroundColor: '#11d421' }]}>
                  <Text style={styles.stepNumberText}>{step.id}</Text>
                </View>
                <Text style={[styles.instructionText, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
                  {step.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: '#11d421' }]}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.continueButtonText}>Go to Dashboard</Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Resend Email */}
          <TouchableOpacity
            style={[styles.resendButton, {
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              borderColor: isDark ? '#333333' : '#eeeeee'
            }]}
            onPress={handleResendEmail}
            disabled={resending}
          >
            <MaterialIcons name="refresh" size={20} color={isDark ? '#ffffff' : '#11d421'} />
            <Text style={[styles.resendButtonText, { color: isDark ? '#ffffff' : '#11d421' }]}>
              {resending ? 'Sending...' : 'Resend Verification Email'}
            </Text>
          </TouchableOpacity>

          {/* Skip Link */}
          <TouchableOpacity
            style={styles.skipLink}
            onPress={() => router.push('/auth/role-selection')}
          >
            <Text style={[styles.skipText, { color: isDark ? '#888888' : '#666666' }]}>
              I'll verify later
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  magnatBrand: {
    fontSize: 32,
    fontFamily: 'Aclonica_400Regular',
    color: '#11d421',
    letterSpacing: -1,
  },
  decorativeBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -80,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: 50,
    left: -100,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: height * 0.04,
    marginBottom: 32,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Poppins_400Regular',
  },
  emailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    marginBottom: 40,
  },
  emailIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  instructionsSection: {
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
  },
  actionsSection: {
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  continueButton: {
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 4,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  resendButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  skipLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
});

