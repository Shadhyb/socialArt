import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzDemoLayoutTopComponent} from './components/home/home.component';
import { NzDemoFormRegisterComponent} from './components/auth/signup/signup.component';
import { NzDemoFormNormalLoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: NzDemoLayoutTopComponent
  },
  {
    path:'signup',
    component: NzDemoFormRegisterComponent
  },
  {
    path:'login',
    component: NzDemoFormNormalLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
