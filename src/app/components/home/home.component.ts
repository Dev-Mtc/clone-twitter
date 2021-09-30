import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, UserData } from 'src/app/services/auth.service';
import { PostsTweetService } from 'src/app/services/posts-tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  public currentUser: UserData;
  private subs : Subscription[] = [];
  public posts: any[] = [];

  tweetForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private tweetService: PostsTweetService) 
  {
     this.subs.push(this.authService.getCurrentUser().subscribe(user => {
       this.currentUser = user;
       
      }));
     this.subs.push(
      this.tweetService.getAllTweets().subscribe(async (posts) => {this.posts = posts;})
    );
  }

  ngOnInit(): void {
    this.initForm();
  }
  ngOnDestroy(): void{
    this.subs.map(sub => sub.unsubscribe);
  }
  initForm() {
    this.tweetForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{1,}/)]]
    });
  }
  
  postTweet(){
    let message = this.tweetForm.get('message').value.toString();
    this.tweetService.pushTweet(message, this.currentUser.uid ,this.currentUser.username, this.currentUser.tagname, this.currentUser.avatarUrl, null)
    this.tweetForm.reset();
  }
}
