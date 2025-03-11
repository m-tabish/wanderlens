import { Tabs } from "expo-router";
import {
	ClipboardList,
	House,
	MapPlus,
	Search,
	Settings,
} from "lucide-react-native";
import React from "react";
const TabsLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<House
							className="flex flex-1 w-full h-full"
							size={30}
							color={focused ? "#7e7e7e" : "#000000"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="trips"
				options={{
					title: "Trips",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<ClipboardList
							className="flex flex-1 w-full h-full"
							size={30}
							color={focused ? "#90d6ff" : "#000000"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="createNewTrip"
				options={{
					title: "CreateANewTrip",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<MapPlus
							className="flex flex-1 w-full h-full"
							size={30}
							color={focused ? "#90d6ff" : "#000000"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Search
							className="flex flex-1 w-full h-full"
							size={30}
							color={focused ? "#90d6ff" : "#000000"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Settings
							className="flex flex-1 w-full h-full"
							size={30}
							color={focused ? "#90d6ff" : "#000000"}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
