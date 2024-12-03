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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
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

  const theme = useColorScheme()
  return (
      <View style={isPhoneWidth ? styles.phoneContainer : styles.fullWidthContainer}>
        <Stack screenOptions={{ headerTransparent: true, headerShadowVisible: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerTitle: "" }} />
            <Stack.Screen name="login" options={{ headerTitle: "" }} />
            <Stack.Screen name="login-email" options={{ headerTitle: "" }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </View>
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
    width: 414,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: Colors.light.background,
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
  },
  fullWidthContainer: {
    flex: 1,
  },
});
