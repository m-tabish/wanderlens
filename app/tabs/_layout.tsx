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
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					paddingBottom: 0,
					height: 55,
					position: "fixed",
				},
				tabBarItemStyle: {
					paddingBottom: 0,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					display: "none",
				},
			}}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<House
							size={30}
							color={focused ? "#000000" : "#bebebe"}
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
							size={30}
							color={focused ? "#000000" : "#bebebe"}
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
							size={30}
							color={focused ? "#000000" : "#bebebe"}
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
							size={30}
							color={focused ? "#000000" : "#bebebe"}
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
							size={30}
							color={focused ? "#000000" : "#bebebe"}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
