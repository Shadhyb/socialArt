import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private fbA:FirebaseAuthService, private ps:PostsService, private fbDb:FirebaseDbService) { }




  posts: any;
  usersId: any = [];
  arr: any = [];
  sub = new Subscription();
  ngOnInit(): void {
    this.sub = combineLatest(
      this.ps.getPosts(),
      this.ps.getAllFav(),
      this.fbDb.get()
    ).subscribe(([posts, fav, users]) => {
      this.usersId = Object.keys(users);

      this.usersId.forEach((user: any) => {
        let postsUser = posts.filter((post: any) => post.userId === user);
        let somm = 0;

          postsUser.forEach((post: any) => {
            let count = fav.filter((fav: any) => fav.postId === post.id).length;
            somm += count;
          });
          if(somm > 0)this.arr.push({ 'user': users[user], 'like': somm });
      });
      this.arr.sort((a: any, b: any) => b.like - a.like);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}



