import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5' }]}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>About TerraFund</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.brandingSection}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={[styles.brandName, { color: '#11d421' }]}>TerraFund</Text>
                    <Text style={[styles.tagline, { color: theme.textSecondary }]}>Empowering Agriculture through Investment</Text>
                </View>

                <View style={styles.contentSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Our Mission</Text>
                    <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
                        TerraFund is a leading agricultural crowdfunding platform that connects landowners with investors.
                        Our mission is to democratize land ownership and empower farmers with the capital they need to grow their farms sustainably.
                    </Text>
                </View>

                <View style={styles.contentSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>What We Do</Text>
                    <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
                        We provide a secure and transparent marketplace where investors can browse verified land projects and landowners can secure funding.
                        Through technology and community, we're building a more resilient agricultural future.
                    </Text>
                </View>

                <View style={styles.statsSection}>
                    <View style={[styles.statItem, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                        <Text style={styles.statValue}>150+</Text>
                        <Text style={styles.statLabel}>Farms Funded</Text>
                    </View>
                    <View style={[styles.statItem, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                        <Text style={styles.statValue}>$2.5M</Text>
                        <Text style={styles.statLabel}>Invested</Text>
                    </View>
                </View>

                <View style={styles.socialSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text, textAlign: 'center' }]}>Follow Our Journey</Text>
                    <View style={styles.socialIcons}>
                        <TouchableOpacity style={[styles.socialIconBtn, { backgroundColor: '#1877F2' }]}>
                            <Ionicons name="logo-facebook" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialIconBtn, { backgroundColor: '#1DA1F2' }]}>
                            <Ionicons name="logo-twitter" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialIconBtn, { backgroundColor: '#E4405F' }]}>
                            <Ionicons name="logo-instagram" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialIconBtn, { backgroundColor: '#0A66C2' }]}>
                            <Ionicons name="logo-linkedin" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.copyrightText}>© 2024 TerraFund Inc. All rights reserved.</Text>
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
    brandingSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    brandName: {
        fontSize: 32,
        fontFamily: 'Aclonica_400Regular',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        textAlign: 'center',
    },
    contentSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 24,
    },
    statsSection: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 40,
    },
    statItem: {
        flex: 1,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk_700Bold',
        color: '#11d421',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: '#999',
    },
    socialSection: {
        marginBottom: 40,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginTop: 16,
    },
    socialIconBtn: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    copyrightText: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#999',
        marginBottom: 20,
    },
});
