import { View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, ImageSourcePropType, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

interface FarmCardProps {
  image: ImageSourcePropType;
  location: string;
  crop: string;
  cropIcon: string;
  tag: string;
  title: string;
  roi: string;
  address: string;
  minInvestment: string;
  riskLevel: string;
}

const FarmCard: React.FC<FarmCardProps> = ({
  image,
  location,
  crop,
  cropIcon,
  tag,
  title,
  roi,
  address,
  minInvestment,
  riskLevel,
}) => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push("/land-investment-details")}
      style={[styles.card, {
        backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        borderColor: isDark ? '#333333' : '#eeeeee'
      }]}
    >
      <ImageBackground source={image} style={styles.cardImage}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />
        <View style={styles.cardBadges}>
          <BlurBadge icon="location-on" text={location} isDark={isDark} />
          <View style={[styles.cropBadge, { backgroundColor: '#11d421' }]}>
            <MaterialIcons name={cropIcon as any} size={14} color="white" />
            <Text style={styles.cropText}>{crop}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={[styles.tag, { color: '#11d421' }]}>{tag}</Text>
            <Text style={[styles.cardTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{title}</Text>
          </View>
          <View style={[styles.roiBadge, { backgroundColor: '#11d421' }]}>
            <Text style={styles.roiText}>{roi}% ROI</Text>
          </View>
        </View>

        <View style={styles.addressRow}>
          <MaterialIcons name="place" size={14} color={isDark ? '#9ca3af' : '#6b7280'} />
          <Text style={[styles.address, { color: isDark ? '#9ca3af' : '#6b7280' }]} numberOfLines={1}>
            {address}
          </Text>
        </View>

        <View style={[styles.statsRow, { borderTopColor: isDark ? '#333333' : '#eeeeee' }]}>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Min Invest</Text>
            <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{minInvestment}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Risk Level</Text>
            <View style={styles.riskBadge}>
              <View style={[styles.riskDot, { backgroundColor: riskLevel === 'Low' ? '#11d421' : '#f59e0b' }]} />
              <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{riskLevel}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const BlurBadge = ({ icon, text, isDark }: { icon: string; text: string; isDark: boolean }) => (
  <View style={[styles.blurBadge, {
    backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255, 255, 255, 0.9)'
  }]}>
    <MaterialIcons name={icon as any} size={14} color="#11d421" />
    <Text style={[styles.blurBadgeText, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{text}</Text>
  </View>
);

export default function ExploreScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const farmData = [
    {
      id: 1,
      image: { uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTMzob97wzOdbextG8kkBB6JD_9Vcnr4fqZYSqKq0eUTmIH5mE8130doxFGqal7qrNn2HwWZNhHe49a24nPp6u8RtFbXlUXc6Z5Ee9ZJLeaWX8iA3wz3MXBmA6Yrt-tZd8CjQR1J5ZdXxsgw6sjaevpxmJnTk73OJHBQ0rNUakVSbOAhwX6Xxic8TBAHI0pwGF3iZDFYeK4Q8jRh1hpU1Bsv-I6r9kaL2YNsfZTeKvMvMrQi59rjN8L-tKjC29QvB7DSotS3Gy4K6Z" },
      location: 'Ghana',
      crop: 'Cocoa',
      cropIcon: 'eco',
      tag: 'High Growth',
      title: 'Organic Cocoa Plantation',
      roi: '14.5',
      address: 'Kumasi, Ashanti Region',
      minInvestment: '$5,000',
      riskLevel: 'Medium'
    },
    {
      id: 2,
      image: { uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW3stKw_cvh6eN8sKfzcuwfxstYIncK6aDfWO4XN7opQLOF5g9HpNHoQR8k9FhAxXlmvrLcEe_rBL9GFZp3BaYM5NfyJGO8Jq0CHQJQAfhWWacC8wtM2pJV5hsVaHcLA5JceYwnl-CiKsCKEyzESBI6N6KTeEyva1jT2-aI4fZqi7erd8z8HsUwN9smEUnqlRIcgfsvq2B_ejAfWDKB5jLA21-Y6FvwkL2ONCD6KML_34w4ieZEWzEmD4PlfKDXtexCHj--Uplfx-O" },
      location: 'Kenya',
      crop: 'Maize',
      cropIcon: 'grain',
      tag: 'Stable Return',
      title: 'Premium Maize Farm',
      roi: '11.2',
      address: 'Nakuru County, Rift Valley',
      minInvestment: '$2,500',
      riskLevel: 'Low'
    },
    {
      id: 3,
      image: { uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgi0k0kK7EAVJlM4HPznIpFto02Hdr1OgTAWpp1UL2KyZekFzTUM-TK5T8h-XpAJiEZRujMP49MAOwU_yLfEH90L2mg9OwY9iRZTeplIGkkKNWju7vh4ydOjRPhGLbY5D9yPb4allCH02lJchdkLR2E2E0qS4opSHGNAfaRMb_L9dlps2qCkfF2t-5eZKW6U3mBNN0tJIeelQTpjY9Xt2QMaB2vWlAEJvfXa-9tTSY9cZEwkQnLuCrtaA4RKxll7fON535xrH5ZCdb" },
      location: 'South Africa',
      crop: 'Wheat',
      cropIcon: 'grass',
      tag: 'Low Risk',
      title: 'Sustainable Wheat Field',
      roi: '12.0',
      address: 'Free State Province',
      minInvestment: '$8,000',
      riskLevel: 'Low'
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#fcfcfc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Background */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: isDark ? '#0a0a0a' : '#fcfcfc' }]} />

      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Browse Lands</Text>
            <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Explore Lands</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff', borderColor: isDark ? '#333333' : '#eeeeee' }]}>
              <MaterialIcons name="search" size={24} color={isDark ? '#ffffff' : '#0a0a0a'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? '#1a1a1a' : '#ffffff', borderColor: isDark ? '#333333' : '#eeeeee' }]}>
              <MaterialIcons name="notifications-none" size={24} color={isDark ? '#ffffff' : '#0a0a0a'} />
              <View style={styles.dot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            <TouchableOpacity style={[styles.activeFilterChip, { backgroundColor: '#11d421' }]}>
              <MaterialIcons name="tune" size={18} color="white" />
              <Text style={styles.activeFilterText}>All Fields</Text>
            </TouchableOpacity>

            {['Grains', 'Fruits', 'Vegetables', 'Sustainable'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.filterChip, {
                  backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                  borderColor: isDark ? '#333333' : '#eeeeee'
                }]}
              >
                <Text style={[styles.filterText, { color: isDark ? '#ffffff' : '#4b5563' }]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.resultsLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>3 Lands Found</Text>
          {farmData.map((farm) => (
            <FarmCard key={farm.id} {...farm} />
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  dot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#11d421',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  activeFilterText: {
    color: '#ffffff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
  },
  filterText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  resultsLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 24,
  },
  cardImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
  },
  cardBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  blurBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  blurBadgeText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  cropBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  cropText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  roiBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  roiText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  address: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#eeeeee',
    marginHorizontal: 16,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  riskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
