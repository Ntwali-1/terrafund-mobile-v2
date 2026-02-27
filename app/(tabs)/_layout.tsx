import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const { colorScheme, isDark } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#11d421',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: 'Poppins_500Medium',
          fontSize: 11,
          marginBottom: 4,
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 16,
          right: 16,
          height: 68,
          borderRadius: 24,
          backgroundColor: isDark ? '#1a1a1a' : '#fff',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 0 : 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 20,
          elevation: 10,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="explore" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="pie-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="account-balance-wallet" color={color} />,
        }}
      />
    </Tabs>
  );
}
