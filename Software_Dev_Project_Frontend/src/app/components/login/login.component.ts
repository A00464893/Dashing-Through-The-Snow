import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() logged_user = new EventEmitter();
  loginFlag = false
  constructor(private authService: SocialAuthService) { }

  user = ''
  userDetails: SocialUser | undefined;

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.loggedIn()
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.loggedIn()
  }

  signOut(): void {
    this.authService.signOut();
  }
  loggedIn(){
    this.authService.authState.subscribe((result) => {
      this.userDetails = result;
      this.user = result.name;
      this.logged_user.emit(this.user)
    })
    
  }
  ngOnInit(): void {
  }

}
