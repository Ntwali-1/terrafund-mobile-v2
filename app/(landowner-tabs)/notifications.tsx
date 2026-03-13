import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function NotificationsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }]}>
      <View style={styles.content}>
        <MaterialIcons name="notifications-none" size={64} color={isDark ? '#333' : '#ddd'} />
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>No Notifications</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>Your updates and alerts will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 10,
  },
});
