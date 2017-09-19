import { NgRedux, select } from '@angular-redux/store'
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'

import { HistoryActions } from './../actions'
import { IAppState } from './../app.store'

@Injectable()
export class AccountHistoryService {

  constructor (private http: Http,
               private ngRedux: NgRedux<IAppState>,
               private actions: HistoryActions) {
  }

  add (): Observable<any> {
    console.log('add()')
    return this.http.get('/api/random/history')
                    .map(this.onSuccess)
                    .catch(this.onError)
  }

  private onSuccess = (response) => {
    this.ngRedux.dispatch(this.actions.add(response.json()))
    return response.json()
  }

  private onError = (error: any) => {
    return Observable.throw(error)
  }
}
