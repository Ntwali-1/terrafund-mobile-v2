import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function NotificationsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const notifications = [
        {
            id: 1,
            title: 'Payout Received',
            description: 'Your quarterly dividend for "Organic Cocoa Plantation" has been credited to your wallet.',
            time: '2 hours ago',
            type: 'payment',
            icon: 'wallet-outline',
            color: '#11d421',
            unread: true
        },
        {
            id: 2,
            title: 'New Listing Alert',
            description: 'A new high-yield "Sunflower Farm" in South Africa is now open for investment.',
            time: '6 hours ago',
            type: 'listing',
            icon: 'leaf-outline',
            color: '#f59e0b',
            unread: true
        },
        {
            id: 3,
            title: 'Monthly Farm Report',
            description: 'The August yield report for "Premium Maize Farm" is now available for review.',
            time: 'Yesterday',
            type: 'report',
            icon: 'document-text-outline',
            color: '#3b82f6',
            unread: false
        },
        {
            id: 4,
            title: 'Security Update',
            description: 'You have successfully enabled biometric login for your account.',
            time: '2 days ago',
            type: 'security',
            icon: 'shield-checkmark-outline',
            color: '#6366f1',
            unread: false
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
                <Text style={[styles.headerTitle, { color: theme.text }]}>Notifications</Text>
                <TouchableOpacity style={styles.clearButton}>
                    <Text style={[styles.clearText, { color: theme.tint }]}>Clear All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.tabs}>
                    <TouchableOpacity style={[styles.tab, styles.activeTab, { backgroundColor: theme.tint }]}>
                        <Text style={styles.activeTabText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6' }]}>
                        <Text style={[styles.tabText, { color: theme.textSecondary }]}>Payments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6' }]}>
                        <Text style={[styles.tabText, { color: theme.textSecondary }]}>Updates</Text>
                    </TouchableOpacity>
                </View>

                {notifications.map((notif, idx) => (
                    <MotiView
                        from={{ opacity: 0, translateX: -20 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ delay: idx * 100 }}
                        key={notif.id}
                        style={[styles.notificationCard, { borderBottomColor: theme.border }]}
                    >
                        <View style={[styles.iconWrapper, { backgroundColor: `${notif.color}15` }]}>
                            <Ionicons name={notif.icon as any} size={22} color={notif.color} />
                        </View>
                        <View style={styles.content}>
                            <View style={styles.titleRow}>
                                <Text style={[styles.title, { color: theme.text }, notif.unread && styles.unreadTitle]}>{notif.title}</Text>
                                {notif.unread && <View style={[styles.unreadDot, { backgroundColor: theme.tint }]} />}
                            </View>
                            <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
                                {notif.description}
                            </Text>
                            <Text style={[styles.time, { color: theme.textSecondary }]}>{notif.time}</Text>
                        </View>
                    </MotiView>
                ))}

                <View style={styles.emptyFooter}>
                    <Text style={[styles.footerText, { color: theme.textSecondary }]}>You're all caught up!</Text>
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
    clearButton: {
        padding: 4,
    },
    clearText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 20,
        marginTop: 10,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    activeTab: {
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
    },
    activeTabText: {
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        fontSize: 13,
    },
    tabText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
    },
    notificationCard: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Poppins_500Medium',
    },
    unreadTitle: {
        fontFamily: 'Poppins_700Bold',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    description: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 18,
        marginBottom: 8,
    },
    time: {
        fontSize: 11,
        fontFamily: 'Poppins_500Medium',
    },
    emptyFooter: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    footerText: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
    },
});
