import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

const FolderScreen = () => {
  const router = useRouter();
  const { destination, type } = useLocalSearchParams();
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const folderPath = `${FileSystem.documentDirectory}Wanderlens/${destination}/${type}/`;
        const files = await FileSystem.readDirectoryAsync(folderPath);
        const paths = files.map((file) => `${folderPath}${file}`);
        setImagePaths(paths);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [destination, type]);

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-4">
        {destination} - {type.charAt(0).toUpperCase() + type.slice(1)} Images
      </Text>
      {imagePaths.length > 0 ? (
        imagePaths.map((uri, index) => (
          <View key={index} className="mt-4">
            <Image source={{ uri }} className="w-full h-64 rounded-lg" resizeMode="cover" />
          </View>
        ))
      ) : (
        <Text className="text-gray-600">No images found.</Text>
      )}

      <TouchableOpacity
        onPress={() => router.push(`./ImageCategorySelector?destination=${encodeURIComponent(destination)}`)}
        className="bg-blue-500 rounded-xl p-4 flex-row items-center justify-center mt-8"
      >
        <Text className="text-white text-lg font-semibold">Back to Trips</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FolderScreen;
