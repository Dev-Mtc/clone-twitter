import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, UserData } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  private subs: Subscription[]= [];
  public user: UserData;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subs.push(
      this.authService.getCurrentUser().subscribe( (user) => {this.user = user; console.log(this.user)})
    );
  }
  ngOnDestroy(): void{
    this.subs.map(s => s.unsubscribe);
  }

}
