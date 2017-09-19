export interface IHistoryState {
  date: string
  name: string
  business: string
  amount: string
  type: string
  account: string
}

export const defaultHistoryState: IHistoryState = {
  date: '',
  name: '',
  business: '',
  amount: '',
  type: '',
  account: ''
}
