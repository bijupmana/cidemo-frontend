import { Component } from '@angular/core'
import { Router } from '@angular/router'
import 'rxjs/add/operator/startWith'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AuthenticationService } from './../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string
  password: string
  hasError = false
  error = ''

  constructor ( private authService: AuthenticationService,
                private router: Router ) {
  }

  submit (evt) {
    evt.preventDefault()
    this.authService.login(this.username, this.password)
                    .subscribe(this.onSuccess, this.onError)
  }

  private onSuccess = (data) => {
    this.hasError = false
    this.router.navigate(['/home'])
  }

  private onError = (error) => {
    this.hasError = true
    const msg = (error.status === 504) ? 'Service is currently unavailable, apologies!' : 'Error logging in'
    this.error = msg
  }
}
