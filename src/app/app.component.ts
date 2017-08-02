import { Component } from '@angular/core'
import { NgRedux, select } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable'

import { IAppState } from "./app.store"
import { ISessionState } from './models/session.interface'
import { SessionActions } from './actions/session.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean
  title = 'MunichJS Demo'

  @select(['session', 'loggedIn']) readonly loggedIn$: Observable<boolean>
  @select(['session', 'fullname']) readonly fullname$: Observable<string>

  constructor( private ngRedux: NgRedux<IAppState>,
               private actions: SessionActions ) {
  }

  logout(evt) {
    evt.preventDefault()
    this.ngRedux.dispatch(this.actions.logout())
  }
}
