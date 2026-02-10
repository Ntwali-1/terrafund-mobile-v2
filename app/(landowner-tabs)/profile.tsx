import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/auth/welcome');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtW9Y7Cne6f0kprwzqDmBBbednODDmVF84_MC1xNyU5xwNHwk2QugWQ7_FThsLE2xGiYQygc7RubMz07gX5E39hzEVwAbS8vCraEdbvLFr40XYtUT8DiuNW8jZGKSMCQR2lE7aYk7nOyZpDnvaXx0hQ-v8S082pfEhhCRe_lttFUmE8eaRbUq7RUim0aAS9Nkz87hmZlJgFKfLw9CoAzeOb29A5-JjYusMeLIyOA05YJNGDwNw3VkWPvbYWLN9tVvfk3jINrgUJSPO" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <MaterialIcons name="camera-alt" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.userName, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
            Kofi Mensah
          </Text>
          <Text style={[styles.userEmail, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
            kofi.mensah@example.com
          </Text>
          <View style={styles.roleBadge}>
            <MaterialIcons name="agriculture" size={14} color="#11d421" />
            <Text style={styles.roleText}>Land Owner</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={[styles.menuItem, { 
            backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }]}>
            <View style={styles.menuItemLeft}>
              <MaterialIcons name="person" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
              <Text style={[styles.menuItemText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Edit Profile
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { 
            backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }]}>
            <View style={styles.menuItemLeft}>
              <MaterialIcons name="settings" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
              <Text style={[styles.menuItemText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Settings
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { 
            backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
            borderColor: isDark ? Colors.dark.border : Colors.light.border
          }]}>
            <View style={styles.menuItemLeft}>
              <MaterialIcons name="help" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
              <Text style={[styles.menuItemText, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Help & Support
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { 
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }]}
            onPress={handleLogout}
          >
            <View style={styles.menuItemLeft}>
              <MaterialIcons name="logout" size={24} color="#ef4444" />
              <Text style={[styles.menuItemText, { color: '#ef4444' }]}>
                Logout
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#11d421',
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
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 12,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleText: {
    color: '#11d421',
    fontSize: 12,
    fontWeight: '700',
  },
  menuSection: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
