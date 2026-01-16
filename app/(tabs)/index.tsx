import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InvestorDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.mainWrapper}>
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <View style={styles.userSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDngqmI_FRzt9L0An8Ra22-n-2IMCakdaopKbvZz1ua4D5Y_fmjjN0ySqPXC8fLmN6xM19KEWtIclzRPTQoe7Eg_L66JUZ30gTtiB20t00NQGPCTt20Fn3JJ6eFfHOL_CLHmRdmPO2gUH6OZ89Y2pmi_52G5vQiOFauk9U6NwnGNf1jFDzhYzyUzDonXhJkKN9PqvR668xWiBogxaFLffFEnEJddw8rm_4LShtrGjoC_DaYm1ZZORAyZJMQdpNMEoIXXj4U_P3UNpti" }}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>Alex Mitchell</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={22} color="#0d1b0f" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Wallet Card */}
          <View style={styles.section}>
            <View style={[styles.walletCard, styles.cardShadow]}>
              <View style={styles.walletCardContent}>
                <View style={styles.walletHeader}>
                  <View>
                    <Text style={styles.walletLabel}>Total Invested</Text>
                    <Text style={styles.walletAmount}>$42,850.00</Text>
                  </View>
                  <View style={styles.walletIconContainer}>
                    <MaterialIcons name="account-balance-wallet" size={24} color="#11d421" />
                  </View>
                </View>

                <View style={styles.performanceContainer}>
                  <View style={styles.performanceBadge}>
                    <MaterialIcons name="trending-up" size={12} color="#11d421" />
                    <Text style={styles.performanceText}>+12.5%</Text>
                  </View>
                  <Text style={styles.performanceSubtext}>vs last quarter</Text>
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.primaryButton, { marginRight: 8 }]}
                    onPress={() => router.push("/(tabs)/explore")}
                  >
                    <MaterialIcons name="add-circle" size={18} color="white" />
                    <Text style={styles.primaryButtonText}>Invest</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push("/(tabs)/wallet")}
                  >
                    <MaterialIcons name="payments" size={18} color="#404040" />
                    <Text style={styles.secondaryButtonText}>Withdraw</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Mini Stats Overlay */}
              <View style={styles.statsOverlay}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Active Farms</Text>
                  <Text style={styles.statValue}>14</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Profit</Text>
                  <Text style={styles.statValueProfit}>+$5,120.40</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Next Harvest Payout */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Next Harvest Payout</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/portfolio")}>
              <Text style={styles.sectionLink}>View Calendar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={[styles.harvestCard, styles.cardShadow]}>
              <View style={styles.harvestContent}>
                <Image
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG6pkj0nf3Yb5m7ydxIIPrNmg4wqjDqJ8Dy5MdcM4RB_4GB5_6ORxlAfMBb9ltlf7f6Tb6xmRjvdsF13fmIYLuG7ONbtVKnATf9H4n8XzxjEMMgVn_cg8AXJFRwcFlnj4H4qr4kLQrFlYsQauSfYOMi_1qI0tNAY3h3aB8sWGm5VnBOwDazXsAJLHiWq7ur6F2OJ5tE9Iq5-XPBCxK0ctCU3z5rNkYgczrcpvTxxobfDLr7JpnsBndo5lE2uY5H0jZJghkbSrlqFd6" }}
                  style={styles.harvestImage}
                />
                <View style={styles.harvestInfo}>
                  <View style={styles.harvestHeader}>
                    <Text style={styles.harvestTitle}>Maize Plantation #42</Text>
                    <View style={styles.maturationBadge}>
                      <Text style={styles.maturationText}>85% MATURATION</Text>
                    </View>
                  </View>
                  <Text style={styles.expectedText}>
                    Expected: <Text style={styles.expectedAmount}>$1,240.00</Text>
                  </Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={styles.progressFill} />
                    </View>
                    <Text style={styles.daysText}>12 Days</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Portfolio Performance */}
          <View style={[styles.sectionHeader, { paddingTop: 24 }]}>
            <Text style={styles.sectionTitle}>Portfolio Performance</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/portfolio")}>
              <Text style={styles.sectionSublink}>All Time</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.metricsRow}>
            <View style={[styles.metricCard, styles.cardShadow]}>
              <View style={styles.metricIconContainer}>
                <MaterialIcons name="local-florist" size={24} color="#11d421" />
              </View>
              <Text style={styles.metricLabel}>ACRES FUNDED</Text>
              <Text style={styles.metricValue}>124.5</Text>
            </View>
            <View style={[styles.metricCard, styles.cardShadow]}>
              <View style={styles.metricIconContainer}>
                <MaterialIcons name="people" size={24} color="#11d421" />
              </View>
              <Text style={styles.metricLabel}>FARMERS SUPPORTED</Text>
              <Text style={styles.metricValue}>8</Text>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              <View style={[styles.activityItem, styles.cardShadow]}>
                <View style={styles.activityLeft}>
                  <View style={styles.activityIconOrange}>
                    <MaterialIcons name="spa" size={20} color="#ea580c" />
                  </View>
                  <View>
                    <Text style={styles.activityTitle}>New Investment</Text>
                    <Text style={styles.activitySubtitle}>Cassava Farm #08 • 2h ago</Text>
                  </View>
                </View>
                <Text style={styles.activityAmountNegative}>-$500.00</Text>
              </View>

              <View style={[styles.activityItem, styles.cardShadow]}>
                <View style={styles.activityLeft}>
                  <View style={styles.activityIconGreen}>
                    <MaterialIcons name="savings" size={20} color="#11d421" />
                  </View>
                  <View>
                    <Text style={styles.activityTitle}>Harvest Payout</Text>
                    <Text style={styles.activitySubtitle}>Rice Fields G-4 • Yesterday</Text>
                  </View>
                </View>
                <Text style={styles.activityAmountPositive}>+$840.50</Text>
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
    backgroundColor: '#f9fafb',
  },
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(249, 250, 251, 0.8)',
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
    color: '#6b7280',
    fontWeight: '500',
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d1b0f',
    lineHeight: 16,
  },
  notificationButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ffffff',
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
  scrollContent: {
    paddingBottom: 96,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  cardShadow: {
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
  buttonShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  walletCard: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  walletCardContent: {
    padding: 24,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  walletLabel: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
  walletAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0d1b0f',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  walletIconContainer: {
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    padding: 8,
    borderRadius: 8,
  },
  performanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  performanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  performanceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#11d421',
    marginLeft: 4,
  },
  performanceSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#11d421',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#404040',
    fontWeight: '700',
    fontSize: 15,
  },
  statsOverlay: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
  },
  statItem: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontWeight: '700',
    color: '#0d1b0f',
    fontSize: 15,
  },
  statValueProfit: {
    fontWeight: '700',
    color: '#11d421',
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d1b0f',
    letterSpacing: -0.3,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionLink: {
    color: '#11d421',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionSublink: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
  harvestCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  harvestContent: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  harvestImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  harvestInfo: {
    flex: 1,
  },
  harvestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  harvestTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#0d1b0f',
    flex: 1,
  },
  maturationBadge: {
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  maturationText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#11d421',
    letterSpacing: 1,
  },
  expectedText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  expectedAmount: {
    color: '#0d1b0f',
    fontWeight: '700',
  },
  progressContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#11d421',
    height: '100%',
    width: '85%',
  },
  daysText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9ca3af',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    flexDirection: 'column',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: '#ffffff',
  },
  metricIconContainer: {
    marginBottom: 8,
  },
  metricLabel: {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0d1b0f',
  },
  activitySection: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  activityList: {
    gap: 12,
    marginTop: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIconOrange: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(234, 88, 12, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIconGreen: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d1b0f',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  activityAmountNegative: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ef4444',
  },
  activityAmountPositive: {
    fontSize: 14,
    fontWeight: '700',
    color: '#11d421',
  },
});