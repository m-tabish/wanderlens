// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const autoComplete = async () => {
// 	console.log(process.env.EXPO_PUBLIC_GEOMAP);
// 	const response = await axios.get(
// 		`https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=${process.env.EXPO_PUBLIC_GEOMAP}`
// 	);

// 	if (!response) return "No response";
// 	return response.data;
// };

// const fetchData = async () => {
// 	const resp = await autoComplete();
// 	console.log(resp); // Now it will log the resolved data
// };

// fetchData();
