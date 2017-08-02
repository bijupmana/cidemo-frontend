import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from './../services/authentication.service'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/startWith'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  hasError: boolean = false
  error: string = ''

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit () {
  }

  submit(evt) {
    evt.preventDefault()
    this.authService.login(this.username, this.password)
                    .subscribe(this.onSuccess, this.onError)
  }

  private onSuccess = (data) => {
    this.hasError = false
  }

  private onError = (error) => {
    // console.warn(error)
    this.hasError = true
    const msg = (error.status === 504) ? 'Service is currently unavailable, apologies!' : 'Error logging in'
    this.error = msg
  }
}
