# 2. Frontend Structure and Technologies

The LifeEase frontend is a mobile application developed using React Native with Expo, offering a unified codebase for iOS and Android platforms. It leverages modern JavaScript features, functional components, and hooks for state management and side effects. For styling, it utilizes NativeWind, which brings Tailwind CSS-like utility classes directly into React Native components.

## 2.1 Technology Stack

*   **Framework:** React Native (with Expo managed workflow)
*   **Navigation:** `@react-navigation/bottom-tabs` for bottom tab navigation
*   **Styling:** NativeWind (for Tailwind CSS integration)
*   **API Client:** Axios for HTTP requests
*   **Icons:** `@expo/vector-icons` (Ionicons)
*   **State Management:** React Hooks (`useState`, `useEffect`)

## 2.2 Project Entry Point (`UI/App.tsx`)

The `UI/App.tsx` file serves as the main entry point for the React Native application. It sets up the foundational components for the app:

*   It includes a mandatory `global.css` import for NativeWind to compile and apply its styles.
*   `SafeAreaProvider` and `SafeAreaView` ensure content is displayed within the safe areas of devices (e.g., avoiding notches and home indicators).
*   `StatusBar` is configured for a consistent look.
*   `NavigationContainer` from `@react-navigation/native` is the core component for managing the application's navigation tree.
*   `BottomTabs` component is rendered here, defining the primary navigation structure.

```typescript
import "./global.css"
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
```

## 2.3 Main Navigation (`UI/src/navigation/BottomTabs.js`)

The `BottomTabs.js` component defines the main bottom tab navigation for the application, providing access to the three core features: Tasks, School Planner, and Health.

*   It uses `createBottomTabNavigator` to create the tab-based navigation.
*   Each `Tab.Screen` corresponds to a main functional area of the app.
*   `screenOptions` are used to set global styling for the tab bar and header, while individual `tabBarActiveTintColor` is set per tab for distinct active states.
*   `Ionicons` are used for visual representation of each tab.

The defined screens are:
*   **Tasks:** Mapped to `TasksScreen`, with a green active tint and a "list" icon.
*   **School:** Mapped to `SchoolScreen`, with a yellow active tint and a "school" icon.
*   **Health:** Mapped to `HealthScreen`, with a red active tint and a "heart" icon.

The `headerShown: false` option ensures that the default header provided by React Navigation is hidden, allowing for custom header implementations or a cleaner, full-screen view for each tab.

## 2.4 User Interface Screens

The application features three primary screens, each dedicated to a core functionality: `TasksScreen`, `SchoolScreen`, and `HealthScreen`. These screens share a common interaction pattern for fetching and submitting data.

### 2.4.1 Common Screen Structure and Functionality

All three screens (`TasksScreen`, `SchoolScreen`, `HealthScreen`) follow a similar functional component structure using React Hooks:

*   **State Management:**
    *   `useState` is used to manage local component state, such as `modalVisible` (for controlling the visibility of the add item modal), input field values (e.g., `name`, `subject`, `activity`), and the list of items (`tasks`, `schoolActivities`, `healthEntries`).
    *   `loading` state indicates whether an API call is in progress.
*   **Data Fetching:**
    *   `useEffect` hook is used to trigger data fetching when the component mounts.
    *   An asynchronous function (e.g., `fetchTasks`, `fetchSchoolActivities`, `fetchHealthEntries`) uses `axios.get` to retrieve data from the backend API. The `BASE_URL` from `../config/apiConfig.js` is prepended to the specific endpoint.
*   **Data Display:**
    *   `FlatList` component is used to efficiently render lists of items. The `renderItem` prop defines how each item in the list is displayed.
    *   Each item is rendered within a `View` component, styled with `NativeWind` classes to provide a consistent look and feel with distinct border colors for each section (green for Tasks, yellow for School, red for Health).
*   **Adding New Items (Modal and Form):**
    *   A `Modal` component is used to present a form for adding new entries.
    *   `TextInput` components capture user input for relevant fields (e.g., task `title` and `dueDate`, school `subject` and `deadline`, health `activity` and `time`).
    *   A "+" button (using `TouchableOpacity` and `Ionicons`) at the bottom right of each screen toggles the visibility of the modal.
    *   "Save" button in the modal triggers an `axios.post` request to send the new item data to the backend. After successful submission, the modal closes, input fields are cleared, and the item list is refreshed (`fetch...` function is called again).
    *   "Cancel" button closes the modal and clears input fields without saving.
*   **Styling:** All components are extensively styled using `NativeWind` utility classes for a cohesive and responsive design.

### 2.4.2 API Configuration (`UI/src/config/apiConfig.js`)

The `apiConfig.js` file centralizes the base URL for the backend API. This allows for easy modification of the API endpoint without needing to change it in multiple files.

```javascript
export const BASE_URL = 'http://13.251.228.254:8000';
```

Currently, the `BASE_URL` is hardcoded to `http://13.251.228.254:8000`. In a production environment, this would typically be managed through environment variables to allow for different API endpoints based on the deployment environment (e.g., development, staging, production).
