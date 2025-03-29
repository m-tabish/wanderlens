import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import MaraudersMapScreen from "./Maraduer";
import NormalMap from "./NormalMap";

const Mainpage = () => {
  const { destination } = useLocalSearchParams();
  const parsedCoordinates = destination ? JSON.parse(destination) : null;

  const DEFAULT_COORDINATES = {
    latitude: 28.7041,
    longitude: 77.1025,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const coordinates = parsedCoordinates || DEFAULT_COORDINATES;

  const [showNormalMap, setShowNormalMap] = useState(false);

  const toggleMap = () => {
    setShowNormalMap((prev) => !prev);
  };

  return (
    <View className="flex-1 w-full bg-white">
      {showNormalMap ? (
        <NormalMap cord={coordinates} />
      ) : (
        <MaraudersMapScreen cord={coordinates} />
      )}

      {/* Toggle Button */}
      <View className="absolute top-10 left-1/2 -translate-x-1/2">
        <Pressable
          onPress={toggleMap}
          className="flex-row items-center bg-gray-900/80 px-4 py-2 rounded-full shadow-lg"
          style={{
            backgroundColor: showNormalMap ? "#222" : "#4CAF50",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 20,
          }}
        >
          {/* Magic Wand Icon */}
          <FontAwesome5
            name="magic"
            size={18}
            color={showNormalMap ? "#aaa" : "#fff"}
            style={{ marginRight: 10 }}
          />

          {/* Toggle Text */}
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {showNormalMap ? "Marauder Mode" : "Normal Mode"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Mainpage;
