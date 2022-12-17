import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SharedService } from './services/shared.service';

interface Selected_Cat {
  key: string;
  value: string;
}

interface Shop_Categories {
  key: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loginFlag = true
  config = {
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
  }



  // forecasts?: MatTableDataSource<WeatherForecast>
  // displayedColumns = ["Date","Temp. (C)","Temp. (F)","Summary"]
  constructor(http: HttpClient, private _router: Router, private sharedService: SharedService) {
    // http.get<WeatherForecast[]>('http://localhost:5175/weatherforecast').subscribe(r => {
    //   this.forecasts = new MatTableDataSource(r);
    // }, error => console.error(error));
    this.sharedService.loginFlag.subscribe((flag) => {
      this.loginFlag = flag
    });
    this.sharedService.route.subscribe((r) => {
      this.route = r
 });
    this.sharedService.badge.subscribe((badge) => {
      this.badge = badge
    });
  }

  shopCat!: Selected_Cat[];
  title = 'Chirstmas Caroll';
  route = 'h'
  user = {}
  badge = 0;
  hide = true

  getUser(user: string) {
    this.user = user
    sessionStorage.setItem('user', this.user.toString())
    if ('name' in this.user) {
      this.loginFlag = true
    }
    else
      this.loginFlag = false
  }

  getRoute(route: string) {
    this.route = route
    // if(this.route == 'l')
    //   this._router.navigate(['login'])
    // else if(this.route == 'h')
    //   this._router.navigate(['home'])
    // else if(this.route == 's')
    // this._router.navigate(['shop'])
  }

  getSelectedCat(item: any) {
    this.shopCat = item
  }

  getBadge(badge: number) {
    this.badge = badge
  }

  //----------------------------------------------------------------------------------------------------------------------


  shop_categories: Shop_Categories[] = []

  selectedItem(cat: any): void {
    this.route = 's'
    if (this.shopCat && this.shopCat.findIndex(x => x.key === cat.key && x.value === cat.value) != -1) {
      console.log(this.shopCat.findIndex(x => x.key === cat.key && x.value === cat.value))
      this.shopCat.splice(this.shopCat.findIndex(x => x.key === cat.key && x.value === cat.value), 1)
      this.shopCat.push(cat)
    }
    else if (this.shopCat && this.shopCat.findIndex(x => x.key === cat.key) != -1) {
      this.shopCat.splice(this.shopCat.findIndex(x => x.key === cat.key), 1)
      this.shopCat.push(cat)
    }
    else if (this.shopCat) {
      this.shopCat.push(cat)
    }
    else {
      this.shopCat = []
      this.shopCat.push(cat)
    }
    sessionStorage.setItem('route', this.route)


  }

  getShopItems() {
    return [
      {
        key: 'category',
        value: "Trees"
      },
      {
        key: 'category',
        value: "Cakes"
      }
    ]
  }


  changeRoute(route: string) {
    this.route = route
    sessionStorage.setItem('route', this.route)
  }
  login() {
    this.route = 'l'
    sessionStorage.setItem('user', '')
    sessionStorage.setItem('route', this.route)
    this.changeRoute(this.route)
  }
  logout() {
    this.route = 'h'
    sessionStorage.clear()
    sessionStorage.setItem('route', this.route)
    sessionStorage.setItem('user', '')

  }

  ngOnInit(): void {
    this.route = 'h'
    this.changeRoute(this.route)
    this.loginFlag = this.sharedService.loginFlag.getValue()
    this.shop_categories = this.getShopItems()
    this._router.navigate(['home'])
  }


}

// interface WeatherForecast {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }
