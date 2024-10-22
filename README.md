# React Native Skia 3D Logo Demo

This project demonstrates a 3D logo effect using React Native and Skia, inspired by Linear's app welcome screen. It showcases the power of React Native Skia for creating complex animations and 3D-like effects on mobile devices.

## Features

- 3D logo effect with realistic shadows
- Responsive to device rotation and gravity
- Animated React Native logo
- Custom background with radial gradient

## Main Components

### App Component (`src/index.tsx`)

The main component that sets up the 3D logo effect. It uses:

- `useAnimatedSensor` from React Native Reanimated to respond to device rotation and gravity
- Skia's `Canvas`, `Group`, and other primitives to create the 3D effect
- Custom `GoodOldSquare` component for the logo base
- Dynamic shadows that respond to the logo's rotation

### ReactNativeLogo Component (`src/react-logo.tsx`)

A custom component that renders the React Native logo using Skia. It features:

- Three rotated ovals to create the atom-like structure
- Centered positioning within the logo base
- Blur effect for a glowing appearance

## How It Works

1. The app uses device sensors to detect rotation and gravity changes.
2. These sensor values are used to calculate the logo's rotation using `useDerivedValue`.
3. The logo base is rendered using Skia's `Group` and `RoundedRect` components, with transforms applied for the 3D effect.
4. Shadows are dynamically adjusted based on the logo's rotation to enhance the 3D illusion.
5. The React Native logo is rendered on top of the base, completing the effect.

## Running the Project

To run this project:

1. Ensure you have React Native and its dependencies installed.
2. Clone the repository.
3. Run `npm install` or `yarn install` to install the required packages.
4. Run `npx react-native run-android` or `npx react-native run-ios` to start the app on your device or emulator.

Note: For the best experience, run this on a physical device to take advantage of the rotation and gravity sensors.

## Dependencies

- React Native
- React Native Skia
- React Native Reanimated

