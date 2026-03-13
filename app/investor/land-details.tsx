import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, StatusBar, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { apiClient, LandResponse } from '@/src/utils/api';

const { width, height } = Dimensions.get('window');

export default function LandDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [isFavorite, setIsFavorite] = React.useState(false);
    const [land, setLand] = React.useState<LandResponse | null>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (params.id) {
            fetchLandDetails(Number(params.id));
        }
    }, [params.id]);

    const fetchLandDetails = async (id: number) => {
        try {
            setLoading(true);
            const data = await apiClient.getLandById(id);
            setLand(data);
        } catch (error) {
            console.error('Error fetching land details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#11d421" />
            </View>
        );
    }

    const landData = land || {
        imageUrls: [],
        province: 'Unknown',
        district: 'Unknown',
        sector: 'Unknown',
        areaSqMeters: 0,
        availabilityType: 'Unknown',
        status: 'Unknown',
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle="light-content" translucent />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <Image
                        source={landData.imageUrls.length > 0 ? { uri: landData.imageUrls[0] } : require('@/assets/images/pexels-akos-szabo-145938-440731.jpg')}
                        style={styles.heroImage}
                        contentFit="cover"
                        transition={500}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.heroGradient}
                    />

                    <SafeAreaView style={styles.heroHeader} edges={['top']}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setIsFavorite(!isFavorite)}
                        >
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ef4444" : "#fff"} />
                        </TouchableOpacity>
                    </SafeAreaView>

                    <View style={styles.heroTitleContainer}>
                        <View style={styles.tagRow}>
                            <View style={[styles.tag, { backgroundColor: '#11d421' }]}>
                                <Text style={styles.tagText}>{landData.availabilityType}</Text>
                            </View>
                            <View style={[styles.tag, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                <Ionicons name="location" size={12} color="#fff" />
                                <Text style={styles.tagText}>{landData.province}, {landData.district}</Text>
                            </View>
                        </View>
                        <Text style={styles.heroTitle}>{landData.sector} Plot</Text>
                        <Text style={styles.heroSubtitle}>Status: {landData.status}</Text>
                    </View>
                </View>

                {/* Content Section */}
                <View style={[styles.contentCard, { backgroundColor: theme.background }]}>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Projected ROI</Text>
                            <Text style={[styles.statValue, { color: '#11d421' }]}>Dynamic</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Asset Size</Text>
                            <Text style={[styles.statValue, { color: theme.text }]}>{landData.areaSqMeters} m²</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Risk Level</Text>
                            <Text style={[styles.statValue, { color: '#f59e0b' }]}>Low</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>About the Plantation</Text>
                        <Text style={[styles.description, { color: theme.textSecondary }]}>
                            This high-yield cocoa plantation is located in the fertile Ashanti region of Ghana.
                            The project uses advanced sustainable farming techniques and high-quality seeds to ensure
                            consistent crop performance. Investors fund the operational costs and share in the
                            profits from quarterly cocoa bean harvests.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Key Highlights</Text>
                        <View style={styles.highlightsGrid}>
                            {[
                                { icon: 'shield-checkmark-outline', text: 'Legal Ownership Insured' },
                                { icon: 'water-outline', text: 'Automated Irrigation' },
                                { icon: 'leaf-outline', text: '100% Organic' },
                                { icon: 'trending-up-outline', text: 'Proven Yield History' }
                            ].map((item, idx) => (
                                <View key={idx} style={styles.highlightItem}>
                                    <Ionicons name={item.icon as any} size={20} color="#11d421" />
                                    <Text style={[styles.highlightText, { color: theme.textSecondary }]}>{item.text}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Location & Soil</Text>
                        <View style={[styles.mapPlaceholder, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6', borderColor: theme.border }]}>
                            <Ionicons name="map-outline" size={32} color={theme.tint} />
                            <Text style={[styles.mapText, { color: theme.textSecondary }]}>Interactive Soil Map View</Text>
                        </View>
                    </View>

                    <View style={{ height: 120 }} />
                </View>
            </ScrollView>

            {/* Floating Action Bar */}
            <View style={[styles.footer, { backgroundColor: theme.background, borderTopColor: theme.border, paddingBottom: insets.bottom + 12 }]}>
                <View style={styles.priceContainer}>
                    <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Price per Share</Text>
                    <Text style={[styles.priceValue, { color: theme.text }]}>$250.00</Text>
                </View>
                <TouchableOpacity style={[styles.investButton, { backgroundColor: '#11d421' }]}>
                    <Text style={styles.investButtonText}>Invest Now</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    heroContainer: {
        height: height * 0.45,
        width: width,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    heroHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroTitleContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    tagText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
    },
    heroTitle: {
        fontSize: 32,
        fontFamily: 'SpaceGrotesk_700Bold',
        color: '#fff',
        marginBottom: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: 'rgba(255,255,255,0.8)',
    },
    contentCard: {
        marginTop: -24,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    statDivider: {
        width: 1,
        height: '60%',
        backgroundColor: '#eee',
        alignSelf: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 24,
    },
    highlightsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    highlightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '48%',
        marginBottom: 8,
    },
    highlightText: {
        fontSize: 13,
        fontFamily: 'Poppins_500Medium',
    },
    mapPlaceholder: {
        height: 160,
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    mapText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        borderTopWidth: 1,
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    priceValue: {
        fontSize: 22,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    investButton: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    investButtonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Poppins_700Bold',
    },
});
