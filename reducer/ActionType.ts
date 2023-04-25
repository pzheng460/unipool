import {Trip, User} from "../Interface/TripInterface";

export type GlobalData = {user: User, trips: Trip[]}
export enum ActionTypes {
  ADD_UPCOMING_TRIP = "ADD_UPCOMING_TRIP",
  UPDATE_EMAIL_ADDRESS = "UPDATE_EMAIL_ADDRESS",
  UPDATE_FULL_NAME = "UPDATE_FULL_NAME",
  UPDATE_GENDER = "UPDATE_GENDER",
  INIT_USER = "INIT_USER",
  FETCH_USER = "FETCH_USER",
  FETCH_TRIP = "FETCH_TRIP",
  UPDATE_UPCOMING_TRIPS = "UPDATE_UPCOMING_TRIPS",
  UPDATE_PAST_TRIPS = "UPDATE_PAST_TRIPS",
  JOIN_TRIP = "JOIN_TRIP",
  LEAVE_TRIP = "LEAVE_TRIP",
}

export namespace DataActions {

  export type Any = DataActionBase
    | DataActionTrip
    | DataActionTrips
    | DataActionName
    | DataActionEmail
    | DataActionGender
    | DataActionFetch;

  interface DataActionBase {
    type: ActionTypes,
  }

  export interface DataActionTrip extends DataActionBase {
    trip: Trip,
  }

  export interface DataActionTrips extends DataActionBase {
    trips: Trip[],
  }

  export interface DataActionEmail extends DataActionBase {
    email: string,
  }

  export interface DataActionName extends DataActionBase {
    firstName: string,
    lastName: string,
  }

  export interface DataActionGender extends DataActionBase {
    gender: string,
  }

  export interface DataActionFetch extends  DataActionBase {
    user: User,
  }
}
