import axios from "axios";

const API_KEY = "2e30fd69b59c4a5dadc6ce01d9c58f7a"; // Replace with your actual API key

const fetchPopularPlaces = async (destination: any) => {

  if (!destination || !destination.lon || !destination.lat) {
    throw new Error("Invalid destination provided.");
  }

  const categories = [
    "religion",
    "catering.restaurant",
    "heritage",
    "museum",
    "park",
    "restaurant",
    "shopping",
    "sightseeing",
    "tourism",
  ];

  const RECT_OFFSET = 0.1;
  const minLon = destination.lon - RECT_OFFSET;
  const minLat = destination.lat - RECT_OFFSET;
  const maxLon = destination.lon + RECT_OFFSET;
  const maxLat = destination.lat + RECT_OFFSET;

  let finalPlaces: { name: string; lat: number; lon: number }[] = [];

  for (const category of categories) {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v2/places?categories=${category}&filter=rect:${minLon},${minLat},${maxLon},${maxLat}&limit=10&apiKey=${API_KEY}`
      );

      const categoryPlaces = response.data.features
        .filter((place: any) => place.properties.name) // Keep only named places
        .slice(0, 3) // Take only 3 places per category
        .map((place: any) => ({
          name: place.properties.name,
          lat: place.geometry.coordinates[1], // Latitude
          lon: place.geometry.coordinates[0], // Longitude
        }));

      finalPlaces.push(...categoryPlaces);

      if (finalPlaces.length >= 12) break; // Ensure at least 10-12 places
    } catch (error) {
      
    }
  }

  // Shuffle places for randomness
  finalPlaces = finalPlaces.sort(() => Math.random() - 0.5);

  return finalPlaces.length > 0 ? finalPlaces.slice(0, 12) : [];
};

export default fetchPopularPlaces;
