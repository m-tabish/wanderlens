import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { Image } from "@/components/ui/image";
import { Ionicons } from "@expo/vector-icons";

export default function DestinationScreen() {
	const { id, item } = useLocalSearchParams();

	// Parse the passed item from params
	const parsedItem = JSON.parse(Array.isArray(item) ? item[0] : item);

	return (
		<ScrollView className="flex-1 bg-white mt-14">
			{/* Header Image */}
			<Image
				source={{ uri: parsedItem.image_url }}
				className="w-full h-96 rounded-b-md "
				resizeMode="cover"
			/>

			{/* Back Button */}
			<TouchableOpacity
				onPress={() => router.push("/tabs/home")}
				className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-10">
				<Ionicons
					name="arrow-back"
					size={24}
					color="#333"
				/>
			</TouchableOpacity>

			{/* Destination Name & Rating */}
			<View className="px-4 mt-4">
				<Text className="text-2xl font-bold text-gray-800">
					{parsedItem.name}
				</Text>
				<View className="flex-row items-center mt-2">
					<Ionicons
						name="star"
						size={20}
						color="#FFD700"
					/>
					<Text className="ml-1 text-lg text-gray-600">
						{parsedItem.rating}/5
					</Text>
				</View>
			</View>

			{/* Overview Section */}
			<View className="px-4 mt-6">
				<Text className="text-lg font-semibold text-gray-700">Overview</Text>
				<Text className="mt-2 text-gray-600">{parsedItem.description}</Text>
			</View>

			{/* AR/VR Features */}
			<View className="px-4 mt-6">
				<Text className="text-lg font-semibold text-gray-700">
					Explore with AR/VR
				</Text>
				<View className="flex-row justify-between mt-4">
					<TouchableOpacity className="items-center">
						<Ionicons
							name="navigate"
							size={32}
							color="#3BB77E"
						/>
						<Text className="mt-2 text-sm text-gray-600">AR Navigation</Text>
					</TouchableOpacity>
					<TouchableOpacity className="items-center">
						<Ionicons
							name="glasses"
							size={32}
							color="#3BB77E"
						/>
						<Text className="mt-2 text-sm text-gray-600">VR Preview</Text>
					</TouchableOpacity>
					<TouchableOpacity className="items-center">
						<Ionicons
							name="compass"
							size={32}
							color="#3BB77E"
						/>
						<Text className="mt-2 text-sm text-gray-600">Treasure Hunt</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Safety Tools */}
			<View className="px-4 mt-6">
				<Text className="text-lg font-semibold text-gray-700">
					Safety Tools
				</Text>
				<View className="flex-row justify-between mt-4">
					<TouchableOpacity className="items-center">
						<Ionicons
							name="location"
							size={32}
							color="#FF5733"
						/>
						<Text className="mt-2 text-sm text-gray-600">Live Location</Text>
					</TouchableOpacity>
					<TouchableOpacity className="items-center">
						<Ionicons
							name="alert-circle"
							size={32}
							color="#FF5733"
						/>
						<Text className="mt-2 text-sm text-gray-600">Risk Alerts</Text>
					</TouchableOpacity>
					<TouchableOpacity className="items-center">
						<Ionicons
							name="call"
							size={32}
							color="#FF5733"
						/>
						<Text className="mt-2 text-sm text-gray-600">Emergency SOS</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Reviews Section */}
			<View className="px-4 mt-6">
				<Text className="text-lg font-semibold text-gray-700">Reviews</Text>
			</View>
		</ScrollView>
	);
}
