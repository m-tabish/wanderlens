// app/search/index.js
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { places } from "../services/data";
export default function SearchPage() {
	const [query, setQuery] = useState(""); // User input for search
	const [results, setResults] = useState<any>([]); // Search results

	// Mock search function (replace with API call in production)
	const handleSearch = () => {
		// Simulate AI-powered search results

		setResults(
			places.filter((item) =>
				item.name.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

	return (
		<SafeAreaView className="flex-1 bg-white p-4 ">
			{/* Header */}
			<View className="flex-row items-center mb-4">
				<TouchableOpacity
					onPress={() => router.back()}
					className="p-2">
					<Ionicons
						name="arrow-back"
						size={24}
						color="#333"
					/>
				</TouchableOpacity>
				<Text className="text-xl font-bold text-gray-800 flex-1 text-center">
					Search
				</Text>
			</View>

			{/* Search Bar */}
			<View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
				<Ionicons
					name="search"
					size={20}
					color="#aaa"
					className="mr-2"
				/>
				<TextInput
					placeholder="Search destinations, hotels, activities..."
					value={query}
					onChangeText={setQuery}
					onSubmitEditing={handleSearch}
					className="flex-1 text-base text-gray-700"
				/>
			</View>

			{/* Search Results */}
			<FlatList
				data={results}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={
					<Text className="text-center text-gray-500 mt-4">
						No results found. Try another query!
					</Text>
				}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							router.push({
								pathname: "/destination/[id]",
								params: { id: item.id, item: JSON.stringify(item) },
							})
						}
						className="flex-row items-center mb-4 bg-gray-50 p-4 rounded-lg">
						<View>
							<Text className="text-lg font-semibold text-gray-800">
								{item.name}
							</Text>
							<Text className="text-sm text-gray-600">{item.type}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
}
