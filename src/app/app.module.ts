import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent} from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { RootComponent } from './root/root.component';
import { StoreComponent, } from './store/store.component';
import { NouisliderModule } from 'ng2-nouislider';
import { NgxSliderModule} from '@angular-slider/ngx-slider';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActivityDialogComponent } from './activity-dialog/activity-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { FailDialogComponent } from './fail-dialog/fail-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    MainComponent,
    RegisterComponent,
    LoginComponent,
    RootComponent,
    StoreComponent,
    ActivityDialogComponent,
    SuccessDialogComponent,
    FailDialogComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NouisliderModule,
    NgxSliderModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
