import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function WalletScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            paddingBottom: 8,
            backgroundColor: isDark ? '#0a0a0a' : '#f8fafc',
        },
        backButton: {
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerTitle: {
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: isDark ? '#fff' : '#0d1b0f',
            paddingRight: 48,
        },
        notificationButton: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: isDark ? '#374151' : '#f1f5f9',
        },
        balanceContainer: {
            alignItems: 'center',
            paddingVertical: 32,
            paddingBottom: 16,
        },
        balanceLabel: {
            color: isDark ? '#4c9a52' : '#4c9a52',
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 8,
        },
        balanceAmount: {
            color: isDark ? '#fff' : '#0d1b0f',
            fontSize: 42,
            fontWeight: '800',
            textAlign: 'center',
            paddingHorizontal: 16,
        },
        trendContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
        },
        trendText: {
            color: '#4c9a52',
            fontSize: 12,
            fontWeight: 'bold',
            marginLeft: 4,
        },
        quickActions: {
            paddingHorizontal: 16,
            paddingVertical: 24,
        },
        actionsRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 12,
        },
        actionButton: {
            flex: 1,
            alignItems: 'center',
            gap: 8,
        },
        actionIcon: {
            width: '100%',
            height: 56,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        actionText: {
            fontSize: 12,
            fontWeight: 'bold',
            color: isDark ? '#fff' : '#0d1b0f',
        },
        transactionsContainer: {
            flex: 1,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fff',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            marginTop: 16,
            padding: 16,
            paddingTop: 24,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
        },
        sectionTitle: {
            color: isDark ? '#fff' : '#0d1b0f',
            fontSize: 20,
            fontWeight: 'bold',
        },
        viewAllText: {
            color: '#11d421',
            fontSize: 14,
            fontWeight: 'bold',
        },
        transactionList: {
            gap: 12,
        },
        transactionItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            borderRadius: 16,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
        },
        transactionLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        transactionIcon: {
            width: 48,
            height: 48,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        transactionInfo: {
            gap: 2,
        },
        transactionTitle: {
            color: isDark ? '#fff' : '#0d1b0f',
            fontSize: 14,
            fontWeight: 'bold',
        },
        transactionDescription: {
            color: isDark ? '#9ca3af' : '#6b7280',
            fontSize: 12,
            fontWeight: '500',
        },
        transactionRight: {
            alignItems: 'flex-end',
            gap: 4,
        },
        transactionAmount: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        transactionTime: {
            color: isDark ? '#6b7280' : '#9ca3af',
            fontSize: 10,
            textTransform: 'uppercase',
            fontWeight: '600',
        },
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <MaterialIcons 
                            name="arrow-back" 
                            size={24} 
                            color={isDark ? '#fff' : '#0d1b0f'} 
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>TerraFund Wallet</Text>
                    <TouchableOpacity style={styles.notificationButton}>
                        <MaterialIcons 
                            name="notifications" 
                            size={20} 
                            color={isDark ? '#fff' : '#0d1b0f'} 
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {/* Balance Section */}
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceAmount}>$12,450.00</Text>
                        <View style={styles.trendContainer}>
                            <MaterialIcons name="trending-up" size={16} color="#4c9a52" />
                            <Text style={styles.trendText}>+2.4% this month</Text>
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.quickActions}>
                        <View style={styles.actionsRow}>
                            <View style={styles.actionButton}>
                                <TouchableOpacity 
                                    style={[styles.actionIcon, { backgroundColor: '#11d421' }]}
                                    onPress={() => router.push('/deposit')}
                                >
                                    <MaterialIcons name="add-circle" size={24} color="white" />
                                </TouchableOpacity>
                                <Text style={styles.actionText}>Deposit</Text>
                            </View>
                            
                            <View style={styles.actionButton}>
                                <TouchableOpacity 
                                    style={[styles.actionIcon, { 
                                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e7f3e8' 
                                    }]}
                                    onPress={() => router.push('/withdraw')}
                                >
                                    <MaterialIcons 
                                        name="arrow-upward" 
                                        size={24} 
                                        color={isDark ? '#fff' : '#0d1b0f'} 
                                    />
                                </TouchableOpacity>
                                <Text style={styles.actionText}>Withdraw</Text>
                            </View>
                            
                            <View style={styles.actionButton}>
                                <TouchableOpacity 
                                    style={[styles.actionIcon, { 
                                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e7f3e8' 
                                    }]}
                                    onPress={() => router.push('/transfer')}
                                >
                                    <MaterialIcons 
                                        name="swap-horiz" 
                                        size={24} 
                                        color={isDark ? '#fff' : '#0d1b0f'} 
                                    />
                                </TouchableOpacity>
                                <Text style={styles.actionText}>Transfer</Text>
                            </View>
                        </View>
                    </View>

                    {/* Recent Transactions */}
                    <View style={styles.transactionsContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recent Activity</Text>
                            <TouchableOpacity onPress={() => router.push('/transactions')}>
                                <Text style={styles.viewAllText}>View all</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.transactionList}>
                            {/* Transaction 1 */}
                            <View style={styles.transactionItem}>
                                <View style={styles.transactionLeft}>
                                    <View style={[styles.transactionIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                        <MaterialIcons name="agriculture" size={24} color="#11d421" />
                                    </View>
                                    <View style={styles.transactionInfo}>
                                        <Text style={styles.transactionTitle}>Harvest Payout</Text>
                                        <Text style={styles.transactionDescription}>Corn Project #42</Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text style={[styles.transactionAmount, { color: '#11d421' }]}>+$840.00</Text>
                                    <Text style={styles.transactionTime}>Today, 2:15 PM</Text>
                                </View>
                            </View>

                            {/* Transaction 2 */}
                            <View style={styles.transactionItem}>
                                <View style={styles.transactionLeft}>
                                    <View style={[styles.transactionIcon, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2' }]}>
                                        <MaterialIcons name="eco" size={24} color="#ef4444" />
                                    </View>
                                    <View style={styles.transactionInfo}>
                                        <Text style={styles.transactionTitle}>Investment Made</Text>
                                        <Text style={styles.transactionDescription}>Vineyard Expansion</Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text style={[styles.transactionAmount, { color: isDark ? '#fff' : '#0d1b0f' }]}>-$1,200.00</Text>
                                    <Text style={styles.transactionTime}>Yesterday</Text>
                                </View>
                            </View>

                            {/* Transaction 3 */}
                            <View style={styles.transactionItem}>
                                <View style={styles.transactionLeft}>
                                    <View style={[styles.transactionIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                        <MaterialIcons name="account-balance" size={24} color="#11d421" />
                                    </View>
                                    <View style={styles.transactionInfo}>
                                        <Text style={styles.transactionTitle}>Wallet Deposit</Text>
                                        <Text style={styles.transactionDescription}>Bank Transfer</Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text style={[styles.transactionAmount, { color: '#11d421' }]}>+$2,500.00</Text>
                                    <Text style={styles.transactionTime}>Oct 12, 2023</Text>
                                </View>
                            </View>

                            {/* Transaction 4 */}
                            <View style={styles.transactionItem}>
                                <View style={styles.transactionLeft}>
                                    <View style={[styles.transactionIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                        <MaterialIcons name="payments" size={24} color="#11d421" />
                                    </View>
                                    <View style={styles.transactionInfo}>
                                        <Text style={styles.transactionTitle}>Referral Bonus</Text>
                                        <Text style={styles.transactionDescription}>New Partner Sign-up</Text>
                                    </View>
                                </View>
                                <View style={styles.transactionRight}>
                                    <Text style={[styles.transactionAmount, { color: '#11d421' }]}>+$50.00</Text>
                                    <Text style={styles.transactionTime}>Oct 10, 2023</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}