import { NgRedux, NgReduxModule } from '@angular-redux/store'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { SessionActions } from './../actions/session.actions'
import { AuthenticationService } from './../services/authentication.service'
import { HomeComponent } from './home.component'

class RouterStub {
  navigate (url: string) { return url }
}

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        AuthenticationService,
        NgRedux,
        SessionActions,
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
