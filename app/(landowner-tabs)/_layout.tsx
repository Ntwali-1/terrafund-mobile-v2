import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function LandownerTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#11d421',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-lands"
        options={{
          title: 'My Lands',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="terrain" color={color} />,
        }}
      />
      <Tabs.Screen
        name="investors"
        options={{
          title: 'Investors',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="groups" color={color} />,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="payments" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
