import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

interface Transaction {
    id: string;
    type: 'investment' | 'payout' | 'withdrawal' | 'refund';
    title: string;
    amount: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}

export default function TransactionHistoryScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const transactions: Transaction[] = [
        {
            id: '1',
            type: 'payout',
            title: 'Monthly Payout - Cocoa Farm',
            amount: '+$450.00',
            date: 'Aug 24, 2024',
            status: 'completed'
        },
        {
            id: '2',
            type: 'investment',
            title: 'Equity Investment - Sunflower',
            amount: '-$1,200.00',
            date: 'Aug 18, 2024',
            status: 'completed'
        },
        {
            id: '3',
            type: 'withdrawal',
            title: 'Withdrawal to Bank',
            amount: '-$500.00',
            date: 'Aug 15, 2024',
            status: 'completed'
        },
        {
            id: '4',
            type: 'payout',
            title: 'Dividend - Rice Paddy',
            amount: '+$120.50',
            date: 'Aug 10, 2024',
            status: 'completed'
        },
        {
            id: '5',
            type: 'investment',
            title: 'Land Share - Maize Farm',
            amount: '-$2,500.00',
            date: 'Aug 02, 2024',
            status: 'pending'
        }
    ];

    const getStatusColor = (status: Transaction['status']) => {
        switch (status) {
            case 'completed': return '#11d421';
            case 'pending': return '#f59e0b';
            case 'failed': return '#ef4444';
            default: return theme.textSecondary;
        }
    };

    const getIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'investment': return 'arrow-up-right';
            case 'payout': return 'arrow-down-left';
            case 'withdrawal': return 'bank-transfer-out';
            case 'refund': return 'refresh';
            default: return 'help';
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Transactions</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={22} color={theme.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total Invested</Text>
                    <Text style={styles.summaryAmount}>$45,200.00</Text>
                    <View style={styles.summaryFooter}>
                        <View style={styles.summaryItem}>
                            <Ionicons name="arrow-down-circle" size={16} color="#11d421" />
                            <Text style={styles.summaryItemText}>+$1,240 Total Payouts</Text>
                        </View>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Recent Activity</Text>

                {transactions.map((tx, idx) => (
                    <MotiView
                        from={{ opacity: 0, translateX: -20 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ delay: idx * 100 }}
                        key={tx.id}
                        style={[styles.transactionCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                    >
                        <View style={[styles.iconWrapper, { backgroundColor: tx.type === 'payout' ? 'rgba(17, 212, 33, 0.1)' : (isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6') }]}>
                            <MaterialCommunityIcons
                                name={getIcon(tx.type) as any}
                                size={24}
                                color={tx.type === 'payout' ? '#11d421' : theme.text}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={[styles.txTitle, { color: theme.text }]} numberOfLines={1}>{tx.title}</Text>
                            <Text style={[styles.txDate, { color: theme.textSecondary }]}>{tx.date}</Text>
                        </View>
                        <View style={styles.amountSection}>
                            <Text style={[styles.txAmount, { color: tx.amount.startsWith('+') ? '#11d421' : theme.text }]}>
                                {tx.amount}
                            </Text>
                            <Text style={[styles.txStatus, { color: getStatusColor(tx.status) }]}>
                                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </Text>
                        </View>
                    </MotiView>
                ))}
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
    filterButton: {
        padding: 8,
    },
    scrollContent: {
        padding: 24,
    },
    summaryCard: {
        backgroundColor: '#0a0a0a',
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
    },
    summaryLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 4,
    },
    summaryAmount: {
        color: '#fff',
        fontSize: 32,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 16,
    },
    summaryFooter: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 16,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    summaryItemText: {
        color: '#11d421',
        fontSize: 13,
        fontFamily: 'Poppins_600SemiBold',
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 12,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    txTitle: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 2,
    },
    txDate: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    amountSection: {
        alignItems: 'flex-end',
    },
    txAmount: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 2,
    },
    txStatus: {
        fontSize: 10,
        fontFamily: 'Poppins_700Bold',
        textTransform: 'uppercase',
    },
});
