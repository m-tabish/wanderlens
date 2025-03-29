// ImageViewr.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

const ImageViewr = () => {
  const router = useRouter();
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const wanderlensDir = `${FileSystem.documentDirectory}Wanderlens/`;
        // Ensure the "Wanderlens" folder exists
        const dirInfo = await FileSystem.getInfoAsync(wanderlensDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(wanderlensDir, { intermediates: true });
        }
        // Read all items in the "Wanderlens" directory
        const items = await FileSystem.readDirectoryAsync(wanderlensDir);
        const folderNames: string[] = [];
        // Check each item to determine if it's a directory (destination folder)
        for (const item of items) {
          const itemPath = wanderlensDir + item;
          const itemInfo = await FileSystem.getInfoAsync(itemPath);
          if (itemInfo.exists && itemInfo.isDirectory) {
            folderNames.push(item);
          }
        }
        setFolders(folderNames);
      } catch (error) {
        console.error("Error loading folders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFolders();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-4">Your Trips</Text>
      {folders.length > 0 ? (
        folders.map((folder, index) => (
          <TouchableOpacity
            key={index}
            // Navigate to ImageCategorySelector with destination query parameter.
            onPress={() => router.push(`../page/ImageCategorySelector?destination=${encodeURIComponent(folder)}`)}
            className="bg-blue-500 rounded-xl p-4 mb-4 items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">{folder}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-gray-600">No Trips Yet</Text>
      )}
    </ScrollView>
  );
};

export default ImageViewr;
