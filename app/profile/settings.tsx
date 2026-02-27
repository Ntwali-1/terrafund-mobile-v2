import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(isDark);
    const [biometricsEnabled, setBiometricsEnabled] = React.useState(true);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5' }]}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Preferences</Text>
                    <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingItemLeft}>
                                <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                    <Ionicons name="notifications-outline" size={22} color="#11d421" />
                                </View>
                                <Text style={[styles.settingItemTitle, { color: theme.text }]}>Push Notifications</Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: '#D1D1D6', true: '#11d421' }}
                                thumbColor={'#FFFFFF'}
                            />
                        </View>

                        <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
                            <View style={styles.settingItemLeft}>
                                <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                    <Ionicons name="moon-outline" size={22} color="#11d421" />
                                </View>
                                <Text style={[styles.settingItemTitle, { color: theme.text }]}>Dark Mode</Text>
                            </View>
                            <Switch
                                value={darkModeEnabled}
                                onValueChange={setDarkModeEnabled}
                                trackColor={{ false: '#D1D1D6', true: '#11d421' }}
                                thumbColor={'#FFFFFF'}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Security</Text>
                    <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingItemLeft}>
                                <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                    <Ionicons name="finger-print-outline" size={22} color="#11d421" />
                                </View>
                                <Text style={[styles.settingItemTitle, { color: theme.text }]}>Biometric Login</Text>
                            </View>
                            <Switch
                                value={biometricsEnabled}
                                onValueChange={setBiometricsEnabled}
                                trackColor={{ false: '#D1D1D6', true: '#11d421' }}
                                thumbColor={'#FFFFFF'}
                            />
                        </View>

                        <TouchableOpacity style={[styles.settingItemRow, { borderBottomWidth: 0 }]}>
                            <View style={styles.settingItemLeft}>
                                <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                    <Ionicons name="lock-closed-outline" size={22} color="#11d421" />
                                </View>
                                <Text style={[styles.settingItemTitle, { color: theme.text }]}>Change Password</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={isDark ? '#444' : '#ccc'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Account</Text>
                    <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                        <TouchableOpacity style={styles.settingItemRow}>
                            <View style={styles.settingItemLeft}>
                                <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                    <Ionicons name="language-outline" size={22} color="#11d421" />
                                </View>
                                <Text style={[styles.settingItemTitle, { color: theme.text }]}>Language</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', color: theme.textSecondary, marginRight: 10 }}>English</Text>
                                <Ionicons name="chevron-forward" size={20} color={isDark ? '#444' : '#ccc'} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.settingItemRow, { borderBottomWidth: 0 }]}>
                            <View style={styles.settingItemLeft}>
                                <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                                    <Ionicons name="trash-outline" size={22} color="#ef4444" />
                                </View>
                                <Text style={[styles.settingItemTitle, { color: '#ef4444' }]}>Delete Account</Text>
                            </View>
                        </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    scrollContent: {
        padding: 24,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 4,
    },
    card: {
        borderRadius: 24,
        borderWidth: 1,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    settingItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    settingItemTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
});
