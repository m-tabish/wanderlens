import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { TripsType } from "../../types/types";

const TripCard: React.FC<TripsType> = ({
	name,
	destination,
	start_day,
	end_day,
	trip_type,
	budget,
	travellers,
	interests,
	id,
}) => (
	<Link
		href={`/customertrips/${id}` as const}
		asChild>
		<TouchableOpacity className="bg-white rounded-xl shadow-lg p-4 m-2 w-full items-center">
			<Text className="text-black font-bold text-lg mt-2">{name}</Text>
			<Text className="text-gray-700 text-sm">{destination}</Text>
			<Text className="text-gray-500 text-sm">{start_day}</Text>
			<Text className="text-gray-500 text-sm">{end_day}</Text>
		</TouchableOpacity>
	</Link>
);
const Trips = () => {
	const [tripsData, setTripsData] = useState<TripsType[]>([]);
	const getTripDetails = async () => {
		try {
			const response = await fetch("http://localhost:5000/create_trip", {
				method: "GET",
			});

			const data = await response.json();

			console.log("getTripDetails Ran:: ", data);
			setTripsData(data);
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getTripDetails();
	}, [tripsData]);

	if (tripsData.length === 0) {
		return <>No trips Created.</>;
	}
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
