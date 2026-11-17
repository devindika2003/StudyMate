
import { Stack } from 'expo-router';
import { StudyProvider } from '../context/StudyContext';
import { AppState, Alert } from 'react-native';
import { useEffect, useRef } from 'react';

function AppStateListener() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          Alert.alert(
            'Welcome back! 🌱',
            'Ready to continue your learning journey?'
          );
        }

        appState.current = nextAppState;
      }
    );

    return () => subscription.remove();
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <StudyProvider>
      <AppStateListener />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </StudyProvider>
  );
}
