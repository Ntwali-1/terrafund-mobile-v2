import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, TextInput, Image, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

const STEPS = [
    {
        title: 'Basic Info',
        description: 'Tell us a bit about yourself',
        fields: ['username', 'bio'],
        icon: 'person-outline'
    },
    {
        title: 'Location',
        description: 'Where are you based?',
        fields: ['country', 'city'],
        icon: 'location-outline'
    },
    {
        title: 'Interests',
        description: 'What are you interested in?',
        fields: ['crops', 'budget'],
        icon: 'leaf-outline'
    }
];

export default function CompleteProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [currentStep, setCurrentStep] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.replace('/(tabs)');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: isDark ? '#333' : '#eee' }]}>
                        <MotiView
                            animate={{ width: `${progress}%` }}
                            style={[styles.progressFill, { backgroundColor: '#11d421' }]}
                        />
                    </View>
                    <Text style={[styles.progressText, { color: theme.textSecondary }]}>{Math.round(progress)}% Complete</Text>
                </View>
                <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                    <Text style={[styles.skipText, { color: theme.tint }]}>Skip</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <MotiView
                    from={{ opacity: 0, translateX: 50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    key={currentStep}
                    style={styles.stepContent}
                >
                    <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                        <Ionicons name={STEPS[currentStep].icon as any} size={40} color="#11d421" />
                    </View>
                    <Text style={[styles.stepTitle, { color: theme.text }]}>{STEPS[currentStep].title}</Text>
                    <Text style={[styles.stepDescription, { color: theme.textSecondary }]}>{STEPS[currentStep].description}</Text>

                    <View style={styles.form}>
                        {STEPS[currentStep].fields.map((field) => (
                            <View key={field} style={styles.inputGroup}>
                                <Text style={[styles.label, { color: theme.textSecondary }]}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', borderColor: theme.border, color: theme.text }]}
                                    placeholder={`Enter your ${field}`}
                                    placeholderTextColor="#888"
                                />
                            </View>
                        ))}
                    </View>
                </MotiView>
            </ScrollView>

            <View style={[styles.footer, { borderTopColor: theme.border }]}>
                <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: theme.tint }]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>{currentStep === STEPS.length - 1 ? 'Finish' : 'Continue'}</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
                {currentStep > 0 && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setCurrentStep(currentStep - 1)}
                    >
                        <Text style={[styles.backButtonText, { color: theme.textSecondary }]}>Back</Text>
                    </TouchableOpacity>
                )}
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
        paddingHorizontal: 24,
        paddingVertical: 20,
        gap: 20,
    },
    progressContainer: {
        flex: 1,
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
    },
    skipText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    stepContent: {
        alignItems: 'center',
    },
    iconBox: {
        width: 80,
        height: 80,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    stepTitle: {
        fontSize: 28,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 8,
    },
    stepDescription: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    form: {
        width: '100%',
        gap: 20,
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
    footer: {
        padding: 24,
        borderTopWidth: 1,
    },
    primaryButton: {
        height: 60,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#11d421',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
    },
    backButton: {
        alignItems: 'center',
        marginTop: 16,
    },
    backButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
});
