# Frontend Setup Guide for the LifeEase Prototype Application

## Overview

This document provides a detailed guide for setting up the frontend components of the LifeEase prototype application. The frontend is developed using React Native with Expo, enabling cross-platform mobile development for iOS and Android utilizing JavaScript (and TypeScript).

The LifeEase application is a prototype designed to demonstrate core functionalities, with the frontend serving as the user interface layer.

## Required Dependencies

The following dependencies are essential for the frontend implementation. Each serves a specific purpose in enhancing navigation, styling, data communication, and user notifications:

1. **React Navigation (@react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/native-stack)**:
   - **Purpose**: Facilitates screen navigation within the application. The bottom-tabs navigator provides a tab-based interface at the screen's bottom edge, while the native-stack navigator supports hierarchical screen transitions with native animations and back-button functionality.
   - **Rationale**: Enables efficient user navigation between application sections, ensuring a seamless experience.

2. **NativeWind and TailwindCSS**:
   - **Purpose**: NativeWind integrates TailwindCSS, a utility-first CSS framework, into React Native projects. TailwindCSS supplies pre-defined classes for styling components, such as layout, colors, and typography.
   - **Rationale**: Streamlines the styling process, promoting consistent and responsive design without extensive custom CSS.

3. **Axios**:
   - **Purpose**: A promise-based HTTP client for making requests to the backend server, such as retrieving or submitting data.
   - **Rationale**: Provides a robust mechanism for API interactions, essential for dynamic application features.

4. **Expo Notifications**:
   - **Purpose**: Manages push notifications within the Expo ecosystem, allowing for scheduled or event-triggered alerts.
   - **Rationale**: Supports user engagement through timely notifications, enhancing application utility.

## Installation Instructions

All operations are performed within the `UI` directory. Prerequisites include Node.js and npm (Node Package Manager). Ensure these are installed on your development machine. If you're new to these, Node.js is a runtime environment for JavaScript outside the browser, and npm helps manage project packages.

Navigate to the project root and execute the following commands in sequence:

1. Enter the UI directory:  
   ```
   cd UI
   ```

2. Install React Navigation dependencies:  
   ```
   npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
   ```
   - Note: Additional Expo configuration for navigation is automatically managed. This sets up the tools to switch between different parts of your app smoothly.

3. Install NativeWind and TailwindCSS:  
   ```
   npm install nativewind tailwindcss
   ```

4. Install Axios:  
   ```
   npm install axios
   ```

5. Install Expo Notifications:  
   ```
   npm install expo-notifications
   ```

6. Initialize TailwindCSS configuration:  
   ```
   npx tailwindcss init
   ```
   - This generates the `tailwind.config.js` file, which configures TailwindCSS for the project. Think of this as setting rules for how styles are applied.

## Project Structure

After installation, the frontend code is organized in the `UI/src/` directory for better organization. Key folders include:

- `navigation/`: Contains files for app navigation, like switching between screens.
- `screens/`: Holds the main user interface components (screens) that users see and interact with.

This structure keeps things tidy: navigation handles "how to move around," while screens are the "what you see" parts.

## Implementing Navigation

The app uses a bottom tab navigator, which creates three tabs at the bottom of the screen for easy access: Tasks, School Planner, and Health. This is set up in `UI/src/navigation/BottomTabs.js`.

### Simple Explanation
Imagine your phone apps with tabs at the bottom (like Instagram's home, search, etc.). This file creates exactly that for LifeEase. Each tab links to a different screen.

### Step-by-Step Setup
1. **Create the Navigation Folder**: Inside `UI/src/`, make a `navigation/` folder. This groups all navigation-related files.

2. **Add BottomTabs.js**:
   - This file imports the bottom tab tool from React Navigation.
   - It defines three tabs: Tasks, School Planner, Health.
   - Initially, each tab shows a simple placeholder screen (just text in the center).
   - Later, we replace these placeholders with real screens (see next section).

   Here's what the basic code looks like (don't worry if it seems technical—we'll explain):
   ```javascript
   import * as React from 'react';
   import { Text, View } from 'react-native';
   import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

   const Tab = createBottomTabNavigator();

   // Placeholder screens (simple views)
   function TasksScreen() {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Tasks Screen</Text>
       </View>
     );
   }
   // Similar for SchoolPlannerScreen and HealthScreen

   export default function BottomTabs() {
     return (
       <Tab.Navigator>
         <Tab.Screen name="Tasks" component={TasksScreen} />
         <Tab.Screen name="SchoolPlanner" component={SchoolPlannerScreen} />
         <Tab.Screen name="Health" component={HealthScreen} />
       </Tab.Navigator>
     );
   }
   ```
   - **What this does**: `createBottomTabNavigator` makes the tabs. Each `<Tab.Screen>` is like a button at the bottom that loads a screen when tapped.
   - For beginners: Copy this into your file, and it creates the skeleton for navigation.

3. **Integrate into App.tsx** (the main app file):
   - Open `UI/App.tsx`.
   - Import `NavigationContainer` from `@react-navigation/native` and your `BottomTabs`.
   - Wrap your app content in `<NavigationContainer><BottomTabs /></NavigationContainer>`.
   - Example:
     ```tsx
     import { NavigationContainer } from '@react-navigation/native';
     import BottomTabs from './src/navigation/BottomTabs';
     import { StatusBar } from 'expo-status-bar';

     export default function App() {
       return (
         <NavigationContainer>
           <BottomTabs />
           <StatusBar style="auto" />
         </NavigationContainer>
       );
     }
     ```
   - **Why NavigationContainer?**: It's like a wrapper that makes all navigation work. Without it, tabs won't appear.
   - Save and run `npx expo start` (or `npm start`) to see the tabs. Scan the QR code with Expo Go app on your phone.

If tabs don't show, ensure all navigation packages are installed (step 2 in Installation).

## Creating the Screens

Now, let's build the actual screens that appear when you tap a tab. These are in `UI/src/screens/`: TasksScreen.js, SchoolScreen.js, HealthScreen.js. Each screen has:

- A title at the top (e.g., "Tasks").
- A list of placeholders (using FlatList, like a scrollable to-do list).
- A floating "+" button at the bottom-right (for adding new items later).

### Simple Explanation
A screen is like one page in your app. FlatList shows a list of items that you can scroll. The "+" button is a quick-add feature, positioned like a bubble on your screen.

### Step-by-Step for Each Screen
1. **Create the Screens Folder**: Inside `UI/src/`, make a `screens/` folder.

2. **Example: TasksScreen.js** (repeat similarly for others, changing titles and dummy data):
   ```javascript
   import React from 'react';
   import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

   const TasksScreen = () => {
     const dummyData = [  // Fake data for now – like sample tasks
       { id: '1', title: 'Placeholder Task 1' },
       { id: '2', title: 'Placeholder Task 2' },
       { id: '3', title: 'Placeholder Task 3' },
     ];

     const renderItem = ({ item }) => (  // How each list item looks
       <View style={styles.item}>
         <Text>{item.title}</Text>
       </View>
     );

     return (
       <View style={styles.container}>  // Main screen container
         <Text style={styles.title}>Tasks</Text>  // Top title
         <FlatList
           data={dummyData}
           renderItem={renderItem}
           keyExtractor={(item) => item.id}  // Makes list scrollable
           style={styles.list}
         />
         <TouchableOpacity style={styles.fab}>  // Floating button
           <Text style={styles.fabText}>+</Text>
         </TouchableOpacity>
       </View>
     );
   };

   const styles = StyleSheet.create({  // Styles (colors, sizes, positions)
     container: { flex: 1 },
     title: { fontSize: 24, fontWeight: 'bold', padding: 16, backgroundColor: '#f0f0f0' },
     list: { flex: 1 },
     item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
     fab: {  // Floating action button styles
       position: 'absolute', right: 16, bottom: 16,
       width: 56, height: 56, borderRadius: 28, backgroundColor: '#007AFF',
       justifyContent: 'center', alignItems: 'center',
       // Shadow for iOS/Android depth effect
       elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.25, shadowRadius: 3.84,
     },
     fabText: { fontSize: 24, color: 'white', fontWeight: 'bold' },
   });

   export default TasksScreen;
   ```
   - **Breakdown for Newbies**:
     - `dummyData`: Pretend data to fill the list. Later, replace with real data from your backend.
     - `FlatList`: A built-in React Native component for lists. `data` is what to show, `renderItem` styles each row.
     - `TouchableOpacity`: Makes the "+" tappable (like a button). `onPress` can be added later for adding items.
     - `StyleSheet.create`: Defines styles once and reuses them. `position: 'absolute'` places the button over other elements.
     - For SchoolScreen.js: Change title to "School Planner", dummyData to classes (e.g., 'Placeholder Class 1').
     - For HealthScreen.js: Title "Health", dummyData to workouts.

3. **Connect Screens to Navigation**:
   - In `BottomTabs.js`, update the `component` for each tab to import and use the real screen, e.g.:
     ```javascript
     import TasksScreen from '../screens/TasksScreen';
     // Then: <Tab.Screen name="Tasks" component={TasksScreen} />
     ```
   - This replaces placeholders. Run `npx expo start` to test—tap tabs to see lists and "+" buttons.

## Enhancing Screens with Interactive Modals

Now that the basic screens are in place, we've added interactive modals (pop-up forms) to each screen. These modals open when you tap the "+" button, allowing users to input new items. Currently, the "Save" button just logs the input to the console (like printing it out for testing), but in a full app, it would save to a database.

### Simple Explanation for Beginners
Think of a modal as a temporary window that pops up over your screen, like a dialog box asking for details (e.g., "What's your new task?"). It includes text fields for input and buttons to save or cancel. We used React Native's built-in `Modal` component, which slides up from the bottom for a smooth feel. No extra libraries needed—just some state (like variables to track if the modal is open and what the user typed) and event handlers (what happens on button press).

This makes the app feel more like a real planner: Tap "+", fill a form, and "add" an item (for now, it just prints to the developer's console for verification).

### Step-by-Step Implementation Overview
For each screen, we:
1. **Import needed components**: Add `Modal`, `TextInput` (for typing), and `TouchableHighlight` (for buttons) from React Native.
2. **Add state variables**: Use `useState` to track if the modal is visible and store user inputs (e.g., task name).
3. **Create the modal JSX**: A pop-up with a title, input fields, and buttons. It appears only when `visible={true}`.
4. **Connect the + button**: Add `onPress` to open the modal (set visible to true).
5. **Handle buttons**: Cancel closes and clears inputs; Save logs the data (e.g., `console.log('Task Input:', { name: 'My Task', dueDate: '2023-12-31' })`) and closes.

Styles are added to `StyleSheet.create` for a clean look: rounded corners, shadows, and centered layout.

### Breakdown for Each Screen
Repeat the pattern in each file (`TasksScreen.js`, `SchoolScreen.js`, `HealthScreen.js`). Here's an example for TasksScreen.js (adapt titles and fields for others):

#### TasksScreen.js (Add Task Modal)
- **Fields**: "Task Name" and "Due Date (YYYY-MM-DD)" – Simple text inputs for what the task is and when it's due.
- **Key Code Additions** (beyond the basic screen):
  ```javascript
  // At top: Import extras
  import { ..., Modal, TextInput, TouchableHighlight } from 'react-native';
  import React, { useState } from 'react';  // Added useState for tracking modal and inputs

  // Inside component: State (like variables that update the screen)
  const [modalVisible, setModalVisible] = useState(false);  // false means hidden initially
  const [name, setName] = useState('');  // Empty string for task name
  const [dueDate, setDueDate] = useState('');  // Empty for due date

  // Inside return (after FlatList, before + button):
  <Modal
    animationType="slide"  // Slides up nicely
    transparent={true}     // Semi-transparent background
    visible={modalVisible} // Shows/hides based on state
    onRequestClose={() => setModalVisible(!modalVisible)}  // For back button on Android
  >
    <View style={styles.centeredView}>  // Centers the modal
      <View style={styles.modalView}>   // White box with padding and shadow
        <Text style={styles.modalTitle}>Add New Task</Text>
        <TextInput  // First input field
          style={styles.input}
          placeholder="Task Name"  // Hint text
          value={name}
          onChangeText={setName}   // Updates state as you type
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
        />
        <View style={styles.buttonContainer}>  // Row of buttons
          <TouchableHighlight
            style={[styles.button, styles.cancelButton]}
            onPress={() => {  // Cancel: Close and clear
              setModalVisible(!modalVisible);
              setName(''); setDueDate('');
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, styles.saveButton]}
            onPress={() => {  // Save: Log and close
              console.log('Task Input:', { name, dueDate });  // Prints to console
              setModalVisible(!modalVisible);
              setName(''); setDueDate('');
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  </Modal>

  // Update + button:
  <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
    <Text style={styles.fabText}>+</Text>
  </TouchableOpacity>
  ```
- **New Styles Added** (to StyleSheet.create):
  ```javascript
  centeredView: {
    flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22,
  },
  modalView: {
    margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35,
    alignItems: 'center',  // Plus shadow properties for depth
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,
  },
  modalTitle: { marginBottom: 15, textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15,
           paddingHorizontal: 10, width: '100%', borderRadius: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  button: { borderRadius: 20, padding: 10, elevation: 2, width: '48%' },
  cancelButton: { backgroundColor: '#ccc' },
  saveButton: { backgroundColor: '#007AFF' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  ```
- **For Newbies**: `useState` is like a smart box that holds values and redraws the screen when changed. `onPress` is the "tap to do something" trigger. Test by running the app, tapping "+", typing, and saving—check your development console (in terminal or browser dev tools) for the logged output.

#### SchoolScreen.js (Add School Item Modal)
- **Title**: "Add New School Item"
- **Fields**: "Subject" (e.g., Math) and "Deadline (YYYY-MM-DD)" (when homework is due).
- **Save Log**: `console.log('School Input:', { subject, deadline });`
- Same structure as Tasks, just swap field names and placeholders. Change dummyData to classes if needed.

#### HealthScreen.js (Add Health Activity Modal)
- **Title**: "Add New Health Activity"
- **Fields**: "Activity" (e.g., Run) and "Time (HH:MM)" (when to do it).
- **Save Log**: `console.log('Health Input:', { activity, time });`
- Again, identical pattern—adapt titles and inputs.

### Testing the Modals
1. Run `npx expo start` from `UI/` and open in Expo Go.
2. Navigate to a tab (e.g., Tasks), tap "+" – modal should slide up.
3. Type in fields (e.g., Name: "Buy groceries", Due: "2023-10-05"), tap Save.
4. Check console: You should see output like `{ name: 'Buy groceries', dueDate: '2023-10-05' }`.
5. Tap Cancel in another try – modal closes without logging.
- If modal doesn't open: Check imports and `onPress`. If inputs don't clear: Verify state resets.
- Pro Tip: Use Metro bundler's console (press 'd' in terminal for dev menu) to see logs on device.

This enhancement turns static lists into interactive forms. Next, integrate with backend to actually save data!

### Using TailwindCSS with NativeWind
- Import NativeWind in `babel.config.js` (already set up).
- For styles, add `className="bg-blue-500 p-4"` to components (e.g., `<View className="flex-1">`).
- Rebuild with `npx expo start --clear` if styles don't apply.
- Tip: Tailwind classes are shortcuts (e.g., `flex-1` means take full space). Check tailwindcss.com for more.

## Verification

To confirm successful installation and implementation:

1. Launch the development server from the `UI` directory:  
   ```
   npx expo start
   ```
   - Use the Expo Go mobile application to scan the QR code and load the application. You should see three tabs at the bottom.
   - Tap each tab: Verify titles, scrollable lists with placeholders, and a blue "+" button (tap it—nothing happens yet, but it's ready for modals).

2. Inspect the `UI` directory for:
   - The `src/navigation/` and `src/screens/` folders.
   - `node_modules` directory containing the installed packages.
   - Updated `package.json` with dependencies.
   - `App.tsx` wrapped in `NavigationContainer`.

In case of issues:
- Clear cache: `npx expo start -c`.
- Check console in Metro bundler for errors.
- Ensure no typos in imports (e.g., paths like '../screens/TasksScreen').
- For style errors (e.g., in JS files), ignore for now or add `"/* @tailwind base; @tailwind components; @tailwind utilities; */"` at top if using Tailwind in JS (but project uses inline styles currently).

## Subsequent Development Steps

- Add functionality to the "+" buttons (e.g., open a modal for adding tasks).
- Replace dummy data with real API calls using Axios (see backend-setup.md).
- Style with Tailwind: Convert StyleSheet to className for consistency.
- Implement notifications for reminders.

For further assistance, refer to the official documentation at expo.dev, reactnavigation.org, or nativewind.dev. Ensure to run `npm install` after updating the codebase from version control. If you're new, start with Expo's "Get Started" tutorials—they're beginner-friendly.
