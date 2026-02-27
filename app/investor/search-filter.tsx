import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

const CATEGORIES = ['All', 'Cereals', 'Fruits', 'Vegetables', 'Cocoa', 'Legumes'];
const REGIONS = ['All', 'Ashanti', 'Greater Accra', 'Central', 'Western', 'Volta'];
const RETURNS = ['Any', '5-10%', '10-20%', '20%+'];

export default function SearchFilterScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [activeCategory, setActiveCategory] = useState('All');
    const [activeRegion, setActiveRegion] = useState('All');
    const [activeReturn, setActiveReturn] = useState('Any');
    const [searchQuery, setSearchQuery] = useState('');

    const FilterChip = ({ label, active, onPress }: any) => (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.chip,
                {
                    backgroundColor: active ? theme.tint : (isDark ? '#1a1a1a' : '#f3f4f6'),
                    borderColor: active ? theme.tint : theme.border
                }
            ]}
        >
            <Text style={[styles.chipText, { color: active ? '#fff' : theme.textSecondary }]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
                    onPress={() => router.back()}
                >
                    <Ionicons name="close" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Filters</Text>
                <TouchableOpacity onPress={() => {
                    setActiveCategory('All');
                    setActiveRegion('All');
                    setActiveReturn('Any');
                    setSearchQuery('');
                }}>
                    <Text style={[styles.resetText, { color: theme.tint }]}>Reset</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.searchSection}>
                    <View style={[styles.searchBar, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                        <Ionicons name="search" size={20} color={theme.textSecondary} />
                        <TextInput
                            style={[styles.searchInput, { color: theme.text }]}
                            placeholder="Search farms, regions or crops..."
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                <View style={styles.filterSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Crop Category</Text>
                    <View style={styles.chipsContainer}>
                        {CATEGORIES.map(cat => (
                            <FilterChip
                                key={cat}
                                label={cat}
                                active={activeCategory === cat}
                                onPress={() => setActiveCategory(cat)}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.filterSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Location / Region</Text>
                    <View style={styles.chipsContainer}>
                        {REGIONS.map(reg => (
                            <FilterChip
                                key={reg}
                                label={reg}
                                active={activeRegion === reg}
                                onPress={() => setActiveRegion(reg)}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.filterSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Expected Annual Return</Text>
                    <View style={styles.chipsContainer}>
                        {RETURNS.map(ret => (
                            <FilterChip
                                key={ret}
                                label={ret}
                                active={activeReturn === ret}
                                onPress={() => setActiveReturn(ret)}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.filterSection}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Price Range (Acre)</Text>
                    <View style={[styles.priceInputs, { gap: 16 }]}>
                        <View style={[styles.priceField, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                            <Text style={[styles.currency, { color: theme.textSecondary }]}>$</Text>
                            <TextInput style={[styles.priceInput, { color: theme.text }]} placeholder="Min" placeholderTextColor="#888" keyboardType="numeric" />
                        </View>
                        <View style={[styles.priceField, { backgroundColor: isDark ? '#1a1a1a' : '#f9fafb', borderColor: theme.border }]}>
                            <Text style={[styles.currency, { color: theme.textSecondary }]}>$</Text>
                            <TextInput style={[styles.priceInput, { color: theme.text }]} placeholder="Max" placeholderTextColor="#888" keyboardType="numeric" />
                        </View>
                    </View>
                </View>

            </ScrollView>

            <View style={[styles.footer, { borderTopColor: theme.border }]}>
                <TouchableOpacity
                    style={[styles.applyButton, { backgroundColor: theme.tint }]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.applyButtonText}>Show Results</Text>
                </TouchableOpacity>
            </View>
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
    resetText: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    scrollContent: {
        padding: 24,
    },
    searchSection: {
        marginBottom: 32,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 16,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
    filterSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 16,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
    },
    chipText: {
        fontSize: 13,
        fontFamily: 'Poppins_600SemiBold',
    },
    priceInputs: {
        flexDirection: 'row',
    },
    priceField: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
        gap: 8,
    },
    currency: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    priceInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
    },
    applyButton: {
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Poppins_700Bold',
    },
});
