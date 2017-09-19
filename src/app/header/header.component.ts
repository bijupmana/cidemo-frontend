import { NgRedux, select } from '@angular-redux/store'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { SessionActions } from './../actions'
import { IAppState } from './../app.store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @select(['session', 'fullname']) readonly fullname$: Observable<string>
  @select(['session', 'loggedIn']) readonly loggedIn$: Observable<boolean>

  constructor ( private ngRedux: NgRedux<IAppState>,
                private router: Router,
                private sessionActions: SessionActions ) { }

  logout (evt) {
    evt.preventDefault()
    this.ngRedux.dispatch(this.sessionActions.logout())
    this.router.navigate(['/'])
  }
}
