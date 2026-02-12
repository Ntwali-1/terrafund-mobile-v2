import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { height } = Dimensions.get('window');

export default function InvestorDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      {/* Background */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#fcfcfc' }]} />

      <View style={styles.mainWrapper}>
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <View style={styles.userSection}>
            <View style={[styles.avatarContainer, { backgroundColor: '#11d421' }]}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDngqmI_FRzt9L0An8Ra22-n-2IMCakdaopKbvZz1ua4D5Y_fmjjN0ySqPXC8fLmN6xM19KEWtIclzRPTQoe7Eg_L66JUZ30gTtiB20t00NQGPCTt20Fn3JJ6eFfHOL_CLHmRdmPO2gUH6OZ89Y2pmi_52G5vQiOFauk9U6NwnGNf1jFDzhYzyUzDonXhJkKN9PqvR668xWiBogxaFLffFEnEJddw8rm_4LShtrGjoC_DaYm1ZZORAyZJMQdpNMEoIXXj4U_P3UNpti" }}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={styles.brandText}>TerraFund</Text>
              <Text style={styles.welcomeText}>Welcome back, Alex Mitchell</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications-none" size={24} color="#0d1b0f" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Wallet Card */}
          <View style={styles.section}>
            <View style={[styles.walletCard, { backgroundColor: '#11d421' }]}>
              <View style={styles.walletCardContent}>
                <View style={styles.walletHeader}>
                  <View>
                    <Text style={styles.walletLabel}>Total Portfolio Value</Text>
                    <Text style={styles.walletAmount}>$42,850.00</Text>
                  </View>
                  <View style={styles.walletIconContainer}>
                    <MaterialIcons name="account-balance-wallet" size={28} color="rgba(255, 255, 255, 0.9)" />
                  </View>
                </View>

                <View style={styles.performanceContainer}>
                  <View style={styles.performanceBadge}>
                    <MaterialIcons name="trending-up" size={14} color="#ffffff" />
                    <Text style={styles.performanceText}>+12.5%</Text>
                  </View>
                  <Text style={styles.performanceSubtext}>vs last quarter</Text>
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push("/(tabs)/explore")}
                  >
                    <MaterialIcons name="add-circle" size={18} color="#11d421" />
                    <Text style={styles.primaryButtonText}>Invest More</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push("/(tabs)/wallet")}
                  >
                    <MaterialIcons name="payments" size={18} color="rgba(255, 255, 255, 0.9)" />
                    <Text style={styles.secondaryButtonText}>Withdraw</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Mini Stats Overlay */}
              <View style={styles.statsOverlay}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Active Projects</Text>
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

          {/* Market Insights Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Market Insights</Text>
          </View>
          <View style={styles.section}>
            <View style={[styles.insightCard, { backgroundColor: '#ffffff' }]}>
              <View style={styles.insightIconWrapper}>
                <MaterialIcons name="lightbulb" size={24} color="#11d421" />
              </View>
              <View style={styles.insightTextContent}>
                <Text style={styles.insightTitle}>Cocoa Demand Surge</Text>
                <Text style={styles.insightDescription}>
                  Global cocoa prices are projected to rise by 8.5% due to supply constraints in West Africa. Your Ghana-based investments are well-positioned.
                </Text>
              </View>
            </View>
          </View>

          {/* Next Harvest Payout */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Harvests</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/portfolio")}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={[styles.harvestCard, { backgroundColor: '#ffffff' }]}>
              <View style={styles.harvestContent}>
                <Image
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG6pkj0nf3Yb5m7ydxIIPrNmg4wqjDqJ8Dy5MdcM4RB_4GB5_6ORxlAfMBb9ltlf7f6Tb6xmRjvdsF13fmIYLuG7ONbtVKnATf9H4n8XzxjEMMgVn_cg8AXJFRwcFlnj4H4qr4kLQrFlYsQauSfYOMi_1qI0tNAY3h3aB8sWGm5VnBOwDazXsAJLHiWq7ur6F2OJ5tE9Iq5-XPBCxK0ctCU3z5rNkYgczrcpvTxxobfDLr7JpnsBndo5lE2uY5H0jZJghkbSrlqFd6" }}
                  style={styles.harvestImage}
                />
                <View style={styles.harvestInfo}>
                  <View style={styles.harvestHeader}>
                    <Text style={styles.harvestTitle}>Maize Plantation #42</Text>
                    <View style={[styles.maturationBadge, { backgroundColor: '#f0fdf4' }]}>
                      <Text style={[styles.maturationText, { color: '#11d421' }]}>85% READY</Text>
                    </View>
                  </View>
                  <Text style={styles.expectedText}>
                    Expected: <Text style={styles.expectedAmount}>$1,240.00</Text>
                  </Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { backgroundColor: '#11d421' }]} />
                    </View>
                    <Text style={styles.daysText}>12 Days</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Performance Overview */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Overview</Text>
          </View>

          <View style={styles.metricsRow}>
            <View style={[styles.metricCard, { backgroundColor: '#ffffff' }]}>
              <View style={[styles.metricIconContainer, { backgroundColor: '#f0fdf4' }]}>
                <MaterialIcons name="local-florist" size={24} color="#11d421" />
              </View>
              <Text style={styles.metricLabel}>ACRES FUNDED</Text>
              <Text style={styles.metricValue}>124.5</Text>
            </View>
            <View style={[styles.metricCard, { backgroundColor: '#ffffff' }]}>
              <View style={[styles.metricIconContainer, { backgroundColor: '#eff6ff' }]}>
                <MaterialIcons name="people" size={24} color="#3b82f6" />
              </View>
              <Text style={styles.metricLabel}>FARMERS</Text>
              <Text style={styles.metricValue}>18</Text>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.activityList}>
              <View style={[styles.activityItem, { backgroundColor: '#ffffff' }]}>
                <View style={styles.activityLeft}>
                  <View style={[styles.activityIconWrapper, { backgroundColor: '#fff7ed' }]}>
                    <MaterialIcons name="spa" size={20} color="#ea580c" />
                  </View>
                  <View>
                    <Text style={styles.activityTitle}>New Investment</Text>
                    <Text style={styles.activitySubtitle}>Cassava Farm #08 • 2h ago</Text>
                  </View>
                </View>
                <Text style={styles.activityAmountNegative}>-$500.00</Text>
              </View>

              <View style={[styles.activityItem, { backgroundColor: '#ffffff' }]}>
                <View style={styles.activityLeft}>
                  <View style={[styles.activityIconWrapper, { backgroundColor: '#f0fdf4' }]}>
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
    color: '#6b7280',
    fontFamily: 'Poppins_500Medium',
  },
  userName: {
    fontSize: 18,
    color: '#0a0a0a',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  brandText: {
    fontSize: 24,
    fontFamily: 'Aclonica_400Regular',
    color: '#11d421',
    letterSpacing: -1,
  },
  notificationButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  notificationDot: {
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
    marginBottom: 8,
  },
  walletCard: {
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    marginBottom: 16,
  },
  walletCardContent: {
    marginBottom: 20,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  walletLabel: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Poppins_500Medium',
  },
  walletAmount: {
    fontSize: 34,
    color: '#ffffff',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.8,
  },
  walletIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 16,
  },
  performanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  performanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  performanceText: {
    fontSize: 13,
    color: '#ffffff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  performanceSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    fontFamily: 'Poppins_500Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1.2,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#11d421',
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
  },
  statsOverlay: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    fontFamily: 'Poppins_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statValueProfit: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  insightCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eeeeee',
    gap: 16,
    marginBottom: 16,
  },
  insightIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightTextContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    color: '#0a0a0a',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 13,
    color: '#6b7280',
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
    color: '#0a0a0a',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  sectionLink: {
    color: '#11d421',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
  harvestCard: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginBottom: 16,
  },
  harvestContent: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  harvestImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  harvestInfo: {
    flex: 1,
  },
  harvestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  harvestTitle: {
    fontSize: 16,
    color: '#0a0a0a',
    fontFamily: 'Poppins_700Bold',
    flex: 1,
    marginRight: 8,
  },
  maturationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  maturationText: {
    fontSize: 10,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  expectedText: {
    fontSize: 13,
    color: '#6b7280',
    fontFamily: 'Poppins_500Medium',
  },
  expectedAmount: {
    color: '#0a0a0a',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  progressContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '85%',
  },
  daysText: {
    fontSize: 12,
    color: '#0a0a0a',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    color: '#6b7280',
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 26,
    color: '#0a0a0a',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  activityIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 15,
    color: '#0a0a0a',
    fontFamily: 'Poppins_600SemiBold',
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
  },
  activityAmountNegative: {
    fontSize: 15,
    color: '#ef4444',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  activityAmountPositive: {
    fontSize: 15,
    color: '#11d421',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
});

