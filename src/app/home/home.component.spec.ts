import { NgRedux, NgReduxModule } from '@angular-redux/store'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { Router } from '@angular/router'

import { HistoryActions, SessionActions } from './../actions'
import { AccountHistoryService, AuthenticationService } from './../services'
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
      imports: [ HttpModule ],
      providers: [
        AccountHistoryService,
        AuthenticationService,
        HistoryActions,
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
