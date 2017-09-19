import { APP_BASE_HREF } from '@angular/common'
import { async, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { NgRedux, NgReduxModule } from '@angular-redux/store'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'

import { SessionActions } from './actions/session.actions'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { routes } from './routes'

import { AuthenticationService } from './services/authentication.service'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgReduxModule,
        RouterModule.forRoot(routes),
        RouterTestingModule
      ],
      providers: [
        AuthenticationService,
        NgRedux,
        SessionActions,
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents()
  }))

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain('CI/CD Demo')
  }))
})
