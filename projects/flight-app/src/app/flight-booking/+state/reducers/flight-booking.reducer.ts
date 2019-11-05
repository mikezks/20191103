import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from '../actions/flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { RootState } from '../../../+state';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[]
}

export interface FeatureState extends RootState {
  flightBooking: State;
}

export const initialState: State = {
  flights: []
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
