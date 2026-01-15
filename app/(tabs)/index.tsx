// app/(tabs)/index.tsx
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="potted-plant" size={64} color="#11d421" />
        <Link href="/(tabs)/explore" style={styles.link}>
          Go to App
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  link: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#11d421',
    color: 'white',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});