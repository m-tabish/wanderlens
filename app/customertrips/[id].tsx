import React, { useState } from "react";
import { View, Text, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const tripsData = [
  {
    id: "1",
    title: "Beach Getaway",
    location: "Malibu, CA",
    date: "2025-04-10",
    image:
      "https://static.toiimg.com/thumb/msid-93316368,width-748,height-499,resizemode=4,imgsize-236120/.jpg",
    description:
      "Enjoy a relaxing time at the beautiful Malibu beach with great food and activities.",
  },
  {
    id: "2",
    title: "Mountain Adventure",
    location: "Kyoto, JP",
    date: "2025-01-15",
    image:
      "https://cdn.britannica.com/96/196396-050-13758154/Chureito-Pagoda-Arakura-Sengen-Shrine-Mount-Fuji.jpg",
    description:
      "Experience the breathtaking mountain scenery and thrilling hiking trails in Kyoto.",
  },
  {
    id: "3",
    title: "City Exploration",
    location: "New York, NY",
    date: "2025-03-01",
    image:
      "https://career-advice.jobs.ac.uk/wp-content/uploads/Norway3-1170x630.jpg.optimal.jpg",
    description:
      "Discover the iconic landmarks, museums, and vibrant culture of New York City.",
  },
  {
    id: "4",
    title: "Desert Safari",
    location: "Dubai, UAE",
    date: "2025-07-05",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/06/8a/3c/arabian-nights-village.jpg?w=900&h=500&s=1",
    description:
      "Take an adventurous ride through the golden sands of Dubai with camel rides and dune bashing.",
  },
];

const TripDetails = () => {
  const { id } = useLocalSearchParams();
  const trip = tripsData.find((t) => t.id === id);
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need access to your gallery to select images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Works on iOS only
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImages([...images, ...result.assets.map((img) => img.uri)]);
    }
  };

  if (!trip) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-lg">Trip not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Main Image */}
      <View className="mb-8 rounded-2xl shadow-lg shadow-black/20 overflow-hidden">
        <Image source={{ uri: trip.image }} className="w-full h-72" resizeMode="cover" />
      </View>

      {/* Header Section */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</Text>
        <View className="flex-row items-center space-x-2 mb-1">
          <MaterialIcons name="location-on" size={20} color="#4b5563" />
          <Text className="text-lg text-gray-600">{trip.location}</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <MaterialIcons name="date-range" size={20} color="#4b5563" />
          <Text className="text-base text-gray-500">
            {new Date(trip.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-200 my-6" />

      {/* Description */}
      <Text className="text-lg leading-7 text-gray-700 mb-8">{trip.description}</Text>

      {/* Gallery Section */}
      <Text className="text-2xl font-semibold text-gray-900 mb-4">Your Memories 📸</Text>

      {images.length > 0 ? (
        <View className="flex-row flex-wrap gap-4 mb-6">
          {images.map((uri, index) => (
            <View key={index} className="rounded-xl overflow-hidden shadow-md shadow-black/10">
              <Image source={{ uri }} className="w-40 h-40" resizeMode="cover" />
            </View>
          ))}
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickImage}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-8 items-center justify-center mb-6"
        >
          <MaterialIcons name="add-a-photo" size={32} color="#9ca3af" />
          <Text className="text-gray-500 text-center mt-3 text-lg">
            Tap to add your first memory
          </Text>
        </TouchableOpacity>
      )}

      {/* Add Photos Button */}
      <TouchableOpacity
        onPress={pickImage}
        className="bg-blue-500 rounded-xl p-4 flex-row items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
      >
        <MaterialIcons name="photo-library" size={24} color="white" />
        <Text className="text-white text-lg font-semibold">Add Photos</Text>
      </TouchableOpacity>

      {/* Bottom Spacer */}
      <View className="h-20" />
    </ScrollView>
  );
};

export default TripDetails;
