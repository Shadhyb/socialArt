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

import { NzDemoCardMetaComponent} from './components/card/card.component';
import { AuthModule } from './components/auth/auth/auth.module';
import { NzDemoLayoutTopComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzDemoFormRegisterComponent } from './components/auth/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

//ngzorro
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ProfileComponent } from './components/profile/profile.component';
import { MailComponent } from './components/mail/mail.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule, NzUploadFile  } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule} from 'ng-zorro-antd/modal';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTableModule } from 'ng-zorro-antd/table';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NzDemoFormNormalLoginComponent,
    NzDemoCardMetaComponent,
    NzDemoLayoutTopComponent,
    NzDemoFormRegisterComponent,
    DashboardComponent,
    ProfileComponent,
    MailComponent,
    NotificationComponent,
    UsersComponent,
    CreatePostComponent,


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
    ReactiveFormsModule,
    NzCheckboxModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzBadgeModule,
    NzPopoverModule,
    NzCardModule,
    NzUploadModule,
    NzMessageModule,
    NzModalModule,
    NzImageModule,
    NzNotificationModule,
    NzTableModule


  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
