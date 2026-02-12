import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function LandownerDashboard() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#fcfcfc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Background */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: isDark ? '#0a0a0a' : '#fcfcfc' }]} />

      <View style={styles.mainWrapper}>
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <View style={styles.userSection}>
            <View style={[styles.avatarContainer, { backgroundColor: '#11d421' }]}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtW9Y7Cne6f0kprwzqDmBBbednODDmVF84_MC1xNyU5xwNHwk2QugWQ7_FThsLE2xGiYQygc7RubMz07gX5E39hzEVwAbS8vCraEdbvLFr40XYtUT8DiuNW8jZGKSMCQR2lE7aYk7nOyZpDnvaXx0hQ-v8S082pfEhhCRe_lttFUmE8eaRbUq7RUim0aAS9Nkz87hmZlJgFKfLw9CoAzeOb29A5-JjYusMeLIyOA05YJNGDwNw3VkWPvbYWLN9tVvfk3jINrgUJSPO" }}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={[styles.welcomeText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                Welcome back,
              </Text>
              <Text style={[styles.userName, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                Kofi Mensah
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.notificationButton, {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            borderColor: isDark ? '#333333' : '#eeeeee'
          }]}>
            <MaterialIcons name="notifications-none" size={24} color={isDark ? '#ffffff' : '#0a0a0a'} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stats Grid */}
          <View style={styles.section}>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
                <View style={[styles.statIcon, { backgroundColor: '#f0fdf4' }]}>
                  <MaterialIcons name="terrain" size={24} color="#11d421" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>TOTAL LAND</Text>
                <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>12.5 Ha</Text>
              </View>

              <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
                <View style={[styles.statIcon, { backgroundColor: '#eff6ff' }]}>
                  <MaterialIcons name="groups" size={24} color="#3b82f6" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>INVESTORS</Text>
                <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>4 Active</Text>
              </View>
            </View>

            <View style={[styles.statsGrid, { marginTop: 12 }]}>
              <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
                <View style={[styles.statIcon, { backgroundColor: '#fffbeb' }]}>
                  <MaterialIcons name="agriculture" size={24} color="#f59e0b" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>PROJECTS</Text>
                <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>3 Ongoing</Text>
              </View>

              <View style={[styles.statCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
                <View style={[styles.statIcon, { backgroundColor: '#f0fdf4' }]}>
                  <MaterialIcons name="payments" size={24} color="#11d421" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>EARNINGS</Text>
                <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>$2,450</Text>
              </View>
            </View>
          </View>

          {/* Post Land CTA */}
          <View style={styles.section}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.ctaCard, { backgroundColor: '#11d421' }]}>
              <View style={styles.ctaContent}>
                <View style={styles.ctaIcon}>
                  <MaterialIcons name="add-circle" size={32} color="white" />
                </View>
                <View style={styles.ctaText}>
                  <Text style={styles.ctaTitle}>Register New Land</Text>
                  <Text style={styles.ctaSubtitle}>Onboard plots for investment</Text>
                </View>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Guidelines Section */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Platform Tips</Text>
          </View>
          <View style={styles.section}>
            <View style={[styles.tipCard, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff' }]}>
              <MaterialIcons name="verified" size={24} color="#11d421" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.tipTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Boost Verification</Text>
                <Text style={[styles.tipDescription, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                  Verified lands attract 3x more investors. Upload your latest land title documents to speed up the process.
                </Text>
              </View>
            </View>
          </View>

          {/* Active Projects */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
              Managed Projects
            </Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Refresh</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.projectCard, {
                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                borderColor: isDark ? '#333333' : '#eeeeee'
              }]}
            >
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG6pkj0nf3Yb5m7ydxIIPrNmg4wqjDqJ8Dy5MdcM4RB_4GB5_6ORxlAfMBb9ltlf7f6Tb6xmRjvdsF13fmIYLuG7ONbtVKnATf9H4n8XzxjEMMgVn_cg8AXJFRwcFlnj4H4qr4kLQrFlYsQauSfYOMi_1qI0tNAY3h3aB8sWGm5VnBOwDazXsAJLHiWq7ur6F2OJ5tE9Iq5-XPBCxK0ctCU3z5rNkYgczrcpvTxxobfDLr7JpnsBndo5lE2uY5H0jZJghkbSrlqFd6" }}
                style={styles.projectImage}
              />
              <View style={styles.projectInfo}>
                <View style={styles.projectHeader}>
                  <Text style={[styles.projectTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                    Maize Plantation #42
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: '#f0fdf4' }]}>
                    <Text style={[styles.statusText, { color: '#11d421' }]}>HEALTHY</Text>
                  </View>
                </View>
                <Text style={[styles.projectLocation, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                  Kumasi, Ashanti Region • 5.2 Ha
                </Text>
                <div style={styles.projectStats}>
                  <View style={styles.projectStat}>
                    <MaterialIcons name="people" size={16} color="#11d421" />
                    <Text style={[styles.projectStatText, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                      2 Investors
                    </Text>
                  </View>
                  <View style={styles.projectStat}>
                    <MaterialIcons name="schedule" size={16} color="#f59e0b" />
                    <Text style={[styles.projectStatText, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                      45 days left
                    </Text>
                  </View>
                </div>
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={[styles.progressLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Growth Cycle</Text>
                    <Text style={[styles.progressValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>65%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { backgroundColor: '#11d421', width: '65%' }]} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
              Activity Log
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.activityList}>
              {[
                { title: 'New Investor Inquiry', sub: 'John Doe interested in Plot B', time: '2h ago', icon: 'person-search', color: '#11d421', bg: '#f0fdf4' },
                { title: 'Plot Verified', sub: 'Sector 7 inspection complete', time: 'Yesterday', icon: 'verified', color: '#3b82f6', bg: '#eff6ff' },
                { title: 'Payout Processed', sub: 'Q3 Maize farm harvest profit', time: '3 days ago', icon: 'payments', color: '#f59e0b', bg: '#fffbeb' }
              ].map((item, idx) => (
                <View key={idx} style={[styles.activityItem, {
                  backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                  borderColor: isDark ? '#333333' : '#eeeeee'
                }]}>
                  <View style={[styles.activityIcon, { backgroundColor: isDark ? '#2a2a2a' : item.bg }]}>
                    <MaterialIcons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={[styles.activityTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.title}</Text>
                    <Text style={[styles.activitySubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.sub}</Text>
                  </View>
                  <Text style={[styles.activityTime, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.time}</Text>
                </View>
              ))}
            </View>
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
  mainWrapper: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  welcomeText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  userName: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 4,
    fontFamily: 'Poppins_700Bold',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  ctaCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ctaIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    gap: 2,
  },
  ctaTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  ctaSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
  },
  tipCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eeeeee',
    gap: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  sectionLink: {
    color: '#11d421',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
  projectCard: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
  },
  projectImage: {
    width: '100%',
    height: 180,
  },
  projectInfo: {
    padding: 20,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 18,
    flex: 1,
    marginRight: 12,
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
  projectLocation: {
    fontSize: 13,
    marginBottom: 16,
    fontFamily: 'Poppins_500Medium',
  },
  projectStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  projectStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  projectStatText: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
  },
  progressContainer: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  progressValue: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  activitySubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  activityTime: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
  },
});


