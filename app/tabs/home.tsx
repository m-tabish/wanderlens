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
import { places } from "../services/data";
import { router } from "expo-router";

import AIPlaces from "../Components/AIPlace";

import { SafeAreaView } from "react-native-safe-area-context";
const categories = [
  { id: "1", name: "Beaches", icon: "ios-sunny" },
  { id: "2", name: "Mountains", icon: "ios-mountain" },
  { id: "3", name: "Cities", icon: "ios-urban" },
  { id: "4", name: "Nature", icon: "ios-leaf" },
];

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-safe-or-24">
      <ScrollView>
        <StatusBar style="dark" />
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-2xl font-bold text-gray-800">
            Where to next?
          </Text>
          <TouchableOpacity onPress={() => router.push("/tabs/search")}>
            <Ionicons name="search" size={28} color="#555" />
          </TouchableOpacity>
        </View>
        {/* Categories */}
        <View className="mb-6 w-full flex-row gap-4">
          <TouchableOpacity className="items-center  mr-5">
            <MountainSnow size={20} color={"#aeaeae"} />
            <Text className="mt-2 text-gray-500 text-sm">Mountain</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center  mr-5">
            <Building size={20} color={"#aeaeae"} />
            <Text className="mt-2 text-gray-500 text-sm">City</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center  mr-5">
            <Umbrella size={20} color={"#aeaeae"} />
            <Text className="mt-2 text-gray-500 text-sm">Beaches</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center  mr-5">
            <TentTree size={20} color={"#aeaeae"} />
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
                }
              >
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
                    <Ionicons name="star" size={16} color="#FFD700" />
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
                  }
                >
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
          <TouchableOpacity
            className="bg-blue-500 py-3 px-6 rounded-lg shadow-md"
            onPress={() => router.push("../Components/AIPlace")}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Plan My Trip with AI
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
