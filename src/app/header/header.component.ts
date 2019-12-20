import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/Auth.service';

@Component({
  selector: 'customHeader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isVisible: boolean = false;
  public user: string;
  public imagePath: string;
  constructor(private authService: AuthenticationService) {
  }
  public ngOnInit() {
    this.authService.authContext.subscribe(data => {
      if (data) {
        this.isVisible = true;
        this.user = data.user.displayName ? data.user.displayName : data.user.email;
        this.imagePath = data.user.photoURL ? data.user.photoURL : 'https://material.angular.io/assets/img/examples/shiba1.jpg';
      }
    });
  }

  public signOut() {
    this.isVisible = false;
    this.authService.SignOut();
  }

}
