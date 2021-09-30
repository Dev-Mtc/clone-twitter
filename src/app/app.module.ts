import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule}  from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InteractComponent } from './components/interact/interact.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ExploreComponent } from './components/explore/explore.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ListsComponent } from './components/lists/lists.component';
import { ComposeTweetComponent } from './components/compose-tweet/compose-tweet.component';


const firebaseConfig = {
  apiKey: "AIzaSyD51PCN-SVgRb9wcBX700P1eUj4XAn_8Ug",
  authDomain: "twitter-clone-1031d.firebaseapp.com",
  projectId: "twitter-clone-1031d",
  storageBucket: "twitter-clone-1031d.appspot.com",
  messagingSenderId: "642920597221",
  appId: "1:642920597221:web:a91c6859ba704ffd22b60c"
};
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    NotfoundComponent,
    InteractComponent,
    DetailPostComponent,
    ProfilComponent,
    ExploreComponent,
    NotificationsComponent,
    MessagesComponent,
    BookmarksComponent,
    ListsComponent,
    ComposeTweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NoopAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
