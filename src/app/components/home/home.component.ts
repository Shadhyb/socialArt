import { Component } from '@angular/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Subscription, combineLatest } from 'rxjs';
import { Post } from 'src/app/post';
import { PostsService } from 'src/app/services/posts.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { UsersComponent } from '../users/users.component';


@Component({
  selector: 'nz-demo-layout-top',
  template: `
    <nz-layout>
      <nz-header>
        <div class="logo"><h1>BeArts</h1></div>
        <ul nz-row nz-menu nzMode="horizontal">
          <li nz-menu-item>
            <nz-input-group [nzSuffix]="suffixIconSearch">
              <input type="text" nz-input placeholder="search" nz-popover n/>

            </nz-input-group>
            <ng-template #suffixIconSearch>
              <button nz-button nzType="primary" nzSearch nzShape="circle">
                <span nz-icon nzType="search"></span>
              </button>
            </ng-template>
          </li>
          <li nz-menu-item>
            <nz-avatar
              nzIcon="user"
              nzSrc=""
              nz-popover
              [nzPopoverContent]="profile"
              nzPopoverPlacement="right"
            ><a><ng-template #avatar></ng-template></a></nz-avatar>
          </li>
          <li nz-menu-item>
            <a
              nz-icon
              nzType="mail"
              nzTheme="fill"
              nz-popover
              [nzPopoverContent]="message"
              nzPopoverPlacement="bottomRight"
              routerLink="messages"
            ></a>
          </li>
          <li nz-menu-item>
            <a
              nz-icon
              nzType="bell"
              nzTheme="fill"
              nz-popover
              [nzPopoverContent]="notification"
              nzPopoverPlacement="bottomLeft"

            ></a>
          </li>
          <li>
            <button id="logout" (click)="logout()" routerLink="">Esci</button>
          </li>
        </ul>
      </nz-header>
      <nz-content>
        <div class="inner-content"
 >
 <div nz-row>
 <div>
      <nz-table
        #rowSelectionTable
        nzShowPagination
        nzShowSizeChanger
        [nzData]="listOfData"
        [nzPageSizeOptions]="[5, 10, 15, 20, 50, 100]"
        [nzPageSize]="5"
        (nzCurrentPageDataChange)="onCurrentPageDataChange($event)"
      >

        <tbody>
          <tr
            *ngFor="let data of rowSelectionTable.data"
            [routerLink]="['/details', data.post.id]"
            id="bot"
          >
            <td>
            <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionLike]">
      <nz-card-meta
        nzTitle="{{ data.post.userName }}"
        nzDescription="{{ data.post.title }}"
        [nzAvatar]="avatarTemplate"
      ></nz-card-meta>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar nzSrc=""></nz-avatar>
    </ng-template>
    <ng-template #coverTemplate>
      <img alt="example" src="{{data.post.imageUrl}}" />
    </ng-template>
    <ng-template #actionLike>
    <span>{{ data.like }} </span>
              <span nz-icon nzType="like" [nzTheme]="'fill'"></span>
    </ng-template>



            <td>

            </td>
          </tr>
        </tbody>
      </nz-table>
    </div>
 </div>

          </div>
        </nz-content>
        <nz-footer><h1>BeArts</h1>
        <p>be parts of arts</p>
      </nz-footer>
    </nz-layout>
    <ng-template #message>Messaggi</ng-template>
    <ng-template #notification>Notifiche</ng-template>
    <ng-template #profile><app-profile></app-profile></ng-template>
    <ng-template #avatar></ng-template>
    `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');

      .logo {
        width: 120px;
        height: 31px;

        margin: 16px 24px 16px 0;
        float: left;
      }
      h1 {
        color: greenyellow;
        font-family: 'Shadows Into Light', cursive;
        margin-bottom:0;

      }
      h3{
        color:#fff;
        span{
          font-family: 'Shadows Into Light', cursive;
          color:greenyellow;

        }
      }
      p{
       color:aqua;
       font-family: 'Shadows Into Light', cursive;
       padding-left: 5.5em;
       margin-top: 0;
        font-size:larger;

      }
      [nz-icon] {
        color: greenyellow;
      }
      a {
       margin-left: 1em;
       font-size:x-large;
      }
      a:nth-first-child{
        margin-left:0
      }
      nz-input-group {
        background: #303030;
        color: #fff;
        border: none;
      }
      input {
        background: #303030;
        color: #fff;
      }
      nz-header {
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        align-items: baseline;
        background: #e91e63;
        position:sticky;
        z-index:10;
      }
      nz-layout{
        background: #303030;
        color:#fff
      }

      ul {
        list-style-type: none;
      }

      [nz-menu] {
        line-height: 64px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      nz-content {
        padding: 0 50px;

      }

      nz-footer {
        background: #303030;
        text-align: center;

      }

      .inner-content {
        background: #4c4c4c;
        color: #fff;
        padding: 24px;
        min-height: 280px;
        height:100vh;

      }
      #logout {background:none}
      button {
        background-color: #e91e63;
        border: none;
      }
      button:hover {
        background-color: #e91e63;
        color: greenyellow;
      }
    `,
  ],
})
export class NzDemoLayoutTopComponent {


logout() {
return this.fbA.signOut()
}
checked = false;
loading = false;
indeterminate = false;
listOfData: readonly any[] = [];
listOfCurrentPageData: readonly any[] = [];
setOfCheckedId = new Set<number>();

constructor(private ps: PostsService, private fbA:FirebaseAuthService, private fbD:FirebaseDbService) {}

updateCheckedSet(id: number, checked: boolean): void {
  if (checked) {
    this.setOfCheckedId.add(id);
  } else {
    this.setOfCheckedId.delete(id);
  }
}

onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
  this.listOfCurrentPageData = listOfCurrentPageData;
}

onItemChecked(id: number, checked: boolean): void {
  this.updateCheckedSet(id, checked);
}

sendRequest(): void {
  this.loading = true;
  const requestData = this.listOfData.filter((data) =>
    this.setOfCheckedId.has(data.id)
  );
  console.log(requestData);
  setTimeout(() => {
    this.setOfCheckedId.clear();
    this.loading = false;
  }, 500);
}

sub: Subscription = new Subscription();

ngOnInit(): void {
  setTimeout(
    () =>
      (this.sub = combineLatest(
        this.ps.getPosts(),
        //this.ps.getAllFav()
      ).subscribe(([posts ]) => {
        let arr: any[] = [];

        posts.forEach((post: any) => {
          let like = 0;
       //   like = favs.filter((fav: any) => fav.postId == post.id).length;

          arr.push({ post: post, like: like });
        });

        this.listOfData = arr;
      })),
    2000
  );
}

  private authSubject = new BehaviorSubject<any>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user))











}

