export interface Trip {
  id: string;
  from: string;
  to: string;
  roundTrip: boolean;
  date: number;
  returnDate?: number;
  type: string;
  seatsTaken: number;
  seatsMax: number;
  riders: any[];
  sameGender: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  pastTrips: any[];
  upcomingTrips: any[];
  rating: number;
  numOfRatings: number;
}