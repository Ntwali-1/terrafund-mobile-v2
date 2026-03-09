import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function ContractsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const contracts = [
        {
            id: 1,
            name: 'Ashanti Cocoa Partnership Agreement',
            type: 'Equity Agreement',
            date: 'Aug 24, 2024',
            status: 'Signed',
            size: '2.4 MB'
        },
        {
            id: 2,
            name: 'Land Lease Deed - Lot 402',
            type: 'Legal Deed',
            date: 'Aug 18, 2024',
            status: 'Signed',
            size: '1.8 MB'
        },
        {
            id: 3,
            name: 'Investment Terms & Conditions',
            type: 'Terms of Service',
            date: 'Aug 15, 2024',
            status: 'Signed',
            size: '850 KB'
        },
        {
            id: 4,
            name: 'Sunflower Farm Preliminary Offer',
            type: 'Offer Letter',
            date: 'Sept 01, 2024',
            status: 'Pending',
            size: '1.2 MB'
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
                <Text style={[styles.headerTitle, { color: theme.text }]}>Contracts & Deeds</Text>
                <TouchableOpacity style={styles.headerAction}>
                    <Ionicons name="search" size={22} color={theme.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.infoBox}>
                    <View style={[styles.infoIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                        <Ionicons name="document-lock-outline" size={24} color="#3b82f6" />
                    </View>
                    <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                        All documents are cryptographically signed and legally binding. You can download or print these at any time.
                    </Text>
                </View>

                {contracts.map((contract, idx) => (
                    <MotiView
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: idx * 100 }}
                        key={contract.id}
                        style={[styles.contractCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                    >
                        <View style={[styles.fileIcon, { backgroundColor: contract.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(17, 212, 33, 0.1)' }]}>
                            <MaterialCommunityIcons
                                name={contract.status === 'Pending' ? "file-clock-outline" : "file-check-outline"}
                                size={24}
                                color={contract.status === 'Pending' ? "#f59e0b" : "#11d421"}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text style={[styles.contractName, { color: theme.text }]}>{contract.name}</Text>
                            <View style={styles.metaRow}>
                                <Text style={[styles.metaText, { color: theme.textSecondary }]}>{contract.type}</Text>
                                <View style={[styles.dot, { backgroundColor: theme.border }]} />
                                <Text style={[styles.metaText, { color: theme.textSecondary }]}>{contract.size}</Text>
                            </View>
                            <View style={styles.dateRow}>
                                <Ionicons name="calendar-outline" size={14} color={theme.textSecondary} />
                                <Text style={[styles.dateText, { color: theme.textSecondary }]}>{contract.date}</Text>
                            </View>
                        </View>
                        <View style={styles.actions}>
                            {contract.status === 'Pending' ? (
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#11d421' }]}>
                                    <Text style={styles.btnText}>Sign</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: isDark ? '#333' : '#f3f4f6' }]}>
                                    <Ionicons name="download-outline" size={18} color={theme.text} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </MotiView>
                ))}

                <View style={styles.legalFooter}>
                    <Text style={[styles.legalText, { color: theme.textSecondary }]}>
                        TerraFund uses e-Sign technology compliant with global standards. For legal inquiries, please contact legal@terrafund.com
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
    scrollContent: {
        padding: 24,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 18,
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        marginBottom: 24,
    },
    infoIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 18,
    },
    contractCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 16,
    },
    fileIcon: {
        width: 52,
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    contractName: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    metaText: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 11,
        fontFamily: 'Poppins_400Regular',
    },
    actions: {
        marginLeft: 12,
    },
    actionBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Poppins_700Bold',
    },
    legalFooter: {
        marginTop: 20,
        paddingHorizontal: 4,
    },
    legalText: {
        fontSize: 11,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        lineHeight: 16,
    },
});
