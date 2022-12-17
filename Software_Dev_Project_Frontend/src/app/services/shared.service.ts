import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  loginFlag: BehaviorSubject<boolean> = new BehaviorSubject(false);

  badge: BehaviorSubject<number> = new BehaviorSubject(0);

  route: BehaviorSubject<string> = new BehaviorSubject('h');

  constructor() { }
}
