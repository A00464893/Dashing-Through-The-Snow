import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() getBadge = new EventEmitter();
  constructor() { }

  @Input() loginFlag: boolean | undefined ;
  badge = 0
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  updateBadge(item:Object){
    this.getBadge.emit(this.badge)
  }
  ngOnInit(): void {
  }

}
