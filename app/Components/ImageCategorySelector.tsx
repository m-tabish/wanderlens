import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const ImageCategorySelector = () => {
  const router = useRouter();
  const { destination } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-6">
        {destination} - Select Profile Type
      </Text>
      <TouchableOpacity
        onPress={() =>
          router.push(`../page/FolderScreen?destination=${encodeURIComponent(destination)}&type=solo`)
        }
        className="bg-blue-500 rounded-xl p-4 mb-4 flex-row items-center justify-center"
      >
        <Image source={require("../assets/Solo_profile.jpg")} style={{ width: 50, height: 50 }} />
        <Text className="text-white text-lg font-semibold ml-2">Solo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.push(`../page/FolderScreen?destination=${encodeURIComponent(destination)}&type=group`)
        }
        className="bg-green-500 rounded-xl p-4 flex-row items-center justify-center"
      >
        <Image source={require("../assets/Group_profile.png")} style={{ width: 50, height: 50 }} />
        <Text className="text-white text-lg font-semibold ml-2">Group</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ImageCategorySelector;
