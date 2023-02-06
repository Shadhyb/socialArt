import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzDemoFormNormalLoginComponent } from './components/auth/login/login.component';

import { CardComponent } from './components/card/card.component';
import { AuthModule } from './components/auth/auth/auth.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzDemoFormRegisterComponent } from './components/auth/signup/signup.component';


//ngzorro
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NzDemoFormNormalLoginComponent,
    CardComponent,
    HomeComponent,
    NzDemoFormRegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    NzLayoutModule,
    NzFormModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule


  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
