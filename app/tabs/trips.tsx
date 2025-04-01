import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TripsType } from "../../types/types";

const TripCard: React.FC<TripsType> = ({
  name,
  destination,
  start_day,
  end_day,
  trip_type,
  budget,
  travellers,
  interests,
  id,
}) => (
  <Link href={`/customertrips/${id}`} asChild>
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
      }}
    >
      <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>
        {name}
      </Text>
      <Text style={{ color: "#555", fontSize: 14, marginBottom: 2 }}>
        Destination: {destination}
      </Text>
      <Text style={{ color: "#777", fontSize: 12 }}>
        {start_day} - {end_day}
      </Text>
    </TouchableOpacity>
  </Link>
);

const Trips = () => {
  const [tripsData, setTripsData] = useState<TripsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getTripDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://wanderlens-server.onrender.com/create_trip", {
        method: "GET",
      });
      const data = await response.json();
      console.log("getTripDetails Ran:: ", data);
      setTripsData(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripDetails();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0077FF" />
        <Text style={{ marginTop: 10, fontSize: 16, color: "#555" }}>Loading Trips...</Text>
      </SafeAreaView>
    );
  }

  if (tripsData.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#555" }}>No trips created.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={{ fontSize: 32, fontWeight: "bold", textAlign: "center", marginVertical: 16, color: "#333" }}>
        Trips
      </Text>
      <FlatList
        data={tripsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard {...item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default Trips;
