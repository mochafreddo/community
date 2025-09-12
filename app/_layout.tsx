import "react-native-reanimated";

import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import queryClient from "@/api/queryClient";
import { useAuth } from "@/hooks/queries/useAuth";

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<RootNavigator />
			<Toast />
		</QueryClientProvider>
	);
}

function RootNavigator() {
	const { auth } = useAuth();

	useEffect(() => {
		auth.id &&
			Toast.show({
				type: "success",
				text1: `${auth.nickname ?? "회원"}님 환영합니다!`,
			});
	}, [auth.id, auth.nickname]);

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="auth" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" />
		</Stack>
	);
}
