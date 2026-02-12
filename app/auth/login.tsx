import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';


export default function LoginScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }]} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#f0fdf4' }]}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#11d421" />
            </TouchableOpacity>
          </View>

          {/* Branding */}
          <View style={styles.brandingContainer}>
            <Text style={[styles.brandText, { color: '#11d421' }]}>TerraFund</Text>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
              Sign in to continue your impact
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Email Address
              </Text>
              <View style={[styles.inputContainer, {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: isDark ? '#333333' : '#eeeeee',
              }]}>
                <MaterialIcons name="email" size={20} color="#11d421" />
                <TextInput
                  style={[styles.input, { color: isDark ? '#ffffff' : '#0a0a0a' }]}
                  placeholder="Enter your email"
                  placeholderTextColor="#888888"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Password
              </Text>
              <View style={[styles.inputContainer, {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: isDark ? '#333333' : '#eeeeee',
              }]}>
                <MaterialIcons name="lock" size={20} color="#11d421" />
                <TextInput
                  style={[styles.input, { color: isDark ? '#ffffff' : '#0a0a0a' }]}
                  placeholder="Enter your password"
                  placeholderTextColor="#888888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color="#888888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={[styles.loginButton, { backgroundColor: '#11d421' }, loading && styles.loginButtonDisabled]}
            >
              {loading ? (
                <Text style={styles.loginButtonText}>Signing In...</Text>
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: isDark ? '#333333' : '#eeeeee' }]} />
              <Text style={[styles.dividerText, { color: '#888888' }]}>OR</Text>
              <View style={[styles.dividerLine, { backgroundColor: isDark ? '#333333' : '#eeeeee' }]} />
            </View>

            {/* Social Login */}
            <TouchableOpacity style={[styles.socialButton, {
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              borderColor: isDark ? '#333333' : '#eeeeee'
            }]}>
              <MaterialIcons name="g-translate" size={20} color={isDark ? '#ffffff' : '#0a0a0a'} />
              <Text style={[styles.socialButtonText, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupLink}>
              <Text style={[styles.signupText, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={styles.signupLinkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brandText: {
    fontSize: 32,
    fontFamily: 'Aclonica_400Regular',
    color: '#11d421',
    letterSpacing: -1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 8,
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
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
    color: '#11d421',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  socialButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  signupLinkText: {
    color: '#11d421',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
});

