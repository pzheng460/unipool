import {Trip, User} from "../../Interface/TripInterface";

const user1 : User = {
    firstName: 'Lucas',
    lastName: 'Lee',
    phone: '7702868930',
    email: 'lucas1203lee@gmail.com',
    eduEmail: 'hli427@gatech.edu',
    eduVerified: true,
    gender: 'male',
};

const user2 : User = {
    firstName: 'Ruiqi',
    lastName: 'Liu',
    phone: '4706767789',
    email: 'ruiqiliusysu@gmail.com',
    eduEmail: 'rliu425@gatech.edu',
    eduVerified: true,
    gender: 'male',
};

const trip1: Trip = {
    from: "Georgia Tech",
    to: "Hartsfield-Jackson Atlanta International Airport",
    roundTrip: false,
    date: 70000,
    returnDate: undefined,

    seatsTaken: 2,
    seatsMax: 4,
    riders: [user1, user2],

    sameGender: false,
};

const trip2: Trip = {
    from: "Georgia Tech",
    to: "H Mart",
    roundTrip: true,
    date: 70000,
    returnDate: 71000,

    seatsTaken: 2,
    seatsMax: 4,
    riders: [user1, user2],

    sameGender: true,
};

const trip3: Trip = {
    from: "Georgia Tech",
    to: "Regal Atlantic Station",
    roundTrip: false,
    date: 80000,
    returnDate: undefined,

    seatsTaken: 1,
    seatsMax: 4,
    riders: [user1],

    sameGender: false,
};

export const users : User[] = [user1, user2];

export const trips : Trip[] = [trip1, trip2, trip3];