import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');

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

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/auth/verify-email');
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Background decoration */}
      <View style={styles.headerBackground}>
        <Image
          source={require('@/assets/images/pexels-akos-szabo-145938-440731.jpg')}
          style={styles.bgImage}
          blurRadius={isDark ? 5 : 2}
        />
        <LinearGradient
          colors={isDark ? ['rgba(16, 34, 18, 0.4)', '#102212'] : ['rgba(240, 253, 244, 0.4)', '#ffffff']}
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
            style={styles.brandingContainer}
          >
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.brandText, { color: theme.tint }]}>TerraFund</Text>
          </MotiView>

          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Join our community and start your sustainable investment journey.
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Full Name</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', borderColor: theme.border }]}>
                <Ionicons name="person-outline" size={20} color={theme.tint} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="John Doe"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email */}
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

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Phone Number</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', borderColor: theme.border }]}>
                <Ionicons name="call-outline" size={20} color={theme.tint} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="+1 234 567 890"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password */}
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
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Confirm Password</Text>
              <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', borderColor: theme.border }]}>
                <Ionicons name="lock-closed-outline" size={20} color={theme.tint} />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms Link */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, { backgroundColor: agreedToTerms ? theme.tint : 'transparent', borderColor: agreedToTerms ? theme.tint : theme.border }]}>
                {agreedToTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={[styles.termsText, { color: theme.textSecondary }]}>
                I agree to the <Text style={{ color: theme.tint, fontFamily: 'Poppins_700Bold' }}>Terms & Conditions</Text> and <Text style={{ color: theme.tint, fontFamily: 'Poppins_700Bold' }}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              style={[styles.signupButton, { backgroundColor: theme.tint }]}
            >
              <Text style={styles.signupButtonText}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={[styles.footerLink, { color: theme.tint }]}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    height: height * 0.35,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
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
    marginBottom: 10,
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
    marginBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  brandText: {
    fontSize: 24,
    fontFamily: 'Aclonica_400Regular',
    letterSpacing: -1,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  formContainer: {
    gap: 14,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
  },
  signupButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
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


