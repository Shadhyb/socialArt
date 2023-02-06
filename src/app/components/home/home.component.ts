import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-layout-top',
  template: `
    <nz-layout>
      <nz-header>
        <div class="logo"><h1>BeArts</h1></div>
        <ul nz-row nz-menu nzMode="horizontal">
          <li nz-menu-item>
            <nz-input-group [nzSuffix]="suffixIconSearch">
              <input type="text" nz-input placeholder="search" />
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
              nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            ></nz-avatar>
          </li>
          <li nz-menu-item>
            <a
              nz-icon
              nzType="mail"
              nzTheme="fill"
              nz-popover
              [nzPopoverContent]="message"
              nzPopoverPlacement="bottomRight"
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
        </ul>
      </nz-header>
      <nz-content>
        <div class="inner-content">Content</div>
      </nz-content>
      <nz-footer><h1>BeArts</h1>
      <p>be parts of arts</p>
    </nz-footer>
    </nz-layout>
    <ng-template #message>Messaggi</ng-template>
    <ng-template #notification>Notifiche</ng-template>
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
      }
      p{
       color:aqua;

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
      }
      nz-layout{
        background: #303030;
        color:#fff
      }
      nz-footer {
        background: #303030;
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
        text-align: center;
      }

      .inner-content {
        background: #fff;
        padding: 24px;
        min-height: 280px;
      }
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
export class NzDemoLayoutTopComponent {}
