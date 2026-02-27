import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [message, setMessage] = React.useState('');

    const messages = [
        { id: 1, text: 'Hello! I have a question about the Ashanti Cocoa plantation.', sender: 'user', time: '10:00 AM' },
        { id: 2, text: 'Hi there! I am Kwesi from the Ashanti Agribusiness team. How can I help you today?', sender: 'other', time: '10:02 AM' },
        { id: 3, text: 'What is the projected harvest date for the current quarter?', sender: 'user', time: '10:05 AM' },
        { id: 4, text: 'We are expecting the harvest to begin on October 15th. We will share the yield report shortly after.', sender: 'other', time: '10:06 AM' },
    ];

    const renderMessage = ({ item }: any) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.messageWrapper, isUser ? styles.userWrapper : styles.otherWrapper]}>
                {!isUser && (
                    <Image
                        source={{ uri: 'https://ui-avatars.com/api/?name=Kwesi&background=11d421&color=fff' }}
                        style={styles.avatar}
                    />
                )}
                <View style={[
                    styles.messageBubble,
                    isUser ? [styles.userBubble, { backgroundColor: theme.tint }] : [styles.otherBubble, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6' }]
                ]}>
                    <Text style={[styles.messageText, { color: isUser ? '#fff' : theme.text }]}>{item.text}</Text>
                    <Text style={[styles.messageTime, { color: isUser ? 'rgba(255,255,255,0.7)' : theme.textSecondary }]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: 'https://ui-avatars.com/api/?name=Kwesi&background=11d421&color=fff' }}
                            style={styles.headerAvatar}
                        />
                        <View style={styles.onlineDot} />
                    </View>
                    <View>
                        <Text style={[styles.headerName, { color: theme.text }]}>Kwesi - Ashanti Agri</Text>
                        <Text style={[styles.headerStatus, { color: '#11d421' }]}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerAction}>
                    <Ionicons name="call-outline" size={22} color={theme.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={[styles.inputContainer, { backgroundColor: theme.background, borderTopColor: theme.border, paddingBottom: insets.bottom + 10 }]}>
                    <TouchableOpacity style={[styles.attachButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }]}>
                        <Ionicons name="add" size={24} color={theme.textSecondary} />
                    </TouchableOpacity>
                    <View style={[styles.textInputWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }]}>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Type a message..."
                            placeholderTextColor={isDark ? '#666' : '#999'}
                            value={message}
                            onChangeText={setMessage}
                            multiline
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: theme.tint }]}
                        onPress={() => setMessage('')}
                    >
                        <Ionicons name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 4,
        marginRight: 8,
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarWrapper: {
        position: 'relative',
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 14,
    },
    onlineDot: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#11d421',
        borderWidth: 2,
        borderColor: '#fff',
    },
    headerName: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    headerStatus: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    headerAction: {
        padding: 8,
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        maxWidth: '85%',
    },
    userWrapper: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    otherWrapper: {
        alignSelf: 'flex-start',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 10,
        marginRight: 8,
    },
    messageBubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 18,
    },
    userBubble: {
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        borderBottomLeftRadius: 4,
        marginLeft: 8,
    },
    messageText: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 22,
    },
    messageTime: {
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
        marginTop: 4,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        gap: 10,
    },
    attachButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputWrapper: {
        flex: 1,
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 44,
        maxHeight: 100,
    },
    input: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
