import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import fetchPopularPlaces from "./FamousPlaces";

// Accept `cord` as a prop from Maps.tsx
const NormalMap = ({ cord }) => {
  

  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted components

    const fetchData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location access is required to show your position."
          );
          return;
        }

        
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (!location || !location.coords) {
          console.error("Location not found!");
          return;
        }

        if (isMounted) {
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          console.log("User Location:", location.coords);
        }

        // Fetch famous places using the provided coordinates
        const fetchedPlaces = await fetchPopularPlaces({
          lat: cord.latitude,
          lon: cord.longitude,
        });

        

        // Update state only if new data is different
        if (isMounted) {
          setPlaces((prevPlaces) =>
            JSON.stringify(prevPlaces) !== JSON.stringify(fetchedPlaces)? fetchedPlaces: prevPlaces
          );
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, []); // Runs only once on mount

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="blue" />
        <Text className="text-lg font-semibold mt-4">Fetching Location...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: cord.latitude,
          longitude: cord.longitude,
          latitudeDelta: 0.05, // Prevents sudden zoom-out issues
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        followsUserLocation={false} // Prevents unnecessary updates
      >
        {/* Destination Marker */}
        <Marker
          coordinate={cord}
          title="Destination"
          description="Your desired location"
          pinColor="red"
        />

        {/* Famous Places Markers */}
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.lat, longitude: place.lon }}
            title={place.name || "Famous Place"}
            description="Popular Location"
          >
            <Image
              source={require("../assets/marker.jpg")}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          </Marker>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

export default NormalMap;
