import { Component, OnInit} from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { PostsService } from 'src/app/services/posts.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {



logout() {

    return this.fbA.signOut() }

      private authSubject = new BehaviorSubject<any>(null);

      user$ = this.authSubject.asObservable();
      isLoggedIn$ = this.user$.pipe(map((user) => !!user))





      constructor( private fbA:FirebaseAuthService, private ps:PostsService, private router:Router){
      }

        ngOnInit(): void {

        }









}
