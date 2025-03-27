// app/createnewtrip/index.js
import { Input, InputField } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CreateNewTrip() {
	const [answers, setAnswers] = useState({});
	const [currentSlide, setCurrentSlide] = useState(0);
	const [inputValue, setInputValue] = useState<any>("");
	console.log(inputValue + "\n");
	console.log(inputValue);

	const questions = [
		{
			id: "1",
			question: "What is your destination?",
			placeholder: "e.g., Paris, Tokyo, Bali",
			key: "destination",
		},
		{
			id: "2",
			question: "Trip starts on?",

			key: "start_day",
		},
		{
			id: "3",
			question: "Trip ends on?",
			key: "end_day",
		},
		{
			id: "4",
			question: "What's your budget?",
			placeholder: "e.g., $1000",
			key: "budget",
		},
		{
			id: "5",
			question: "Who are you traveling with?",
			placeholder: "e.g., Family, Friends, Solo",
			key: "travellers",
		},
		{
			id: "6",
			question: "What type of activities interest you?",
			placeholder: "e.g., Adventure, Food, Culture",
			key: "interests",
		},
	];

	// Move to the next slide
	const goToNextSlide = () => {
		if (currentSlide < questions.length - 1) {
			setCurrentSlide(currentSlide + 1);
		} else {
			// Submit the trip details
			console.log("Trip Details:", answers);
			// router.push("./trips"); // Navigate to a summary page
		}
	};

	return (
		<View className="flex-1 bg-white">
			{/* Header */}
			<View className="flex-row items-center justify-between px-4 py-4">
				<TouchableOpacity
					onPress={() => router.back()}
					className="p-2">
					<Ionicons
						name="arrow-back"
						size={24}
						color="#333"
					/>
				</TouchableOpacity>
				<Text className="text-lg font-bold text-gray-800">Create New Trip</Text>
				<View className="w-8" /> {/* Empty space for alignment */}
			</View>

			{/* Progress Indicator */}
			<View className="flex-row justify-center mt-4">
				{questions.map((_, index) => (
					<View
						key={index}
						className={`w-2 h-2 rounded-full mx-1 ${
							currentSlide === index ? "bg-green-500" : "bg-gray-300"
						}`}
					/>
				))}
			</View>

			{/* Questions / Carousel */}
			<View className="  mx-auto  justify-center mt-52 flex-col items-center">
				<Text className="text-3xl font-bold ">
					{questions[currentSlide].question}
				</Text>
				{!questions[currentSlide].key.includes("day") ? (
					<Input
						className="w-1/2 mt-20"
						variant="underlined"
						isFocused={true}>
						<InputField
							placeholder={questions[currentSlide].placeholder}
							className=" bg-white w-full text-center text-black rounded-lg"
							value={inputValue}
							onChangeText={(value: string) => {
								setInputValue(value);
							}}></InputField>
					</Input>
				) : (
					<View className="flex-col items-center">
						<Calendar
							onDayPress={(day: any) => {
								setInputValue(day.dateString);
							}}
							style={{
								height: 100,
								w: "100%",
							}}
							theme={{
								backgroundColor: "#ffffff",
								calendarBackground: "#ffffff",
								textSectionTitleColor: "#b6c1cd",
								selectedDayBackgroundColor: "#00adf5",
								selectedDayTextColor: "#ffffff",
								todayTextColor: "#00adf5",
								dayTextColor: "#2d4150",
								textDisabledColor: "#dd99ee",
							}}
						/>
					</View>
				)}
			</View>

			{/* Navigation Buttons */}
			<View className="flex-row justify-between px-6 top-96">
				<TouchableOpacity
					onPress={() => {
						// Ensure answers get updated before navigating
						setAnswers((prevAnswers) => ({
							...prevAnswers,
							[questions[currentSlide].key]: inputValue,
						}));

						// Delay slide change to allow state to update
						setTimeout(() => {
							setCurrentSlide(Math.max(currentSlide - 1, 0));
							setInputValue("");
						}, 100);
					}}
					className="p-6  rounded-full border">
					{" "}
					<ArrowBigLeft
						size={30}
						color={"#000000"}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						// Update answers before moving to next slide
						setAnswers((prevAnswers) => ({
							...prevAnswers,
							[questions[currentSlide].key]: inputValue,
						}));
						setInputValue("");

						// Delay slide change to ensure state updates
						setTimeout(() => {
							if (currentSlide < questions.length - 1) {
								setCurrentSlide(currentSlide + 1);
							} else {
								console.log("Trip Details:", answers);
								// router.push("./trips"); // Uncomment if navigation needed
							}
						}, 100);
					}}
					className="p-6  rounded-full bg-green-400">
					<ArrowBigRight
						size={30}
						color={"#000000"}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
