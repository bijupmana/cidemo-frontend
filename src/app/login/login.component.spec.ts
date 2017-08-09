import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { NgRedux, NgReduxModule } from '@angular-redux/store'

import { LoginComponent } from './login.component'

import { SessionActions } from './../actions/session.actions'
import { AuthenticationService } from './../services/authentication.service'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpModule ],
      providers: [ AuthenticationService, NgRedux, SessionActions ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
