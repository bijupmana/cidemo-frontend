import { Action } from 'redux'
import { SessionActions } from './../actions'
import { ISessionState, defaultSessionState } from './../models'

function emptySession () {
  return Object.assign({}, defaultSessionState)
}

export function sessionReducer(state: ISessionState = defaultSessionState, action) {
  switch(action.type) {
    case SessionActions.LOGIN_SUCCEEDED:
      return {
        loggedIn: true,
        fullname: action.payload.fullname
      }
    case SessionActions.LOGIN_FAILED:
      return emptySession()

    case SessionActions.LOGOUT:
      return emptySession()

    default:
      return state
  }
}
