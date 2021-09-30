import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService, UserData } from 'src/app/services/auth.service';
import { PostsTweetService } from 'src/app/services/posts-tweet.service';

@Component({
  selector: 'app-interact',
  templateUrl: './interact.component.html',
  styleUrls: ['./interact.component.scss']
})
export class InteractComponent implements OnInit, OnDestroy {

  @Input() postsId: string;
  @Input() postsNbComment: number;
  @Input() postsNbRetweet: number;
  @Input() postsNbLike: number;
  @Input() postsLiked: boolean;

  public currentUser: UserData;
  private subs: Subscription[] = [];
  public isLiked$: Observable<boolean> ;
  constructor(private tweetService: PostsTweetService,
    private authService: AuthService) {
    this.subs.push(this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;

    }));
  }

  ngOnInit(): void {
    this.isLiked$ = this.getLikers();
  }
  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
  getLikers(): Observable<boolean>{
    let subject = new Subject<boolean>();
    let users = this.tweetService.getLikerPost(this.postsId)
    let arrayUser;
    users.subscribe(users => {
      arrayUser = users.filter(u => u.uid === this.currentUser.uid)
      if(arrayUser.length > 0){
         subject.next(true);
        
      }
      else subject.next(false);
    })
    return subject.asObservable();
  }


  fav() {
    this.tweetService.UpdatelikePost(this.postsId, this.currentUser.uid);
  }
}
