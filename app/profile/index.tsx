import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const handleLogout = () => {
        router.replace('/auth/login');
    };

    const MenuButton = ({ icon, title, subtitle, onPress, destructive = false }: any) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconWrapper, { backgroundColor: destructive ? 'rgba(239, 68, 68, 0.1)' : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)') }]}>
                    <Ionicons name={icon} size={22} color={destructive ? '#ef4444' : theme.tint} />
                </View>
                <View>
                    <Text style={[styles.menuItemText, destructive && { color: '#ef4444' }]}>{title}</Text>
                    {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#444' : '#ccc'} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
                    <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}>
                        <Ionicons name="notifications-outline" size={22} color={theme.text} />
                    </TouchableOpacity>
                </View>

                {/* Profile Header */}
                <View style={[styles.profileCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://ui-avatars.com/api/?name=User&background=11d421&color=fff' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editAvatarBtn}>
                                <Ionicons name="camera" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userDetails}>
                            <Text style={[styles.userName, { color: theme.text }]}>Terrafund User</Text>
                            <Text style={[styles.userEmail, { color: theme.textSecondary }]}>user@terrafund.com</Text>
                            <TouchableOpacity style={styles.badge}>
                                <Ionicons name="shield-checkmark" size={14} color="#11d421" />
                                <Text style={styles.badgeText}>Verified Investor</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Recent Activity Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderLine}>
                        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Recent Activity</Text>
                        <TouchableOpacity>
                            <Text style={[styles.viewAllSmall, { color: theme.tint }]}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.activityCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                        {[
                            { id: 1, type: 'payout', title: 'Received: $450.00 Payout', time: '2 hours ago', icon: 'cash-outline', color: '#11d421' },
                            { id: 2, type: 'investment', title: 'Invested: $1,200 in Sunflower', time: '1 day ago', icon: 'briefcase-outline', color: '#3b82f6' },
                        ].map((item, idx) => (
                            <View key={item.id} style={[styles.activityRow, idx < 1 && { borderBottomWidth: 1, borderBottomColor: theme.border }]}>
                                <View style={[styles.activityIcon, { backgroundColor: `${item.color}15` }]}>
                                    <Ionicons name={item.icon as any} size={18} color={item.color} />
                                </View>
                                <View style={styles.activityInfo}>
                                    <Text style={[styles.activityTitle, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>
                                    <Text style={[styles.activityTime, { color: theme.textSecondary }]}>{item.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Account Settings</Text>
                    <View style={[styles.menuCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                        <MenuButton
                            icon="person-outline"
                            title="Personal Information"
                            subtitle="Update your name, email and phone"
                            onPress={() => { }}
                        />
                        <MenuButton
                            icon="settings-outline"
                            title="Preferences"
                            subtitle="Notifications, appearance and language"
                            onPress={() => router.push('/profile/settings')}
                        />
                        <MenuButton
                            icon="shield-outline"
                            title="Security"
                            subtitle="Change password and biometric login"
                            onPress={() => { }}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Support & Legal</Text>
                    <View style={[styles.menuCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                        <MenuButton icon="help-circle-outline" title="Help & Support" onPress={() => router.push('/profile/help')} />
                        <MenuButton icon="document-text-outline" title="Terms & Conditions" onPress={() => router.push('/profile/terms')} />
                        <MenuButton icon="lock-closed-outline" title="Privacy Policy" onPress={() => router.push('/profile/privacy')} />
                        <MenuButton icon="information-circle-outline" title="About TerraFund" onPress={() => router.push('/profile/about')} />
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 2.0.1</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileCard: {
        marginHorizontal: 24,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 28,
        height: 28,
        borderRadius: 10,
        backgroundColor: '#11d421',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    userDetails: {
        marginLeft: 20,
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(17, 212, 33, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        gap: 6,
    },
    badgeText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: '#11d421',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 28,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuCard: {
        marginHorizontal: 24,
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuItemText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000',
    },
    menuItemSubtitle: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#999',
        marginTop: 1,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24,
        marginTop: 12,
        paddingVertical: 18,
        borderRadius: 20,
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        gap: 10,
    },
    logoutText: {
        color: '#ef4444',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
    versionText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#999',
    },
    sectionHeaderLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 28,
        marginBottom: 12,
    },
    viewAllSmall: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
    },
    activityCard: {
        marginHorizontal: 24,
        borderRadius: 24,
        borderWidth: 1,
        padding: 16,
        marginBottom: 10,
    },
    activityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityInfo: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    activityTime: {
        fontSize: 11,
        fontFamily: 'Poppins_400Regular',
        marginTop: 1,
    },
});
