import { Routes } from '@angular/router'

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
  }
]

export { appRoutes as routes}
