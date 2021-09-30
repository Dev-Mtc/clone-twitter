import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserData } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Twitter Clone';
  private show = false;
  
  subs: Subscription[] = [];
  user: UserData;
  isLogged$: Observable<boolean>;
  
  constructor(private authService : AuthService){}

  ngOnInit(): void{
    this.isLogged$ = this.authService.isSigned();
    this.subs.push(
      this.authService.getCurrentUser().subscribe( (user) => {this.user = user; })
    );
  }

  clickEvent(e){
    if(this.show == true ) {
      let paths = e.path.map(p => p.className);
      if(paths.includes('home_header_bottom') || paths.includes('interfaceUser')) return
      else this.show = false;
    }else return;
      
  }

  showInterface(){
    this.show = this.show ? false : true;
  }

  signOut(){
    this.authService.SignOut();
  }

}
