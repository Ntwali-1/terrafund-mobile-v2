import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function LandDetailsManagementScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const investors = [
        { name: 'John Doe', amount: '$5,000', acres: '15', date: 'Aug 20, 2024' },
        { name: 'Alice Smith', amount: '$3,200', acres: '10', date: 'Aug 22, 2024' },
        { name: 'Global Agri', amount: '$12,000', acres: '40', date: 'Aug 25, 2024' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000' }}
                        style={styles.heroImage}
                    />
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}>
                        <Ionicons name="create-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <View>
                            <Text style={[styles.title, { color: theme.text }]}>Sunny Valley Estate</Text>
                            <Text style={[styles.location, { color: theme.textSecondary }]}>
                                <Ionicons name="location-outline" size={14} /> Ashanti Region, Ghana
                            </Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                            <Text style={styles.statusText}>Live</Text>
                        </View>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={[styles.statItem, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                            <Text style={[styles.statValue, { color: theme.text }]}>120</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Total Acres</Text>
                        </View>
                        <View style={[styles.statItem, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                            <Text style={[styles.statValue, { color: theme.text }]}>65%</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Funded</Text>
                        </View>
                        <View style={[styles.statItem, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                            <Text style={[styles.statValue, { color: theme.text }]}>124</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Days Active</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Asset Performance</Text>
                        <View style={[styles.perfCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                            <View style={styles.perfRow}>
                                <Text style={[styles.perfLabel, { color: theme.textSecondary }]}>Total Capital Raised</Text>
                                <Text style={[styles.perfValue, { color: theme.text }]}>$48,500.00</Text>
                            </View>
                            <View style={styles.perfDivider} />
                            <View style={styles.perfRow}>
                                <Text style={[styles.perfLabel, { color: theme.textSecondary }]}>Projected Yield</Text>
                                <Text style={[styles.perfValue, { color: '#11d421' }]}>12-14% /yr</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Active Investors</Text>
                            <TouchableOpacity>
                                <Text style={[styles.viewAll, { color: theme.tint }]}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        {investors.map((investor, idx) => (
                            <View key={idx} style={[styles.investorRow, { borderBottomColor: theme.border, borderBottomWidth: idx < investors.length - 1 ? 1 : 0 }]}>
                                <View style={styles.investorInfo}>
                                    <View style={styles.avatarPlaceholder} />
                                    <View>
                                        <Text style={[styles.investorName, { color: theme.text }]}>{investor.name}</Text>
                                        <Text style={[styles.investorDate, { color: theme.textSecondary }]}>Since {investor.date}</Text>
                                    </View>
                                </View>
                                <View style={styles.investorAmountBox}>
                                    <Text style={[styles.investorAmount, { color: theme.text }]}>{investor.amount}</Text>
                                    <Text style={[styles.investorAcres, { color: theme.textSecondary }]}>{investor.acres} Acres</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.actionSection}>
                    <TouchableOpacity style={[styles.pauseBtn, { borderColor: theme.border }]}>
                        <Ionicons name="pause-outline" size={20} color={theme.textSecondary} />
                        <Text style={[styles.pauseText, { color: theme.textSecondary }]}>Pause Funding</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.deleteBtn, { backgroundColor: 'rgba(239, 68, 68, 0.05)' }]}>
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                        <Text style={styles.deleteText}>Remove Listing</Text>
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
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    heroImage: {
        flex: 1,
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 24,
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#fff',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
        color: '#11d421',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statItem: {
        flex: 1,
        padding: 16,
        borderRadius: 18,
        borderWidth: 1,
    },
    statValue: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        fontFamily: 'Poppins_500Medium',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 16,
    },
    perfCard: {
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    perfRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    perfLabel: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
    },
    perfValue: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    perfDivider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewAll: {
        fontSize: 13,
        fontFamily: 'Poppins_700Bold',
    },
    investorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    investorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: '#eee',
    },
    investorName: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
    },
    investorDate: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    investorAmountBox: {
        alignItems: 'flex-end',
    },
    investorAmount: {
        fontSize: 15,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    investorAcres: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    },
    actionSection: {
        paddingHorizontal: 24,
        gap: 16,
    },
    pauseBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
    },
    pauseText: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
    },
    deleteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 56,
        borderRadius: 16,
    },
    deleteText: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
        color: '#ef4444',
    },
});
