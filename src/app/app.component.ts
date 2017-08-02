import { Component } from '@angular/core'
import { NgRedux, select } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable'

import { IAppState } from "./app.store"
import { ISessionState } from './models/session.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean
  title = 'MunichJS Demo'
  @select(['session', 'loggedIn']) readonly loggedIn$: Observable<boolean>
  @select(['session', 'fullname']) readonly fullname$: Observable<string>

  constructor( private ngRedux: NgRedux<IAppState> ) {
  }
}
