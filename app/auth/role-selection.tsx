import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';


type RoleType = 'INVESTOR' | 'LANDOWNER' | null;

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (selectedRole === 'INVESTOR') {
      router.replace('/(tabs)');
    } else if (selectedRole === 'LANDOWNER') {
      router.replace('/(landowner-tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a', '#0f1f0f'] : ['#f8fafc', '#ffffff', '#f0fdf4']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.decorativeBackground}>
        <View style={[styles.decorativeCircle, styles.circle1, {
          backgroundColor: isDark ? 'rgba(17, 212, 33, 0.08)' : 'rgba(17, 212, 33, 0.06)'
        }]} />
        <View style={[styles.decorativeCircle, styles.circle2, {
          backgroundColor: isDark ? 'rgba(245, 158, 11, 0.05)' : 'rgba(245, 158, 11, 0.06)'
        }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.brandingContainer}>
          <Text style={styles.brandText}>TerraFund</Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            Choose Your Role
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            How would you like to use TerraFund?
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {/* Investor Card */}
          <TouchableOpacity
            onPress={() => setSelectedRole('INVESTOR')}
            activeOpacity={0.9}
            style={[
              styles.roleCard,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: selectedRole === 'INVESTOR' ? '#11d421' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                transform: [{ scale: selectedRole === 'INVESTOR' ? 1.02 : 1 }]
              }
            ]}
          >
            {selectedRole === 'INVESTOR' && (
              <View
                style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(17, 212, 33, 0.05)' }]}
              />
            )}

            <View style={[styles.iconContainer, {
              backgroundColor: selectedRole === 'INVESTOR' ? '#11d421' : (isDark ? 'rgba(255, 255, 255, 0.1)' : '#f3f4f6')
            }]}>
              <MaterialIcons
                name="trending-up"
                size={32}
                color={selectedRole === 'INVESTOR' ? '#ffffff' : (isDark ? '#d1d5db' : '#6b7280')}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={[styles.roleTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                I want to Invest
              </Text>
              <Text style={[styles.roleDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                Discover vetted agricultural projects, fund farms, and earn competitive returns securely.
              </Text>
            </View>

            {selectedRole === 'INVESTOR' && (
              <View style={styles.checkIcon}>
                <MaterialIcons name="check-circle" size={24} color="#11d421" />
              </View>
            )}
          </TouchableOpacity>

          {/* Landowner Card */}
          <TouchableOpacity
            onPress={() => setSelectedRole('LANDOWNER')}
            activeOpacity={0.9}
            style={[
              styles.roleCard,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: selectedRole === 'LANDOWNER' ? '#11d421' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                transform: [{ scale: selectedRole === 'LANDOWNER' ? 1.02 : 1 }]
              }
            ]}
          >
            {selectedRole === 'LANDOWNER' && (
              <View
                style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(17, 212, 33, 0.05)' }]}
              />
            )}

            <View style={[styles.iconContainer, {
              backgroundColor: selectedRole === 'LANDOWNER' ? '#11d421' : (isDark ? 'rgba(255, 255, 255, 0.1)' : '#f3f4f6')
            }]}>
              <MaterialIcons
                name="landscape"
                size={32}
                color={selectedRole === 'LANDOWNER' ? '#ffffff' : (isDark ? '#d1d5db' : '#6b7280')}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={[styles.roleTitle, { color: isDark ? '#ffffff' : '#111827' }]}>
                I am a Landowner
              </Text>
              <Text style={[styles.roleDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                List your land for funding, get verified, and receive investments to grow your farm.
              </Text>
            </View>

            {selectedRole === 'LANDOWNER' && (
              <View style={styles.checkIcon}>
                <MaterialIcons name="check-circle" size={24} color="#11d421" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={[styles.footer, {
        borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        backgroundColor: isDark ? 'rgba(10, 10, 10, 0.9)' : 'rgba(255, 255, 255, 0.9)'
      }]}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedRole && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedRole}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.gradientButton,
              { backgroundColor: selectedRole ? '#11d421' : '#e5e7eb' }
            ]}
          >
            <Text style={[styles.continueButtonText, !selectedRole && styles.disabledButtonText]}>
              Continue
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color={selectedRole ? "#ffffff" : "#9ca3af"}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  decorativeBackground: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: 50,
    left: -80,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  header: {
    paddingTop: 12,
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  brandingContainer: {
    marginBottom: 12,
  },
  brandText: {
    fontSize: 28,
    fontFamily: 'Aclonica_400Regular',
    color: '#11d421',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },
  cardsContainer: {
    gap: 20,
  },
  roleCard: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardContent: {
    gap: 8,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins_600SemiBold',
  },
  roleDescription: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Poppins_400Regular',
  },
  checkIcon: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopWidth: 1,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  disabledButton: {
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'Poppins_700Bold',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
});
