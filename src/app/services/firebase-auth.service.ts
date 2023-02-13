import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect
} from 'firebase/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of } from 'rxjs';



export interface AuthData {}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  app = initializeApp(environment.firebaseConfig);
  auth = getAuth(this.app);





  constructor(private router: Router) {
    this.restoreUser();
  }

  private authSubject = new BehaviorSubject<any>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));
  autoLogoutTimer: any;

  signUp(

    email: string,
    password: string,
    displayName: string,

  )
  {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName:displayName,
      }).then(()=> {
        this.logIn({'email': email, 'password': password, 'displayName': displayName});

        return user.displayName

      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Codice errore: ${errorCode}, messaggio: ${errorMessage}`);
    });
  }


  logIn(data: { email: string; password: string, displayName: string}) {
    signInWithEmailAndPassword(this.auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem(
        'user',
        JSON.stringify({
          displayName: user.displayName,
          email: user.email,
        })
        );



        this.authSubject.next(user);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Codice errore: ${errorCode}, messaggio: ${errorMessage}`);
      });
    }

    signOut() {
      signOut(this.auth)
      .then(() => {
        localStorage.removeItem('user');
        this.authSubject.next(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Codice errore: ${errorCode}, messaggio: ${errorMessage}`);
      });
    }

    restoreUser() {
      const userJson = localStorage.getItem('user');
      console.log(userJson);
      if (!userJson) {
        return ;
      }
      const user = JSON.parse(userJson);
      this.authSubject.next(user);
    }

  }
