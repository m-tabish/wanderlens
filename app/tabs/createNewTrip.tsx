import { Input, InputField } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ArrowBigLeft, ArrowBigRight, Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { questions } from "../services/data";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateNewTrip() {
	const [answers, setAnswers] = useState<any>({});
	const [currentSlide, setCurrentSlide] = useState(0);
	const [inputValue, setInputValue] = useState<string>("");
	// Flag to prevent re-submitting if an answer is updated after submission.
	const [submitted, setSubmitted] = useState(false);

	// Move to the next slide and update answers
	const goToNextSlide = () => {
		setAnswers((prevAnswers: any) => ({
			...prevAnswers,
			[questions[currentSlide].key]: inputValue,
		}));

		setInputValue(""); // Reset input for the next question

		if (currentSlide < questions.length - 1) {
			// Move to the next question
			setCurrentSlide(currentSlide + 1);
		} else {
			// All questions answered; submission will be triggered by the useEffect below.
			console.log("Final answers:", {
				...answers,
				[questions[currentSlide].key]: inputValue,
			});
		}
	};

	// Move to previous slide and update answers
	const goToPreviousSlide = () => {
		if (currentSlide > 0) {
			setAnswers((prevAnswers: any) => ({
				...prevAnswers,
				[questions[currentSlide].key]: inputValue,
			}));

			setTimeout(() => {
				setCurrentSlide(currentSlide - 1);
				setInputValue(answers[questions[currentSlide - 1]?.key] || "");
			}, 100);
		}
	};

	// Use effect to trigger the submission when all answers are filled
	useEffect(() => {
		// Check if we've collected answers for all questions and haven't submitted yet.
		if (Object.keys(answers).length === questions.length && !submitted) {
			submitTripDetails();
		}
	}, [answers]);

	const submitTripDetails = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/create_trip", {
				method: "POST",
				body: JSON.stringify(answers), // ensure answers are stringified
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log("Trip successfully created:", data);
			setSubmitted(true);
			// Navigate after a successful submission
			router.push("./trips");
		} catch (error) {
			console.error("ERROR IN CREATING TRIP::", error);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
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
			<View className="mx-auto justify-center mt-52 flex-col items-center">
				<Text className="text-3xl font-bold px-5">
					{questions[currentSlide].question}
				</Text>
				{!questions[currentSlide].key.includes("day") ? (
					<Input
						className="w-1/2 mt-20 mb-10"
						variant="underlined">
						<InputField
							placeholder={questions[currentSlide].placeholder}
							className="bg-white w-1/2 px-2 text-center text-black rounded-lg"
							value={inputValue}
							onChangeText={setInputValue}
						/>
					</Input>
				) : (
					<View className="flex-col items-center">
						<Calendar
							onDayPress={(day: any) => setInputValue(day.dateString)}
							style={{
								height: 150,
								width: "100%",
							}}
							theme={{
								backgroundColor: "#ffffff",
								calendarBackground: "#ffffff",
								textSectionTitleColor: "#b6c1cd",
								selectedDayBackgroundColor: "#00adf5",
								selectedDayTextColor: "#ffffff",
								todayTextColor: "#00adf5",
								dayTextColor: "#2d4150",
								textDisabledColor: "#d9e1e8",
							}}
						/>
					</View>
				)}
			</View>

			{/* Navigation Buttons */}
			<KeyboardAvoidingView className="flex-row justify-between px-6 top-64">
				<TouchableOpacity
					onPress={goToPreviousSlide}
					disabled={currentSlide === 0}
					className={`p-6 rounded-full border ${
						currentSlide === 0 ? "opacity-50" : ""
					}`}>
					<ArrowBigLeft
						size={30}
						color={"#000000"}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={goToNextSlide}
					className="p-6 rounded-full bg-green-400">
					{currentSlide === questions.length ? (
						<Check
							size={30}
							color={"#000000"}
						/>
					) : (
						<ArrowBigRight
							size={30}
							color={"#000000"}
						/>
					)}
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
