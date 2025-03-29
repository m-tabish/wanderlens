import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface ImageClassifierProps {
  onImagesSelected: (images: string[]) => void;
  reset: boolean;
}

const ImageClassifier: React.FC<ImageClassifierProps> = ({ onImagesSelected, reset }) => {
  const [images, setImages] = useState<string[]>([]);

  // Clear local images state when reset prop changes to true
  useEffect(() => {
    if (reset) {
      setImages([]);
    }
  }, [reset]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const imageUris = result.assets.map((img) => img.uri);
      const newImages = [...images, ...imageUris];
      setImages(newImages);
      onImagesSelected(newImages); // Notify parent with updated images
    }
  };

  return (
    <View className="mt-4">
      {/* Dotted Upload Box */}
      <TouchableOpacity
        onPress={pickImage}
        className="border-2 border-dashed border-gray-400 rounded-xl p-8 items-center justify-center bg-gray-100"
      >
        <MaterialIcons name="add-a-photo" size={40} color="#6b7280" />
        <Text className="mt-2 text-lg text-gray-500">Tap to add images</Text>
      </TouchableOpacity>

      {/* Display Selected Images */}
      {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
          {images.map((uri, index) => (
            <View key={index} className="mr-2">
              <Image
                source={{ uri }}
                className="w-24 h-24 rounded-lg"
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ImageClassifier;
