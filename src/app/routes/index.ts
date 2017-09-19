import { Routes } from '@angular/router'
import { AuthGuard } from './../guards/auth.guard'
import { HomeComponent } from './../home/home.component'
import { LoginComponent } from './../login/login.component'

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
    // canActivate: [ AuthGuard ]
  }
]

export { appRoutes as routes }
