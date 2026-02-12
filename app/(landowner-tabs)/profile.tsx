import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/auth/welcome');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Background Gradient */}
      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a'] : ['#f8fafc', '#ffffff', '#f0fdf4']}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative Elements */}
      <View style={styles.decorativeBackground}>
        <LinearGradient
          colors={isDark ? ['rgba(17, 212, 33, 0.08)', 'transparent'] : ['rgba(17, 212, 33, 0.1)', 'transparent']}
          style={[styles.decorativeCircle, styles.circle1]}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <LinearGradient
              colors={['#11d421', '#0fb31c']}
              style={styles.avatarGlow}
            />
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtW9Y7Cne6f0kprwzqDmBBbednODDmVF84_MC1xNyU5xwNHwk2QugWQ7_FThsLE2xGiYQygc7RubMz07gX5E39hzEVwAbS8vCraEdbvLFr40XYtUT8DiuNW8jZGKSMCQR2lE7aYk7nOyZpDnvaXx0hQ-v8S082pfEhhCRe_lttFUmE8eaRbUq7RUim0aAS9Nkz87hmZlJgFKfLw9CoAzeOb29A5-JjYusMeLIyOA05YJNGDwNw3VkWPvbYWLN9tVvfk3jINrgUJSPO" }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <MaterialIcons name="camera-alt" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.userName, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Kofi Mensah</Text>
          <Text style={[styles.userEmail, { color: isDark ? '#9ca3af' : '#6b7280' }]}>kofi.mensah@example.com</Text>

          <View style={styles.roleBadge}>
            <LinearGradient
              colors={['#11d421', '#0fb31c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.roleBadgeGradient}
            >
              <MaterialIcons name="agriculture" size={14} color="#ffffff" />
              <Text style={styles.roleText}>Landowner</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Account Completion */}
        <View style={[styles.completionCard, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
          <View style={styles.completionInfo}>
            <Text style={[styles.completionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Complete your profile</Text>
            <Text style={[styles.completionSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>85% complete</Text>
          </View>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#11d421', '#0fb31c']}
              style={[styles.progressFill, { width: '85%' }]}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Account Settings</Text>
          {[
            { icon: 'person', label: 'Personal Information', sub: 'Manage details' },
            { icon: 'security', label: 'Security', sub: '2FA, Password' },
            { icon: 'notifications', label: 'Notifications', sub: 'Preferences' },
            { icon: 'payment', label: 'Payment Methods', sub: 'Withdrawals' },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, {
                backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
              }]}
            >
              <View style={[styles.menuIconWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }]}>
                <MaterialIcons name={item.icon as any} size={22} color={isDark ? '#ffffff' : '#4b5563'} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemLabel, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.label}</Text>
                <Text style={[styles.menuItemSub, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.sub}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={isDark ? '#4b5563' : '#d1d5db'} />
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a', marginTop: 12 }]}>Support</Text>
          {[
            { icon: 'help-outline', label: 'Help Center', sub: 'FAQs, Guides' },
            { icon: 'description', label: 'Privacy Policy', sub: 'Terms of Use' },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, {
                backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
              }]}
            >
              <View style={[styles.menuIconWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }]}>
                <MaterialIcons name={item.icon as any} size={22} color={isDark ? '#ffffff' : '#4b5563'} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemLabel, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.label}</Text>
                <Text style={[styles.menuItemSub, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.sub}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={isDark ? '#4b5563' : '#d1d5db'} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)' }]}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
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
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    left: -100,
  },
  content: {
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    top: -10,
    left: -10,
    opacity: 0.15,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#11d421',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 26,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 16,
  },
  roleBadge: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  roleBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  roleText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
  },
  completionCard: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  completionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completionTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
  },
  completionSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  menuSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },
  menuIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemLabel: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  menuItemSub: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  logoutText: {
    color: '#ef4444',
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
});
