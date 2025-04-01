import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// Global fallback images in case category not found
const globalFallbackImages = [
  "https://static2.tripoto.com/media/filter/tst/img/15546/TripDocument/1460632659_p_1.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1d/24/a5/visit-famous-khajuraho.jpg?w=500&h=500&s=1",
  "https://ihplb.b-cdn.net/wp-content/uploads/2017/06/Living-Roots-Bridge-Mawlynnong.jpg",
];

// Fallback images by category (adjust URLs as needed)
const fallbackImagesByCategory = {
  Mountain: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnY5lAPSIUlphgooAl6-dsF9kSnf2gZgNKqQ&s",
    "https://www.revv.co.in/blogs/wp-content/uploads/2021/05/Chopta-1280x720.jpg",
    "https://webtravelindia.com/wp-content/uploads/2025/02/Add-a-heading-62.png",
  ],
  Beach: [
    "https://bombaytrooper.com/wp-content/uploads/2024/02/Lakshwadeep-India-Blog.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgXNRhY6M10OntszsrJITBRfP5y2De0jD19w&s",
  ],
  City: [
    "https://www.agoda.com/wp-content/uploads/2023/10/Feature-photo-places-to-visit-in-India-1.jpg",
    "https://travcoholidays.com/wp-content/uploads/2022/06/Hidden-wonders-to-visit-in-India-in-2022-scaled-1.jpg",
  ],
  Nature: [
    "https://i0.wp.com/traveltoyournature.com/wp-content/uploads/2023/07/beautiful-nature-india-1-1024x768.jpeg?resize=1024%2C768",
    "https://images.moneycontrol.com/static-mcnews/2024/11/20241112130347_2-south-india.jpg?impolicy=website&width=1600&height=900",
  ],
  Historic: [
    "https://www.oyorooms.com/blog/wp-content/uploads/2017/10/Feature-Image-min-14.jpg",
    "https://www.revv.co.in/blogs/wp-content/uploads/2021/06/Unakoti-Hill.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7UZG_lY1l-I1bPL2iDtbUdrrOSBbPJGzuw&s",
    "https://static2.tripoto.com/media/filter/tst/img/308363/SpotDocument/1512464314_1512464309_historicalmonuments17.jpg.webp",
  ],
  Wildlife: [
    "https://www.revv.co.in/blogs/wp-content/uploads/2021/07/kumbhalgarh-wildlife-sanctuary-udaipurian.jpg",
    "https://static2.tripoto.com/media/filter/tst/img/270422/TripDocument/1464083880_2ynmek0.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi_98GV88UzlrezPfaPEDsjGj2LAitm-7h-Q&s",
  ],
  Coastal: [
    "https://bombaytrooper.com/wp-content/uploads/2024/02/Lakshwadeep-India-Blog.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgXNRhY6M10OntszsrJITBRfP5y2De0jD19w&s",
  ],
};

// Helper: Assign fallback images by category with flexible matching
const assignFallbackImages = (suggestions) => {
  const fallbackDict = {};

  // Function to find matching category key based on substring
  const findMatchingCategoryKey = (category) => {
    const normalizedCategory = (category || "").trim().toLowerCase();
    const categoryKeys = Object.keys(fallbackImagesByCategory);
    for (const key of categoryKeys) {
      const normalizedKey = key.trim().toLowerCase();
      if (normalizedCategory.includes(normalizedKey)) {
        return key;
      }
    }
    return null;
  };

  return suggestions.map((item) => {
    const category = item.category || "";
    const matchingKey = findMatchingCategoryKey(category);
    let fallbackArray;

    if (matchingKey) {
      fallbackArray = fallbackImagesByCategory[matchingKey];
    } else {
      fallbackArray = globalFallbackImages;
    }

    // Use 'global' as key if no matching category
    const dictKey = matchingKey || "global";

    // Initialize shuffled array for this category/global if not exists
    if (!fallbackDict[dictKey]) {
      fallbackDict[dictKey] = [...fallbackArray].sort(() => 0.5 - Math.random());
    }

    // Reshuffle if all images have been used
    if (fallbackDict[dictKey].length === 0) {
      fallbackDict[dictKey] = [...fallbackArray].sort(() => 0.5 - Math.random());
    }

    // Assign the next image
    const newImage = fallbackDict[dictKey].pop();

    return {
      ...item,
      image_url: newImage,
    };
  });
};

const SuggestionCard = ({ item }) => {
  const [imageUri, setImageUri] = useState(item.image_url);

  const handleImageError = () => {
    const randomIndex = Math.floor(Math.random() * globalFallbackImages.length);
    setImageUri(globalFallbackImages[randomIndex]);
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 8,
        borderRadius: 12,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      onPress={() =>
        router.push({
          pathname: "/destination/[id]",
          params: { id: item.id, item: JSON.stringify(item) },
        })
      }
    >
      <Image
        source={{ uri: imageUri }}
        style={{ width: "100%", height: 120 }}
        resizeMode="cover"
        onError={handleImageError}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 14, color: "#777", marginTop: 4 }}>
          {item.rating} ★
        </Text>
        <Text style={{ fontSize: 12, color: "#555", marginTop: 4 }} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function AIPlaces() {
  const [aiSuggestions, setAISuggestions] = useState([]);
  const [loadingAISuggestions, setLoadingAISuggestions] = useState(false);
  const [errorAISuggestions, setErrorAISuggestions] = useState("");

  const fetchGeminiSuggestions = async () => {
    setLoadingAISuggestions(true);
    setErrorAISuggestions("");
    try {
      const response = await fetch("https://wanderlens-server.onrender.com/ai", {
        method: "POST",
      });
      const data = await response.json();
      const suggestions = Array.isArray(data) ? data : data.suggestions || [];
      const updatedSuggestions = assignFallbackImages(suggestions);
      setAISuggestions(updatedSuggestions);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setErrorAISuggestions("Unable to fetch suggestions at this time.");
    } finally {
      setLoadingAISuggestions(false);
    }
  };

  const renderHeader = () => (
    <View>
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#333" }}>
          AI Trip Planner
        </Text>
        <Text style={{ fontSize: 16, color: "#666", marginTop: 4, textAlign: "center" }}>
          Let our AI suggest your next adventure!
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#0077FF",
          paddingVertical: 15,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 20,
        }}
        onPress={fetchGeminiSuggestions}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Plan My Trip with AI
        </Text>
      </TouchableOpacity>

      {loadingAISuggestions && (
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <ActivityIndicator size="large" color="#0077FF" />
        </View>
      )}

      {errorAISuggestions !== "" && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 15 }}>
          {errorAISuggestions}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
      <StatusBar style="dark" />
      <FlatList
        data={aiSuggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <SuggestionCard item={item} />}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}