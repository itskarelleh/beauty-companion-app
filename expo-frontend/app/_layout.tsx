import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { createThemedStyles } from '@/libs/styles';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const screenWidth = Dimensions.get('window').width;
  const isPhoneWidth = screenWidth > 414;

  if (!loaded) {
    return null;
  }

  return (
      <View style={styles.fullWidthContainer}>
        <View style={[styles.appContainer, { width: !isPhoneWidth ? '100%' : 414}]}>
          <Stack
            >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerTitle: "" }} />
              <Stack.Screen name="login-email" options={{ headerTitle: "" }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </View>
        </View>
  );
}

const styles = createThemedStyles((theme: typeof Colors.light | typeof Colors.dark) => ({
  appContainer: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: theme.background,
  },
  fullWidthContainer: {
    flex: 1,
    backgroundColor: theme.button.background
  },
}));
