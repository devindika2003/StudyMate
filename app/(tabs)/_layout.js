
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#52785C',
        tabBarInactiveTintColor: '#9AA397',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 68,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: '#E8EBDD',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>🏠</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>📚</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="focus"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>⏱️</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>🔔</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>🏆</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
