import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const sections = [
        {
            title: '1. Acceptance of Terms',
            content: 'By accessing and using TerraFund, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the app.'
        },
        {
            title: '2. Eligibility',
            content: 'You must be at least 18 years old and capable of forming a binding contract to use this platform. Investments carry risk, and you should perform your own due diligence.'
        },
        {
            title: '3. Investment Risks',
            content: 'Agricultural investments are subject to weather, market, and operational risks. TerraFund does not guarantee returns on any investment.'
        },
        {
            title: '4. User Responsibilities',
            content: 'Users are responsible for maintaining the confidentiality of their account and for all activities that occur under their account.'
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5' }]}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Terms & Conditions</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.contentHeader}>
                    <Ionicons name="document-text" size={60} color="#11d421" style={styles.legalIcon} />
                    <Text style={[styles.contentTitle, { color: theme.text }]}>Legal Information</Text>
                    <Text style={[styles.lastUpdated, { color: theme.textSecondary }]}>Last Updated: June 15, 2024</Text>
                </View>

                {sections.map((section, index) => (
                    <View key={index} style={[styles.section, { borderBottomColor: theme.border }]}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
                        <Text style={[styles.sectionText, { color: theme.textSecondary }]}>{section.content}</Text>
                    </View>
                ))}

                <View style={styles.noticeBox}>
                    <Ionicons name="information-circle" size={20} color="#11d421" />
                    <Text style={styles.noticeText}>
                        For any legal inquiries, please contact us at legal@terrafund.com
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
