import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @Input() selectedCat: {} | undefined 
  
  @Output() updateBadge= new EventEmitter();

  constructor() { }

  badge = 2

  updateCart(){
    this.updateBadge.emit(this.badge)
  }

  ngOnInit(): void {
  }

}
