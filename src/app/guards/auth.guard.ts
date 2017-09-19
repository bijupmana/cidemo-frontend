import { NgRedux, select } from '@angular-redux/store'
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { IAppState } from './../app.store'
import { AuthenticationService } from './../services/authentication.service'

// TODO: has no real effect without saved session state in browser, e.g. local or session storage

@Injectable()
export class AuthGuard implements CanActivate {
  constructor ( private authService: AuthenticationService,
               private router: Router ) { }

  canActivate () {
    if (this.authService.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
