import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function PaymentMethodsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const paymentMethods = [
        {
            id: 1,
            type: 'Bank Account',
            name: 'Standard Chartered Bank',
            number: '•••• •••• 5678',
            icon: 'university',
            primary: true
        },
        {
            id: 2,
            type: 'Digital Wallet',
            name: 'Mobile Money (MTN)',
            number: '+233 •• ••• 1234',
            icon: 'wallet',
            primary: false
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
                <Text style={[styles.headerTitle, { color: theme.text }]}>Payment Methods</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={styles.walletsCard}
                >
                    <LinearGradient
                        colors={['#11d421', '#0b8a15']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.walletGradient}
                    >
                        <View style={styles.walletHeader}>
                            <Text style={styles.walletLabel}>Available Balance</Text>
                            <Ionicons name="eye-outline" size={20} color="#fff" />
                        </View>
                        <Text style={styles.balance}>$12,450.00</Text>
                        <View style={styles.walletFooter}>
                            <Text style={styles.walletId}>Wallet ID: TF-9028-XJ</Text>
                            <View style={styles.cardType}>
                                <View style={[styles.dot, { backgroundColor: '#fff' }]} />
                                <View style={[styles.dot, { backgroundColor: 'rgba(255,255,255,0.5)' }]} />
                            </View>
                        </View>
                    </LinearGradient>
                </MotiView>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Linked Accounts</Text>
                    <TouchableOpacity>
                        <Text style={[styles.addText, { color: theme.tint }]}>+ Add New</Text>
                    </TouchableOpacity>
                </View>

                {paymentMethods.map((method, idx) => (
                    <MotiView
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: idx * 100 }}
                        key={method.id}
                        style={[styles.methodCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                    >
                        <View style={[styles.methodIconWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }]}>
                            <FontAwesome5 name={method.icon} size={20} color={theme.tint} />
                        </View>
                        <View style={styles.methodInfo}>
                            <Text style={[styles.methodType, { color: theme.textSecondary }]}>{method.type}</Text>
                            <Text style={[styles.methodName, { color: theme.text }]}>{method.name}</Text>
                            <Text style={[styles.methodNumber, { color: theme.textSecondary }]}>{method.number}</Text>
                        </View>
                        {method.primary && (
                            <View style={[styles.primaryBadge, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                <Text style={styles.primaryText}>Primary</Text>
                            </View>
                        )}
                        <TouchableOpacity style={styles.moreButton}>
                            <Ionicons name="ellipsis-vertical" size={20} color={theme.textSecondary} />
                        </TouchableOpacity>
                    </MotiView>
                ))}

                <View style={styles.securityNote}>
                    <Ionicons name="lock-closed-outline" size={16} color={theme.textSecondary} />
                    <Text style={[styles.securityText, { color: theme.textSecondary }]}>
                        Your payment information is encrypted and stored securely using industry-standard PCI DSS compliance.
                    </Text>
                </View>

                <TouchableOpacity style={[styles.withdrawButton, { backgroundColor: isDark ? '#1a1a1a' : '#0a0a0a' }]}>
                    <Text style={styles.withdrawButtonText}>Withdraw to Bank</Text>
                    <Ionicons name="arrow-up-outline" size={20} color="#fff" />
                </TouchableOpacity>
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
    walletsCard: {
        width: '100%',
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 32,
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    walletGradient: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    walletHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
    },
    balance: {
        color: '#fff',
        fontSize: 32,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    walletFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletId: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    cardType: {
        flexDirection: 'row',
        gap: 4,
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    addText: {
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 16,
    },
    methodIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    methodInfo: {
        flex: 1,
    },
    methodType: {
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    methodName: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
    methodNumber: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
    },
    primaryBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    primaryText: {
        fontSize: 10,
        fontFamily: 'Poppins_700Bold',
        color: '#11d421',
    },
    moreButton: {
        padding: 4,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        paddingHorizontal: 4,
    },
    securityText: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 18,
        flex: 1,
    },
    withdrawButton: {
        height: 60,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 40,
    },
    withdrawButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
});
