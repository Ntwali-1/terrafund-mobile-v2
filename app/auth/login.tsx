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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/auth/role-selection');
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
                  EMAIL ADDRESS
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
                    PASSWORD
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
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
