import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function InvestmentTrackerScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const investments = [
        {
            id: 1,
            name: 'Organic Cocoa Plantation',
            location: 'Ghana, Ashanti',
            invested: '$5,000',
            progress: 65,
            nextPayout: 'Oct 15, 2024',
            status: 'Growing'
        },
        {
            id: 2,
            name: 'Premium Maize Farm',
            location: 'Kenya, Nakuru',
            invested: '$2,500',
            progress: 40,
            nextPayout: 'Nov 20, 2024',
            status: 'Irrigation'
        },
        {
            id: 3,
            name: 'Sustainable Wheat Field',
            location: 'South Africa, Free State',
            invested: '$8,000',
            progress: 90,
            nextPayout: 'Sep 10, 2024',
            status: 'Harvesting'
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Investment Tracker</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Active Portfolio</Text>

                {investments.map((item, idx) => (
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: idx * 100 }}
                        key={item.id}
                        style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                    >
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={[styles.projectName, { color: theme.text }]}>{item.name}</Text>
                                <View style={styles.locationRow}>
                                    <Ionicons name="location" size={14} color="#11d421" />
                                    <Text style={[styles.locationText, { color: theme.textSecondary }]}>{item.location}</Text>
                                </View>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                        </View>

                        <View style={styles.progressSection}>
                            <View style={styles.progressHeader}>
                                <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>Growth Progress</Text>
                                <Text style={[styles.progressValue, { color: theme.tint }]}>{item.progress}%</Text>
                            </View>
                            <View style={[styles.progressBar, { backgroundColor: isDark ? '#333' : '#eee' }]}>
                                <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: '#11d421' }]} />
                            </View>
                        </View>

                        <View style={styles.cardFooter}>
                            <View>
                                <Text style={[styles.footerLabel, { color: theme.textSecondary }]}>Total Invested</Text>
                                <Text style={[styles.footerValue, { color: theme.text }]}>{item.invested}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={[styles.footerLabel, { color: theme.textSecondary }]}>Next Payout</Text>
                                <Text style={[styles.footerValue, { color: theme.text }]}>{item.nextPayout}</Text>
                            </View>
                        </View>
                    </MotiView>
                ))}

                <View style={styles.summaryBox}>
                    <Text style={[styles.summaryTitle, { color: theme.text }]}>Portfolio Insights</Text>
                    <View style={styles.summaryGrid}>
                        <View style={[styles.summaryItem, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb' }]}>
                            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Avg. ROI</Text>
                            <Text style={[styles.summaryValue, { color: '#11d421' }]}>13.2%</Text>
                        </View>
                        <View style={[styles.summaryItem, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb' }]}>
                            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Assets</Text>
                            <Text style={[styles.summaryValue, { color: theme.text }]}>03</Text>
                        </View>
                    </View>
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
    scrollContent: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20,
    },
    card: {
        borderRadius: 24,
        borderWidth: 1,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    projectName: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 13,
        fontFamily: 'Poppins_500Medium',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontFamily: 'Poppins_700Bold',
        color: '#11d421',
        textTransform: 'uppercase',
    },
    progressSection: {
        marginBottom: 20,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    progressValue: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    footerLabel: {
        fontSize: 11,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    footerValue: {
        fontSize: 15,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    summaryBox: {
        marginTop: 10,
        paddingTop: 20,
    },
    summaryTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 16,
    },
    summaryGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    summaryItem: {
        flex: 1,
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    summaryLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 4,
    },
    summaryValue: {
        fontSize: 22,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
});
