import {Trip, User} from "../../Interface/TripInterface";

export const user1 : User = {
    id: 0,
    firstName: 'Lucas',
    lastName: 'Lee',
    avatar: undefined,
    phone: '7702868930',
    email: 'lucas1203lee@gmail.com',
    eduEmail: 'hli427@gatech.edu',
    eduVerified: true,
    gender: 'male',
    pastTrips: [],
    upcomingTrips:[],
    rating: 4.67,
    numOfRatings: 3,
};

export const user2 : User = {
    id: 1,
    firstName: 'Ruiqi',
    lastName: 'Liu',
    avatar: undefined,
    phone: '4706767789',
    email: 'ruiqiliusysu@gmail.com',
    eduEmail: 'rliu425@gatech.edu',
    eduVerified: true,
    gender: 'male',
    pastTrips: [],
    upcomingTrips:[],
    rating: 5,
    numOfRatings: 0,
};

export const user3: User = {
    id: 2,
    firstName: 'John',
    lastName: 'Hill',
    avatar: undefined,
    phone: '7702868000',
    email: 'johnhill@gmail.com',
    eduEmail: 'jhill817@gatech.edu',
    eduVerified: true,
    gender: 'male',
    pastTrips: [],
    upcomingTrips:[],
    rating: 5,
    numOfRatings: 1,
};

export const user4: User = {
    id: 3,
    firstName: 'Jaden',
    lastName: 'Bryan',
    avatar: undefined,
    phone: '4002866856',
    email: 'jadenbryan@gmail.com',
    eduEmail: 'jbryan279@gatech.edu',
    eduVerified: true,
    gender: 'male',
    pastTrips: [],
    upcomingTrips:[],
    rating: 5,
    numOfRatings: 1,
};

export const trip1: Trip = {
    id: 0,
    from: "Georgia Tech",
    to: "Hartsfield-Jackson Atlanta International Airport",
    roundTrip: false,
    date: 70000,
    returnDate: undefined,
    type: "upcoming",
    seatsTaken: 2,
    seatsMax: 4,
    riders: [user1, user2],
    sameGender: false,
};

export const trip2: Trip = {
    id: 1,
    from: "Georgia Tech",
    to: "H Mart",
    roundTrip: true,
    date: 70000,
    returnDate: 71000,
    type: "upcoming",
    seatsTaken: 2,
    seatsMax: 4,
    riders: [user1, user2],
    sameGender: true,
};

export const trip3: Trip = {
    id: 2,
    from: "Georgia Tech",
    to: "Regal Atlantic Station",
    roundTrip: false,
    date: 80000,
    returnDate: undefined,
    type: "upcoming",
    seatsTaken: 1,
    seatsMax: 4,
    riders: [user1],
    sameGender: false,
};

export const trip4: Trip = {
    id: 3,
    from: "Hartsfield-Jackson Atlanta International Airport",
    to: "Georgia Tech",
    roundTrip: false,
    date: 30000,
    returnDate: undefined,
    type: "past",
    seatsTaken: 3,
    seatsMax: 4,
    riders: [user1, user3, user4],
    sameGender: false,
};

export const trip5: Trip = {
    id: 4,
    from: "H Mart",
    to: "Georgia Tech",
    roundTrip: false,
    date: 100000,
    returnDate: undefined,
    type: "past",
    seatsTaken: 3,
    seatsMax: 4,
    riders: [user1, user3, user4],
    sameGender: true,
};

export const trip6: Trip = {
    id: 5,
    from: "Regal Atlantic Station",
    to: "Georgia Tech",
    roundTrip: false,
    date: 150000,
    returnDate: undefined,
    type: "past",
    seatsTaken: 3,
    seatsMax: 4,
    riders: [user1, user3, user4],
    sameGender: false,
};

user1.pastTrips = [...user1.pastTrips, trip4, trip5, trip6];
user3.pastTrips = [...user3.pastTrips, trip4, trip5, trip6];
user4.pastTrips = [...user4.pastTrips, trip4, trip5, trip6];

export let users : User[] = [user1, user2, user3, user4];
export let trips : Trip[] = [trip1, trip2, trip3, trip4, trip5, trip6];