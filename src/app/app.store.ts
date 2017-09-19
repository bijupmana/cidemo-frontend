import { Action, combineReducers } from 'redux'
import { HistoryActions, SessionActions } from './actions'
import { historyReducer, sessionReducer } from './reducers'

import { defaultSessionState, IHistoryState, ISessionState } from './models'

export interface IAppState {
  history?: Array<IHistoryState>
  session?: ISessionState
}

export const INITIAL_STATE: IAppState = {
  history: [],
  session: defaultSessionState
}

export const rootReducer = combineReducers({
  history: historyReducer,
  session: sessionReducer
})
