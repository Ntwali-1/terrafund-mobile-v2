import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

export default function LandownerChatScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? Colors.dark : Colors.light;

    const [message, setMessage] = useState('');

    const messages = [
        { id: 1, text: 'Hello! I noticed your listing for Sunny Valley. Is the soil report available?', sender: 'investor', time: '10:30 AM' },
        { id: 2, text: 'Hi! Yes, it is uploaded in the documents section. Have you had a chance to look?', sender: 'me', time: '10:32 AM' },
        { id: 3, text: 'Yes, looking at it now. The nitrogen levels look great for cocoa.', sender: 'investor', time: '10:35 AM' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <View style={styles.avatarMini} />
                    <View>
                        <Text style={[styles.chatName, { color: theme.text }]}>John Doe (Investor)</Text>
                        <Text style={[styles.chatStatus, { color: '#11d421' }]}>Online</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerAction}>
                    <Ionicons name="call-outline" size={22} color={theme.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.chatContent} showsVerticalScrollIndicator={false}>
                {messages.map((msg, idx) => (
                    <MotiView
                        from={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.sender === 'me' ? [styles.myMessage, { backgroundColor: theme.tint }] : [styles.theirMessage, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6' }]
                        ]}
                    >
                        <Text style={[styles.messageText, { color: msg.sender === 'me' ? '#fff' : theme.text }]}>
                            {msg.text}
                        </Text>
                        <Text style={[styles.messageTime, { color: msg.sender === 'me' ? 'rgba(255,255,255,0.7)' : theme.textSecondary }]}>
                            {msg.time}
                        </Text>
                    </MotiView>
                ))}
            </ScrollView>

            <View style={[styles.inputContainer, { borderTopColor: theme.border, backgroundColor: theme.background }]}>
                <TouchableOpacity style={styles.attachBtn}>
                    <Ionicons name="add" size={24} color={theme.textSecondary} />
                </TouchableOpacity>
                <TextInput
                    style={[styles.input, { backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6', color: theme.text }]}
                    placeholder="Message investor..."
                    placeholderTextColor="#888"
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={[styles.sendBtn, { backgroundColor: theme.tint }]}>
                    <Ionicons name="send" size={18} color="#fff" />
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    backButton: {
        padding: 8,
    },
    headerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        gap: 12,
    },
    avatarMini: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#eee',
    },
    chatName: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
    },
    chatStatus: {
        fontSize: 11,
        fontFamily: 'Poppins_400Regular',
        marginTop: -2,
    },
    headerAction: {
        padding: 8,
    },
    chatContent: {
        padding: 20,
        gap: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 18,
        gap: 4,
    },
    myMessage: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 20,
    },
    messageTime: {
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 32,
        borderTopWidth: 1,
        gap: 12,
    },
    attachBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        height: 44,
        borderRadius: 22,
        paddingHorizontal: 18,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
