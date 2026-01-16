import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DashboardScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      paddingBottom: 8,
      backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
    },
    profileImageContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: '#11d421',
      overflow: 'hidden',
    },
    profileImage: {
      width: '100%',
      height: '100%',
    },
    headerText: {
      flex: 1,
      paddingHorizontal: 12,
    },
    welcomeText: {
      fontSize: 12,
      color: '#4c9a52',
      marginBottom: 2,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#0d1b0f',
    },
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: isDark ? '#1f2937' : '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#f1f5f9',
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#ef4444',
    },
    metricsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 16,
      gap: 12,
    },
    metricCard: {
      flex: 1,
      minWidth: 150,
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#1e3a1e' : '#cfe7d1',
      backgroundColor: isDark ? '#111827' : '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    metricIcon: {
      backgroundColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.1)',
      padding: 8,
      borderRadius: 8,
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    metricLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: '#4c9a52',
      textTransform: 'uppercase',
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    metricValue: {
      fontSize: 20,
      fontWeight: '800',
      color: isDark ? '#fff' : '#0d1b0f',
    },
    ctaButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 64,
      marginHorizontal: 16,
      marginVertical: 8,
      paddingHorizontal: 24,
      borderRadius: 12,
      backgroundColor: '#11d421',
      shadowColor: '#11d421',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    ctaButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 12,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#0d1b0f',
    },
    viewAllText: {
      color: '#11d421',
      fontSize: 14,
      fontWeight: 'bold',
    },
    activityList: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#fff',
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#1f2937' : '#f1f5f9',
    },
    activityIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    activityContent: {
      flex: 1,
    },
    activityTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#0d1b0f',
      marginBottom: 2,
    },
    activityDescription: {
      fontSize: 14,
      color: '#4c9a52',
    },
    activityTime: {
      fontSize: 12,
      fontWeight: '600',
      color: '#4c9a52',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtW9Y7Cne6f0kprwzqDmBBbednODDmVF84_MC1xNyU5xwNHwk2QugWQ7_FThsLE2xGiYQygc7RubMz07gX5E39hzEVwAbS8vCraEdbvLFr40XYtUT8DiuNW8jZGKSMCQR2lE7aYk7nOyZpDnvaXx0hQ-v8S082pfEhhCRe_lttFUmE8eaRbUq7RUim0aAS9Nkz87hmZlJgFKfLw9CoAzeOb29A5-JjYusMeLIyOA05YJNGDwNw3VkWPvbYWLN9tVvfk3jINrgUJSPO" }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userName}>Kofi Mensah 👋</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={24} color={isDark ? '#fff' : '#0d1b0f'} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          {/* Total Land Posted */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <MaterialIcons name="local-florist" size={24} color="#11d421" />
            </View>
            <Text style={styles.metricLabel}>Total Land</Text>
            <Text style={styles.metricValue}>12.5 Ha</Text>
          </View>

          {/* Active Investors */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <MaterialIcons name="groups" size={24} color="#11d421" />
            </View>
            <Text style={styles.metricLabel}>Investors</Text>
            <Text style={styles.metricValue}>4 Active</Text>
          </View>

          {/* Ongoing Farms */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <MaterialIcons name="agriculture" size={24} color="#11d421" />
            </View>
            <Text style={styles.metricLabel}>Ongoing</Text>
            <Text style={styles.metricValue}>3 Projects</Text>
          </View>

          {/* Total Earnings */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <MaterialIcons name="payments" size={24} color="#11d421" />
            </View>
            <Text style={styles.metricLabel}>Earnings</Text>
            <Text style={styles.metricValue}>$2,450.00</Text>
          </View>
        </View>

        {/* Post Land CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push("/post-land-details")}
        >
          <MaterialIcons name="add-circle" size={28} color="white" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.ctaButtonText}>Post My Land</Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 12 }}>Register new plots for investment</Text>
          </View>
        </TouchableOpacity>

        {/* Recent Activity Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => router.push("/investor-offers")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Activity List */}
        <View style={styles.activityList}>
          {/* Activity Item 1 */}
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: isDark ? '#0c1f0c' : '#e7f3e8' }]}>
              <MaterialIcons name="person-search" size={24} color="#11d421" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New investor inquiry</Text>
              <Text style={styles.activityDescription} numberOfLines={1}>
                John Doe is interested in Plot B
              </Text>
            </View>
            <Text style={styles.activityTime}>2h ago</Text>
          </View>

          {/* Activity Item 2 */}
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: isDark ? '#0a1a3d' : '#dbeafe' }]}>
              <MaterialIcons name="verified" size={24} color="#2563eb" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Plot Verified</Text>
              <Text style={styles.activityDescription} numberOfLines={1}>
                Sector 7 inspection complete
              </Text>
            </View>
            <Text style={styles.activityTime}>Yesterday</Text>
          </View>

          {/* Activity Item 3 */}
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: isDark ? '#3d2c0d' : '#fef3c7' }]}>
              <MaterialIcons name="payments" size={24} color="#d97706" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Payout Processed</Text>
              <Text style={styles.activityDescription} numberOfLines={1}>
                Q3 Maize farm harvest profit
              </Text>
            </View>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}