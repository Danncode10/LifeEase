const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './global.css' })

// Expo Has migrated to metro based bundling solution for new versions of Expo SDK
// The Above file compiles Tailwind/Nativewind Classes using Node_modules installed and .global.css imports