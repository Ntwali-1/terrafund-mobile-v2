import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

const STEPS = [
    { title: 'Basic Info', icon: 'description' },
    { title: 'Location', icon: 'location-on' },
    { title: 'Documents', icon: 'file-upload' },
    { title: 'Review', icon: 'check-circle' }
];

export default function AddLandScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>List New Land</Text>
                <TouchableOpacity style={styles.helpButton}>
                    <Ionicons name="help-circle-outline" size={24} color={theme.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={styles.stepperContainer}>
                {STEPS.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <View style={styles.stepItem}>
                            <View style={[
                                styles.stepCircle,
                                { backgroundColor: idx <= currentStep ? theme.tint : (isDark ? '#333' : '#eee') }
                            ]}>
                                <MaterialIcons name={step.icon as any} size={18} color="#fff" />
                            </View>
                            <Text style={[
                                styles.stepLabel,
                                { color: idx === currentStep ? theme.text : theme.textSecondary }
                            ]}>{step.title}</Text>
                        </View>
                        {idx < STEPS.length - 1 && (
                            <View style={[
                                styles.stepLine,
                                { backgroundColor: idx < currentStep ? theme.tint : (isDark ? '#333' : '#eee') }
                            ]} />
                        )}
                    </React.Fragment>
                ))}
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <MotiView
                        from={{ opacity: 0, translateX: 50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        key={currentStep}
                        style={styles.stepContent}
                    >
                        {currentStep === 0 && (
                            <View style={styles.form}>
                                <Text style={[styles.formTitle, { color: theme.text }]}>General Information</Text>
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Land Title / Name</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb', borderColor: theme.border, color: theme.text }]}
                                        placeholder="e.g. Sunny Valley Estate"
                                        placeholderTextColor="#888"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Land Size (Acres)</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb', borderColor: theme.border, color: theme.text }]}
                                        placeholder="Enter size in acres"
                                        placeholderTextColor="#888"
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Crop Suitability</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb', borderColor: theme.border, color: theme.text }]}
                                        placeholder="e.g. Grains, Fruits, Cocoa"
                                        placeholderTextColor="#888"
                                    />
                                </View>
                            </View>
                        )}

                        {currentStep === 1 && (
                            <View style={styles.form}>
                                <Text style={[styles.formTitle, { color: theme.text }]}>Location Details</Text>
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Country</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb', borderColor: theme.border, color: theme.text }]}
                                        placeholder="e.g. Ghana"
                                        placeholderTextColor="#888"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>State / Region</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb', borderColor: theme.border, color: theme.text }]}
                                        placeholder="e.g. Ashanti Region"
                                        placeholderTextColor="#888"
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={[styles.label, { color: theme.textSecondary }]}>Full Address</Text>
                                    <TextInput
                                        style={[styles.input, { height: 100, textAlignVertical: 'top', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb', borderColor: theme.border, color: theme.text }]}
                                        placeholder="Enter permanent address of the land"
                                        placeholderTextColor="#888"
                                        multiline
                                    />
                                </View>
                            </View>
                        )}

                        {currentStep === 2 && (
                            <View style={styles.form}>
                                <Text style={[styles.formTitle, { color: theme.text }]}>Verification Documents</Text>
                                <Text style={[styles.formDesc, { color: theme.textSecondary }]}>
                                    Please upload valid land deeds and ownership certificates for verification.
                                </Text>

                                <TouchableOpacity style={[styles.uploadBox, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6', borderColor: theme.border }]}>
                                    <View style={[styles.uploadIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                        <Ionicons name="cloud-upload-outline" size={32} color="#11d421" />
                                    </View>
                                    <Text style={[styles.uploadTitle, { color: theme.text }]}>Upload Land Deeds</Text>
                                    <Text style={[styles.uploadSubtitle, { color: theme.textSecondary }]}>PDF, PNG or JPG (Max 10MB)</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.uploadBox, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6', borderColor: theme.border }]}>
                                    <View style={[styles.uploadIcon, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                        <Ionicons name="images-outline" size={32} color="#11d421" />
                                    </View>
                                    <Text style={[styles.uploadTitle, { color: theme.text }]}>Land Photos</Text>
                                    <Text style={[styles.uploadSubtitle, { color: theme.textSecondary }]}>Add up to 10 high-quality images</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {currentStep === 3 && (
                            <View style={styles.reviewContent}>
                                <View style={[styles.successIconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                                    <Ionicons name="checkmark-circle" size={64} color="#11d421" />
                                </View>
                                <Text style={[styles.formTitle, { color: theme.text, textAlign: 'center' }]}>Ready to Submit!</Text>
                                <Text style={[styles.formDesc, { color: theme.textSecondary, textAlign: 'center' }]}>
                                    Your listing will be reviewed by our legal team within 48 hours for authenticity before going live to investors.
                                </Text>

                                <View style={[styles.previewCard, { backgroundColor: isDark ? '#1a1a1a' : '#fcfcfc', borderColor: theme.border }]}>
                                    <View style={styles.previewRow}>
                                        <Text style={[styles.previewLabel, { color: theme.textSecondary }]}>Asset Name</Text>
                                        <Text style={[styles.previewValue, { color: theme.text }]}>Sunny Valley Estate</Text>
                                    </View>
                                    <View style={styles.previewDivider} />
                                    <View style={styles.previewRow}>
                                        <Text style={[styles.previewLabel, { color: theme.textSecondary }]}>Location</Text>
                                        <Text style={[styles.previewValue, { color: theme.text }]}>Ashanti, Ghana</Text>
                                    </View>
                                    <View style={styles.previewDivider} />
                                    <View style={styles.previewRow}>
                                        <Text style={[styles.previewLabel, { color: theme.textSecondary }]}>Total Area</Text>
                                        <Text style={[styles.previewValue, { color: theme.text }]}>120 Acres</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </MotiView>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={[styles.footer, { borderTopColor: theme.border, paddingBottom: insets.bottom + 16 }]}>
                <View style={styles.footerButtons}>
                    {currentStep > 0 && (
                        <TouchableOpacity
                            style={[styles.backBtn, { borderColor: theme.border }]}
                            onPress={() => setCurrentStep(currentStep - 1)}
                        >
                            <Text style={[styles.backBtnText, { color: theme.textSecondary }]}>Back</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[styles.primaryButton, { backgroundColor: '#11d421' }]}
                        onPress={handleNext}
                    >
                        <Text style={styles.buttonText}>{currentStep === STEPS.length - 1 ? 'Publish Listing' : 'Continue'}</Text>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
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
    helpButton: {
        padding: 8,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    stepItem: {
        alignItems: 'center',
        gap: 8,
    },
    stepCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepLabel: {
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
    },
    stepLine: {
        height: 2,
        flex: 1,
        marginHorizontal: 8,
        marginTop: -18,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 40,
    },
    stepContent: {
        flex: 1,
    },
    form: {
        gap: 20,
    },
    formTitle: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 8,
    },
    formDesc: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 22,
        marginBottom: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 4,
    },
    input: {
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    uploadBox: {
        height: 140,
        borderRadius: 24,
        borderWidth: 2,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 20,
    },
    uploadIcon: {
        width: 60,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    uploadSubtitle: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    reviewContent: {
        alignItems: 'center',
    },
    successIconBox: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    previewCard: {
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        padding: 24,
        marginTop: 20,
    },
    previewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    previewLabel: {
        fontSize: 13,
        fontFamily: 'Poppins_500Medium',
    },
    previewValue: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
    },
    previewDivider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 16,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
    },
    footerButtons: {
        flexDirection: 'row',
        gap: 16,
    },
    backBtn: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBtnText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    primaryButton: {
        flex: 2,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Poppins_700Bold',
    },
});
