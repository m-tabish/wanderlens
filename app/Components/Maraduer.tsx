import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl, Image, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg"; 
import fetchPopularPlaces from "./FamousPlaces";

const { width, height } = Dimensions.get("window");

const generatePositions = (places) => {
  const margin = 10;
  const padding = 40;
  const gridSize = Math.ceil(Math.sqrt(places.length));

  const cellWidth = (width - 2 * margin) / gridSize;
  const cellHeight = (height - 2 * margin) / gridSize;

  return places.map((_, i) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const jitterX = (Math.random() - 0.5) * cellWidth * 0.5;
    const jitterY = (Math.random() - 0.5) * cellHeight * 0.5;

    let x = col * cellWidth + cellWidth * 0.5 + jitterX;
    let y = row * cellHeight + cellHeight * 0.5 + jitterY;

    x = Math.max(margin, Math.min(x, width - margin - padding));
    y = Math.max(margin, Math.min(y, height - margin - padding));

    return { x, y };
  });
};

const MaraudersMapScreen = ({ cord }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState([]);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [showThread, setShowThread] = useState(false);

  const fetchPlaces = useCallback(async () => {
    try {
      setIsMapVisible(false);
      setPlaces([]);
      setShowThread(false);

      const fetchedPlaces = await fetchPopularPlaces({
        lat: cord.latitude,
        lon: cord.longitude,
      });

      setPlaces(fetchedPlaces);

      setTimeout(() => {
        setIsMapVisible(true);
        setTimeout(() => setShowThread(true), 500);
      }, 1500);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPlaces();
    setRefreshing(false);
  };

  if (places.length === 0) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="font-madauer text-[35px] text-[#000] tracking-wider text-center">
          "The map is brewing its magic..."
        </Text>
        <Text className="text-[#aaa] text-[18px] mt-4 italic">
          (Mischief Managed... almost!)
        </Text>
      </View>
    );
  }

  const positions = generatePositions(places);

  const createBezierPath = () => {
    if (positions.length < 1) return "";

    let path = `M${positions[0].x},${positions[0].y}`;

    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1];
      const curr = positions[i];

      const controlX = (prev.x + curr.x) / 2;
      const controlY = (prev.y + curr.y) / 2;

      path += ` Q${prev.x},${prev.y} ${controlX},${controlY}`;
      path += ` T${curr.x},${curr.y}`;
    }

    return path;
  };

  return (
    <ScrollView
      className="flex-1 bg-black"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex-1 items-center justify-center min-h-screen relative">
        {/* First Map Image */}
        {!isMapVisible && (
          <Image
            source={require("@/app/assets/Map1.jpg")}
            style={{
              width: height,
              height: width,
              position: "absolute",
              transform: [{ rotate: "90deg" }],
              zIndex: 5,
            }}
            resizeMode="cover"
          />
        )}

        {/* Second Map Image */}
        {isMapVisible && (
          <Image
            source={require("@/app/assets/Map2.jpg")}
            style={{
              width: height,
              height: width,
              transform: [{ rotate: "90deg" }],
              position: "absolute",
              zIndex: 5,
            }}
            resizeMode="cover"
          />
        )}

        {/* Marauder's Path */}
        {showThread && (
          <View style={{ position: "absolute", zIndex: 9 }}>
            <Svg width={width} height={height}>
              <Path
                d={createBezierPath()}
                stroke="white"
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="15,15"
              />
            </Svg>
          </View>
        )}

        {/* Location Markers */}
        {isMapVisible &&
          places.map((place, index) => {
            const { x, y } = positions[index];

            return (
              <View
                key={index}
                style={{
                  position: "absolute",
                  top: y,
                  left: x,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  padding: 8,
                  borderRadius: 10,
                  zIndex: 10,
                  transform: [{ rotate: "90deg" }],
                }}
              >
                <Text className="font-madauer text-[25px] text-white tracking-wider shadow-none">
                  {place.name}
                </Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default MaraudersMapScreen;
