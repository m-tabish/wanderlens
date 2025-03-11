import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

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
    location: "Kiyoto, JP",
    date: "2025-05-15",
    image:
      "https://cdn.britannica.com/96/196396-050-13758154/Chureito-Pagoda-Arakura-Sengen-Shrine-Mount-Fuji.jpg",
    description:
      "Experience the breathtaking mountain scenery and thrilling hiking trails in Aspen.",
  },
  {
    id: "3",
    title: "City Exploration",
    location: "New York, NY",
    date: "2025-06-20",
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

type Trip = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
};

const TripCard: React.FC<Trip> = ({ id, title, location, date, image }) => (
  <Link href={`/customertrips/${id}` as const} asChild>
    <TouchableOpacity className="bg-white rounded-xl shadow-lg p-4 m-2 w-full items-center">
      <Image source={{ uri: image }} className="w-64 h-40 rounded-lg" />
      <Text className="text-black font-bold text-lg mt-2">{title}</Text>
      <Text className="text-gray-700 text-sm">{location}</Text>
      <Text className="text-gray-500 text-sm">{date}</Text>
    </TouchableOpacity>
  </Link>
);

const Trips = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-black font-bold text-3xl text-center mb-4">
        Trips
      </Text>
      <FlatList
        data={tripsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Trips;
