import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const faqs = [
        { question: 'How do I invest in land?', answer: 'Navigate to the Explore tab, select a property, and click Invest Now. You will need to fund your wallet first.' },
        { question: 'What is the minimum investment?', answer: 'The minimum investment varies by project but usually starts around $100.' },
        { question: 'Is my investment secure?', answer: 'Yes, all land listings are verified and legal contracts are executed for every investment.' },
        { question: 'How do I withdraw my earnings?', answer: 'Go to Wallet, click Withdraw, and select your preferred payment method.' }
    ];

    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#F5F5F5' }]}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Help & Support</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.searchSection}>
                    <Text style={[styles.searchTitle, { color: theme.text }]}>How can we help you?</Text>
                    <View style={[styles.searchBar, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6', borderColor: theme.border }]}>
                        <Ionicons name="search" size={20} color={isDark ? '#666' : '#999'} />
                        <TextInput
                            placeholder="Search help articles..."
                            placeholderTextColor={isDark ? '#555' : '#999'}
                            style={[styles.searchInput, { color: theme.text }]}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Quick Support</Text>
                    <View style={styles.supportCards}>
                        <TouchableOpacity style={[styles.supportCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                            <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                <Ionicons name="chatbubbles" size={24} color="#11d421" />
                            </View>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>Live Chat</Text>
                            <Text style={styles.cardSubtitle}>Response in 5m</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.supportCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}>
                            <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                                <Ionicons name="mail" size={24} color="#3b82f6" />
                            </View>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>Email Us</Text>
                            <Text style={styles.cardSubtitle}>Response in 2h</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Frequently Asked Questions</Text>
                    {faqs.map((faq, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.faqItem, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                            onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        >
                            <View style={styles.faqHeader}>
                                <Text style={[styles.faqQuestion, { color: theme.text }]}>{faq.question}</Text>
                                <Ionicons
                                    name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color={isDark ? '#666' : '#999'}
                                />
                            </View>
                            {expandedIndex === index && (
                                <Text style={[styles.faqAnswer, { color: theme.textSecondary }]}>{faq.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={[styles.communityBtn, { backgroundColor: theme.tint }]}>
                    <Text style={styles.communityBtnText}>Visit Community Forum</Text>
                    <Ionicons name="people" size={20} color="#fff" />
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
    searchSection: {
        marginBottom: 30,
    },
    searchTitle: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderRadius: 18,
        paddingHorizontal: 16,
        borderWidth: 1,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 4,
    },
    supportCards: {
        flexDirection: 'row',
        gap: 16,
    },
    supportCard: {
        flex: 1,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#999',
    },
    faqItem: {
        borderRadius: 18,
        borderWidth: 1,
        padding: 16,
        marginBottom: 12,
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    faqQuestion: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        flex: 1,
        marginRight: 10,
    },
    faqAnswer: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginTop: 12,
        lineHeight: 20,
    },
    communityBtn: {
        height: 60,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 4,
    },
    communityBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
});
