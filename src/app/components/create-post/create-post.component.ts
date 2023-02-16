import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { BehaviorSubject, Subject, Subscription, combineLatest, map } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/post';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonComponent } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  a = 'url("")';

  post!: Post;
  sub: Subscription = new Subscription();
  subLog: Subscription = new Subscription();
  post$ = new Subject<Post | null>();


  constructor(private fbA:FirebaseAuthService){}
  ngOnInit(): void {

  }


  logout() {

    return this.fbA.signOut() }

      private authSubject = new BehaviorSubject<any>(null);

      user$ = this.authSubject.asObservable();
      isLoggedIn$ = this.user$.pipe(map((user) => !!user))


  }















