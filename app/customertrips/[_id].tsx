import React, { useState, useEffect } from "react";
import {
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TripsType } from "@/types/types";

const TripDetails = () => {
	const [tripsData, setTripsData] = useState<TripsType[]>([]);
	const [images, setImages] = useState<string[]>([]);

	const getTripDetails = async () => {
		try {
			const response = await fetch("http://localhost:5000/create_trip", {
				method: "GET",
			});
			const data: TripsType[] = await response.json();
			console.log("getTripDetails Ran:: ", data);
			setTripsData(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getTripDetails();
	}, []);

	// Use correct parameter name based on your route file name.
	// If your route file is named [id].tsx then use id.
	const { id } = useLocalSearchParams<{ id: string }>();

	// Find the matching trip using the id from params.
	const trip = tripsData.find((t) => t.id === id);

	// If tripsData is fetched but no matching trip is found, display a message.
	if (tripsData.length > 0 && !trip) {
		return (
			<SafeAreaView className="flex-1 bg-white p-6">
				<Text className="text-center text-gray-500">Trip not found.</Text>
			</SafeAreaView>
		);
	}

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});
		if (!result.canceled) {
			setImages((prevImages) => [...prevImages, result.assets[0].uri]);
		}
	};

	return tripsData.length > 0 && trip ? (
		<ScrollView className="flex-1 bg-white p-6">
			{/* Main Image */}
			<View className="mb-8 rounded-2xl shadow-lg shadow-black/20 overflow-hidden">
				<Image
					source={{ uri: "https://picsum.photos/200/300" }}
					className="w-full h-72"
					resizeMode="cover"
				/>
			</View>

			{/* Header Section */}
			<View className="mb-6">
				<Text className="text-3xl font-bold text-gray-900 mb-2">
					{trip.name}
				</Text>
				<View className="flex-row items-center space-x-2 mb-1">
					<MaterialIcons
						name="location-on"
						size={20}
						color="#4b5563"
					/>
					<Text className="text-gray-700 text-sm">{trip.destination}</Text>
				</View>
				<View className="flex-row items-center space-x-2">
					<MaterialIcons
						name="date-range"
						size={20}
						color="#4b5563"
					/>
					<Text className="text-base text-gray-500">
						{new Date(trip.start_day).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}{" "}
						-{" "}
						{new Date(trip.end_day).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</Text>
				</View>
			</View>

			{/* Divider */}
			<View className="h-px bg-gray-200 my-6" />

			{/* Description */}
			<Text className="text-lg leading-7 text-gray-700 mb-8">
				{trip.interests}
			</Text>

			{/* Gallery Section */}
			<Text className="text-2xl font-semibold text-gray-900 mb-4">
				Your Memories 📸
			</Text>
			{images.length > 0 ? (
				<View className="flex-row flex-wrap gap-4 mb-6">
					{images.map((uri, index) => (
						<View
							key={index}
							className="rounded-xl overflow-hidden shadow-md shadow-black/10">
							<Image
								source={{ uri }}
								className="w-40 h-40"
								resizeMode="cover"
							/>
						</View>
					))}
				</View>
			) : (
				<TouchableOpacity
					onPress={pickImage}
					className="border-2 border-dashed border-gray-300 rounded-2xl p-8 items-center justify-center mb-6">
					<MaterialIcons
						name="add-a-photo"
						size={32}
						color="#9ca3af"
					/>
					<Text className="text-gray-500 text-center mt-3 text-lg">
						Tap to add your first memory
					</Text>
				</TouchableOpacity>
			)}

			{/* Add Photos Button */}
			<TouchableOpacity
				onPress={pickImage}
				className="bg-blue-500 rounded-xl p-4 flex-row items-center justify-center space-x-2 shadow-lg shadow-blue-500/30">
				<MaterialIcons
					name="photo-library"
					size={24}
					color="white"
				/>
				<Text className="text-white text-lg font-semibold">Add Photos</Text>
			</TouchableOpacity>

			{/* Bottom Spacer */}
			<View className="h-20" />
		</ScrollView>
	) : (
		<SafeAreaView className="flex-1 bg-white p-6">
			<Text className="text-center text-gray-500">No trips found.</Text>
		</SafeAreaView>
	);
};

export default TripDetails;
