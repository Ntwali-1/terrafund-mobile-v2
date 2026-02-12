import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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
        <LinearGradient
          colors={isDark ? ['rgba(59, 130, 246, 0.05)', 'transparent'] : ['rgba(59, 130, 246, 0.08)', 'transparent']}
          style={[styles.decorativeCircle, styles.circle2]}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileWrapper}>
            <LinearGradient
              colors={['#11d421', '#0fb31c']}
              style={styles.avatarGlow}
            />
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtW9Y7Cne6f0kprwzqDmBBbednODDmVF84_MC1xNyU5xwNHwk2QugWQ7_FThsLE2xGiYQygc7RubMz07gX5E39hzEVwAbS8vCraEdbvLFr40XYtUT8DiuNW8jZGKSMCQR2lE7aYk7nOyZpDnvaXx0hQ-v8S082pfEhhCRe_lttFUmE8eaRbUq7RUim0aAS9Nkz87hmZlJgFKfLw9CoAzeOb29A5-JjYusMeLIyOA05YJNGDwNw3VkWPvbYWLN9tVvfk3jINrgUJSPO" }}
                style={styles.profileImage}
              />
            </View>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.brandText}>TerraFund</Text>
            <Text style={[styles.welcomeText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Welcome back, Kofi Mensah 👋</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff' }]}>
            <MaterialIcons name="notifications-none" size={24} color={isDark ? '#fff' : '#0a0a0a'} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          {[
            { label: 'Total Assets', value: '12.5 Ha', icon: 'landscape', color: '#11d421' },
            { label: 'Market ROI', value: '+18.2%', icon: 'trending-up', color: '#3b82f6' },
            { label: 'Active Projects', value: '3 Major', icon: 'agriculture', color: '#f59e0b' },
            { label: 'Total Profits', value: '$4,250', icon: 'payments', color: '#10b981' }
          ].map((metric, idx) => (
            <LinearGradient
              key={idx}
              colors={isDark ? ['#1e1e1e', '#141414'] : ['#ffffff', '#f8fafc']}
              style={[styles.metricCard, styles.cardShadow]}
            >
              <View style={[styles.metricIcon, { backgroundColor: metric.color + '15' }]}>
                <MaterialIcons name={metric.icon as any} size={20} color={metric.color} />
              </View>
              <Text style={[styles.metricLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{metric.label}</Text>
              <Text style={[styles.metricValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{metric.value}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Invest CTA */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.ctaWrapper}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <LinearGradient
            colors={['#11d421', '#0fb31c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaButton}
          >
            <View style={styles.ctaIconBg}>
              <MaterialIcons name="add-chart" size={24} color="#11d421" />
            </View>
            <View style={styles.ctaTextContainer}>
              <Text style={styles.ctaTitle}>Grow Your Portfolio</Text>
              <Text style={styles.ctaSubtitle}>Invest in verified regenerative farms</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={16} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Recent Updates</Text>
          <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {[
            { title: 'Yield Report Ready', sub: 'Highland Ridge - Sep 2023', time: '2h ago', icon: 'assessment', color: '#11d421' },
            { title: 'Project Verification', sub: 'Western Savannah Project', time: 'Yesterday', icon: 'verified', color: '#3b82f6' },
            { title: 'Payout Received', sub: 'Portfolio Dividend #42', time: '3 days ago', icon: 'payments', color: '#f59e0b' }
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.activityItem, {
                backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
              }]}
            >
              <View style={[styles.activityIcon, { backgroundColor: item.color + '15' }]}>
                <MaterialIcons name={item.icon as any} size={22} color={item.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.title}</Text>
                <Text style={[styles.activitySubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.sub}</Text>
              </View>
              <Text style={[styles.activityTime, { color: isDark ? '#6b7280' : '#9ca3af' }]}>{item.time}</Text>
            </TouchableOpacity>
          ))}
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
  circle2: {
    width: 200,
    height: 200,
    bottom: 100,
    right: -50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  profileWrapper: {
    position: 'relative',
  },
  avatarGlow: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    top: -10,
    left: -10,
    opacity: 0.15,
  },
  profileImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    flex: 1,
    paddingHorizontal: 16,
  },
  brandText: {
    fontSize: 22,
    fontFamily: 'Aclonica_400Regular',
    color: '#11d421',
    marginBottom: 2,
  },
  welcomeText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  metricCard: {
    width: (width - 60) / 2,
    margin: 6,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  ctaWrapper: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'SpaceGrotesk_700Bold',
    marginBottom: 2,
  },
  ctaSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
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
  viewAllText: {
    color: '#11d421',
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
  },
  activityList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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