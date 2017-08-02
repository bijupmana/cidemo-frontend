import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { NgRedux, select } from '@angular-redux/store'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import { IAppState } from "./../app.store"
import { SessionActions } from './../actions/session.actions'

@Injectable()
export class AuthenticationService {


  constructor (private http: Http,
               private ngRedux: NgRedux<IAppState>,
               private actions: SessionActions) {
  }

  login (username: string, password: string): Observable<any> {
    let body = {
      username: username,
      password: password
    }
    return this.http.post('/api/login', body)
                    .map(this.onLogin)
                    .catch(this.onError)
  }

  private onLogin = (response) => {
    this.ngRedux.dispatch(this.actions.loginSucceeded(response.json()))
    return response.json()
  }

  private onError = (error: any) => {
    this.ngRedux.dispatch(this.actions.loginFailed(error))
    return Observable.throw(error)
  }
}
