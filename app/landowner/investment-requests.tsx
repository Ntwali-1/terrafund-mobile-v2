import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function InvestmentRequestsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const requests = [
        {
            id: 1,
            name: 'Global Agri Fund',
            amount: '$12,000',
            land: 'Sunny Valley Estate',
            date: 'Aug 26, 2024',
            status: 'Pending',
            img: 'https://ui-avatars.com/api/?name=GA&background=3b82f6&color=fff'
        },
        {
            id: 2,
            name: 'Sarah Mensah',
            amount: '$8,500',
            land: 'Sunny Valley Estate',
            date: 'Aug 25, 2024',
            status: 'Pending',
            img: 'https://ui-avatars.com/api/?name=SM&background=f59e0b&color=fff'
        },
        {
            id: 3,
            name: 'Kwame Asante',
            amount: '$5,200',
            land: 'Volta Grains Site',
            date: 'Aug 22, 2024',
            status: 'Approved',
            img: 'https://ui-avatars.com/api/?name=KA&background=11d421&color=fff'
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
                <Text style={[styles.headerTitle, { color: theme.text }]}>Investment Requests</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.tabs}>
                    <TouchableOpacity style={[styles.tab, styles.activeTab, { backgroundColor: theme.tint }]}>
                        <Text style={styles.tabTextActive}>Pending (2)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6' }]}>
                        <Text style={[styles.tabText, { color: theme.textSecondary }]}>Approved</Text>
                    </TouchableOpacity>
                </View>

                {requests.map((request, idx) => (
                    <MotiView
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: idx * 100 }}
                        key={request.id}
                        style={[styles.requestCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                    >
                        <View style={styles.cardHeader}>
                            <View style={styles.investorInfo}>
                                <View style={styles.avatarImg} />
                                <View>
                                    <Text style={[styles.investorName, { color: theme.text }]}>{request.name}</Text>
                                    <Text style={[styles.requestDate, { color: theme.textSecondary }]}>Submitted on {request.date}</Text>
                                </View>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: request.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(17, 212, 33, 0.1)' }]}>
                                <Text style={[styles.statusText, { color: request.status === 'Pending' ? '#f59e0b' : '#11d421' }]}>{request.status}</Text>
                            </View>
                        </View>

                        <View style={[styles.detailsBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#f9fafb' }]}>
                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Target Land</Text>
                                <Text style={[styles.detailValue, { color: theme.text }]}>{request.land}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.detailRow}>
                                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Investment Amount</Text>
                                <Text style={[styles.detailValue, { color: theme.tint, fontFamily: 'SpaceGrotesk_700Bold' }]}>{request.amount}</Text>
                            </View>
                        </View>

                        {request.status === 'Pending' && (
                            <View style={styles.actions}>
                                <TouchableOpacity style={[styles.actionBtn, styles.declineBtn, { borderColor: theme.border }]}>
                                    <Text style={[styles.declineText, { color: '#ef4444' }]}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, styles.approveBtn, { backgroundColor: '#11d421' }]}>
                                    <Text style={styles.approveText}>Approve Request</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity style={styles.viewProfileBtn}>
                            <Text style={[styles.viewProfileText, { color: theme.textSecondary }]}>View Investor Portfolio</Text>
                            <Ionicons name="chevron-forward" size={14} color={theme.textSecondary} />
                        </TouchableOpacity>
                    </MotiView>
                ))}

                <View style={{ height: 40 }} />
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
    tabs: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    activeTab: {
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
    },
    tabTextActive: {
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
    },
    tabText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
    },
    requestCard: {
        borderRadius: 24,
        borderWidth: 1,
        padding: 20,
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    investorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarImg: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#eee',
    },
    investorName: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    requestDate: {
        fontSize: 11,
        fontFamily: 'Poppins_400Regular',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontFamily: 'Poppins_700Bold',
        textTransform: 'uppercase',
    },
    detailsBox: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 13,
        fontFamily: 'Poppins_500Medium',
    },
    detailValue: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 12,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    actionBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    declineBtn: {
        borderWidth: 1,
    },
    approveBtn: {
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    declineText: {
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
    approveText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
    viewProfileBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    viewProfileText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
});
