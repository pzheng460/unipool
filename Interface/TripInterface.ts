export interface Trip {
  id: number;
  from?: string;
  to?: string;
  roundTrip?: boolean;
  date?: number;
  returnDate?: number;
  seatsTaken?: number;
  seatsMax?: number;
  riders?: User[];
  sameGender?: boolean;
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  eduEmail?: string;
  eduVerified?: boolean;
  gender?: string;
}