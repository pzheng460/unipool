import {User, Trip} from "../Interface/TripInterface";

export type GlobalData = {user: User, trips: Trip[]}
export enum ActionTypes {
  ADD_UPCOMING_TRIP = "ADD_UPCOMING_TRIP",
}

export namespace DataActions {

  export type Any = DataActionTrip | DataActionTrips;

  interface DataActionBase {
    type: ActionTypes,
  }

  export interface DataActionTrip extends DataActionBase {
    trip: Trip,
  }

  export interface DataActionTrips extends DataActionBase {
    trips: Trip[],
  }
}
