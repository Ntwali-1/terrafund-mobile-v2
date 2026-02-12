import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function InvestorsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a'] : ['#f8fafc', '#ffffff', '#fdfcf0']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.decorativeBackground}>
        <LinearGradient
          colors={isDark ? ['rgba(245, 158, 11, 0.08)', 'transparent'] : ['rgba(245, 158, 11, 0.1)', 'transparent']}
          style={[styles.decorativeCircle, styles.circle1]}
        />
      </View>

      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Project Backers</Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>4 Active Investors</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchWrapper, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
            <MaterialIcons name="search" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
            <TextInput
              placeholder="Search investors..."
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              style={[styles.searchInput, { color: isDark ? '#ffffff' : '#0a0a0a' }]}
            />
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
            <MaterialIcons name="tune" size={20} color={isDark ? '#ffffff' : '#4b5563'} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Investor List */}
          <View style={styles.investorList}>
            {[
              {
                name: 'Sarah Jenkins',
                amount: '$4,200',
                date: 'Oct 12, 2023',
                project: 'Maize Field A',
                initials: 'SJ',
                color: '#3b82f6'
              },
              {
                name: 'David Osei',
                amount: '$1,800',
                date: 'Oct 05, 2023',
                project: 'Maize Field A',
                initials: 'DO',
                color: '#10b981'
              },
              {
                name: 'Project Green Fund',
                amount: '$12,500',
                date: 'Sep 22, 2023',
                project: 'Cashew Expansion',
                initials: 'GF',
                color: '#f59e0b'
              },
              {
                name: 'Elena Rodriguez',
                amount: '$3,150',
                date: 'Sep 15, 2023',
                project: 'Maize Field A',
                initials: 'ER',
                color: '#8b5cf6'
              }
            ].map((investor, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.investorCard, {
                  backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                  borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
                }]}
              >
                <View style={[styles.avatarCircle, { backgroundColor: investor.color + '15' }]}>
                  <Text style={[styles.avatarText, { color: investor.color }]}>{investor.initials}</Text>
                </View>

                <View style={styles.investorInfo}>
                  <View style={styles.investorHeader}>
                    <Text style={[styles.investorName, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{investor.name}</Text>
                    <Text style={[styles.investorAmount, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{investor.amount}</Text>
                  </View>
                  <Text style={[styles.investorSub, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
                    Invested in <Text style={{ color: '#11d421', fontFamily: 'Poppins_600SemiBold' }}>{investor.project}</Text>
                  </Text>
                  <View style={styles.investorFooter}>
                    <View style={styles.dateRow}>
                      <MaterialIcons name="event" size={14} color={isDark ? '#6b7280' : '#9ca3af'} />
                      <Text style={[styles.dateText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{investor.date}</Text>
                    </View>
                    <TouchableOpacity style={styles.messageButton}>
                      <Text style={styles.messageText}>Message</Text>
                    </TouchableOpacity>
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
    bottom: -100,
    right: -100,
  },
  header: {
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  searchWrapper: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  investorList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  investorCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    gap: 16,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  investorInfo: {
    flex: 1,
  },
  investorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  investorName: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  investorAmount: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#11d421',
  },
  investorSub: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 12,
  },
  investorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  messageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#11d421',
    borderRadius: 8,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
  },
});
