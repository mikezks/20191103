import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureState, State, Passenger } from "../reducers/flight-booking.reducer";
import { Flight } from "@flight-workspace/flight-api";

export const getFlightBookingState =
    createFeatureSelector<FeatureState, State>('flightBooking');

export const getFlights =
    createSelector(
        // Selectors
        getFlightBookingState,
        // Projector
        (state: State) => state.flights
    );

export const getDelayedFlights = 
    createSelector(
        getFlights,
        (flights: Flight[]) => flights.filter(f => f.delayed)
    );

export const getPassengers =
    createSelector(
        getFlightBookingState,
        (state: State) => state.passengers
    );

export const getBookings =
    createSelector(
        getFlightBookingState,
        (state: State) => state.bookings
    );

export const getActiveUser =
    createSelector(
        getFlightBookingState,
        (state: State) => state.activeUser
    );

export const getFlightsByActiveUser =
    createSelector(
        getFlights,
        getPassengers,
        getBookings,
        getActiveUser,
        (
            flights: Flight[],
            passengers: Passenger[],
            bookings: { flightId: number, passengerId }[],
            activeUser: number
        ) => {
            const passenger = passengers.find(p => p.id === activeUser);
            const myFlightIds =
                bookings
                    .filter(b => b.passengerId === activeUser)
                    .map(b => b.flightId);
            const myFlights =
                flights
                    .filter(f =>
                        myFlightIds.some(myFlightId => f.id === myFlightId)
                    );

            return {
                ...passenger,
                flights: myFlights
            };
        }
    );