import { View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
    <View style={[styles.card, {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fff',
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    }]}>
      <ImageBackground source={image} style={styles.cardImage}>
        <View style={[styles.locationBadge, {
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.9)'
        }]}>
          <MaterialIcons name="location-on" size={12} color="#11d421" />
          <Text style={[styles.locationText, { color: isDark ? '#fff' : '#0d1b0f' }]}>{location}</Text>
        </View>
        <View style={styles.cropBadge}>
          <MaterialIcons name={cropIcon as any} size={12} color="white" />
          <Text style={styles.cropText}>{crop}</Text>
        </View>
      </ImageBackground>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={[styles.tag, { color: '#11d421' }]}>{tag}</Text>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#0d1b0f' }]}>{title}</Text>
          </View>
          <View style={styles.roiBadge}>
            <Text style={styles.roiText}>{roi}% ROI</Text>
          </View>
        </View>
        <Text style={[styles.address, { color: isDark ? '#9ca3af' : '#4c9a52' }]}>{address}</Text>

        <View style={[styles.statsRow, { borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Min Investment</Text>
            <Text style={[styles.statValue, { color: isDark ? '#fff' : '#0d1b0f' }]}>{minInvestment}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Risk Level</Text>
            <Text style={[styles.statValue, { color: isDark ? '#fff' : '#0d1b0f' }]}>{riskLevel}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/land-investment-details")}
        >
          <Text style={styles.buttonText}>View Investment Details</Text>
          <MaterialIcons name="arrow-forward-ios" size={14} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <View style={styles.container}>
        {/* Top App Bar */}
        <View style={[styles.header, {
          backgroundColor: isDark ? 'rgba(10, 10, 10, 0.8)' : 'rgba(248, 250, 252, 0.8)'
        }]}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="local-florist" size={28} color="#11d421" />
            <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#0d1b0f' }]}>Explore Lands</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff' }]}>
              <MaterialIcons name="search" size={24} color={isDark ? '#fff' : '#0d1b0f'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff',
              position: 'relative'
            }]}>
              <MaterialIcons name="notifications" size={24} color={isDark ? '#fff' : '#0d1b0f'} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            <TouchableOpacity style={styles.filterChipActive}>
              <MaterialIcons name="filter-list" size={18} color="white" />
              <Text style={styles.filterChipActiveText}>Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterChip, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}>
              <MaterialIcons name="agriculture" size={18} color={isDark ? '#fff' : '#0d1b0f'} />
              <Text style={[styles.filterChipText, { color: isDark ? '#fff' : '#0d1b0f' }]}>Crop</Text>
              <MaterialIcons name="expand-more" size={18} color={isDark ? '#fff' : '#0d1b0f'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterChip, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}>
              <MaterialIcons name="location-on" size={18} color={isDark ? '#fff' : '#0d1b0f'} />
              <Text style={[styles.filterChipText, { color: isDark ? '#fff' : '#0d1b0f' }]}>Location</Text>
              <MaterialIcons name="expand-more" size={18} color={isDark ? '#fff' : '#0d1b0f'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterChip, {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }]}>
              <MaterialIcons name="verified-user" size={18} color={isDark ? '#fff' : '#0d1b0f'} />
              <Text style={[styles.filterChipText, { color: isDark ? '#fff' : '#0d1b0f' }]}>Risk</Text>
              <MaterialIcons name="expand-more" size={18} color={isDark ? '#fff' : '#0d1b0f'} />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Farm Cards */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {farmData.map((farm) => (
            <FarmCard
              key={farm.id}
              image={farm.image}
              location={farm.location}
              crop={farm.crop}
              cropIcon={farm.cropIcon}
              tag={farm.tag}
              title={farm.title}
              roi={farm.roi}
              address={farm.address}
              minInvestment={farm.minInvestment}
              riskLevel={farm.riskLevel}
            />
          ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#11d421',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filterScrollContent: {
    gap: 12,
  },
  filterChipActive: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11d421',
    gap: 6,
  },
  filterChipActiveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  filterChip: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 6,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 24,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 16 / 10,
  },
  locationBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cropBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#11d421',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cropText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tag: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 24,
  },
  roiBadge: {
    backgroundColor: 'rgba(17, 212, 33, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roiText: {
    color: '#11d421',
    fontSize: 12,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    marginBottom: 20,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    width: '100%',
    backgroundColor: '#11d421',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});