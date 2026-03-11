import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiText, MotiView } from 'moti';
import { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/src/utils/auth';
import { Role } from '@/src/utils/api';

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
        opacity: 0.3
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

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all fields to sign in.',
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      setLoading(true);
      const result = await login(email, password);
      
      // Use the user data returned from login, not the context state
      const loggedInUser = result.user;
      
      // Check if user has roles selected
      if (loggedInUser && loggedInUser.roles && loggedInUser.roles.length > 0) {
        // User has roles, navigate to appropriate dashboard
        const hasInvestorRole = loggedInUser.roles.includes(Role.INVESTOR);
        const hasLandOwnerRole = loggedInUser.roles.includes(Role.LAND_OWNER);
        
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: 'Login successful.',
        });

        setTimeout(() => {
          if (hasInvestorRole) {
            router.replace('/(tabs)');
          } else if (hasLandOwnerRole) {
            router.replace('/(landowner-tabs)');
          } else {
            router.replace('/auth/role-selection');
          }
        }, 1000);

      } else {
        // No roles selected, go to role selection
        Toast.show({
          type: 'success',
          text1: 'Login successful!',
          text2: 'Please select your role.',
        });

        setTimeout(() => {
          router.replace('/auth/role-selection');
        }, 1000);
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message || 'Please check your credentials and try again.',
      });
    } finally {
      setLoading(false);
    }
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
        <AnimatedCircle size={300} color="#11d421" delay={0} duration={4000} startPos={{ x: -100, y: -50 }} />
        <AnimatedCircle size={250} color="#0d9618" delay={1000} duration={5000} startPos={{ x: width - 150, y: height * 0.3 }} />
        <AnimatedCircle size={200} color="#11d421" delay={2000} duration={6000} startPos={{ x: width * 0.2, y: height * 0.8 }} />
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
          <View style={styles.titleSection}>
            <MotiText
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 300 }}
              style={[styles.title, { color: theme.text }]}
            >
              Welcome Back
            </MotiText>
            <MotiText
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 400 }}
              style={[styles.subtitle, { color: theme.textSecondary }]}
            >
              Sign in to manage your green investments
            </MotiText>
          </View>

          {/* Login Card (Glassmorphism) */}
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
            {/* Minimalist Inputs */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: focusedInput === 'email' ? theme.tint : theme.textSecondary }]}>
                  Email Address
                </Text>
                <TextInput
                  style={[
                    styles.modernInput,
                    {
                      color: theme.text,
                      borderBottomColor: focusedInput === 'email' ? theme.tint : theme.border
                    }
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

              <View style={[styles.inputGroup, { marginTop: 24 }]}>
                <View style={styles.labelRow}>
                  <Text style={[styles.label, { color: focusedInput === 'password' ? theme.tint : theme.textSecondary }]}>
                    Password
                  </Text>
                  <TouchableOpacity>
                    <Text style={[styles.forgotText, { color: theme.tint }]}>Forgot?</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={[
                      styles.modernInput,
                      {
                        flex: 1,
                        color: theme.text,
                        borderBottomColor: focusedInput === 'password' ? theme.tint : theme.border
                      }
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color={focusedInput === 'password' ? theme.tint : theme.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
                style={[styles.loginButton]}
              >
                <LinearGradient
                  colors={['#11d421', '#0fb31c']}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <Text style={styles.loginButtonText}>
                  {loading ? 'SINING IN...' : 'SIGN IN'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider}>
              <View style={[styles.line, { backgroundColor: theme.border }]} />
              <Text style={[styles.dividerText, { color: theme.textSecondary }]}>OR CONTINUE WITH</Text>
              <View style={[styles.line, { backgroundColor: theme.border }]} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff', borderColor: theme.border }]}>
                <FontAwesome5 name="google" size={18} color={isDark ? "#fff" : "#4285F4"} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff', borderColor: theme.border }]}>
                <FontAwesome5 name="apple" size={20} color={theme.text} />
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* Footer */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 800 }}
            style={styles.footer}
          >
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={[styles.footerLink, { color: theme.tint }]}> Sign Up</Text>
            </TouchableOpacity>
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
    marginBottom: 40,
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
    marginBottom: 32,
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
    maxWidth: '80%',
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
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  modernInput: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    paddingVertical: 12,
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
  forgotText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  loginButton: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    overflow: 'hidden',
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins_800ExtraBold',
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 9,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
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
