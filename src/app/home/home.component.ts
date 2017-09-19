import { NgRedux, select } from '@angular-redux/store'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { IAppState } from './../app.store'
import { IHistoryState } from './../models'
import { AccountHistoryService } from './../services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @select(['session', 'fullname']) readonly fullname$: Observable<string>
  @select(['history']) readonly history$: Observable<Array<IHistoryState>>

  constructor ( private ngRedux: NgRedux<IAppState>,
                private historyService: AccountHistoryService,
                private router: Router ) {
  }

  addHistory (evt) {
    evt.preventDefault()
    console.log('addHistory')
    this.historyService.add().subscribe()
  }
}
