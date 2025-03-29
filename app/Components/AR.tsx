import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Alert,
  Linking,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import fetchPopularPlaces from "./FamousPlaces";

const defaultMarkers = [
  {
    position: { x: 5, y: 0, z: -3 },
    placeName: "Restaurant",
    color: "#ff5722",
    direction: "NE",
  },
  {
    position: { x: 2, y: 0, z: -5 },
    placeName: "Park",
    color: "#4CAF50",
    direction: "E",
  },
  {
    position: { x: -2, y: 0, z: -4 },
    placeName: "Museum",
    color: "#2196F3",
    direction: "NW",
  },
];

const AR = ({ lat: propLat, lon: propLon }) => {
  const webViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState(null); // Will hold dynamic markers or fallback
  const [userLocation, setUserLocation] = useState(null);
  const [loadingMarkers, setLoadingMarkers] = useState(true);

  const randomcolor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + color.padStart(6, "0");
  };
  

  const direction = (dx, dz) => {
    let angle = Math.atan2(dx, dz) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    if (angle >= 337.5 || angle < 22.5) return "N";
    else if (angle < 67.5) return "NE";
    else if (angle < 112.5) return "E";
    else if (angle < 157.5) return "SE";
    else if (angle < 202.5) return "S";
    else if (angle < 247.5) return "SW";
    else if (angle < 292.5) return "W";
    else return "NW";
  };

  // Get user's location using Expo Location.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch popular places."
        );
        setUserLocation(null);
        return;
      }
      let locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setUserLocation(locationResult.coords);
    })();
  }, []);

  // Retrieve URL parameters from deep link if available.
  const [urlParams, setUrlParams] = useState(null);
  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const parts = initialUrl.split("?");
        if (parts.length > 1) {
          setUrlParams(new URLSearchParams(parts[1]));
        }
      }
    })();
  }, []);

  // Determine coordinates from URL or fallback to props.
  let latParam = propLat;
  let lonParam = propLon;
  if (urlParams) {
    latParam = urlParams.get("lat")
      ? parseFloat(urlParams.get("lat")!)
      : propLat;
    lonParam = urlParams.get("lon")
      ? parseFloat(urlParams.get("lon")!)
      : propLon;
  }
  

  // Fetch popular places using the provided coordinates and user location.
  useEffect(() => {
    async function loadPlaces() {
      try {
        const fetchedPlaces = await fetchPopularPlaces({ lat: latParam, lon: lonParam });
        
        const scale = 100;
        if (fetchedPlaces && fetchedPlaces.length > 0 && userLocation) {
          const dynamicMarkers = fetchedPlaces.map((place) => {
            const dx = place.lon - userLocation.longitude;
            const dz = place.lat - userLocation.latitude;
            return {
              position: { x: dx * scale, y: 0, z: dz * scale },
              placeName: place.name,
              color: randomcolor(),
              direction: direction(dx, dz),
            };
          });
          // Add extra markers if any marker is too far.
          for (let i = 0; i < dynamicMarkers.length; i++) {
            const pos = dynamicMarkers[i].position;
            if (pos.x > 500 || pos.x < -500 || pos.z > 500 || pos.z < -500) {
              dynamicMarkers.push(
                {
                  position: { x: 1, y: 0, z: 8 },
                  placeName: "Markers Are Far",
                  color: randomcolor(),
                  direction: "N",
                },
                {
                  position: { x: 6, y: 0, z: 8 },
                  placeName: "Use WanderLens Map",
                  color: randomcolor(),
                  direction: "N",
                }
              );
              break;
            }
          }
          setPlaces(dynamicMarkers);
        } else {
          setPlaces(defaultMarkers);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setPlaces(defaultMarkers);
      }
      setLoadingMarkers(false); // Markers have been loaded.
    }
    if (userLocation) {
      loadPlaces();
    }
  }, [latParam, lonParam, userLocation]);

  // Wait until markers are loaded.
  if (loadingMarkers || !places) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading AR places...</Text>
      </View>
    );
  }

  // Build the XR URL from the dynamic markers.
  const markersParam = encodeURIComponent(JSON.stringify(places));
  const XR_URL = `https://ar-augumented-reality.vercel.app/?markers=${markersParam}`;
 

  const onRefresh = () => {
    setRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const openInChrome = () => {
    const chromeURL = `googlechrome://navigate?url=${XR_URL}`;
    Linking.openURL(chromeURL).catch(() => Linking.openURL(XR_URL));
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={{ uri: XR_URL }}
          style={{ flex: 1 }}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
          injectedJavaScript={`
            setTimeout(() => {
              if (!navigator.xr) {
                window.ReactNativeWebView.postMessage("no-xr");
              }
            }, 3000);
          `}
          onMessage={(event) => {
            if (event.nativeEvent.data === "no-xr") {
              Alert.alert(
                "WebXR Not Supported",
                "Your Android version does not support WebXR. Would you like to open this in Chrome?",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Open in Chrome", onPress: openInChrome },
                ]
              );
            }
          }}
        />
      </View>
      <View style={{ position: "absolute", top: 40, left: 20 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {userLocation
            ? `User: ${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`
            : "User location not available"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default AR;
