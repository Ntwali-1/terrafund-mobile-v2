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
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5' }]}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
              Join TerraFund and start investing
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Full Name <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, { 
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}>
                <MaterialIcons name="person" size={20} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
                <TextInput
                  style={[styles.input, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                  placeholder="Enter your full name"
                  placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Email Address <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, { 
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}>
                <MaterialIcons name="email" size={20} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
                <TextInput
                  style={[styles.input, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
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
              <Text style={[styles.label, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Phone Number
              </Text>
              <View style={[styles.inputContainer, { 
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}>
                <MaterialIcons name="phone" size={20} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
                <TextInput
                  style={[styles.input, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                  placeholder="Enter your phone number"
                  placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Password <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, { 
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}>
                <MaterialIcons name="lock" size={20} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
                <TextInput
                  style={[styles.input, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                  placeholder="Create a password"
                  placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.hint, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                Must be at least 8 characters
              </Text>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Confirm Password <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputContainer, { 
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }]}>
                <MaterialIcons name="lock" size={20} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
                <TextInput
                  style={[styles.input, { color: isDark ? Colors.dark.text : Colors.light.text }]}
                  placeholder="Confirm your password"
                  placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <MaterialIcons
                    name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <MaterialIcons name="check" size={16} color="white" />}
              </View>
              <Text style={[styles.checkboxText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                I agree to the{' '}
                <Text style={styles.link}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Signup Button */}
            <TouchableOpacity
              style={[styles.signupButton, loading && styles.signupButtonDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.signupButtonText}>Creating Account...</Text>
              ) : (
                <>
                  <Text style={styles.signupButtonText}>Create Account</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="white" />
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginLink}>
              <Text style={[styles.loginText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 8,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  required: {
    color: '#ef4444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  hint: {
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#11d421',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#11d421',
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  link: {
    color: '#11d421',
    fontWeight: '600',
  },
  signupButton: {
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
    marginTop: 8,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
  },
  loginLinkText: {
    color: '#11d421',
    fontSize: 14,
    fontWeight: '700',
  },
});
