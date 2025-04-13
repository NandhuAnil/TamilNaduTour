import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setTimeout(() => {
          if (token) {
            router.replace('/(tabs)');
          } else {
            router.replace('/(auth)');
          }
        }, 100);
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        // setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    checkToken();
  }, []);

  // if (!isReady) {
  //   return null; 
  // }

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="destinationpage" options={{ headerShown: false }} />
        <Stack.Screen name="categorylist" options={{ headerShown: false }} />
        <Stack.Screen name="gemini" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}