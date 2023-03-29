import {User, Trip} from "../Interface/TripInterface";
import {ActionTypes, DataActions, GlobalData} from "./ActionType";
import DataActionTrip = DataActions.DataActionTrip;

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
  }
}