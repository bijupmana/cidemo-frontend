import { NgRedux, NgReduxModule } from '@angular-redux/store'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { SessionActions } from './../actions'
import { AuthenticationService } from './../services'
import { HeaderComponent } from './header.component'

class RouterStub {
  navigate (url: string) { return url }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        AuthenticationService,
        SessionActions,
        NgRedux,
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
