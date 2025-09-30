# Frontend Setup Guide for the LifeEase Prototype Application

## Overview

This document provides a detailed guide for setting up the frontend components of the LifeEase prototype application. The frontend is developed using React Native with Expo, enabling cross-platform mobile development for iOS and Android utilizing JavaScript.

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

All operations are performed within the `UI` directory. Prerequisites include Node.js and npm (Node Package Manager). Ensure these are installed on your development machine.

Navigate to the project root and execute the following commands in sequence:

1. Enter the UI directory:  
   ```
   cd UI
   ```

2. Install React Navigation dependencies:  
   ```
   npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
   ```
   - Note: Additional Expo configuration for navigation is automatically managed.

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
   - This generates the `tailwind.config.js` file, which configures TailwindCSS for the project.

## Verification

To confirm successful installation:

1. Launch the development server from the `UI` directory:  
   ```
   npm start
   ```
   - Use the Expo Go mobile application to scan the QR code and load the application.

2. Inspect the `UI` directory for:
   - The `node_modules` directory containing the installed packages.
   - Updated `package.json` with the new dependencies listed under "dependencies".
   - Presence of `tailwind.config.js`.

In case of issues, execute `npm install` to reinstall dependencies or consult the official Expo documentation.

## Subsequent Development Steps

- Implement application screens utilizing React Navigation for routing.
- Apply TailwindCSS classes via NativeWind for component styling.
- Integrate Axios for backend API communications, referencing the backend setup in `backend-setup.md`.
- Configure Expo Notifications for alert functionalities.

For further assistance, refer to the official documentation at expo.dev or relevant package repositories. Ensure to run `npm install` after updating the codebase from version control.
