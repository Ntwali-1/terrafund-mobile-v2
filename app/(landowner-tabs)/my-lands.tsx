import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiClient, LandSummaryResponse } from '@/src/utils/api';

const { width } = Dimensions.get('window');

export default function MyLandsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [lands, setLands] = useState<LandSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLands();
  }, []);

  const fetchMyLands = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getMyLands();
      setLands(response.content);
    } catch (error) {
      console.error('Error fetching my lands:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Background Gradient */}
      <LinearGradient
        colors={isDark ? ['#0a0a0a', '#1a1a1a'] : ['#f8fafc', '#ffffff', '#fff7ed']}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative Elements */}
      <View style={styles.decorativeBackground}>
        <LinearGradient
          colors={isDark ? ['rgba(17, 212, 33, 0.08)', 'transparent'] : ['rgba(17, 212, 33, 0.1)', 'transparent']}
          style={[styles.decorativeCircle, styles.circle1]}
        />
      </View>

      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>My Lands</Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{lands.length} Verified Plots</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <LinearGradient
              colors={['#11d421', '#0fb31c']}
              style={styles.addButtonGradient}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <LinearGradient
              colors={isDark ? ['#1e1e1e', '#141414'] : ['#ffffff', '#f8fafc']}
              style={[styles.statCard, styles.cardShadow]}
            >
              <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>TOTAL AREA</Text>
              <Text style={[styles.statValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>12.5 Ha</Text>
            </LinearGradient>
            <LinearGradient
              colors={isDark ? ['#1e1e1e', '#141414'] : ['#ffffff', '#f8fafc']}
              style={[styles.statCard, styles.cardShadow]}
            >
              <Text style={[styles.statLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>UTILIZED</Text>
              <Text style={[styles.statValue, { color: '#11d421' }]}>8.2 Ha</Text>
            </LinearGradient>
          </View>

          {/* Land List */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Your Assets</Text>
          </View>

          <View style={styles.landList}>
            {loading ? (
                <ActivityIndicator size="large" color="#11d421" style={{ marginTop: 40 }} />
            ) : lands.length === 0 ? (
                <View style={[styles.emptyState, { backgroundColor: isDark ? '#1a1a1a' : '#f8fafc' }]}>
                    <MaterialIcons name="landscape" size={48} color={isDark ? '#333' : '#ddd'} />
                    <Text style={[styles.emptyStateText, { color: isDark ? '#888' : '#999' }]}>No lands registered yet</Text>
                </View>
            ) : (
                lands.map((land, idx) => (
                    <TouchableOpacity
                      key={land.id || idx}
                      activeOpacity={0.9}
                      style={[styles.landCard, {
                        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                        borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
                      }]}
                    >
                      <Image 
                        source={{ uri: land.thumbnailUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop" }} 
                        style={styles.landImage} 
                      />
                      <View style={styles.landInfo}>
                        <View style={styles.landHeader}>
                          <Text style={[styles.landTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>
                              {land.sector}, {land.district}
                          </Text>
                          <View style={[styles.statusBadge, { backgroundColor: land.status === 'AVAILABLE' ? 'rgba(17, 212, 33, 0.1)' : 'rgba(245, 158, 11, 0.1)' }]}>
                            <Text style={[styles.statusText, { color: land.status === 'AVAILABLE' ? '#11d421' : '#f59e0b' }]}>{land.status}</Text>
                          </View>
                        </View>
                        <Text style={[styles.landLocation, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{land.province} Province • {land.areaSqMeters >= 10000 ? (land.areaSqMeters / 10000).toFixed(1) + ' Ha' : land.areaSqMeters + ' m²'}</Text>
      
                        <View style={styles.utilizationSection}>
                          <View style={styles.utilizationHeader}>
                            <Text style={[styles.utilizationLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>Utilization</Text>
                            <Text style={[styles.utilizationValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>0%</Text>
                          </View>
                          <View style={styles.utilizationBar}>
                            <LinearGradient
                              colors={['#11d421', '#0fb31c']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={[styles.utilizationFill, { width: `0%` }]}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
            )}
          </View>
          <View style={{ height: 120 }} />
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
    top: -100,
    right: -100,
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
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#11d421',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
  },
  landList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  landCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
  },
  landImage: {
    width: '100%',
    height: 160,
  },
  landInfo: {
    padding: 16,
  },
  landHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  landTitle: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  landLocation: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 16,
  },
  utilizationSection: {
    gap: 8,
  },
  utilizationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  utilizationLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  utilizationValue: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  utilizationBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  utilizationFill: {
    height: '100%',
  },
  emptyState: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
});
