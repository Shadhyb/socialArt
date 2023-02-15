
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { PostsService } from 'src/app/services/posts.service';
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
  <nz-card nzHoverable style="width:300px;" [nzCover]="coverTemplate" >
      <nz-card-meta>
   </nz-card-meta>

    </nz-card>
    <ng-template #form>


    </ng-template>
    <ng-template #avatarTemplate>
      <nz-avatar nzSrc=""></nz-avatar>
    </ng-template>
    <ng-template #coverTemplate>
    <form #form="ngForm" (ngSubmit)="submit()" id="form">
    <div ngModelGroup="formPost" class="form-group">
      <div class="form-group">
        <label id="cTitle" for="title">Title</label>
        <input nz-input type="text" id="title" name="title" #title="ngModel" [(ngModel)]="postInterface.title" required />
      </div>

      <div *ngIf="img" class="form-group bb">
        <label id="cTitle" for="imgUrl">Upload image</label>
        <input nz-input id="imgUrl" type="file" name="imgUrl"
   [(ngModel)]="postInterface.imgUrl" />
      </div>


      <div class="form-group bb">
        <label id="cPost" for="description">Description</label>
        <textarea id="description" rows="2" nz-input type="text" name="description" #description="ngModel"
          [(ngModel)]="postInterface.description" required></textarea>
      </div>




      <div id="buttons">
        <button [disabled]="!form.valid">
          Post
        </button>
        <p (click)="imgToggle()">Add image</p>

        <p [routerLink]="['/home']"> Back</p>
      </div>

    </div>
  </form>
    </ng-template>


    </ng-container>
</nz-modal>


  `,
  styles:[
    `ng-container {
      background:#303030;
      display:flex;
      flex-direction:column;
      justify-content:center



    }
    button {
        background-color: #e91e63;
        color:white;
        border: none;
        margin: 2em 0;
      }
      button:hover {
        background-color: #e91e63;
        color: greenyellow;
      }
     nz-card{
        display:flex;
        flex-direction: column;
        justify-content: center;
        padding:2em;
      }
      #post-preview{
        text-align: right;
        margin-top:1em;
      }
     #post-preview-image{
      object-fit:cover;
      object-position: center;
      width:150px;
      height:100px;
      border-radius:1em;
      border: 1px dashed gray;
     }

   `
  ]
})
export class NzDemoCardMetaComponent implements OnInit {


  print:boolean = false;


  postInterface= {
    userId:'',
    title:'',
    id:'',
    description:'',
    imgUrl:'',
    userName:'',
  }
  @ViewChild('form',{static: true}) form!: NgForm;
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
  constructor( private fbA:FirebaseAuthService, private ps:PostsService, private router:Router){
  }
    userId: string = '';
    userName:string = '';
    ngOnInit(): void {
      const userJson = localStorage.getItem('user');
      if(!userJson) return;
      const user = JSON.parse(userJson);
      this.userId = user.id;
      this.userName = user.displayName;
    }
    img=false;
    imgToggle(){
      this.img = !this.img;
    }
  submit(){

    this.print = true;
    console.log(this.postInterface.title)
    let data = {
      'uid': this.userId,
      'title': this.postInterface.title,
      'id':this.postInterface.id,
      'description': this.postInterface.description,
      'imgUrl': this.postInterface.imgUrl,
      'userName': this.userName,
    }
    console.log(data)

    this.ps.postPost(data).subscribe(data => console.log(data));

    this.router.navigate(['/post']);


  }


}
