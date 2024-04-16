import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { userReducer } from '../../reducers/users.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  userRed: userReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
