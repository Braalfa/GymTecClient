import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {StoreComponent} from './store/store.component';
import {CalendarComponent} from "./calendar/calendar/calendar.component";

/**
 * Rutas definidas para la app
 */
const routes: Routes = [
  { path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full'
      },
      {
        path:  'store',
        component:  StoreComponent
      },
      {
        path:  'calendar',
        component:  CalendarComponent
      }
      ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
