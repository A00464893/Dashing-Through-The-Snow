import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() getBadge = new EventEmitter();
  constructor() { }

  loginFlag = false
  badge = 0
  login(loginFlag:boolean){
    this.loginFlag = loginFlag
    
  }
  updateBadge(item:Object){
    this.getBadge.emit(this.badge)
  }
  ngOnInit(): void {
  }

}
