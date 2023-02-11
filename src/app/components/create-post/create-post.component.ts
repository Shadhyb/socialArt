import { Component, OnInit } from '@angular/core';
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
print:boolean = false;

postInterface= {
  id:'',
  userId:'',
  title:'',
  description:'',
  imgUrl:'',
  userName:'',
}

  logout() {
    return this.fbA.signOut()
    }

      private authSubject = new BehaviorSubject<any>(null);

      user$ = this.authSubject.asObservable();
      isLoggedIn$ = this.user$.pipe(map((user) => !!user))





      constructor( private fbA:FirebaseAuthService, private ps:PostsService, private router:Router){
      }
        userId: string = '';
        userName:string = '';
        ngOnInit(): void {
          const userJson = localStorage.getItem('user');
          if(!userJson) return;
          const user = JSON.parse(userJson);
          this.userId = user.uid;
          this.userName = user.displayName;
        }
        img=false;
        imgToggle(){
          this.img = !this.img;
        }



      //questo la devi adattare alla card
       // submit(){

       ////   this.print = true;
         // console.log(this.form.value.formPost.title)
         // let data = {
         //   'userId': this.userId,
         //   'title': this.form.value.formPost.title,
         //   'ingredients': this.form.value.formPost.ingredients,
         //   'method': this.form.value.formPost.method,
         //   'description': this.form.value.formPost.description,
         //   'imgUrl': this.form.value.formPost.imgUrl,
         //   'userName': this.userName,
         // }

         // this.ps.postPost(data).subscribe(data => console.log(data));
         // this.router.navigate(['/posts']);
        //}



}
