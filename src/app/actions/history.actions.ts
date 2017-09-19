import { Injectable } from '@angular/core'
import { Action } from 'redux'

export interface IHistoryAction {
  type: string
  payload?: any
}

@Injectable()
export class HistoryActions {
  static ADD_HISTORY = 'ADD_HISTORY'
  static CLEAR_HISTORY = 'CLEAR_HISTORY'

  add (payload): IHistoryAction {
    return {
      type: HistoryActions.ADD_HISTORY,
      payload: payload
    }
  }

  clear (): IHistoryAction {
    return {
      type: HistoryActions.CLEAR_HISTORY
    }
  }
}
