import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="trips"
				options={{
					title: "Trips",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="createNewTrip"
				options={{
					title: "CreateANewTrip",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
