import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const UploadSuccess = () => {
  const router = useRouter();
  const [uploadResponse, setUploadResponse] = useState<any>(null);
  // We'll use an object mapping each filename to its local file URI
  const [localImagePaths, setLocalImagePaths] = useState<{ [filename: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("uploadResponse");
        if (jsonValue) {
          const response = JSON.parse(jsonValue);
          setUploadResponse(response);

          // Build folder structure using destination and type
          const destination = response.destination || "default_destination";
          const imageType = response.type || "default_type";
          const baseFolder = FileSystem.documentDirectory;
          // Base folder: e.g., Wanderlens/singapore/group/
          const basePath = `${baseFolder}Wanderlens/${destination}/${imageType}/`;
          let folderPath = basePath;
          
          // Check if the base folder exists
          const baseInfo = await FileSystem.getInfoAsync(basePath);
          if (baseInfo.exists) {
            // If it exists, create a new subfolder with an incremental trip count
            let tripCount = 2;
            while ((await FileSystem.getInfoAsync(`${basePath}Trip${tripCount}/`)).exists) {
              tripCount++;
            }
            folderPath = `${basePath}Trip${tripCount}/`;
          }
          // Create the folder (or new subfolder)
          await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
          
          const imageMapping: { [filename: string]: string } = {};
          for (const img of response.images) {
            const fileUri = `${folderPath}${img.filename}`;
            // Check if file already exists
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (!fileInfo.exists) {
              let base64Data = img.image;
              // Remove header if present (e.g., "data:image/jpeg;base64,")
              if (base64Data.startsWith("data:image")) {
                base64Data = base64Data.substring(base64Data.indexOf(",") + 1);
              }
              await FileSystem.writeAsStringAsync(fileUri, base64Data, {
                encoding: FileSystem.EncodingType.Base64,
              });
            }
            imageMapping[img.filename] = fileUri;
            console.log("Folder Path:", folderPath);
            console.log("Saved File Path:", fileUri);
          }
          setLocalImagePaths(imageMapping);
          // Optionally store mapping persistently
          await AsyncStorage.setItem("savedImages", JSON.stringify(imageMapping));
        }
      } catch (e) {
        console.error("Error fetching upload response:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
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
      <View className="items-center">
        <MaterialIcons name="check-circle" size={80} color="#10b981" />
        <Text className="text-3xl font-bold text-green-600 mt-4">
          Upload Successful!
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          Your images have been successfully uploaded.
        </Text>
      </View>

      {uploadResponse ? (
        <View className="mt-6">
          <Text className="text-lg text-gray-800">
            Destination:{" "}
            <Text className="font-bold">{uploadResponse.destination || "N/A"}</Text>
          </Text>
          <Text className="text-lg text-gray-800">
            Type:{" "}
            <Text className="font-bold">{uploadResponse.type || "N/A"}</Text>
          </Text>
          <Text className="text-lg text-gray-800">
            Token: <Text className="font-bold">{uploadResponse.token}</Text>
          </Text>
          <Text className="text-lg text-gray-800">
            Upload Time:{" "}
            <Text className="font-bold">{uploadResponse.uploadTime}</Text>
          </Text>

          {/* If grouping info is provided, display images by category */}
          {uploadResponse.result ? (
            <>
              {uploadResponse.result.solo && (
                <View className="mt-6">
                  <Text className="text-xl font-bold">Solo Images</Text>
                  {Object.values(uploadResponse.result.solo).flat().map((filename: string, index: number) => {
                    const fileUri = localImagePaths[filename];
                    return fileUri ? (
                      <View key={index} className="mt-4">
                        <Image
                          source={{ uri: fileUri }}
                          className="w-full h-64 rounded-lg"
                          resizeMode="cover"
                        />
                        <Text className="text-center mt-2 text-gray-700">{filename}</Text>
                      </View>
                    ) : null;
                  })}
                </View>
              )}
              {uploadResponse.result.group && (
                <View className="mt-6">
                  <Text className="text-xl font-bold">Group Images</Text>
                  {Object.values(uploadResponse.result.group).flat().map((filename: string, index: number) => {
                    const fileUri = localImagePaths[filename];
                    return fileUri ? (
                      <View key={index} className="mt-4">
                        <Image
                          source={{ uri: fileUri }}
                          className="w-full h-64 rounded-lg"
                          resizeMode="cover"
                        />
                        <Text className="text-center mt-2 text-gray-700">{filename}</Text>
                      </View>
                    ) : null;
                  })}
                </View>
              )}
              {uploadResponse.result.unknown && uploadResponse.result.unknown.length > 0 && (
                <View className="mt-6">
                  <Text className="text-xl font-bold">Unknown Images</Text>
                  {uploadResponse.result.unknown.map((filename: string, index: number) => {
                    const fileUri = localImagePaths[filename];
                    return fileUri ? (
                      <View key={index} className="mt-4">
                        <Image
                          source={{ uri: fileUri }}
                          className="w-full h-64 rounded-lg"
                          resizeMode="cover"
                        />
                        <Text className="text-center mt-2 text-gray-700">{filename}</Text>
                      </View>
                    ) : null;
                  })}
                </View>
              )}
            </>
          ) : (
            // Fallback: display all images if no grouping info is provided.
            Object.keys(localImagePaths).length > 0 ? (
              Object.keys(localImagePaths).map((filename, index) => (
                <View key={index} className="mt-4">
                  <Image
                    source={{ uri: localImagePaths[filename] }}
                    className="w-full h-64 rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="text-center mt-2 text-gray-700">{filename}</Text>
                </View>
              ))
            ) : (
              <Text className="text-gray-600 mt-2 text-center">No images to display.</Text>
            )
          )}
        </View>
      ) : (
        <Text className="text-gray-600 mt-2 text-center">No upload data found.</Text>
      )}

      <TouchableOpacity
        onPress={() => router.push("../page/ImageViewr")}
        className="bg-blue-500 rounded-xl p-4 flex-row items-center justify-center mt-8"
      >
        <MaterialIcons name="home" size={24} color="white" />
        <Text className="text-white text-lg font-semibold ml-2">See Your Trips</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UploadSuccess;
