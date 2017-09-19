import { Action } from 'redux'
import { HistoryActions } from './../actions'
import { IHistoryState, defaultHistoryState } from './../models'

let emptyHistory = []

export function historyReducer (state: Array<IHistoryState> = emptyHistory, action) {
  switch (action.type) {
    case HistoryActions.ADD_HISTORY:
      let transaction = action.payload.accountHistory[0]
      state.push({
        date: transaction.date,
        name: transaction.name,
        business: transaction.business,
        amount: transaction.amount,
        type: transaction.type,
        account: transaction.account
      })
      return state

    case HistoryActions.CLEAR_HISTORY:
      return emptyHistory

    default:
      return state
  }
}
