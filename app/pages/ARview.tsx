import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import AR from "../Components/AR";

export default function ARview() {
  const params = useLocalSearchParams(); // Get params from navigation
  const destination = typeof params.destination === "string" ? JSON.parse(params.destination) : null;

  return (
    <View className="flex-1 w-full bg-white">
      {destination ? (
        <AR lat={destination.latitude} lon={destination.longitude} />
      ) : (
        <Text className="text-lg font-semibold text-gray-600">
          No coordinates provided. Please select a location.
        </Text>
      )}
    </View>
  );
}
