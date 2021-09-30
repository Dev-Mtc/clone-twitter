import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser : UserData;
  private currentUser$ = new BehaviorSubject<UserData>(null);
  private UserInfo: Observable<firebase.User>  ;
  private basePath = '/uploads';
  private defaultAvatarUrl = "https://firebasestorage.googleapis.com/v0/b/twitter-clone-1031d.appspot.com/o/uploads%2Fprofil.png?alt=media&token=ca201ec5-64a0-47ea-bbf0-cfee451c7b20"
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) 
  {
    this.UserInfo = fireAuth.authState; 
    this.UserInfo.subscribe(user => {
      if (user) {
        this.fireStore.collection<UserData>('users')
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            this.currentUser = currentUser;
            this.currentUser$.next(currentUser);
          });
      }
    });
  }

  /* SignIn to firebase and take user information from firestore */ 
  async signIn(email: string, password: string){
    await this.fireAuth.signInWithEmailAndPassword(email, password)
                        .then(res => {
                          this.router.navigateByUrl("/home")
                         

                          this.fireStore.collection<UserData>('users')
                                        .doc<UserData>(res.user.uid)
                                        .valueChanges()
                                        .subscribe((user)=>{
                                          if(user) this.currentUser$.next(user)
                                        })
                        })
                        .then(()=>{
                          this.fireStore.collection<UserData>('users')
                                        .doc<UserData>(this.currentUser.uid)
                                        .collection<UserData>('profil')
                                        .doc<UserData>('profilData')
                                        .valueChanges()
                                        .subscribe((user)=>{
                                          if(user) this.currentUser$.next(user)
                                        })
                        })
                        .catch(error => console.error("Error: " , error))
  }
  /* SignUp to firebase and save user informations in firestore */ 
  async signUp(
                email: string,
                password: string,
                username: string, 
                tagname: string, 
                avatar: File | null
              )
  {

    await this.fireAuth.createUserWithEmailAndPassword(email, password)
                        .then((res)=>{
                          
                          this.fireStore.collection('users')
                                        .doc(res.user.uid)
                                        .set({
                                          username: username,
                                          tagname: tagname,
                                          email: email,
                                          uid: res.user.uid,
                                          date: firebase.firestore.FieldValue.serverTimestamp(),
                                          avatarUrl: this.defaultAvatarUrl
                                        })
                          .then((value)=>{
                            this.fireStore.collection('users')
                                          .doc(res.user.uid)
                                          .collection('profil')
                                          .doc("profilData")
                                          .set({
                                            nbFollower:0,
                                            nbFollow: 0,
                                            nbPostLiked: 0,
                                            nbPosts:0
                                          })
                          })
                          .then((values)=>{
                            console.log('value : ', values);
                            
                            this.fireStore.collection<UserData>('users')
                                          .doc<UserData>(res.user.uid)
                                          .valueChanges()
                                          .subscribe((user)=>{
                                            if(user) this.currentUser$.next(user)
                                          })
                          })
                          .then((values)=>{
                            this.fireStore.collection<UserData>('users')
                                          .doc<UserData>(res.user.uid)
                                          .collection<UserData>('profil')
                                          .doc<UserData>('profilData')
                                          .valueChanges()
                                          .subscribe((user)=>{
                                            if(user) this.currentUser$.next(user)
                                          })
                          })
                        })     
                        .catch(error => console.error("Error: " , error))  
  }

  /* Get user informations */ 
  getUserInfo(): Observable<firebase.User>{
    return this.UserInfo;
  }


  /* Get current user saved */ 
  getCurrentUser() : Observable<UserData>{
    return this.currentUser$.asObservable();
  }

  isSigned(){
    return this.getUserInfo().pipe(
      
      map(user => user !== null),
      tap(result => {
        if (!result) {
          return result;
        } else {
          return result;
        }
      })
    );
  }
  SignOut(){
    this.fireAuth.signOut();
    this.currentUser = null;
    this.currentUser$.next(this.currentUser);
    this.router.navigateByUrl('signin');
  }
}


export interface UserData{
  email?: string, 
  uid?: string, 
  username?: string, 
  tagname?: string,
  avatarUrl?: string,
  nbFollower:number,
  nbFollow: number,
  nbPostLiked: number,
  nbPosts:number
}