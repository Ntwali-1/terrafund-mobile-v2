import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function LandownerDashboard() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]} edges={['top']}>
      <View style={styles.mainWrapper}>
        {/* Top Navigation */}
        <View style={[styles.topNav, { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }]}>
          <View style={styles.userSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtW9Y7Cne6f0kprwzqDmBBbednODDmVF84_MC1xNyU5xwNHwk2QugWQ7_FThsLE2xGiYQygc7RubMz07gX5E39hzEVwAbS8vCraEdbvLFr40XYtUT8DiuNW8jZGKSMCQR2lE7aYk7nOyZpDnvaXx0hQ-v8S082pfEhhCRe_lttFUmE8eaRbUq7RUim0aAS9Nkz87hmZlJgFKfLw9CoAzeOb29A5-JjYusMeLIyOA05YJNGDwNw3VkWPvbYWLN9tVvfk3jINrgUJSPO" }}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={[styles.welcomeText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                Welcome back,
              </Text>
              <Text style={[styles.userName, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                Kofi Mensah
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { 
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff'
          }]}>
            <MaterialIcons name="notifications" size={22} color={isDark ? Colors.dark.text : Colors.light.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stats Overview */}
          <View style={styles.section}>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }]}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                  <MaterialIcons name="terrain" size={24} color="#11d421" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  TOTAL LAND
                </Text>
                <Text style={[styles.statValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  12.5 Ha
                </Text>
              </View>

              <View style={[styles.statCard, { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }]}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <MaterialIcons name="groups" size={24} color="#3b82f6" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  INVESTORS
                </Text>
                <Text style={[styles.statValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  4 Active
                </Text>
              </View>

              <View style={[styles.statCard, { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }]}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(217, 119, 6, 0.1)' }]}>
                  <MaterialIcons name="agriculture" size={24} color="#d97706" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  ONGOING
                </Text>
                <Text style={[styles.statValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  3 Projects
                </Text>
              </View>

              <View style={[styles.statCard, { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }]}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                  <MaterialIcons name="payments" size={24} color="#11d421" />
                </View>
                <Text style={[styles.statLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  EARNINGS
                </Text>
                <Text style={[styles.statValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                  $2,450
                </Text>
              </View>
            </View>
          </View>

          {/* Post Land CTA */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.ctaCard}>
              <View style={styles.ctaContent}>
                <View style={styles.ctaIcon}>
                  <MaterialIcons name="add-circle" size={32} color="white" />
                </View>
                <View style={styles.ctaText}>
                  <Text style={styles.ctaTitle}>Post New Land</Text>
                  <Text style={styles.ctaSubtitle}>Register plots for investment</Text>
                </View>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Active Projects */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Active Projects
            </Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={[styles.projectCard, { 
              backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
              borderColor: isDark ? Colors.dark.border : Colors.light.border
            }]}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG6pkj0nf3Yb5m7ydxIIPrNmg4wqjDqJ8Dy5MdcM4RB_4GB5_6ORxlAfMBb9ltlf7f6Tb6xmRjvdsF13fmIYLuG7ONbtVKnATf9H4n8XzxjEMMgVn_cg8AXJFRwcFlnj4H4qr4kLQrFlYsQauSfYOMi_1qI0tNAY3h3aB8sWGm5VnBOwDazXsAJLHiWq7ur6F2OJ5tE9Iq5-XPBCxK0ctCU3z5rNkYgczrcpvTxxobfDLr7JpnsBndo5lE2uY5H0jZJghkbSrlqFd6" }}
                style={styles.projectImage}
              />
              <View style={styles.projectInfo}>
                <View style={styles.projectHeader}>
                  <Text style={[styles.projectTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    Maize Plantation #42
                  </Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>ACTIVE</Text>
                  </View>
                </View>
                <Text style={[styles.projectLocation, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  Kumasi, Ashanti Region • 5.2 Ha
                </Text>
                <View style={styles.projectStats}>
                  <View style={styles.projectStat}>
                    <MaterialIcons name="people" size={16} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
                    <Text style={[styles.projectStatText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                      2 Investors
                    </Text>
                  </View>
                  <View style={styles.projectStat}>
                    <MaterialIcons name="schedule" size={16} color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary} />
                    <Text style={[styles.projectStatText, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                      45 days left
                    </Text>
                  </View>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={[styles.progressLabel, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                      Growth Progress
                    </Text>
                    <Text style={[styles.progressValue, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                      65%
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '65%' }]} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
              Recent Activity
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.activityList}>
              <View style={[styles.activityItem, { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }]}>
                <View style={[styles.activityIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                  <MaterialIcons name="person-search" size={20} color="#11d421" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    New Investor Inquiry
                  </Text>
                  <Text style={[styles.activitySubtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    John Doe interested in Plot B
                  </Text>
                </View>
                <Text style={[styles.activityTime, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  2h ago
                </Text>
              </View>

              <View style={[styles.activityItem, { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }]}>
                <View style={[styles.activityIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <MaterialIcons name="verified" size={20} color="#3b82f6" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    Plot Verified
                  </Text>
                  <Text style={[styles.activitySubtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    Sector 7 inspection complete
                  </Text>
                </View>
                <Text style={[styles.activityTime, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  Yesterday
                </Text>
              </View>

              <View style={[styles.activityItem, { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                borderColor: isDark ? Colors.dark.border : Colors.light.border
              }]}>
                <View style={[styles.activityIcon, { backgroundColor: 'rgba(217, 119, 6, 0.1)' }]}>
                  <MaterialIcons name="payments" size={20} color="#d97706" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
                    Payout Processed
                  </Text>
                  <Text style={[styles.activitySubtitle, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                    Q3 Maize farm harvest profit
                  </Text>
                </View>
                <Text style={[styles.activityTime, { color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>
                  3 days ago
                </Text>
              </View>
            </View>
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 50,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#11d421',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  notificationButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  scrollContent: {
    paddingBottom: 96,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  ctaCard: {
    backgroundColor: '#11d421',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ctaIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    gap: 4,
  },
  ctaTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  ctaSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionLink: {
    color: '#11d421',
    fontSize: 14,
    fontWeight: '700',
  },
  projectCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  projectImage: {
    width: '100%',
    height: 160,
  },
  projectInfo: {
    padding: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#11d421',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  projectLocation: {
    fontSize: 13,
    marginBottom: 12,
  },
  projectStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  projectStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  projectStatText: {
    fontSize: 12,
  },
  progressContainer: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#11d421',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
  },
  activityTime: {
    fontSize: 11,
    fontWeight: '600',
  },
});
