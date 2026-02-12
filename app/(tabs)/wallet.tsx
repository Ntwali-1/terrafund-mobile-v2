import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function WalletScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]} edges={['top']}>
            <StatusBar style={isDark ? "light" : "dark"} />

            {/* Background Gradient */}
            <LinearGradient
                colors={isDark ? ['#0a0a0a', '#1a1a1a'] : ['#f8fafc', '#ffffff', '#eff6ff']}
                style={StyleSheet.absoluteFill}
            />

            {/* Decorative Elements */}
            <View style={styles.decorativeBackground}>
                <LinearGradient
                    colors={isDark ? ['rgba(59, 130, 246, 0.08)', 'transparent'] : ['rgba(59, 130, 246, 0.1)', 'transparent']}
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
                    <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#0a0a0a' }]}>TerraFund Wallet</Text>
                    <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff' }]}>
                        <MaterialIcons
                            name="history"
                            size={22}
                            color={isDark ? '#fff' : '#0a0a0a'}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Balance Section */}
                    <View style={styles.balanceSection}>
                        <View style={styles.balanceContent}>
                            <Text style={[styles.balanceLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>AVAILABLE BALANCE</Text>
                            <Text style={[styles.balanceAmount, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>$12,450.00</Text>
                            <View style={styles.trendRow}>
                                <MaterialIcons name="trending-up" size={16} color="#11d421" />
                                <Text style={styles.trendText}>+2.4% this month</Text>
                            </View>
                        </View>

                        {/* Action Buttons Row */}
                        <View style={styles.actionRow}>
                            {[
                                { label: 'Deposit', icon: 'add', color: '#11d421', route: '/deposit' },
                                { label: 'Withdraw', icon: 'call-made', color: '#3b82f6', route: '/withdraw' },
                                { label: 'Transfer', icon: 'swap-horiz', color: '#f59e0b', route: '/transfer' }
                            ].map((action, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => (router as any).push(action.route)}
                                    style={styles.actionItem}
                                >
                                    <LinearGradient
                                        colors={[action.color, action.color + 'dd']}
                                        style={styles.actionIconWrapper}
                                    >
                                        <MaterialIcons name={action.icon as any} size={24} color="#ffffff" />
                                    </LinearGradient>
                                    <Text style={[styles.actionLabel, { color: isDark ? '#ffffff' : '#4b5563' }]}>{action.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Quick Stats */}
                    <View style={styles.statsGrid}>
                        <LinearGradient
                            colors={isDark ? ['#1e1e1e', '#141414'] : ['#ffffff', '#f8fafc']}
                            style={[styles.miniCard, styles.cardShadow]}
                        >
                            <Text style={[styles.miniLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>EARNED</Text>
                            <Text style={[styles.miniValue, { color: '#11d421' }]}>+$840.00</Text>
                        </LinearGradient>
                        <LinearGradient
                            colors={isDark ? ['#1e1e1e', '#141414'] : ['#ffffff', '#f8fafc']}
                            style={[styles.miniCard, styles.cardShadow]}
                        >
                            <Text style={[styles.miniLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>SPENT</Text>
                            <Text style={[styles.miniValue, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>$1,200.00</Text>
                        </LinearGradient>
                    </View>

                    {/* Recent Transactions */}
                    <View style={styles.transactionSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>Recent Activity</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.transactionList}>
                            {[
                                { title: 'Harvest Payout', sub: 'Corn Project #42', amount: '+840.00', time: 'Today, 2:15 PM', icon: 'agriculture', color: '#11d421' },
                                { title: 'Investment Made', sub: 'Vineyard Expansion', amount: '-1,200.00', time: 'Yesterday', icon: 'eco', color: '#ef4444' },
                                { title: 'Wallet Deposit', sub: 'Bank Transfer', amount: '+2,500.00', time: 'Oct 12, 2023', icon: 'account-balance', color: '#3b82f6' },
                                { title: 'Referral Bonus', sub: 'New Partner Sign-up', amount: '+50.00', time: 'Oct 10, 2023', icon: 'payments', color: '#f59e0b' }
                            ].map((item, idx) => (
                                <View key={idx} style={[styles.transactionItem, {
                                    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
                                }]}>
                                    <View style={[styles.transactionIcon, { backgroundColor: item.color + '15' }]}>
                                        <MaterialIcons name={item.icon as any} size={22} color={item.color} />
                                    </View>
                                    <View style={styles.transactionInfo}>
                                        <Text style={[styles.transactionTitle, { color: isDark ? '#ffffff' : '#0a0a0a' }]}>{item.title}</Text>
                                        <Text style={[styles.transactionSubtitle, { color: isDark ? '#9ca3af' : '#6b7280' }]}>{item.sub}</Text>
                                    </View>
                                    <View style={styles.transactionRight}>
                                        <Text style={[styles.transactionAmount, { color: item.amount.startsWith('+') ? '#11d421' : (isDark ? '#ffffff' : '#0a0a0a') }]}>
                                            {item.amount.startsWith('+') ? '+' : ''}${item.amount.replace('+', '').replace('-', '')}
                                        </Text>
                                        <Text style={[styles.transactionTime, { color: isDark ? '#9ca3af' : '#6ca3af' }]}>{item.time}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity style={[styles.exportButton, { borderColor: isDark ? 'rgba(17, 212, 33, 0.3)' : 'rgba(17, 212, 33, 0.2)' }]}>
                            <MaterialIcons name="file-download" size={20} color="#11d421" />
                            <Text style={styles.exportText}>Export Statement</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 40 }} />
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
        left: -100,
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
        fontFamily: 'Aclonica_400Regular',
        letterSpacing: -0.5,
    },
    balanceSection: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        alignItems: 'center',
    },
    balanceContent: {
        alignItems: 'center',
        marginBottom: 32,
    },
    balanceLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 1,
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 48,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: -1,
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    trendText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#11d421',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 24,
        width: '100%',
        justifyContent: 'center',
    },
    actionItem: {
        alignItems: 'center',
        gap: 8,
    },
    actionIconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    actionLabel: {
        fontSize: 13,
        fontFamily: 'Poppins_600SemiBold',
    },
    statsGrid: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 32,
    },
    miniCard: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
    },
    miniLabel: {
        fontSize: 10,
        fontFamily: 'Poppins_700Bold',
        letterSpacing: 1,
        marginBottom: 4,
    },
    miniValue: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    transactionSection: {
        paddingHorizontal: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
    transactionList: {
        gap: 12,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 20,
        borderWidth: 1,
        gap: 12,
    },
    transactionIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
    },
    transactionSubtitle: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 15,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    transactionTime: {
        fontSize: 11,
        fontFamily: 'Poppins_500Medium',
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 24,
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    exportText: {
        color: '#11d421',
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
    },
});