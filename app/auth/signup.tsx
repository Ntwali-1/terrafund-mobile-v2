import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function SignupScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    // TODO: Implement actual API call
    setTimeout(() => {
      setLoading(false);
      router.push('/auth/verify-email');
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
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
              Join TerraFund and start your impact
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Full Name <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: isDark ? '#333333' : '#eeeeee',
              }]}>
                <MaterialIcons name="person" size={20} color="#11d421" />
                <TextInput
                  style={[styles.input, { color: isDark ? '#ffffff' : '#0a0a0a' }]}
                  placeholder="Enter your full name"
                  placeholderTextColor="#888888"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Email Address <Text style={styles.required}>*</Text>
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

            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Phone Number
              </Text>
              <View style={[styles.inputContainer, {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: isDark ? '#333333' : '#eeeeee',
              }]}>
                <MaterialIcons name="phone" size={20} color="#11d421" />
                <TextInput
                  style={[styles.input, { color: isDark ? '#ffffff' : '#0a0a0a' }]}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#888888"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Password <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: isDark ? '#333333' : '#eeeeee',
              }]}>
                <MaterialIcons name="lock" size={20} color="#11d421" />
                <TextInput
                  style={[styles.input, { color: isDark ? '#ffffff' : '#0a0a0a' }]}
                  placeholder="Create a password"
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
              <Text style={[styles.hint, { color: '#888888' }]}>
                Must be at least 8 characters
              </Text>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Confirm Password <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: isDark ? '#333333' : '#eeeeee',
              }]}>
                <MaterialIcons name="lock" size={20} color="#11d421" />
                <TextInput
                  style={[styles.input, { color: isDark ? '#ffffff' : '#0a0a0a' }]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#888888"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <MaterialIcons
                    name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color="#888888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View style={[
                styles.checkbox,
                {
                  backgroundColor: agreedToTerms ? '#11d421' : 'transparent',
                  borderColor: agreedToTerms ? '#11d421' : (isDark ? '#333' : '#d1d5db')
                }
              ]}>
                {agreedToTerms && <MaterialIcons name="check" size={16} color="white" />}
              </View>
              <Text style={[styles.checkboxText, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
                I agree to the{' '}
                <Text style={styles.link}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Signup Button */}
            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              style={[styles.signupButton, { backgroundColor: '#11d421' }, loading && styles.signupButtonDisabled]}
            >
              {loading ? (
                <Text style={styles.signupButtonText}>Creating Account...</Text>
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginLink}>
              <Text style={[styles.loginText, { color: isDark ? '#a0a0a0' : '#4a4a4a' }]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.loginLinkText}>Sign In</Text>
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
  required: {
    color: '#ef4444',
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
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  hint: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins_400Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
  link: {
    color: '#11d421',
    fontFamily: 'Poppins_600SemiBold',
  },
  signupButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  loginLinkText: {
    color: '#11d421',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
});

