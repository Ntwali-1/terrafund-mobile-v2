import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

const AnimatedCircle = ({ size, color, delay, duration, startPos }: any) => {
  return (
    <MotiView
      from={{
        translateX: startPos.x,
        translateY: startPos.y,
        opacity: 0.1
      }}
      animate={{
        translateX: startPos.x + (Math.random() * 80 - 40),
        translateY: startPos.y + (Math.random() * 80 - 40),
        opacity: 0.25
      }}
      transition={{
        type: 'timing',
        duration: duration,
        loop: true,
        delay: delay,
        repeatReverse: true,
      }}
      style={[
        styles.animatedCircle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }
      ]}
    />
  );
};

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the terms');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/auth/verify-email');
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#081209' : '#f8fafc' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Creative Background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={isDark ? ['#102212', '#081209'] : ['#f0fdf4', '#ffffff']}
          style={StyleSheet.absoluteFill}
        />
        <AnimatedCircle size={350} color="#11d421" delay={500} duration={5000} startPos={{ x: -150, y: height * 0.1 }} />
        <AnimatedCircle size={280} color="#0d9618" delay={1500} duration={6000} startPos={{ x: width - 180, y: height * 0.6 }} />
        <AnimatedCircle size={220} color="#11d421" delay={2500} duration={4500} startPos={{ x: width * 0.3, y: height * 0.9 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Branding */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 15, delay: 100 }}
            style={styles.header}
          >
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(17, 212, 33, 0.08)' }]}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={20} color={theme.tint} />
            </TouchableOpacity>
            <Text style={[styles.topBrandText, { color: theme.tint }]}>TerraFund</Text>
            <View style={{ width: 44 }} />
          </MotiView>

          {/* Title Section */}
          <MotiView style={styles.titleSection}>
            <MotiText
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 300 }}
              style={[styles.title, { color: theme.text }]}
            >
              Create Account
            </MotiText>
            <MotiText
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 400 }}
              style={[styles.subtitle, { color: theme.textSecondary }]}
            >
              Start your sustainable investment journey today.
            </MotiText>
          </MotiView>

          {/* Signup Card (Glassmorphism) */}
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 600, type: 'spring', damping: 15 }}
            style={[
              styles.glassCard,
              {
                backgroundColor: isDark ? 'rgba(26, 58, 31, 0.4)' : 'rgba(255, 255, 255, 0.85)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(17, 212, 33, 0.1)'
              }
            ]}
          >
            <View style={styles.form}>
              {/* Full Name */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: focusedInput === 'fullName' ? theme.tint : theme.textSecondary }]}>
                  FULL NAME
                </Text>
                <TextInput
                  style={[
                    styles.modernInput,
                    { color: theme.text, borderBottomColor: focusedInput === 'fullName' ? theme.tint : theme.border }
                  ]}
                  placeholder="John Doe"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setFocusedInput('fullName')}
                  onBlur={() => setFocusedInput(null)}
                  autoCapitalize="words"
                />
              </View>

              {/* Email */}
              <View style={[styles.inputGroup, { marginTop: 24 }]}>
                <Text style={[styles.label, { color: focusedInput === 'email' ? theme.tint : theme.textSecondary }]}>
                  EMAIL ADDRESS
                </Text>
                <TextInput
                  style={[
                    styles.modernInput,
                    { color: theme.text, borderBottomColor: focusedInput === 'email' ? theme.tint : theme.border }
                  ]}
                  placeholder="name@example.com"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={[styles.inputGroup, { marginTop: 24 }]}>
                <Text style={[styles.label, { color: focusedInput === 'password' ? theme.tint : theme.textSecondary }]}>
                  NEW PASSWORD
                </Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={[
                      styles.modernInput,
                      { flex: 1, color: theme.text, borderBottomColor: focusedInput === 'password' ? theme.tint : theme.border }
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={focusedInput === 'password' ? theme.tint : theme.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={[styles.inputGroup, { marginTop: 24 }]}>
                <Text style={[styles.label, { color: focusedInput === 'confirm' ? theme.tint : theme.textSecondary }]}>
                  CONFIRM PASSWORD
                </Text>
                <TextInput
                  style={[
                    styles.modernInput,
                    { color: theme.text, borderBottomColor: focusedInput === 'confirm' ? theme.tint : theme.border }
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedInput('confirm')}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry={!showPassword}
                />
              </View>

              {/* Terms Link */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, { backgroundColor: agreedToTerms ? theme.tint : 'transparent', borderColor: agreedToTerms ? theme.tint : theme.border }]}>
                  {agreedToTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
                <Text style={[styles.termsText, { color: theme.textSecondary }]}>
                  I agree to the <Text style={{ color: theme.tint, fontFamily: 'Poppins_700Bold' }}>Terms</Text> & <Text style={{ color: theme.tint, fontFamily: 'Poppins_700Bold' }}>Privacy</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSignup}
                disabled={loading}
                activeOpacity={0.8}
                style={styles.signupButton}
              >
                <LinearGradient
                  colors={['#11d421', '#0fb31c']}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <Text style={styles.signupButtonText}>{loading ? 'CREATING...' : 'JOIN TERRAFUND'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={[styles.footerLink, { color: theme.tint }]}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedCircle: {
    position: 'absolute',
    opacity: 0.3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBrandText: {
    fontSize: 28,
    fontFamily: 'Aclonica_400Regular',
    letterSpacing: -0.5,
  },
  titleSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.3,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: '85%',
  },
  glassCard: {
    borderRadius: 24,
    padding: 24,
    paddingTop: 28,
    borderWidth: 1.2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  form: {
    marginBottom: 16,
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  modernInput: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    paddingVertical: 10,
    borderBottomWidth: 1.5,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  },
  signupButton: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    overflow: 'hidden',
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins_800ExtraBold',
    letterSpacing: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
});
