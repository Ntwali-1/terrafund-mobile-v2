import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { MotiView } from 'moti';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleReset = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
        setSent(true);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }]}
                    onPress={() => router.back()}
                >
                    <MaterialIcons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {!sent ? (
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={styles.content}
                    >
                        <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                            <Ionicons name="key-outline" size={40} color="#3b82f6" />
                        </View>
                        <Text style={[styles.title, { color: theme.text }]}>Forgot Password?</Text>
                        <Text style={[styles.description, { color: theme.textSecondary }]}>
                            Don't worry! It happens. Please enter the email associated with your account.
                        </Text>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.textSecondary }]}>Email Address</Text>
                            <View style={[styles.inputWrapper, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb', borderColor: theme.border }]}>
                                <Ionicons name="mail-outline" size={20} color={theme.tint} />
                                <TextInput
                                    style={[styles.input, { color: theme.text }]}
                                    placeholder="name@example.com"
                                    placeholderTextColor="#888"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[styles.primaryButton, { backgroundColor: theme.tint }]}
                            onPress={handleReset}
                        >
                            <Text style={styles.buttonText}>Send Reset Link</Text>
                            <Ionicons name="send-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </MotiView>
                ) : (
                    <MotiView
                        from={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={styles.successContent}
                    >
                        <View style={[styles.iconBox, { backgroundColor: 'rgba(17, 212, 33, 0.1)' }]}>
                            <Ionicons name="checkmark-done-circle" size={50} color="#11d421" />
                        </View>
                        <Text style={[styles.title, { color: theme.text }]}>Link Sent!</Text>
                        <Text style={[styles.description, { color: theme.textSecondary }]}>
                            We've sent a password reset link to {email}. Please check your inbox.
                        </Text>
                        <TouchableOpacity
                            style={[styles.secondaryButton, { borderColor: theme.tint }]}
                            onPress={() => setSent(false)}
                        >
                            <Text style={[styles.secondaryButtonText, { color: theme.tint }]}>Try another email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.backToLogin}
                            onPress={() => router.replace('/auth/login')}
                        >
                            <Text style={[styles.backToLoginText, { color: theme.textSecondary }]}>Back to Login</Text>
                        </TouchableOpacity>
                    </MotiView>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
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
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        paddingBottom: 40,
    },
    content: {
        alignItems: 'center',
    },
    successContent: {
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
    title: {
        fontSize: 28,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    inputGroup: {
        width: '100%',
        gap: 8,
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderRadius: 18,
        borderWidth: 1,
        paddingHorizontal: 16,
        gap: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    primaryButton: {
        width: '100%',
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
    secondaryButton: {
        width: '100%',
        height: 60,
        borderRadius: 18,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
    backToLogin: {
        marginTop: 10,
    },
    backToLoginText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
});
