import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { StripeModule } from "stripe-angular"
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule
} from 'ngx-ui-loader';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSelectFilterModule } from 'mat-select-filter';
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent, OrderDialog } from './components/account/account.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ShopComponent } from './components/shop/shop.component';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {

  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-center",
  "bgsSize": 40,
  "bgsType": "rectangle-bounce",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": false,
  "fgsColor": "#00ACC1",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "chasing-dots",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#00ACC1",
  "pbDirection": "ltr",
  "pbThickness": 5,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300

};

const routes: Routes = [
  // { path: '', redirectTo:"home" ,pathMatch:'full'},
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "cart", component: CartComponent },
  { path: "account", component: AccountComponent },
  { path: "shop", component: ShopComponent },
  { path: "aboutUs", component: AboutUsComponent }

]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    CartComponent,
    AccountComponent,
    AboutUsComponent,
    ShopComponent,
    OrderDialog
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(routes), BrowserAnimationsModule, SocialLoginModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatTableModule, NgbModule,
    MatDividerModule, NgxUiLoaderModule.forRoot(ngxUiLoaderConfig), NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, MatIconModule, MatMenuModule,
    MatSelectModule, MatToolbarModule, MatTooltipModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatExpansionModule,
    NgxSliderModule, MatListModule, MatRadioModule, Ng2SearchPipeModule, MatSelectFilterModule, MatPaginatorModule, MatGridListModule, MatSortModule, MatDialogModule,
    MatStepperModule, MatMomentDateModule,MatNativeDateModule, 
    StripeModule.forRoot("sk_test_51MFR71LzcySuQUXlpZ68iaZlriD6rwfbob4feYJ9v3A9x5KX0pmoDUoHZaIEbYa1mavvfLDZlFc1GsKfMjpQ9lmk00jtBP7aR0")
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          // { provide: MAT_SELECT_CONFIG, useValue: { disableOptionCentering:'false'}} ,
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1031864687591-hd5ujkgh12nuuuuqug15tgp2jb69cen3.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('561602290896109'),
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
