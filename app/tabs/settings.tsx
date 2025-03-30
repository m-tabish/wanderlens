import React, { useState } from "react";
import { Text, View, Switch, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Setting = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const router = useRouter();

  const toggleNotifications = () =>
    setNotificationsEnabled((previousState) => !previousState);
  const toggleDarkMode = () =>
    setDarkModeEnabled((previousState) => !previousState);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View className="mb-6 items-center">
          <Text className="font-bold text-4xl text-gray-800">Settings</Text>
          <Text className="text-gray-500 mt-1">Manage your app preferences</Text>
        </View>


        {/* Appearance Section */}
        <View className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
          <View className="flex-row items-center mb-3">
            <Ionicons name="color-palette-outline" size={24} color="#4CAF50" />
            <Text className="font-semibold text-xl ml-2">Appearance</Text>
          </View>
          <View className="flex-row justify-between items-center border-t border-gray-200 pt-3">
            <Text className="text-lg text-gray-700">Dark Mode</Text>
            <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
          </View>
        </View>

        {/* About Section */}
        <View className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="info-outline" size={24} color="#4CAF50" />
            <Text className="font-semibold text-xl ml-2">About</Text>
          </View>
          <TouchableOpacity className="py-3 border-t border-gray-200">
            <Text className="text-lg text-gray-700">Version 1.0.0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="py-3 border-t border-gray-200"
            onPress={() => router.push("../pages/TermsAndServices")}
          >
            <Text className="text-lg text-gray-700">Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="py-3"
            onPress={() => router.push("../pages/ContactUs")}
          >
            <Text className="text-lg text-gray-700">Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;
