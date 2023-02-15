import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzDemoLayoutTopComponent } from './components/home/home.component';
import { NzDemoFormRegisterComponent } from './components/auth/signup/signup.component';
import { NzDemoFormNormalLoginComponent } from './components/auth/login/login.component';
import { NzDemoCardMetaComponent } from './components/card/card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './components/auth/auth/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { MailComponent } from './components/mail/mail.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: NzDemoLayoutTopComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'messages',
        component: MailComponent
      },
      {
        path: 'notifications',
        component: NotificationComponent
      }
    ]
  },

  {
    path: 'signup',
    component: NzDemoFormRegisterComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,

  },
  {
    path: 'post',
    component: CreatePostComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'card',
    component: NzDemoCardMetaComponent
  },

  {
    path: 'login',
    component: NzDemoFormNormalLoginComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: ProfileComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
