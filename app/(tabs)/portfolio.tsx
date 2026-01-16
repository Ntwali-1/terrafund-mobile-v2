import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function PortfolioScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            paddingBottom: 8,
            backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        },
        headerTitle: {
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
            color: isDark ? Colors.dark.text : Colors.light.text,
        },
        statCard: {
            flex: 1,
            minWidth: 150,
            gap: 8,
            borderRadius: 12,
            padding: 16,
            backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.1)',
            borderWidth: 1,
            borderColor: isDark ? 'rgba(17, 212, 33, 0.2)' : 'rgba(17, 212, 33, 0.2)',
        },
        statLabel: {
            fontSize: 14,
            color: isDark ? '#94a3b8' : '#64748b',
            fontWeight: '500',
        },
        statValue: {
            fontSize: 22,
            fontWeight: '800',
            color: isDark ? '#f8fafc' : '#0f172a',
        },
        statTrend: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        trendText: {
            fontSize: 12,
            fontWeight: '700',
            color: '#11d421',
            marginLeft: 4,
        },
        filterChip: {
            height: 36,
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
        },
        filterChipActive: {
            backgroundColor: '#11d421',
            borderColor: '#11d421',
        },
        filterChipText: {
            fontSize: 14,
            fontWeight: '600',
            color: isDark ? '#e2e8f0' : '#334155',
        },
        filterChipTextActive: {
            color: '#fff',
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 16,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '700',
            color: isDark ? '#f8fafc' : '#0f172a',
        },
        viewAllText: {
            color: '#11d421',
            fontWeight: '700',
            fontSize: 14,
        },
        investmentCard: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9',
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
        },
        cardContent: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        cardIcon: {
            width: 48,
            height: 48,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: '700',
            color: isDark ? '#f8fafc' : '#0f172a',
            marginBottom: 2,
        },
        cardSubtitle: {
            fontSize: 12,
            color: isDark ? '#94a3b8' : '#64748b',
        },
        cardStats: {
            alignItems: 'flex-end',
        },
        roiText: {
            fontSize: 16,
            fontWeight: '700',
            color: '#11d421',
            marginBottom: 2,
        },
        investedText: {
            fontSize: 12,
            color: isDark ? '#94a3b8' : '#94a3b8',
        },
        progressContainer: {
            gap: 8,
        },
        progressHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        progressLabel: {
            fontSize: 10,
            fontWeight: '700',
            color: isDark ? '#94a3b8' : '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        progressBar: {
            height: 4,
            width: '100%',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
            borderRadius: 2,
            overflow: 'hidden',
            marginTop: 4,
        },
        progressFill: {
            height: '100%',
            backgroundColor: '#11d421',
            borderRadius: 2,
        },
        progressDate: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
        },
        dateText: {
            fontSize: 12,
            color: isDark ? '#94a3b8' : '#64748b',
            marginLeft: 4,
        },
        fab: {
            backgroundColor: '#11d421',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 24,
            shadowColor: '#11d421',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
            gap: 8,
        },
        fabText: {
            color: '#fff',
            fontWeight: '700',
            fontSize: 14,
        },
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={20}
                        color={isDark ? '#fff' : '#0f172a'}
                        style={{ marginLeft: 4 }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Portfolio</Text>
                <View style={{ width: 40 }}>
                    <TouchableOpacity style={styles.backButton}>
                        <MaterialIcons
                            name="notifications"
                            size={20}
                            color={isDark ? '#fff' : '#0f172a'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
                {/* Portfolio Stats */}
                <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Total Invested</Text>
                        <Text style={styles.statValue}>$12,450.00</Text>
                        <View style={styles.statTrend}>
                            <MaterialIcons name="trending-up" size={14} color="#11d421" />
                            <Text style={styles.trendText}>+5.2%</Text>
                        </View>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: isDark ? 'rgba(17, 212, 33, 0.1)' : 'rgba(17, 212, 33, 0.1)' }]}>
                        <Text style={styles.statLabel}>Overall ROI</Text>
                        <Text style={styles.statValue}>+14.2%</Text>
                        <View style={styles.statTrend}>
                            <MaterialIcons name="trending-up" size={14} color="#11d421" />
                            <Text style={styles.trendText}>+1.5%</Text>
                        </View>
                    </View>
                </View>

                {/* Filters */}
                <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16 }}
                    >
                        <TouchableOpacity
                            style={[styles.filterChip, styles.filterChipActive]}
                        >
                            <Text style={[styles.filterChipText, styles.filterChipTextActive]}>All Crops</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterChip}>
                            <Text style={styles.filterChipText}>Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterChip}>
                            <Text style={styles.filterChipText}>Harvested</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterChip}>
                            <Text style={styles.filterChipText}>Pending</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Active Investments */}
                <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Active Investments</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>View History</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Investment Cards */}
                    <View style={{ marginTop: 8 }}>
                        {/* Card 1 */}
                        <View style={styles.investmentCard}>
                            <View style={styles.cardHeader}>
                                <View style={styles.cardContent}>
                                    <View style={[styles.cardIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                        <MaterialIcons name="psychology" size={24} color="#11d421" />
                                    </View>
                                    <View>
                                        <Text style={styles.cardTitle}>Green Valley Cocoa</Text>
                                        <Text style={styles.cardSubtitle}>Ghana, West Region</Text>
                                    </View>
                                </View>
                                <View style={styles.cardStats}>
                                    <Text style={styles.roiText}>+12.5% ROI</Text>
                                    <Text style={styles.investedText}>$2,500 invested</Text>
                                </View>
                            </View>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressLabel}>Crop Growth</Text>
                                    <Text style={styles.progressLabel}>65%</Text>
                                </View>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '65%' }]} />
                                </View>
                                <View style={styles.progressDate}>
                                    <MaterialIcons name="calendar-today" size={14} color="#11d421" />
                                    <Text style={styles.dateText}>Expected Harvest: Oct 24, 2024</Text>
                                </View>
                            </View>
                        </View>

                        {/* Card 2 */}
                        <View style={[styles.investmentCard, { marginTop: 12 }]}>
                            <View style={styles.cardHeader}>
                                <View style={styles.cardContent}>
                                    <View style={[styles.cardIcon, { backgroundColor: 'rgba(217, 119, 6, 0.1)' }]}>
                                        <MaterialIcons name="agriculture" size={24} color="#d97706" />
                                    </View>
                                    <View>
                                        <Text style={styles.cardTitle}>Sunrise Corn Ridge</Text>
                                        <Text style={styles.cardSubtitle}>Kenya, Nakuru</Text>
                                    </View>
                                </View>
                                <View style={styles.cardStats}>
                                    <Text style={styles.roiText}>+8.2% ROI</Text>
                                    <Text style={styles.investedText}>$1,200 invested</Text>
                                </View>
                            </View>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressLabel}>Crop Growth</Text>
                                    <Text style={styles.progressLabel}>30%</Text>
                                </View>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '30%' }]} />
                                </View>
                                <View style={styles.progressDate}>
                                    <MaterialIcons name="calendar-today" size={14} color="#11d421" />
                                    <Text style={styles.dateText}>Expected Harvest: Jan 12, 2025</Text>
                                </View>
                            </View>
                        </View>

                        {/* Card 3 */}
                        <View style={[styles.investmentCard, { marginTop: 12 }]}>
                            <View style={styles.cardHeader}>
                                <View style={styles.cardContent}>
                                    <View style={[styles.cardIcon, { backgroundColor: 'rgba(21, 128, 61, 0.1)' }]}>
                                        <MaterialIcons name="eco" size={24} color="#15803d" />
                                    </View>
                                    <View>
                                        <Text style={styles.cardTitle}>Blue Nile Rice</Text>
                                        <Text style={styles.cardSubtitle}>Egypt, Delta</Text>
                                    </View>
                                </View>
                                <View style={styles.cardStats}>
                                    <Text style={styles.roiText}>+18.0% ROI</Text>
                                    <Text style={styles.investedText}>$5,000 invested</Text>
                                </View>
                            </View>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressLabel}>Crop Growth</Text>
                                    <Text style={styles.progressLabel}>92%</Text>
                                </View>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '92%' }]} />
                                </View>
                                <View style={styles.progressDate}>
                                    <MaterialIcons name="verified" size={14} color="#11d421" />
                                    <Text style={styles.dateText}>Harvesting Soon: Sept 15, 2024</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Floating Action Button */}
                <View style={{ padding: 16, paddingBottom: 32, alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => router.push("/explore")}
                    >
                        <MaterialIcons name="add" size={20} color="#fff" />
                        <Text style={styles.fabText}>Invest in New Farm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
