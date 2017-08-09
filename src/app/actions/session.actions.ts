import { Injectable } from '@angular/core'
import { Action } from 'redux'

export interface ISessionAction {
  type: string
  payload?: any
}

@Injectable()
export class SessionActions {
  static LOGIN = 'LOGIN'
  static LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
  static LOGIN_FAILED = 'LOGIN_FAILED'
  static LOGOUT = 'LOGOUT'

  login (): ISessionAction {
    return {
      type: SessionActions.LOGIN
    }
  }

  loginSucceeded (payload): ISessionAction {
    return {
      type: SessionActions.LOGIN_SUCCEEDED,
      payload: payload
    }
  }

  loginFailed (error): ISessionAction {
    return {
      type: SessionActions.LOGIN_FAILED,
      payload: error
    }
  }

  logout (): ISessionAction {
    return {
      type: SessionActions.LOGOUT
    }
  }
}
