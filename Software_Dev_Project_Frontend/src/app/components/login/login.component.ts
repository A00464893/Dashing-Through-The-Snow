import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/services/users.service';
import { throwError } from 'rxjs';



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
    email: "",
    password: ""
  }
  register_input = {
    first: "",
    last: "",
    email: "",
    password: "",
    confirm_password: "",

  }

  constructor(private authService: SocialAuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private userService: UsersService) {
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
  provideDetails: SocialUser | any;
  userDetails: Object | any

  signInWithGoogle(type: string): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.loggedIn(type)
  }

  signInWithFB(type: string): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.loggedIn(type)
  }

  signOut(): void {
    this.authService.signOut();
  }
  loggedIn(type: string) {
    this.authService.authState.subscribe((result) => {
      this.provideDetails = result;
      if (type == 'l') {
        this.login_input.email = this.provideDetails['email']
        this.login_input.password = this.provideDetails['id']
        this.login()
      }
      else {
        this.register_input.email = this.provideDetails.email
        this.register_input.password = this.provideDetails.id
        this.register_input.confirm_password = this.provideDetails.id
        this.register_input.first = this.provideDetails.firstName
        this.register_input.last = this.provideDetails.lastName
        this.register()
      }
    })
  }

  login() {
    this.userDetails = this.userService.login(this.login_input)
    this.user = this.userDetails.name;
    this.logged_user.emit(this.userDetails)
    this.login_input = this.userService.clear_Obj(this.login_input)
  }
  register() {
    this.userDetails = this.userService.register(this.login_input)
    this.user = this.userDetails.name;
    this.logged_user.emit(this.userDetails)
    this.register_input = this.userService.clear_Obj(this.register_input)
  }

  signInWithProviders(type: string) {
    if (type == 'g')
      this.signInWithGoogle('l')
    else
      this.signInWithFB('l')
  }

  registerWithProviders(type: string) {
    if (type == 'g')
      this.signInWithGoogle('r')
    else
      this.signInWithFB('r')

  }
  ngOnInit(): void {
    this.login_input = this.userService.clear_Obj(this.login_input)
    this.register_input = this.userService.clear_Obj(this.register_input)
  }

}
