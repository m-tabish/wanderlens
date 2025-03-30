import { Input, InputField } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ArrowBigLeft, ArrowBigRight, Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
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
	const [submitted, setSubmitted] = useState(false);

	// Move to the next slide and update answers
	const goToNextSlide = () => {
		setAnswers((prevAnswers: any) => ({
			...prevAnswers,
			[questions[currentSlide].key]: inputValue,
		}));

		setInputValue(""); // Reset input for the next question

		if (currentSlide < questions.length - 1) {
			setCurrentSlide(currentSlide + 1);
		} else {
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
		if (Object.keys(answers).length === questions.length && !submitted) {
			submitTripDetails();
		}
	}, [answers]);

	const submitTripDetails = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/create_trip", {
				method: "POST",
				body: JSON.stringify(answers),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log("Trip successfully created:", data);
			setSubmitted(true);
			router.push("./trips");
		} catch (error) {
			console.error("ERROR IN CREATING TRIP::", error);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			{/* Header */}
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 16 }}>
				<TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
					<Ionicons name="arrow-back" size={24} color="#333" />
				</TouchableOpacity>
				<Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
					Create New Trip
				</Text>
				<View style={{ width: 32 }} />
			</View>

			{/* Progress Indicator */}
			<View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
				{questions.map((_, index) => (
					<View
						key={index}
						style={{
							width: 8,
							height: 8,
							borderRadius: 4,
							marginHorizontal: 4,
							backgroundColor: currentSlide === index ? "#4CAF50" : "#ccc",
							transform: [{ scale: currentSlide === index ? 1.25 : 1 }],
						}}
					/>
				))}
			</View>

			{/* Questions / Carousel */}
			<View style={{ alignItems: "center", marginTop: 100, paddingHorizontal: 16 }}>
				<Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 24 }}>
					{questions[currentSlide].question}
				</Text>
				{!questions[currentSlide].key.includes("day") ? (
					<Input style={{ width: "100%", marginVertical: 24 }} variant="underlined">
						<InputField
							placeholder={questions[currentSlide].placeholder}
							style={{
								backgroundColor: "#fff",
								paddingHorizontal: 16,
								paddingVertical: 12,
								textAlign: "center",
								color: "#000",
								borderRadius: 8,
							}}
							value={inputValue}
							onChangeText={setInputValue}
						/>
					</Input>
				) : (
					<View style={{ alignItems: "center", width: "100%" }}>
						<Calendar
							onDayPress={(day: any) => setInputValue(day.dateString)}
							style={{ borderRadius: 10, marginVertical: 16, width: "100%" }}
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
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					paddingHorizontal: 20,
					marginTop: 32,
					paddingBottom: 20,
				}}
			>
				<TouchableOpacity
					onPress={goToPreviousSlide}
					disabled={currentSlide === 0}
					style={{
						padding: 16,
						borderRadius: 50,
						borderWidth: 1,
						borderColor: currentSlide === 0 ? "#ccc" : "#000",
						opacity: currentSlide === 0 ? 0.5 : 1,
						alignItems: "center",
						justifyContent: "center",
						flex: 1,
						marginRight: 10,
					}}
				>
					<ArrowBigLeft size={30} color={currentSlide === 0 ? "#ccc" : "#000"} />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={goToNextSlide}
					style={{
						padding: 16,
						borderRadius: 50,
						backgroundColor: "#4CAF50",
						alignItems: "center",
						justifyContent: "center",
						flex: 1,
						marginLeft: 10,
					}}
				>
					{currentSlide === questions.length - 1 ? (
						<Check size={30} color="#fff" />
					) : (
						<ArrowBigRight size={30} color="#fff" />
					)}
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
