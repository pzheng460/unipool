import {ActionTypes, DataActions, GlobalData} from "./ActionType";
import DataActionTrip = DataActions.DataActionTrip;
import DataActionName = DataActions.DataActionName;
import DataActionGender = DataActions.DataActionGender;
import DataActionEmail = DataActions.DataActionEmail;

export function dummyDataReducer (data: GlobalData, action: DataActions.Any): GlobalData {
  switch (action.type) {
    case ActionTypes.ADD_UPCOMING_TRIP: {
      const tripAction = action as DataActionTrip;
      const upcomingTrips = data.user.upcomingTrips;
      const currentTrips = data.trips;
      return {
        user: {
         ...data.user,
         upcomingTrips: [...upcomingTrips, tripAction.trip]
        },
        trips: [...currentTrips, tripAction.trip]
      };
    }
    case ActionTypes.INIT_USER: {
      const currentTrips = data.trips;
      return {
        user: {
          id: 0,
          firstName: "",
          lastName: "",
          avatar: "",
          phone: "",
          email: "",
          eduEmail: "",
          eduVerified: false,
          gender: "",
          pastTrips: [],
          upcomingTrips: [],
          rating: 0,
          numOfRatings: 0,
        },
        trips: [...currentTrips]
      };
    }
    case ActionTypes.UPDATE_FULL_NAME: {
      const nameAction = action as DataActionName;
      return {
        user: {
          ...data.user,
          firstName: nameAction.firstName,
          lastName: nameAction.lastName,
        },
        trips: [...data.trips]
      };
    }
    case ActionTypes.UPDATE_GENDER: {
      const genderAction = action as DataActionGender;
      return {
        user: {
          ...data.user,
          gender: genderAction.gender,
        },
        trips: [...data.trips]
      };
    }
    case ActionTypes.UPDATE_EMAIL_ADDRESS: {
      const emailAction = action as DataActionEmail;
      return  {
        user: {
          ...data.user,
          email: emailAction.email,
          eduEmail: emailAction.eduEmail,
        },
        trips: [...data.trips]
      }
    }
  }
}