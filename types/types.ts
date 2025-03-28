type day = {
	dateString: string;
	day: string;
	month: string;
	timestamp: number;
	year: number;
};

type TripsType = {
	id: string;
	name: string;
	destination: string;
	start_day: string;
	end_day: string;
	trip_type?: string;
	budget?: number;
	travellers?: number;
	interests?: string[];
};

export { day, TripsType };
