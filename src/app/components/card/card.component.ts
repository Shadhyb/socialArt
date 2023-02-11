
import { Component } from '@angular/core';


@Component({
  selector: 'nz-demo-card-meta',
  template: `

   <div>Crea i tuoi post:
  <button id="add" nz-button (click)="showModalMiddle()">
    <span nz-icon nzType="plus" nzTheme="outline"></span>
  </button>
</div>
<nz-modal [(nzVisible)]="isVisibleMiddle"
      nzCentered
      (nzOnCancel)="handleCancelMiddle()"
      (nzOnOk)="handleOkMiddle()" >
  <ng-container *nzModalContent>
  <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
      <nz-card-meta
        nzTitle="Card title"
        nzDescription="This is the description"
        [nzAvatar]="avatarTemplate"
      ></nz-card-meta>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
    </ng-template>
    <ng-template #coverTemplate>
      <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    </ng-template>
    <ng-template #actionSetting>
      <span nz-icon nzType="setting"></span>
    </ng-template>
    <ng-template #actionEdit>
      <span nz-icon nzType="edit"></span>
    </ng-template>
    <ng-template #actionEllipsis>
      <span nz-icon nzType="ellipsis"></span>
    </ng-template>
    </ng-container>
</nz-modal>


  `,
  styles:[
    `[nz-modal]{
      background:#303030
    }
    button {
        background-color: #e91e63;
        border: none;
      }
      button:hover {
        background-color: #e91e63;
        color: greenyellow;
      }
   `
  ]
})
export class NzDemoCardMetaComponent {
  isVisibleMiddle = false;
  isConfirmLoading= false;

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
    console.log(this.isVisibleMiddle)

  }
  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
    setTimeout(() => {
      this.isVisibleMiddle = false;
      this.isConfirmLoading = false;
    }, 2000);
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  createpost(){

  }

}
