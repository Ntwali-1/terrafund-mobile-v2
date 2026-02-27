import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const stats = [
        { label: 'Total Earnings', value: '$45,200', icon: 'payments', color: '#11d421' },
        { label: 'Active Investors', value: '124', icon: 'people', color: '#3b82f6' },
        { label: 'Funded Acres', value: '850', icon: 'landscape', color: '#f59e0b' },
        { label: 'Avg. Yield', value: '92%', icon: 'eco', color: '#8b5cf6' }
    ];

    const chartData = [40, 65, 45, 80, 55, 90, 70]; // Example yield percentages

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Farm Analytics</Text>
                <TouchableOpacity style={styles.headerAction}>
                    <Ionicons name="download-outline" size={22} color={theme.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.statsGrid}>
                    {stats.map((item, idx) => (
                        <MotiView
                            from={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 100 }}
                            key={idx}
                            style={[styles.statCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                        >
                            <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
                                <MaterialIcons name={item.icon as any} size={22} color={item.color} />
                            </View>
                            <Text style={[styles.statValue, { color: theme.text }]}>{item.value}</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{item.label}</Text>
                        </MotiView>
                    ))}
                </View>

                <View style={[styles.chartSection, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                    <View style={styles.chartHeader}>
                        <View>
                            <Text style={[styles.chartTitle, { color: theme.text }]}>Monthly Yield Performance</Text>
                            <Text style={[styles.chartSubtitle, { color: theme.textSecondary }]}>Jan - Jul 2024</Text>
                        </View>
                        <TouchableOpacity style={styles.filterBtn}>
                            <Text style={[styles.filterText, { color: theme.tint }]}>Weekly</Text>
                            <Ionicons name="chevron-down" size={14} color={theme.tint} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.chartContainer}>
                        {chartData.map((val, idx) => (
                            <View key={idx} style={styles.barWrapper}>
                                <MotiView
                                    from={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    style={[styles.chartBar, { backgroundColor: theme.tint }]}
                                />
                                <Text style={[styles.barLabel, { color: theme.textSecondary }]}>{['J', 'F', 'M', 'A', 'M', 'J', 'J'][idx]}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={[styles.investorSection, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                    <Text style={[styles.chartTitle, { color: theme.text, marginBottom: 20 }]}>Top Investors</Text>
                    {[
                        { name: 'Global Agri Fund', invest: '$12,000', acres: '40', img: 'https://ui-avatars.com/api/?name=GA&background=3b82f6&color=fff' },
                        { name: 'Sarah Mensah', invest: '$8,500', acres: '25', img: 'https://ui-avatars.com/api/?name=SM&background=f59e0b&color=fff' },
                        { name: 'Kwame Asante', invest: '$5,200', acres: '15', img: 'https://ui-avatars.com/api/?name=KA&background=11d421&color=fff' }
                    ].map((investor, idx) => (
                        <View key={idx} style={[styles.investorRow, idx < 2 && { borderBottomWidth: 1, borderBottomColor: theme.border }]}>
                            <View style={styles.investorInfo}>
                                <View style={styles.avatarImg} />
                                <View>
                                    <Text style={[styles.investorName, { color: theme.text }]}>{investor.name}</Text>
                                    <Text style={[styles.investorMeta, { color: theme.textSecondary }]}>{investor.acres} Acres Secured</Text>
                                </View>
                            </View>
                            <Text style={[styles.investorAmount, { color: theme.text }]}>{investor.invest}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.viewAllBtn}>
                        <Text style={[styles.viewAllText, { color: theme.tint }]}>View All Investors</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    headerAction: {
        padding: 8,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
    },
    statCard: {
        width: (width - 64) / 2,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        gap: 8,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statValue: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    },
    chartSection: {
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 24,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    chartTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    chartSubtitle: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(17, 212, 33, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    filterText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    chartContainer: {
        height: 180,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    barWrapper: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
        width: 20,
    },
    chartBar: {
        width: 8,
        borderRadius: 4,
    },
    barLabel: {
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        marginTop: 12,
    },
    investorSection: {
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
    },
    investorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    investorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarImg: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: '#eee',
    },
    investorName: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
    },
    investorMeta: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    investorAmount: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    viewAllBtn: {
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
    },
    viewAllText: {
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
});
