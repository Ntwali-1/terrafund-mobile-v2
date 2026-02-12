import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function MyLandsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Background Gradient */}
      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a'] : ['#f8fafc', '#ffffff', '#fff7ed']}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative Elements */}
      <View style={styles.decorativeBackground}>
        <LinearGradient
          colors={isDark ? ['rgba(17, 212, 33, 0.08)', 'transparent'] : ['rgba(17, 212, 33, 0.1)', 'transparent']}
          style={[styles.decorativeCircle, styles.circle1]}
        />
      </View>

      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>My Lands</Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>3 Verified Plots</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <LinearGradient
              colors={['#11d421', '#0fb31c']}
              style={styles.addButtonGradient}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <LinearGradient
              colors={isDark ? ['#1e1e1e', '#141414'] : ['#ffffff', '#f8fafc']}
              style={[styles.statCard, styles.cardShadow]}
            >
              <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>TOTAL AREA</Text>
              <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>12.5 Ha</Text>
            </LinearGradient>
            <LinearGradient
              colors={isDark ? ['#1e1e1e', '#141414'] : ['#ffffff', '#f8fafc']}
              style={[styles.statCard, styles.cardShadow]}
            >
              <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>UTILIZED</Text>
              <Text style={[styles.statValue, { color: '#11d421' }]}>8.2 Ha</Text>
            </LinearGradient>
          </View>

          {/* Land List */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Your Assets</Text>
          </View>

          <View style={styles.landList}>
            {[
              {
                title: 'Highland Ridge',
                location: 'Ashanti Region',
                size: '5.2 Ha',
                status: 'Verified',
                utilization: 100,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG6pkj0nf3Yb5m7ydxIIPrNmg4wqjDqJ8Dy5MdcM4RB_4GB5_6ORxlAfMBb9ltlf7f6Tb6xmRjvdsF13fmIYLuG7ONbtVKnATf9H4n8XzxjEMMgVn_cg8AXJFRwcFlnj4H4qr4kLQrFlYsQauSfYOMi_1qI0tNAY3h3aB8sWGm5VnBOwDazXsAJLHiWq7ur6F2OJ5tE9Iq5-XPBCxK0ctCU3z5rNkYgczrcpvTxxobfDLr7JpnsBndo5lE2uY5H0jZJghkbSrlqFd6"
              },
              {
                title: 'Valley Creek Plot',
                location: 'Western Region',
                size: '3.0 Ha',
                status: 'In Review',
                utilization: 0,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmsLgO1fW85mREUoYJ9eE7WkQoF3r-9Y6V_-zBvW77_vYmY7Nrk4DkY1N_I-v7O-l7f-zBvW77_vYmY7Nrk4DkY1N_I-v7O-l7f"
              },
              {
                title: 'Savannah Field',
                location: 'Northern Region',
                size: '4.3 Ha',
                status: 'Verified',
                utilization: 75,
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsm-R7qC3lW6e_X-zBvW77_vYmY7Nrk4DkY1N_I-v7O-l7f-zBvW77_vYmY7Nrk4DkY1N_I-v7O-l7f"
              }
            ].map((land, idx) => (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.9}
                style={[styles.landCard, {
                  backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                  borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
                }]}
              >
                <Image source={{ uri: land.image }} style={styles.landImage} />
                <View style={styles.landInfo}>
                  <View style={styles.landHeader}>
                    <Text style={[styles.landTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{land.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: land.status === 'Verified' ? 'rgba(17, 212, 33, 0.1)' : 'rgba(245, 158, 11, 0.1)' }]}>
                      <Text style={[styles.statusText, { color: land.status === 'Verified' ? '#11d421' : '#f59e0b' }]}>{land.status.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={[styles.landLocation, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{land.location} • {land.size}</Text>

                  <View style={styles.utilizationSection}>
                    <View style={styles.utilizationHeader}>
                      <Text style={[styles.utilizationLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Utilization</Text>
                      <Text style={[styles.utilizationValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{land.utilization}%</Text>
                    </View>
                    <View style={styles.utilizationBar}>
                      <LinearGradient
                        colors={['#11d421', '#0fb31c']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.utilizationFill, { width: `${land.utilization}%` }]}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
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
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  landList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  landCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
  },
  landImage: {
    width: '100%',
    height: 160,
  },
  landInfo: {
    padding: 16,
  },
  landHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  landTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  landLocation: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 16,
  },
  utilizationSection: {
    gap: 8,
  },
  utilizationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  utilizationLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  utilizationValue: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  utilizationBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  utilizationFill: {
    height: '100%',
  },
});
