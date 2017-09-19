import { NgRedux, select } from '@angular-redux/store'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { AccountHistoryService } from './../services'
import { SessionActions } from './../actions'
import { IAppState } from './../app.store'
import { IHistoryState, ISessionState } from './../models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @select(['session', 'fullname']) readonly fullname$: Observable<string>

  constructor ( private ngRedux: NgRedux<IAppState>,
                private historyService: AccountHistoryService,
                private sessionActions: SessionActions,
                private router: Router ) {
  }

  addHistory (evt) {
    evt.preventDefault()
    console.log('addHistory')
    this.historyService.add().subscribe()
  }

  logout (evt) {
    evt.preventDefault()
    this.ngRedux.dispatch(this.sessionActions.logout())
    this.router.navigate(['/'])
  }
}
