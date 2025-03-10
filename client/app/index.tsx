import "@/app/globals.css";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
export default function RootLayout() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);
	return (
		<View className="flex-1 justify-center items-center bg-white">
			{isLoading ? (
				<>
					<Image
						source={require("@/assets/images/logo.png")}
						className="w-32 h-32 mb-4"
						resizeMode="contain"
					/>
					<Text className="text-3xl font-bold text-gray-800">Wanderlens</Text>
					<ActivityIndicator
						size="large"
						color="#3498db"
						className="mt-6"
					/>
					<Text className="absolute bottom-10 text-gray-600">
						Please wait while we load your adventure
					</Text>
				</>
			) : (
				<Redirect href="/tabs/home"></Redirect>
			)}
		</View>
	);
}
