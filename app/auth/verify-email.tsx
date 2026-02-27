import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';

const { height } = Dimensions.get('window');

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    // Submit if all filled
    if (value && index === 3 && newOtp.every(v => v !== '')) {
      handleVerify();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendEmail = async () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setTimer(60);
      Alert.alert('Success', 'New OTP sent successfully');
    }, 1500);
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 4) {
      // In real app, call API
      Alert.alert('Success', 'Email verified successfully!', [
        { text: 'Continue', onPress: () => router.push('/auth/complete-profile') }
      ]);
    } else {
      Alert.alert('Error', 'Please enter all 4 digits');
    }
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
            <Ionicons name="mail-unread-outline" size={56} color="#11d421" />
          </View>
        </View>

        <View style={styles.textSection}>
          <Text style={[styles.title, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
            Enter OTP Code
          </Text>
          <Text style={[styles.description, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
            We've sent a 4-digit verification code to
          </Text>
          <Text style={[styles.emailText, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>user@terrafund.com</Text>
        </View>

        {/* OTP Input Section */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el: TextInput | null) => { inputRefs.current[index] = el; }}
              style={[
                styles.otpInput,
                {
                  backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                  color: isDark ? '#ffffff' : '#0a0a0a',
                  borderColor: digit ? '#11d421' : (isDark ? '#333333' : '#eeeeee')
                }
              ]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(val) => handleOtpChange(val, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: '#11d421', opacity: otp.every(v => v !== '') ? 1 : 0.6 }]}
            onPress={handleVerify}
            disabled={!otp.every(v => v !== '')}
          >
            <Text style={styles.continueButtonText}>Verify & Continue</Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={[styles.resendLabel, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Didn't receive the code?
            </Text>
            {timer > 0 ? (
              <Text style={[styles.timerText, { color: isDark ? '#888888' : '#888888' }]}>
                Resend in {timer}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendEmail} disabled={resending}>
                <Text style={[styles.resendLink, { color: '#11d421' }]}>
                  {resending ? 'Sending...' : 'Resend Now'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 2,
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
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
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
  },
  resendContainer: {
    alignItems: 'center',
    gap: 8,
  },
  resendLabel: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  timerText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  resendLink: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
});

