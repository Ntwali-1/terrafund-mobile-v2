import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const policies = [
        {
            title: '1. Information We Collect',
            content: 'We collect information you provide directly to us, such as when you create an account, make an investment, or communicate with us.'
        },
        {
            title: '2. How We Use Information',
            content: 'We use the information we collect to provide, maintain, and improve our services, and to process your transactions and send you related information.'
        },
        {
            title: '3. Information Sharing',
            content: 'We do not share your personal information with third parties except as described in this policy, such as with your consent or for legal reasons.'
        },
        {
            title: '4. Data Security',
            content: 'We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.'
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5' }]}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Privacy Policy</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.contentHeader}>
                    <Ionicons name="lock-closed" size={60} color="#11d421" style={styles.legalIcon} />
                    <Text style={[styles.contentTitle, { color: theme.text }]}>Data Privacy</Text>
                    <Text style={[styles.lastUpdated, { color: theme.textSecondary }]}>Last Updated: June 15, 2024</Text>
                </View>

                {policies.map((policy, index) => (
                    <View key={index} style={[styles.section, { borderBottomColor: theme.border }]}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>{policy.title}</Text>
                        <Text style={[styles.sectionText, { color: theme.textSecondary }]}>{policy.content}</Text>
                    </View>
                ))}

                <View style={styles.noticeBox}>
                    <Ionicons name="shield-checkmark" size={20} color="#11d421" />
                    <Text style={styles.noticeText}>
                        Your data is encrypted and stored securely following industry standards.
                    </Text>
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
    contentHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    legalIcon: {
        marginBottom: 16,
    },
    contentTitle: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 4,
    },
    lastUpdated: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    section: {
        marginBottom: 24,
        paddingBottom: 24,
        borderBottomWidth: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 24,
    },
    noticeBox: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'rgba(17, 212, 33, 0.05)',
        borderRadius: 16,
        gap: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    noticeText: {
        flex: 1,
        fontSize: 13,
        fontFamily: 'Poppins_500Medium',
        color: '#11d421',
    },
});
