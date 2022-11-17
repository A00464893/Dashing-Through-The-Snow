import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @Output() logged_user = new EventEmitter();
  email_login = new FormControl('', [Validators.required, Validators.email]);
  email_register = new FormControl('', [Validators.required, Validators.email]);
  login_hide = true;
  register_hide = true;

  login_input = {
    email:"",
    password:""
  }
  register_input = {
    first:"",
    last:"",
    email:"",
    password:"",
    confirm_password:"",

  }

  constructor(private authService: SocialAuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,) {
    this.matIconRegistry.addSvgIcon(
      "google",
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("../../../assets/Google.svg"))
    this.matIconRegistry.addSvgIcon(
      "facebook",
      this.domSanitizer
        .bypassSecurityTrustResourceUrl("../../../assets/facebook.svg"))
  }

  getLoginEmailError() {
    if (this.email_login.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email_login.hasError('email') ? 'Not a valid email' : '';
  }
  getRegisterEmailError() {
    if (this.email_register.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email_register.hasError('email') ? 'Not a valid email' : '';
  }
  loginFlag = false
  

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
  loggedIn() {
    this.authService.authState.subscribe((result) => {
      this.userDetails = result;
      this.user = result.name;
      this.logged_user.emit(this.userDetails)
    })

  }
  ngOnInit(): void {
  }

}
