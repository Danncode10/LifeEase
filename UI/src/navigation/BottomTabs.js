import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TasksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tasks Screen</Text>
    </View>
  );
}

function SchoolPlannerScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>School Planner Screen</Text>
    </View>
  );
}

function HealthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Health Screen</Text>
    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="SchoolPlanner" component={SchoolPlannerScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
    </Tab.Navigator>
  );
}
