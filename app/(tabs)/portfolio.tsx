import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { height } = Dimensions.get('window');

export default function PortfolioScreen() {
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
            </View>

            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff' }]}
                        onPress={() => router.back()}
                    >
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={18}
                            color={isDark ? '#fff' : '#0a0a0a'}
                            style={{ marginLeft: 6 }}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#0a0a0a' }]}>Investment Portfolio</Text>
                    <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff' }]}>
                        <MaterialIcons
                            name="more-vert"
                            size={20}
                            color={isDark ? '#fff' : '#0a0a0a'}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Portfolio Stats */}
                    <View style={styles.statsSection}>
                        <LinearGradient
                            colors={['#11d421', '#0fb31c']}
                            style={styles.mainStatCard}
                        >
                            <View>
                                <Text style={styles.mainStatLabel}>Portfolio Value</Text>
                                <Text style={styles.mainStatValue}>$12,450.00</Text>
                            </View>
                            <View style={styles.mainStatTrend}>
                                <MaterialIcons name="trending-up" size={20} color="#ffffff" />
                                <Text style={styles.mainTrendText}>+14.2%</Text>
                            </View>
                        </LinearGradient>

                        <View style={styles.secondaryStatsRow}>
                            <View style={[styles.secondaryStatCard, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
                                <Text style={[styles.secondaryStatLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>INVESTED</Text>
                                <Text style={[styles.secondaryStatValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>$10,800</Text>
                            </View>
                            <View style={[styles.secondaryStatCard, { backgroundColor: isDark ? '#1e1e1e' : '#ffffff' }]}>
                                <Text style={[styles.secondaryStatLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>P. PROFIT</Text>
                                <Text style={[styles.secondaryStatValue, { color: '#11d421' }]}>+$1,650</Text>
                            </View>
                        </View>
                    </View>

                    {/* Filters */}
                    <View style={styles.filterSection}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                            {['All Assets', 'Active', 'Harvested', 'Pending'].map((filter, idx) => (
                                <TouchableOpacity
                                    key={filter}
                                    style={[
                                        styles.filterChip,
                                        idx === 0 && styles.activeFilterChip,
                                        { backgroundColor: idx === 0 ? '#11d421' : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff') }
                                    ]}
                                >
                                    <Text style={[
                                        styles.filterText,
                                        { color: idx === 0 ? '#ffffff' : (isDark ? '#ffffff' : '#4b5563') }
                                    ]}>{filter}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Active Investments */}
                    <View style={styles.sectionHeader}>
                        <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Active Assets</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>Analysis</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.investmentList}>
                        {[
                            { title: 'Green Valley Cocoa', loc: 'Ghana, West Region', roi: '12.5', amount: '2,500', progress: 65, date: 'Oct 24, 2024', icon: 'eco', color: '#11d421' },
                            { title: 'Sunrise Corn Ridge', loc: 'Kenya, Nakuru', roi: '8.2', amount: '1,200', progress: 30, date: 'Jan 12, 2025', icon: 'grain', color: '#f59e0b' },
                            { title: 'Blue Nile Rice', loc: 'Egypt, Delta', roi: '18.0', amount: '5,000', progress: 92, date: 'Harvesting', icon: 'water', color: '#3b82f6' }
                        ].map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                activeOpacity={0.9}
                                style={[styles.investmentCard, {
                                    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
                                }]}
                            >
                                <View style={styles.cardHeader}>
                                    <View style={[styles.cardIcon, { backgroundColor: item.color + '15' }]}>
                                        <MaterialIcons name={item.icon as any} size={24} color={item.color} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.cardTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.title}</Text>
                                        <Text style={[styles.cardSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.loc}</Text>
                                    </View>
                                    <View style={styles.cardAmountInfo}>
                                        <Text style={styles.roiText}>+{item.roi}% ROI</Text>
                                        <Text style={[styles.investedText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>${item.amount}</Text>
                                    </View>
                                </View>

                                <View style={styles.progressSection}>
                                    <View style={styles.progressHeader}>
                                        <Text style={[styles.progressLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>GROWTH CYCLE</Text>
                                        <Text style={[styles.progressValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.progress}%</Text>
                                    </View>
                                    <View style={styles.progressBar}>
                                        <LinearGradient
                                            colors={[item.color, item.color + 'cc']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.progressFill, { width: `${item.progress}%` }]}
                                        />
                                    </View>
                                    <View style={styles.dateInfo}>
                                        <MaterialIcons name="event" size={14} color={item.color} />
                                        <Text style={[styles.dateText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.date}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>

                {/* Floating Action Button */}
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.fab}
                        onPress={() => router.push("/(tabs)/explore")}
                    >
                        <LinearGradient
                            colors={['#11d421', '#0fb31c']}
                            style={styles.fabGradient}
                        >
                            <MaterialIcons name="add" size={24} color="#fff" />
                            <Text style={styles.fabText}>New Investment</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
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
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: -0.5,
    },
    statsSection: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    mainStatCard: {
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    mainStatLabel: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        marginBottom: 4,
    },
    mainStatValue: {
        color: '#ffffff',
        fontSize: 32,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    mainStatTrend: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 4,
    },
    mainTrendText: {
        color: '#ffffff',
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: 14,
    },
    secondaryStatsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    secondaryStatCard: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
    },
    secondaryStatLabel: {
        fontSize: 10,
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 1,
        marginBottom: 4,
    },
    secondaryStatValue: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    filterSection: {
        marginTop: 12,
        marginBottom: 20,
    },
    filterScroll: {
        paddingHorizontal: 24,
        gap: 10,
    },
    activeFilterChip: {
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
    },
    filterText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: -0.5,
    },
    viewAllText: {
        color: '#11d421',
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
    },
    investmentList: {
        paddingHorizontal: 24,
        gap: 16,
    },
    investmentCard: {
        borderRadius: 24,
        padding: 18,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 16,
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
    cardSubtitle: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    },
    cardAmountInfo: {
        alignItems: 'flex-end',
    },
    roiText: {
        fontSize: 15,
        fontFamily: 'SpaceGrotesk_700Bold',
        color: '#11d421',
    },
    investedText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    progressSection: {
        marginTop: 4,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 10,
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 0.5,
    },
    progressValue: {
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
    },
    dateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 12,
    },
    dateText: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    },
    fabContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    fab: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    fabGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        gap: 8,
    },
    fabText: {
        color: '#ffffff',
        fontFamily: 'Poppins_700Bold',
        fontSize: 15,
    },
});
