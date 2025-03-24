type day = {
	dateString: string;
	day: string;
	month: string;
	timestamp: number;
	year: number;
};

type Trip = {
	destination: string;
	trip_start: day;
	trip_end: day;
	trip_type: string;
	budget: number;
	travellers?: number;
	interests?: string[];
	// year: ;
};
export { day, Trip };
