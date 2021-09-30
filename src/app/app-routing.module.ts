import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TwitterGuard } from './services/twitter.guard';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { InteractComponent } from './components/interact/interact.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ExploreComponent } from './components/explore/explore.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ListsComponent } from './components/lists/lists.component';
import { ComposeTweetComponent } from './components/compose-tweet/compose-tweet.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [TwitterGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [TwitterGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'explore',
    component: ExploreComponent,
    canActivate: [TwitterGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [TwitterGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [TwitterGuard]
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [TwitterGuard]
  },
  {
    path: ':tagname/status/:idPost',
    component: DetailPostComponent,
    canActivate: [TwitterGuard]
  },
  {
    path: '**',
    component: NotfoundComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
