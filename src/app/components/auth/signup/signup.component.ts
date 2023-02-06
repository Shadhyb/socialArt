import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Observable, Observer } from 'rxjs';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-register',
  template: `
  <div class=container>
  <div nz-row [nzGutter]="[16, 24]">
    <div nz-col nzSpan="24">
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" [nzLg]="8" nzRequired nzFor="email">E-mail</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="The input is not valid E-mail!">
          <input nz-input formControlName="email" id="email" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" [nzLg]="8" nzFor="password" nzRequired>Password</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Please input your password!">
          <input
            nz-input
            type="password"
            id="password"
            formControlName="password"
            (ngModelChange)="updateConfirmValidator()"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label class="confirm"[nzSm]="6" [nzXs]="24" [nzLg]="8" nzFor="checkPassword" nzRequired>Confirm </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" [nzErrorTip]="errorTpl">
          <input nz-input type="password" formControlName="checkPassword" id="checkPassword" />
          <ng-template #errorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">Please confirm your password!</ng-container>
            <ng-container *ngIf="control.hasError('confirm')">
              Two passwords that you enter is inconsistent!
            </ng-container>
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label
          [nzSm]="6"
          [nzXs]="24"
          [nzLg]="8"
          nzFor="nickname"
          nzRequired

        >
          <span>Nickname :</span>
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" [nzLg]="8" nzErrorTip="Please input your nickname!">
          <input nz-input id="nickname" formControlName="nickname" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button [routerLinkActive]="'login'" nzType="primary"  nzShape="round">Registrati</button>
        </nz-form-control>
      </nz-form-item>
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
        margin-right:4em;
      }


      [nz-form] {
        max-width: 600px;
        border:1px solid black;
        border-radius: 10px;
        background:#fff;
        margin-top:50vh;
        margin-bottom:50vh;
        padding:20px 0 0 50px;

      }

      [nz-input],{
        background:#fff;
      }
      [nz-form-control]{
        background:#fff;
      }


      .register-are {
        margin-bottom: 8px;


      }
      button{
        background-color: #E91E63;
        border: none;
        cursor: pointer;

}
      button:hover{
        background-color:#E91E63;
        color:greenyellow}
    `
  ]
})
export class NzDemoFormRegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'outline'
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
    });
  }
}