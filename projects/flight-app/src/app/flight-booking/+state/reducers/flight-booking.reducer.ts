import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from '../actions/flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { RootState } from '../../../+state';

export interface Passenger {
  id: number;
  firstname: string;
  name: string;
  bonusMiles: number;
  passengerStatus: string;
}

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
  passengers: Passenger[];
  bookings: { flightId: number, passengerId: number }[];
  activeUser: number;
}

export interface FeatureState extends RootState {
  flightBooking: State;
}

export const initialState: State = {
  flights: [],
  passengers: [
    {
      id: 1,
      firstname: 'Peter',
      name: 'Müller',
      bonusMiles: 2000,
      passengerStatus: 'A'
    }
  ],
  bookings: [
    { flightId: 3, passengerId: 1},
    { flightId: 5, passengerId: 1}
  ],
  activeUser: 1
};

const flightBookingReducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded,
    (state, action) => ({ ...state, flights: action.flights })
  ),

  on(FlightBookingActions.flightUpdate,
    (state, action) => {
      const flights = state.flights.map(flight =>
        flight.id === action.flight.id ? action.flight : flight
      );

      return { ...state, flights };
    }
  ),

);

export function reducer(state: State | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
