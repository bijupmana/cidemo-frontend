import { NgRedux, select } from '@angular-redux/store'
import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { IAppState } from './app.store'
import { ISessionState } from './models/session.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MunichJS Demo'

  @select(['session', 'loggedIn']) readonly loggedIn$: Observable<boolean>

  constructor ( private ngRedux: NgRedux<IAppState> ) {
  }
}
