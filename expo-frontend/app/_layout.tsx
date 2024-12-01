import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SessionProvider } from '@/libs/SessionProvider';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

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

  return (
    <View style={isPhoneWidth ? styles.phoneContainer : styles.fullWidthContainer}>
      <ThemeProvider value={DefaultTheme}>
        <SessionProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </SessionProvider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
    width: 414,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  fullWidthContainer: {
    flex: 1,
  },
});
