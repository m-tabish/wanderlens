import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const fallbackImages = [
  "data:image/jpeg;base64,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",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg",
  "https://i.natgeofe.com/k/1c4a572e-106f-450d-b593-fab441b0c03f/brazil-slums_4x3.jpg",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
  "https://i0.wp.com/travelforawhile.com/wp-content/uploads/2022/06/Beautiful-cities-in-Denmark-Aarhus.jpg?fit=1200%2C833&amp;ssl=1",
  "https://cdn.britannica.com/71/73371-050-9DFAEC1E/Reykjavik-Iceland.jpg",
  "https://i.ytimg.com/vi/K89yah5Stuw/maxresdefault.jpg",
];
const SuggestionCard = ({ item, fallbackImages }) => {
  const [imageUri, setImageUri] = useState(item.image_url);

  const handleImageError = () => {
    // Pick a random fallback image
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    setImageUri(fallbackImages[randomIndex]);
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
        <Text
          style={{ fontSize: 12, color: "#555", marginTop: 4 }}
          numberOfLines={2}
        >
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

  // Function to send request to your backend
  const fetchGeminiSuggestions = async () => {
    setLoadingAISuggestions(true);
    setErrorAISuggestions("");
    try {
      const response = await fetch(
        "https://wanderlens-server.onrender.com/ai",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      
      setAISuggestions(Array.isArray(data) ? data : data.suggestions || []);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setErrorAISuggestions("Unable to fetch suggestions at this time.");
    } finally {
      setLoadingAISuggestions(false);
    }
  };

  // Render header content as ListHeaderComponent
  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#333" }}>
          AI Trip Planner
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginTop: 4,
            textAlign: "center",
          }}
        >
          Let our AI suggest your next adventure!
        </Text>
      </View>

      {/* Plan My Trip Button */}
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

      {/* Loading Indicator */}
      {loadingAISuggestions && (
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <ActivityIndicator size="large" color="#0077FF" />
        </View>
      )}

      {/* Error Message */}
      {errorAISuggestions !== "" && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 15 }}>
          {errorAISuggestions}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}
    >
      <StatusBar style="dark" />
      <FlatList
        data={aiSuggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SuggestionCard item={item} fallbackImages={fallbackImages} />
        )}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}
