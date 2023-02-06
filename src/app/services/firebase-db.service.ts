import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, push, ref, set } from "firebase/database";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'any'
})
export class FirebaseDbService {
  app = initializeApp(environment.firebaseConfig);
  database = getDatabase(this.app);
  constructor() { }

  async get(){
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available");
        return;
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Codice errore: ${errorCode}, messaggio: ${errorMessage}`);
    });

}
post(userId: string, name:string, email:string, imageUrl:string){
    const a = ref(this.database, 'users/' + userId)
    set(a, {
      email: email,
      profile_picture: imageUrl,
      username: name,
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Codice errore: ${errorCode}, messaggio: ${errorMessage}`);
    });
}}
