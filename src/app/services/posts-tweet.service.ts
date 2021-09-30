import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class PostsTweetService {

  constructor(private authService: AuthService,
    private fireStore: AngularFirestore) { }

  pushTweet(message: string,
    idUser: string,
    username: string,
    tagname: string,
    avatarUrl: string,
    otherItem) {
    this.fireStore.collection('posts')
      .add({
        message: message,
        uid: idUser,
        username: username,
        tagname: tagname,
        avatarUrl: avatarUrl,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        nbLike: 0,
        nbRetweet: 0,
        nbComment: 0,
        ...otherItem
      })
      .then()
      .catch(error => console.log(`Something went wrong ${error.message}`))
  }


  getAllTweets(): Observable<any> {

    return this.fireStore.collection<any>('posts', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(item => {
            
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data(),
            };
          });
        })
      );
  }
  getLikerPost(postId : string) : Observable<any>{

    return this.fireStore.collection('posts')
                          .doc(postId)
                          .collection('users-like')
                          .snapshotChanges()
                          .pipe(
                            map(action => {
                              return action.map(item=>{
                                return{
                                  uid: item.payload.doc.id
                                }
                              })
                            })
                          )
  }
  UpdatelikePost(postId: string, userId: string) {
    let docRef = this.fireStore.collection('posts').doc(postId).collection('users-like');

    docRef.doc(userId).get().subscribe(doc => {
      if (doc.exists) {
        this.fireStore.collection('posts')
          .doc(postId)
          .update({nbLike:firebase.firestore.FieldValue.increment(-1)})//Decrement the nblike of post
          .then(() => {
            this.fireStore.collection('users')
            .doc(userId)
            .collection('profil')
            .doc('profilData')
            .update({nbPostLiked: firebase.firestore.FieldValue.increment(-1) }) //Decrement the nblike of user
           
          })
           // Delete the user from users-like post
          .then(()=>  docRef.doc(userId).delete())

      }
      else {
        this.fireStore.collection('posts')
          .doc(postId)
          .update({
            nbLike: firebase.firestore.FieldValue.increment(1) // increment the nblike in post
          })
          .then(() => {
            this.fireStore.collection('users')
            .doc(userId)
            .collection('profil')
            .doc('profilData')
            .update({nbPostLiked: firebase.firestore.FieldValue.increment(1) })// increment the nblike of user
           
          })
          // Add the user in field users-like post
          .then(()=> docRef.doc(userId).set({ uid: userId }))

      }
    })


  }
}
