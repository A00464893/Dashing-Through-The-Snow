import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() getBadge = new EventEmitter();
  constructor() { }

  @Input() loginFlag: boolean | undefined;
  badge = 0
  images = [{
    img: "../../../assets/image1.png",
    label:"",
    button: ""
  },
  {
    img: "../../../assets/image2.png",
    label:"",
    button: ""
  },
  {
    img: "../../../assets/image3.png",
    label:"",
    button: ""
  }
  ];
  updateBadge(item: Object) {
    this.getBadge.emit(this.badge)
  }
  ngOnInit(): void {
  }

}
