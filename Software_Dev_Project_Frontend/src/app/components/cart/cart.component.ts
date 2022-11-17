import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Output() updateBadge= new EventEmitter();

  constructor() { }

  badge = 2

  updateCart(){
    this.updateBadge.emit(this.badge)
  }

  ngOnInit(): void {
  }

}
