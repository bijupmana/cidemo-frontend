export interface ISessionState {
  loggedIn: boolean,
  username: string
}

export const defaultSessionState: ISessionState = {
  loggedIn: false,
  username: ''
}
