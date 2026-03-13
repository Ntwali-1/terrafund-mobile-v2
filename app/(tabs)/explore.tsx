import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, ImageSourcePropType, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StatusBar } from 'expo-status-bar';
import { apiClient, LandSummaryResponse } from '@/src/utils/api';

const { width } = Dimensions.get('window');

interface FarmCardProps {
  id: number;
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
  onPress: (id: number) => void;
}

const FarmCard: React.FC<FarmCardProps> = ({
  id,
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
  onPress,
}) => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(id)}
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

  const [lands, setLands] = useState<LandSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllLands();
  }, []);

  const fetchAllLands = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getLands();
      setLands(response.content);
    } catch (error) {
      console.error('Error fetching lands:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={[styles.resultsLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{lands.length} Lands Found</Text>
          {loading ? (
              <ActivityIndicator size="large" color="#11d421" style={{ marginTop: 40 }} />
          ) : lands.length === 0 ? (
              <View style={styles.emptyContainer}>
                  <MaterialIcons name="landscape" size={48} color={isDark ? '#333' : '#ddd'} />
                  <Text style={[styles.emptyText, { color: isDark ? '#888' : '#999' }]}>No lands found matching your criteria</Text>
              </View>
          ) : (
                lands.map((land) => (
                    <FarmCard 
                        key={land.id} 
                        id={land.id}
                        image={{ uri: land.thumbnailUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef" }}
                        location={land.province}
                        crop={land.sector}
                        cropIcon="eco"
                        tag="Available"
                        title={`${land.sector} Plot`}
                        roi="Dynamic"
                        address={`${land.sector}, ${land.district}`}
                        minInvestment={`${land.areaSqMeters} m²`}
                        riskLevel="Low"
                        onPress={(id) => router.push({ pathname: "/investor/land-details", params: { id } })}
                    />
                ))
          )}
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
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
});
