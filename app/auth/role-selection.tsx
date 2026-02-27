import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

type RoleType = 'INVESTOR' | 'LANDOWNER' | null;

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (selectedRole === 'INVESTOR') {
      router.replace('/(tabs)');
    } else if (selectedRole === 'LANDOWNER') {
      router.replace('/(landowner-tabs)');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'bottom']}>
      <LinearGradient
        colors={isDark ? ['#102212', '#0a0a0a'] : ['#f0fdf4', '#ffffff']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.brandText, { color: theme.tint }]}>TerraFund</Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: theme.text }]}>
            How will you contribute?
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Choose a role that best fits your goals on the platform.
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {/* Investor Card */}
          <TouchableOpacity
            onPress={() => setSelectedRole('INVESTOR')}
            activeOpacity={0.8}
            style={[
              styles.roleCard,
              {
                backgroundColor: isDark ? '#1a3a1f' : '#ffffff',
                borderColor: selectedRole === 'INVESTOR' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                borderWidth: selectedRole === 'INVESTOR' ? 2 : 1,
              }
            ]}
          >
            <View style={[styles.cardIconBox, { backgroundColor: selectedRole === 'INVESTOR' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : '#f3f4f6') }]}>
              <Ionicons
                name="trending-up"
                size={32}
                color={selectedRole === 'INVESTOR' ? '#ffffff' : (isDark ? '#d1d5db' : '#6b7280')}
              />
            </View>

            <View style={styles.cardInfo}>
              <Text style={[styles.roleTitle, { color: theme.text }]}>Investor</Text>
              <Text style={[styles.roleDescription, { color: theme.textSecondary }]}>
                Browse agricultural projects, invest in land, and grow your wealth.
              </Text>
            </View>

            {selectedRole === 'INVESTOR' && (
              <MotiView
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.selectedBadge}
              >
                <Ionicons name="checkmark-circle" size={24} color={theme.tint} />
              </MotiView>
            )}
          </TouchableOpacity>

          {/* Landowner Card */}
          <TouchableOpacity
            onPress={() => setSelectedRole('LANDOWNER')}
            activeOpacity={0.8}
            style={[
              styles.roleCard,
              {
                backgroundColor: isDark ? '#1a3a1f' : '#ffffff',
                borderColor: selectedRole === 'LANDOWNER' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                borderWidth: selectedRole === 'LANDOWNER' ? 2 : 1,
              }
            ]}
          >
            <View style={[styles.cardIconBox, { backgroundColor: selectedRole === 'LANDOWNER' ? theme.tint : (isDark ? 'rgba(255, 255, 255, 0.1)' : '#f3f4f6') }]}>
              <Ionicons
                name="leaf"
                size={32}
                color={selectedRole === 'LANDOWNER' ? '#ffffff' : (isDark ? '#d1d5db' : '#6b7280')}
              />
            </View>

            <View style={styles.cardInfo}>
              <Text style={[styles.roleTitle, { color: theme.text }]}>Land Owner</Text>
              <Text style={[styles.roleDescription, { color: theme.textSecondary }]}>
                List your land, get verified, and secure funding for your farm.
              </Text>
            </View>

            {selectedRole === 'LANDOWNER' && (
              <MotiView
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.selectedBadge}
              >
                <Ionicons name="checkmark-circle" size={24} color={theme.tint} />
              </MotiView>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedRole}
          style={[
            styles.primaryButton,
            { backgroundColor: selectedRole ? theme.tint : '#e5e7eb' },
            !selectedRole && styles.disabledButton
          ]}
        >
          <Text style={[styles.buttonText, { color: selectedRole ? '#ffffff' : '#9ca3af' }]}>
            Get Started
          </Text>
          <Ionicons name="arrow-forward" size={20} color={selectedRole ? '#ffffff' : '#9ca3af'} />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  brandText: {
    fontSize: 24,
    fontFamily: 'Aclonica_400Regular',
    letterSpacing: -0.5,
  },
  titleSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    gap: 16,
  },
  roleCard: {
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    position: 'relative',
  },
  cardIconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  cardInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
  },
  primaryButton: {
    height: 60,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  disabledButton: {
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
});

