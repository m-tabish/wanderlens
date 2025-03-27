import { Stack } from "expo-router";

type RootStackParamList = {
	"tabs/home": undefined;
	"destination/DestinationScreen": { item: any };
};

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="tabs/home"
				options={{ headerTitle: "Home" }}
			/>
			<Stack.Screen
				name="destination/DestinationScreen"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
export { RootStackParamList };
