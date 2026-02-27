import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Background Image / Decoration */}
      <View style={styles.headerBackground}>
        <Image
          source={require('@/assets/images/pexels-akos-szabo-145938-440731.jpg')}
          style={styles.bgImage}
          blurRadius={isDark ? 5 : 0}
        />
        <LinearGradient
          colors={isDark ? ['transparent', '#102212'] : ['transparent', '#ffffff']}
          style={styles.gradient}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 800 }}
            style={styles.header}
          >
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)' }]}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
          </MotiView>

          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 200 }}
            style={styles.brandingContainer}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.brandText, { color: theme.tint }]}>TerraFund</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 300 }}
            style={styles.titleSection}
          >
            <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Enter your credentials to continue your journey.
            </Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 400 }}
            style={styles.formContainer}
          >
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Email Address</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', borderColor: theme.border }]}>
                <Ionicons name="mail-outline" size={20} color={theme.tint} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="name@example.com"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Password</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', borderColor: theme.border }]}>
                <Ionicons name="lock-closed-outline" size={20} color={theme.tint} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: theme.tint }]}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={[styles.loginButton, { backgroundColor: theme.tint }]}
            >
              <Text style={styles.loginButtonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.line, { backgroundColor: theme.border }]} />
              <Text style={[styles.dividerText, { color: theme.textSecondary }]}>or continue with</Text>
              <View style={[styles.line, { backgroundColor: theme.border }]} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                <Ionicons name="logo-apple" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={[styles.footerLink, { color: theme.tint }]}>Sign Up</Text>
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
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 26,
    fontFamily: 'Aclonica_400Regular',
    letterSpacing: -1,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 22,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  loginButton: {
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  footerLink: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
  },
});
import { StatusBar } from 'react-native';


