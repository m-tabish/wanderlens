import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
	Building,
	MountainSnow,
	TentTree,
	Umbrella,
} from "lucide-react-native";
import React from "react";
import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { router } from "expo-router";
const categories = [
	{ id: "1", name: "Beaches", icon: "ios-sunny" },
	{ id: "2", name: "Mountains", icon: "ios-mountain" },
	{ id: "3", name: "Cities", icon: "ios-urban" },
	{ id: "4", name: "Nature", icon: "ios-leaf" },
];

export default function Home() {
	const places = [
		{
			id: "1",
			name: "Manali",
			description:
				"A popular Mountain known for adventure sports and scenic views.",
			location: "Himachal Pradesh",
			category: "Mountain",
			image_url:
				"https://images.unsplash.com/photo-1670615034435-ff7e9214e15e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.7,
			website: "https://himachaltourism.gov.in/",
			price_inr: "₹3,500 - ₹7,000",
			distance_from_delhi_km: 540,
			coordinates: {
				latitude: 32.2396,
				longitude: 77.1887,
			},
		},
		{
			id: "2",
			name: "Shimla",
			description:
				"The capital of Himachal Pradesh, famous for its colonial architecture.",
			location: "Himachal Pradesh",
			category: "Mountain",
			image_url:
				"https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.6,
			website: "https://himachaltourism.gov.in/",
			price_inr: "₹2,500 - ₹5,500",
			distance_from_delhi_km: 350,
			coordinates: {
				latitude: 31.1048,
				longitude: 77.1734,
			},
		},
		{
			id: "3",
			name: "Rishikesh",
			description:
				"The 'Yoga Capital of the World' known for rafting and spiritual retreats.",
			location: "Uttarakhand",
			category: "Mountain",
			image_url:
				"https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.8,
			website: "https://uttarakhandtourism.gov.in/",
			price_inr: "₹1,500 - ₹4,000",
			distance_from_delhi_km: 200,
			coordinates: {
				latitude: 30.0869,
				longitude: 78.2676,
			},
		},
		{
			id: "4",
			name: "Agra",
			description:
				"Home to the iconic Taj Mahal, a symbol of love and one of the Seven Wonders.",
			location: "Uttar Pradesh",
			category: "City",
			image_url:
				"https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.9,
			website: "https://www.tajmahal.gov.in/",
			price_inr: "₹500 - ₹2,000",
			distance_from_delhi_km: 230,
			coordinates: {
				latitude: 27.1751,
				longitude: 78.0421,
			},
		},
		{
			id: "5",
			name: "Jaipur",
			description:
				"The 'Pink City' known for its forts, palaces, and vibrant markets.",
			location: "Rajasthan",
			category: "City",
			image_url:
				"https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.7,
			website: "https://www.jaipur.org/",
			price_inr: "₹3,000 - ₹6,500",
			distance_from_delhi_km: 280,
			coordinates: {
				latitude: 26.9124,
				longitude: 75.7873,
			},
		},
		{
			id: "6",
			name: "Nainital",
			description:
				"A charming Mountain known for its beautiful lakes and pleasant climate.",
			location: "Uttarakhand",
			category: "Mountain",
			image_url:
				"https://images.unsplash.com/photo-1601622256416-d7f757f99eb2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.5,
			website: "https://uttarakhandtourism.gov.in/",
			price_inr: "₹2,000 - ₹5,000",
			distance_from_delhi_km: 310,
			coordinates: {
				latitude: 29.3803,
				longitude: 79.4636,
			},
		},
		{
			id: "7",
			name: "Mussoorie",
			description:
				"The 'Queen of Hills' known for its lush greenery and waterfalls.",
			location: "Uttarakhand",
			category: "Mountain",
			image_url:
				"https://images.unsplash.com/photo-1583143874828-de3d288be51a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.6,
			website: "https://uttarakhandtourism.gov.in/",
			price_inr: "₹2,000 - ₹4,500",
			distance_from_delhi_km: 290,
			coordinates: {
				latitude: 30.4591,
				longitude: 78.0661,
			},
		},
		{
			id: "8",
			name: "Ranthambore",
			description:
				"A renowned wildlife sanctuary known for its tiger population.",
			location: "Rajasthan",
			category: "Nature",
			image_url:
				"https://plus.unsplash.com/premium_photo-1694270553677-22680efa4d56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmFudGhhbWJvcmV8ZW58MHx8MHx8fDA%3D",
			rating: 4.4,
			website: "https://www.ranthamborenationalpark.com/",
			price_inr: "₹2,000 - ₹4,000",
			distance_from_delhi_km: 394,
			coordinates: {
				latitude: 26.0173,
				longitude: 76.5026,
			},
		},
		{
			id: "9",
			name: "Bengaluru",
			description:
				"The Silicon Valley of India, known for its IT hubs, vibrant culture, and pleasant weather.",
			location: "Karnataka",
			category: "City",
			image_url: "https://static.toiimg.com/photo/62507296.cms",
			rating: 4.6,
			website: "https://www.karnatakatourism.org/",
			price_inr: "₹1,500 - ₹5,000",
			distance_from_delhi_km: 2150,
			coordinates: {
				latitude: 12.9716,
				longitude: 77.5946,
			},
		},
		{
			id: "10",
			name: "Lucknow",
			description:
				"The city of Nawabs, known for its rich history, culture, and cuisine.",
			location: "Uttar Pradesh",
			category: "City",
			image_url:
				"https://plus.unsplash.com/premium_photo-1697730430283-7e4456c78375?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			rating: 4.5,
			website: "https://www.uptourism.gov.in/",
			price_inr: "₹800 - ₹2,500",
			distance_from_delhi_km: 550,
			coordinates: {
				latitude: 26.8467,
				longitude: 80.9462,
			},
		},
		{
			id: "11",
			name: "Delhi",
			description:
				"The vibrant capital of India, blending ancient landmarks with modern cityscapes.",
			location: "Delhi",
			category: "City",
			image_url:
				"https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVsaGl8ZW58MHx8MHx8fDA%3D",
			rating: 4.7,
			website: "https://www.delhitourism.gov.in/",
			price_inr: "₹1,000 - ₹4,000",
			distance_from_delhi_km: 0,
			coordinates: {
				latitude: 28.7041,
				longitude: 77.1025,
			},
		},
	];

	return (
		<View className="flex-1 bg-white px-5 pt-safe-or-24">
			<ScrollView>
				<StatusBar style="dark" />
				{/* Header */}
				<View className="flex-row justify-between items-center mb-5">
					<Text className="text-2xl font-bold text-gray-800">
						Where to next?
					</Text>
					<TouchableOpacity>
						<Ionicons
							name="search"
							size={28}
							color="#555"
						/>
					</TouchableOpacity>
				</View>
				{/* Categories */}
				<View className="mb-6 w-full flex-row gap-4">
					<TouchableOpacity className="items-center  mr-5">
						<MountainSnow
							size={20}
							color={"#aeaeae"}
						/>
						<Text className="mt-2 text-gray-500 text-sm">Mountain</Text>
					</TouchableOpacity>
					<TouchableOpacity className="items-center  mr-5">
						<Building
							size={20}
							color={"#aeaeae"}
						/>
						<Text className="mt-2 text-gray-500 text-sm">City</Text>
					</TouchableOpacity>
					<TouchableOpacity className="items-center  mr-5">
						<Umbrella
							size={20}
							color={"#aeaeae"}
						/>
						<Text className="mt-2 text-gray-500 text-sm">Beaches</Text>
					</TouchableOpacity>
					<TouchableOpacity className="items-center  mr-5">
						<TentTree
							size={20}
							color={"#aeaeae"}
						/>
						<Text className="mt-2 text-gray-500 text-sm">Nature</Text>
					</TouchableOpacity>
				</View>
				{/* Popular Destinations */}
				<View className="mb-8">
					<Text className="text-xl font-semibold text-gray-800 mb-4">
						Popular Destinations
					</Text>
					<FlatList
						horizontal
						showsVerticalScrollIndicator={false}
						data={places}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<TouchableOpacity
								className="mr-4 rounded-xl overflow-hidden w-48"
								onPress={() =>
									router.push({
										pathname: "/destination/[id]",
										params: { id: item.id, item: JSON.stringify(item) }, // Stringify for safer passing
									})
								}>
								<Image
									source={{
										uri: item.image_url,
									}}
									style={{
										width: "100%",
										height: 100,
									}}
									resizeMode="cover"
								/>
								<View className="p-2 bg-white shadow-md">
									<Text className="text-lg font-semibold">{item.name}</Text>
									<View className="flex-row items-center">
										<Ionicons
											name="star"
											size={16}
											color="#FFD700"
										/>
										<Text className="ml-1 text-gray-500">{item.rating}</Text>
									</View>
								</View>
							</TouchableOpacity>
						)}
					/>
				</View>
				{/* Featured Destinations */}
				<View className="mb-8 ">
					<Text className="text-xl font-semibold text-gray-800 mb-4">
						Featured Destinations
					</Text>

					<View className="mb-8">
						<View className="flex-row flex-wrap -mx-1 ">
							{places.map((item) => (
								<TouchableOpacity
									key={item.name}
									className="w-[48%] mx-1 mb-4 rounded-xl overflow-hidden shadow-lg shadow-black-20  "
									onPress={() =>
										router.push({
											pathname: "/destination/[id]",
											params: { id: item.id, item: JSON.stringify(item) }, // Stringify for safer passing
										})
									}>
									<View className="p-3 bg-white  items-center ">
										<Image
											source={{
												uri: item.image_url,
											}}
											style={{ width: "100%", height: 120 }}
											resizeMode="cover"
										/>
										<Text className="text-start w-full text-lg font-semibold">
											{item.name}
										</Text>
										<Text className="text-gray-500 mb-2">
											{item.description}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
