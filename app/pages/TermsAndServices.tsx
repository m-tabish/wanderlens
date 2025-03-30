import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsService = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Terms of Service
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          Welcome to TravelFlow! This decentralized traveling app (the "App") is provided on an "as is" and "as available" basis. By accessing or using our App, you agree to be bound by these Terms of Service. Please read them carefully.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          1. Acceptance of Terms
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          By using TravelFlow, you agree that you have read, understood, and accept these Terms, along with our Privacy Policy. If you do not agree to these Terms, please do not use our App.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          2. Use of the App
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          TravelFlow is a decentralized app designed for travelers. You can explore destinations, find travel tips, and connect with local attractions without requiring an account or login. All users are expected to use the App responsibly and respect the information provided.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          3. Decentralization & Data
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          Our App operates on a decentralized model, which means that there is no central authority storing your personal information. We do not require you to create an account or log in to use the App. All data shared or accessed within the App is publicly available or provided voluntarily by you.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          4. Content & Intellectual Property
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          All content provided through TravelFlow, including text, images, and travel itineraries, is owned by or licensed to the App developers. You may use this content for personal, non-commercial purposes only. Redistribution or commercial use without prior written consent is prohibited.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          5. Disclaimer & Limitation of Liability
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          TravelFlow is provided without any warranties, expressed or implied. We are not responsible for any errors, omissions, or inaccuracies in the information provided. Your use of the App is at your sole risk. In no event shall we be liable for any damages or losses arising from your use of the App.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          6. Changes to These Terms
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          We reserve the right to update or modify these Terms of Service at any time without prior notice. Your continued use of the App after changes are made will constitute your acceptance of the new terms.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          7. Governing Law
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which the app is operated, without regard to its conflict of law provisions.
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 15 }}>
          If you have any questions about these Terms, please contact us at support@travelflowapp.com.
        </Text>
        
        <Text style={{ fontSize: 16, marginTop: 30, textAlign: "center" }}>
          Last updated: October 2023
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsService;
