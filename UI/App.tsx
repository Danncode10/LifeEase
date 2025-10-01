import "./global.css" // Mandatory import for Tailwind/NativeWind Library compiler
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-900">
          <StatusBar barStyle="light-content" backgroundColor="#121212" />
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
