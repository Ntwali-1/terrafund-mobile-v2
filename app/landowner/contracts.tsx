import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function LandownerContractsScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const contracts = [
        {
            id: 1,
            name: 'Yield Sharing Certificate - Lot A',
            type: 'Asset Deed',
            date: 'Aug 24, 2024',
            status: 'Signed',
            size: '2.4 MB'
        },
        {
            id: 2,
            name: 'Land Ownership Verification',
            type: 'Verify Report',
            date: 'Aug 18, 2024',
            status: 'Verified',
            size: '1.8 MB'
        },
        {
            id: 3,
            name: 'Platform Service Terms',
            type: 'T&C',
            date: 'Aug 15, 2024',
            status: 'Signed',
            size: '850 KB'
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
                <Text style={[styles.headerTitle, { color: theme.text }]}>Legal Vault</Text>
                <TouchableOpacity style={styles.headerAction}>
                    <Ionicons name="filter-outline" size={22} color={theme.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.infoBox}>
                    <View style={[styles.infoIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                        <Ionicons name="shield-checkmark" size={24} color="#3b82f6" />
                    </View>
                    <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                        Your ownership documents are secured with end-to-end encryption. Only verified platform officials can access these.
                    </Text>
                </View>

                {contracts.map((contract, idx) => (
                    <MotiView
                        from={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 100 }}
                        key={contract.id}
                        style={[styles.contractCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff', borderColor: theme.border }]}
                    >
                        <View style={[styles.fileIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                            <MaterialCommunityIcons name="file-document-outline" size={24} color="#11d421" />
                        </View>
                        <View style={styles.content}>
                            <Text style={[styles.contractName, { color: theme.text }]}>{contract.name}</Text>
                            <View style={styles.metaRow}>
                                <Text style={[styles.metaText, { color: theme.textSecondary }]}>{contract.type}</Text>
                                <View style={[styles.dot, { backgroundColor: theme.border }]} />
                                <Text style={[styles.metaText, { color: theme.textSecondary }]}>{contract.size}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Ionicons name="download-outline" size={20} color={theme.text} />
                        </TouchableOpacity>
                    </MotiView>
                ))}

                <TouchableOpacity style={[styles.uploadBtn, { borderColor: theme.tint }]}>
                    <Ionicons name="add" size={24} color={theme.tint} />
                    <Text style={[styles.uploadText, { color: theme.tint }]}>Upload New Doc</Text>
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
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 2,
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
    downloadBtn: {
        padding: 8,
    },
    uploadBtn: {
        marginTop: 10,
        height: 60,
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'dashed',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    uploadText: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
    },
});
