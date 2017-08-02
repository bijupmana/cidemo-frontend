import { Action, combineReducers } from 'redux'
import { SessionActions } from './actions'
import { sessionReducer } from './reducers'

import { ISessionState, defaultSessionState } from './models'

export interface IAppState {
  session?: ISessionState
}

export const INITIAL_STATE: IAppState = {
  session: defaultSessionState
}

export const rootReducer = combineReducers({
  session: sessionReducer
})
