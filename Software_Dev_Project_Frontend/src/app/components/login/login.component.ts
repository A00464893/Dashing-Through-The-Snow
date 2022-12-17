import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



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
    username: "",
    password: ""
  }
  register_input = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    username:''
  }

  constructor(private authService: SocialAuthService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, 
    private userService: UsersService,private sharedService: SharedService,  private _router: Router) {
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
        this.login_input.username = this.provideDetails['email']
        this.login_input.password = this.provideDetails['id']
        this.login()
      }
      else {
        this.register_input.email = this.provideDetails.email
        this.register_input.password = this.provideDetails.id
        this.register_input.confirm_password = this.provideDetails.id
        this.register_input.first_name = this.provideDetails.firstName
        this.register_input.last_name = this.provideDetails.lastName
        this.register()
      }
    })
  }

  login() {
    this.userService.login(this.login_input).subscribe((r : any) =>{
        this.userDetails = r.value
        this.user = this.userDetails.username
        sessionStorage.setItem('user_id',this.userDetails.username)
        sessionStorage.setItem('user_details',JSON.stringify(this.userDetails))
        this.loginFlag = true
        this.sharedService.loginFlag.next(this.loginFlag);
        this.sharedService.route.next('s');
        this._router.navigate(['shop'])
    },err=>{
      if(err.status == 401){
        console.log(err)
        Swal.fire(
          'Error',
          'User Not Found',
          'error'
        )
      }
      else{
        Swal.fire(
          'Error',
          'Wrong Password',
          'error'
        )
      }
      
    })
    this.logged_user.emit(this.userDetails)
    this.login_input = this.userService.clear_Obj(this.login_input)
  }
  register() {
    this.register_input.username = this.register_input.email.toLowerCase()
    this.userDetails = this.userService.register(this.register_input).subscribe((r : any) =>{
      this.userDetails = r.value
      this.user = this.userDetails.username
      this.loginFlag = true
      this.sharedService.loginFlag.next(this.loginFlag);
      this.sharedService.route.next('s');
      sessionStorage.setItem('user_id',this.userDetails.username)
      sessionStorage.setItem('user_details',this.userDetails.toString())
      this._router.navigate(['shop'])
    },err=>{
      Swal.fire(
        'Error',
        'User Already Exists',
        'error'
      )
    }
    )
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
    this.sharedService.loginFlag.next(this.loginFlag);
    this.sharedService.loginFlag.subscribe((flag) => {
      this.loginFlag = flag
  });
  }

}
