import { Component, OnInit } from '@angular/core'
import 'rxjs/add/operator/startWith'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  hasError = false
  error = ''

  constructor () {
  }

  ngOnInit () {
  }

  submit (evt) {
    evt.preventDefault()
  }
}
