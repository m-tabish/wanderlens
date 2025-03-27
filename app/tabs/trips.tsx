import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { tripsData } from "../services/data";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

type Trip = {
	id: string;
	title: string;
	location: string;
	date: string;
	image: string;
	description: string;
};

const TripCard: React.FC<Trip> = ({ id, title, location, date, image }) => (
	<Link
		href={`/customertrips/${id}` as const}
		asChild>
		<TouchableOpacity className="bg-white rounded-xl shadow-lg p-4 m-2 w-full items-center">
			<Image
				source={{ uri: image }}
				className="w-64 h-40 rounded-lg"
			/>
			<Text className="text-black font-bold text-lg mt-2">{title}</Text>
			<Text className="text-gray-700 text-sm">{location}</Text>
			<Text className="text-gray-500 text-sm">{date}</Text>
		</TouchableOpacity>
	</Link>
);
const Trips = () => {
	const getTripDetails = async () => {
		try {
			const response = await fetch("http://localhost:5000/create_trip", {
				method: "GET",
			});

			const data = await response.json();

			console.log("getTripDetails Ran:: ", data);
			return data;
		} catch (error) {
			console.error(error);
		}
	};


	
	useEffect(() => {
		getTripDetails();
	}, []);
	return (
		<SafeAreaView className="flex-1 bg-white p-4">
			<TouchableOpacity
				onPress={() => router.back()}
				className="p-2 ">
				<Ionicons
					name="arrow-back"
					size={24}
					color="#333"
				/>
			</TouchableOpacity>
			<Text className="text-black font-bold text-3xl text-center mb-4">
				Trips
			</Text>
			<FlatList
				data={tripsData}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <TripCard {...item} />}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Trips;
