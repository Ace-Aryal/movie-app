import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
// import { Appearance } from "react-native";
export default function RootLayout() {
  // const colorScheme = Appearance.getColorScheme();
  // const isDarkMode = colorScheme === "dark";
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: "black" }} className="flex-1">
        <StatusBar barStyle="light-content" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
