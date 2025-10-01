import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TasksScreen from '../screens/TasksScreen';
import SchoolScreen from '../screens/SchoolScreen';
import HealthScreen from '../screens/HealthScreen';

const Tab = createBottomTabNavigator();


export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffcc00', // Default, but overridden per tab
        tabBarInactiveTintColor: '#60a5fa', // Light blue for inactive
        tabBarStyle: {
          backgroundColor: '#121212', // Dark background for tab bar
          elevation: 10, // Shadow for modern look
          paddingVertical: 10, // Padding for spacing
          borderTopWidth: 0, // Remove top border for cleaner look
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        },
        headerStyle: {
          backgroundColor: '#121212', // Dark background for header
        },
        headerTintColor: '#ffcc00', // Yellow color for header text/icons
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false, // Hide the header to remove white background section
      }}
    >
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#10b981', // Green for Tasks active
        }}
      />
      <Tab.Screen 
        name="School" 
        component={SchoolScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#f59e0b', // Yellow for School active
        }}
      />
      <Tab.Screen 
        name="Health" 
        component={HealthScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#ef4444', // Red for Health active
        }}
      />
    </Tab.Navigator>
  );
}
