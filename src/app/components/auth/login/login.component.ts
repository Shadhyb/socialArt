import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Observable, Observer } from 'rxjs';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
@Component({
  selector: 'nz-demo-form-normal-login',
  template: `
   <div class="container">
    <div nz-row [nzGutter]="[16, 24]">
      <div nz-col nzSpan="24">
        <form nz-form [formGroup]="validateForm" class="login-form" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your username!">
          <nz-input-group nzPrefixIcon="user">
            <input type="text" nz-input formControlName="userName" placeholder="Username" />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
      <nz-form-control nzErrorTip="Please input your email!">
          <nz-input-group nzPrefixIcon="mail">
            <input type="email" nz-input formControlName="email" placeholder="Email" />
          </nz-input-group>
        </nz-form-control>
        </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your Password!">
          <nz-input-group nzPrefixIcon="lock">
            <input type="password" nz-input formControlName="password" placeholder="Password" />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <div nz-row class="login-form-margin">
        <div nz-col [nzSpan]="12">
          <label nz-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
        </div>
        <div nz-col [nzSpan]="12">
          <a class="login-form-forgot">Forgot password</a>
        </div>
      </div>
      <button nz-button class="login-form-button login-form-margin" [nzType]="'primary'" nzShape="round">Log in</button>
      Or
      <a routerLink="">register now!</a>
    </form>
  </div>
  </div>
</div>
  `,
  styles: [
    `
       *{text-align: left;
        }
       .container{
        background: #303030;
      }
      [nz-row]{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      span{
        white-space: nowrap;
      }
      a{
        color:#E91E63;
      }

      .login-form {
        padding:20px;
        border:1px solid black;
        border-radius: 10px;
        background:#fff;
        margin-top:50vh;
        margin-bottom:50vh;

      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
        color: #E91E63;
      }

      .login-form-button {

        color: #E91E63;
        border: none;
        cursor: pointer;

      }
      .login-form-button:hover{
          background-color:#E91E63;
        color:greenyellow}
    `
  ]
})
export class NzDemoFormNormalLoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.fbA.logIn(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: UntypedFormBuilder, private fbA:FirebaseAuthService, private fDb:FirebaseDbService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      remember: [true]
    });
  }
}
