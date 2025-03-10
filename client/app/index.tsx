import "@/app/globals.css";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

export default function LoadingScreen() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate a loading process
		setTimeout(() => setIsLoading(false), 3000);
	}, []);

	return (
		<View className="flex-1 justify-center items-center bg-white">
			{isLoading ? (
				<>
					<Image
						source={require("@/assets/images/logo.png")} // Replace with your app logo path
						className="w-32 h-32 mb-4"
						resizeMode="contain"
					/>
					<Text className="text-3xl font-bold text-gray-800">
						My Awesome App
					</Text>
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
				<View className="flex-1 justify-center items-center">
					<Text className="text-3xl font-bold text-gray-800 ">
						<Link href={"./tabs/index"} />
					</Text>
				</View>
			)}
		</View>
	);
}
