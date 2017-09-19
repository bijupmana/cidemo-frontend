import { NgRedux, select } from '@angular-redux/store'
import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { SessionActions } from './../actions/session.actions'
import { IAppState } from './../app.store'
import { ISessionState } from './../models/session.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @select(['session', 'fullname']) readonly fullname$: Observable<string>

  constructor ( private ngRedux: NgRedux<IAppState>,
               private actions: SessionActions ) {
  }

  logout (evt) {
    evt.preventDefault()
    this.ngRedux.dispatch(this.actions.logout())
  }
}
