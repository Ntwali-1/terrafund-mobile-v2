import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const { height } = Dimensions.get('window');

type Role = 'INVESTOR' | 'LAND_OWNER' | null;

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const handleContinue = () => {
    if (!selectedRole) return;

    // TODO: Save role selection to backend
    // Navigate to appropriate dashboard based on role
    if (selectedRole === 'INVESTOR') {
      router.replace('/(tabs)');
    } else {
      router.replace('/(landowner-tabs)');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }]} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
            Choose Your Role
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            Select how you'd like to use TerraFund
          </Text>
        </View>

        {/* Role Cards */}
        <View style={styles.rolesContainer}>
          {/* Investor Role */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: selectedRole === 'INVESTOR' ? '#11d421' : (isDark ? '#2a2a2a' : '#e5e7eb'),
                borderWidth: selectedRole === 'INVESTOR' ? 2 : 1,
              }
            ]}
            onPress={() => setSelectedRole('INVESTOR')}
            activeOpacity={0.7}
          >
            <View style={styles.roleHeader}>
              <View style={[styles.roleIconContainer, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                <MaterialIcons name="trending-up" size={28} color="#11d421" />
              </View>
              {selectedRole === 'INVESTOR' && (
                <View style={styles.checkmark}>
                  <MaterialIcons name="check" size={18} color="#ffffff" />
                </View>
              )}
            </View>
            <Text style={[styles.roleTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
              Investor
            </Text>
            <Text style={[styles.roleDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              Invest in agricultural projects and earn returns from harvests
            </Text>
          </TouchableOpacity>

          {/* Land Owner Role */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              {
                backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                borderColor: selectedRole === 'LAND_OWNER' ? '#11d421' : (isDark ? '#2a2a2a' : '#e5e7eb'),
                borderWidth: selectedRole === 'LAND_OWNER' ? 2 : 1,
              }
            ]}
            onPress={() => setSelectedRole('LAND_OWNER')}
            activeOpacity={0.7}
          >
            <View style={styles.roleHeader}>
              <View style={[styles.roleIconContainer, { backgroundColor: 'rgba(217, 119, 6, 0.1)' }]}>
                <MaterialIcons name="agriculture" size={28} color="#d97706" />
              </View>
              {selectedRole === 'LAND_OWNER' && (
                <View style={styles.checkmark}>
                  <MaterialIcons name="check" size={18} color="#ffffff" />
                </View>
              )}
            </View>
            <Text style={[styles.roleTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
              Land Owner
            </Text>
            <Text style={[styles.roleDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              List your land for investment and manage farming projects
            </Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, !selectedRole && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedRole}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Skip Link */}
        <TouchableOpacity style={styles.skipLink} activeOpacity={0.7}>
          <Text style={[styles.skipText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            I'll choose later
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: height * 0.06,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  rolesContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    borderRadius: 16,
    padding: 24,
    minHeight: 160,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  roleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#11d421',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  roleDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#11d421',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  continueButtonDisabled: {
    opacity: 0.4,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  skipLink: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
