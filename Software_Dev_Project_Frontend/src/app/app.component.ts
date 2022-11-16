import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
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
  constructor(http: HttpClient) {
    // http.get<WeatherForecast[]>('http://localhost:5175/weatherforecast').subscribe(r => {
    //   this.forecasts = new MatTableDataSource(r);
    // }, error => console.error(error));
  }
  
  title = 'Chirstmas Caroll';
  route = 'h'
  user = '' 
 
  getUser(user:string){
    this.user = user
    this.user = sessionStorage.getItem('user') || ''
  }

  getRoute(route : string){
    this.route = route
  }

 

 
}

// interface WeatherForecast {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }
