import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function EarningsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Background Gradient */}
      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a'] : ['#f8fafc', '#ffffff', '#eff6ff']}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative Elements */}
      <View style={styles.decorativeBackground}>
        <LinearGradient
          colors={isDark ? ['rgba(59, 130, 246, 0.08)', 'transparent'] : ['rgba(59, 130, 246, 0.1)', 'transparent']}
          style={[styles.decorativeCircle, styles.circle1]}
        />
      </View>

      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Earnings</Text>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff' }]}>
            <MaterialIcons name="filter-list" size={20} color={isDark ? '#fff' : '#0a0a0a'} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Main Earnings Card */}
          <View style={styles.heroSection}>
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              style={styles.heroCard}
            >
              <View>
                <Text style={styles.heroLabel}>Total Revenue</Text>
                <Text style={styles.heroValue}>$8,420.50</Text>
              </View>
              <View style={styles.heroTrend}>
                <MaterialIcons name="trending-up" size={18} color="#ffffff" />
                <Text style={styles.heroTrendText}>+12.5%</Text>
              </View>
            </LinearGradient>

            <View style={styles.secondaryStats}>
              <View style={[styles.miniStat, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
                <Text style={[styles.miniLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>LEASES</Text>
                <Text style={[styles.miniValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>$2,100</Text>
              </View>
              <View style={[styles.miniStat, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
                <Text style={[styles.miniLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>YIELDS</Text>
                <Text style={[styles.miniValue, { color: '#11d421' }]}>$6,320</Text>
              </View>
            </View>
          </View>

          {/* Performance Chart Placeholder */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Revenue History</Text>
          </View>

          <View style={[styles.chartContainer, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
            <View style={styles.chartBars}>
              {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                <View key={i} style={styles.barWrapper}>
                  <LinearGradient
                    colors={i === 5 ? ['#3b82f6', '#2563eb'] : ['#e5e7eb', '#d1d5db']}
                    style={[styles.bar, { height: h }]}
                  />
                  <Text style={[styles.barLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Payouts */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Recent Payouts</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
          </View>

          <View style={styles.payoutList}>
            {[
              { title: 'September Yield', sub: 'Highland Ridge - Corn', amount: '+$1,240.00', date: 'Oct 02, 2023', icon: 'payments', color: '#11d421' },
              { title: 'Quarterly Lease', sub: 'Savannah Field', amount: '+$750.00', date: 'Sep 28, 2023', icon: 'business', color: '#3b82f6' },
              { title: 'Bonus Payout', sub: 'Platform Referral', amount: '+$50.00', date: 'Sep 15, 2023', icon: 'card-giftcard', color: '#f59e0b' }
            ].map((payout, idx) => (
              <View key={idx} style={[styles.payoutItem, {
                backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
              }]}>
                <View style={[styles.payoutIcon, { backgroundColor: payout.color + '15' }]}>
                  <MaterialIcons name={payout.icon as any} size={20} color={payout.color} />
                </View>
                <View style={styles.payoutInfo}>
                  <Text style={[styles.payoutTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{payout.title}</Text>
                  <Text style={[styles.payoutSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{payout.sub}</Text>
                </View>
                <View style={styles.payoutRight}>
                  <Text style={[styles.payoutAmount, { color: payout.color }]}>{payout.amount}</Text>
                  <Text style={[styles.payoutDate, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{payout.date}</Text>
                </View>
              </View>
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
    top: -50,
    left: -100,
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
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  heroCard: {
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroValue: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  heroTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  heroTrendText: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  secondaryStats: {
    flexDirection: 'row',
    gap: 12,
  },
  miniStat: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  miniLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  miniValue: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#3b82f6',
  },
  chartContainer: {
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    marginBottom: 32,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 28,
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  payoutList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  payoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },
  payoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payoutInfo: {
    flex: 1,
  },
  payoutTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  payoutSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  payoutRight: {
    alignItems: 'flex-end',
  },
  payoutAmount: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  payoutDate: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
  },
});
