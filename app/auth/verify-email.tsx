import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [resending, setResending] = useState(false);

  const handleResendEmail = async () => {
    setResending(true);
    // TODO: Implement actual API call
    setTimeout(() => {
      setResending(false);
      Alert.alert('Success', 'Verification email sent successfully');
    }, 1500);
  };

  const handleContinue = () => {
    // Navigate to role selection
    router.push('/auth/role-selection');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="mark-email-read" size={64} color="#11d421" />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.textSection}>
          <Text style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            Verify Your Email
          </Text>
          <Text style={[styles.description, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </Text>
        </View>

        {/* Email Info */}
        <View style={[styles.emailCard, { 
          backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.05)',
          borderColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.2)'
        }]}>
          <MaterialIcons name="email" size={20} color="#11d421" />
          <Text style={[styles.emailText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            user@example.com
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={[styles.instructionsTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            What's next?
          </Text>
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={[styles.instructionText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                Check your email inbox
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={[styles.instructionText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                Click the verification link
              </Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={[styles.instructionText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                Return here to continue
              </Text>
            </View>
          </View>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Actions */}
        <View style={styles.actionsSection}>
          {/* Resend Email */}
          <TouchableOpacity
            style={[styles.resendButton, { 
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}
            onPress={handleResendEmail}
            disabled={resending}
          >
            <MaterialIcons name="refresh" size={20} color={isDark ? Colors.dark.text : Colors.light.text} />
            <Text style={[styles.resendButtonText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              {resending ? 'Sending...' : 'Resend Verification Email'}
            </Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>I've Verified My Email</Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Skip Link */}
          <TouchableOpacity
            style={styles.skipLink}
            onPress={() => router.push('/auth/role-selection')}
          >
            <Text style={[styles.skipText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
              I'll verify later
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
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  emailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginBottom: 32,
  },
  emailText: {
    fontSize: 15,
    fontWeight: '600',
  },
  instructionsSection: {
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#11d421',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
  },
  actionsSection: {
    gap: 12,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  resendButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#11d421',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  skipLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
