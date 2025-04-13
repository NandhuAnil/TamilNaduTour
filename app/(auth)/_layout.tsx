import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerStyle: { backgroundColor: "orange" },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: true, headerTitle: "Login" }} />
        <Stack.Screen name="signup" options={{ headerShown: true, headerTitle: "Create a Account" }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
