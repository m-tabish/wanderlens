import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const ContactUs = () => {
  // Function to handle email link
  const handleEmailPress = () => {
    Linking.openURL("mailto:support@travelflowapp.com");
  };

  // Function to handle call link
  const handleCallPress = () => {
    Linking.openURL("tel:+91-9889859449");
  };

  // Function to handle social media link
  const handleSocialPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Contact Us
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
          We'd love to hear from you! Reach out to us on social media, via email, or give us a call.
        </Text>

        {/* Email Option */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            padding: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            width: "100%",
            justifyContent: "center",
          }}
          onPress={handleEmailPress}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#333"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16 }}>support@travelflowapp.com</Text>
        </TouchableOpacity>

        {/* Call Option */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
            padding: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            width: "100%",
            justifyContent: "center",
          }}
          onPress={handleCallPress}
        >
          <Ionicons
            name="call-outline"
            size={24}
            color="#333"
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16 }}>+91-9889859449</Text>
        </TouchableOpacity>

        {/* Social Media Links */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity onPress={() => handleSocialPress("https://www.facebook.com/YourPage")}>
            <FontAwesome name="facebook-square" size={40} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialPress("https://www.twitter.com/YourProfile")}>
            <FontAwesome name="twitter-square" size={40} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialPress("https://www.instagram.com/YourProfile")}>
            <FontAwesome name="instagram" size={40} color="#C13584" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSocialPress("https://www.linkedin.com/company/YourCompany")}>
            <FontAwesome name="linkedin-square" size={40} color="#0077B5" />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 14, color: "#999", textAlign: "center", marginTop: 20 }}>
          We aim to respond to all inquiries within 48 hours.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;
