import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function LandownerNotificationsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const notifications = [
        {
            id: 1,
            type: 'request',
            title: 'New Investment Request',
            desc: 'Global Agri Fund offered $12,000 for Sunny Valley Estate.',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payout Successful',
            desc: 'Your monthly yield payout of $840.00 has been processed.',
            time: '1 day ago',
            read: true
        },
        {
            id: 3,
            type: 'system',
            title: 'Listing Verified',
            desc: 'Sunflower Ridge has been successfully verified by our legal team.',
            time: '3 days ago',
            read: true
        },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Notifications</Text>
                <TouchableOpacity style={styles.headerAction}>
                    <Text style={[styles.markRead, { color: theme.tint }]}>Mark all read</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {notifications.map((note, idx) => (
                    <MotiView
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: idx * 100 }}
                        key={note.id}
                        style={[styles.notificationCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                    >
                        <View style={[styles.iconBox, { backgroundColor: note.read ? (isDark ? '#222' : '#f3f4f6') : 'rgba(17, 212, 33, 0.1)' }]}>
                            <MaterialIcons
                                name={note.type === 'request' ? 'monetization-on' : note.type === 'payment' ? 'account-balance-wallet' : 'verified-user'}
                                size={22}
                                color={note.read ? theme.textSecondary : '#11d421'}
                            />
                        </View>
                        <View style={styles.content}>
                            <View style={styles.titleRow}>
                                <Text style={[styles.noteTitle, { color: theme.text, fontFamily: note.read ? 'Poppins_600SemiBold' : 'Poppins_700Bold' }]}>{note.title}</Text>
                                {!note.read && <View style={styles.unreadDot} />}
                            </View>
                            <Text style={[styles.noteDesc, { color: theme.textSecondary }]}>{note.desc}</Text>
                            <Text style={[styles.noteTime, { color: theme.textSecondary }]}>{note.time}</Text>
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
    headerAction: {
        padding: 8,
    },
    markRead: {
        fontSize: 13,
        fontFamily: 'Poppins_600SemiBold',
    },
    scrollContent: {
        padding: 24,
    },
    notificationCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    noteTitle: {
        fontSize: 15,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#11d421',
    },
    noteDesc: {
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 18,
        marginBottom: 8,
    },
    noteTime: {
        fontSize: 11,
        fontFamily: 'Poppins_500Medium',
    },
});
