import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from './reducers/app.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router';

export interface RootState {
  app: fromApp.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<RootState> = {
  app: fromApp.reducer,
  router: routerReducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];

export * from './actions/app.actions';
export * from './reducers/app.reducer';
export * from './effects/app.effects';
