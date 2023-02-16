import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { Observable, Observer } from 'rxjs';
import { Route, Router } from '@angular/router';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { UserCredential } from 'firebase/auth';

import { NzMessageService } from 'ng-zorro-antd/message';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

loading = false;
avatarUrl?: string;
isVisibleMiddle = false;
isConfirmLoading= false;
@Input() show: boolean | undefined;


  constructor(private msg: NzMessageService, private fbA:FirebaseAuthService, private routes:Router) {}

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 5MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
         this.loading = true;
        break;
      case 'done':

        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
  @Input() username = '';
  name(){
    return this.fbA.auth.currentUser?.displayName
  }
  avatar(){
    return console.log(this.avatarUrl)
  }
  addFriends(){
    this.routes.navigate(['/users'])
  }







  ngOnInit(): void {

  }

}
