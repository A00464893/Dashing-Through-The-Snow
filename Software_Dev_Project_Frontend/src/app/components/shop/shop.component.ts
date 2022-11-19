import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Obj } from '@popperjs/core';

interface Selected_Cat {
  key: string;
  value: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @Input() selectedCat!: Selected_Cat[];

  @Output() updateBadge = new EventEmitter();

  constructor() { }

  price_attributes = {
    disabled: false,
    max: 100000,
    min: 0,
    thumbLabel: false
  }
  
  check_selected() {
    if (this.selectedCat && this.selectedCat.length > 0)
      return true
    else
      return false
  }

  clear_selection(select: any){
    this.selectedCat.splice(this.selectedCat.findIndex(x => x.key === select.key && x.value === select.value),1)
  }
  price_filter(event: any) {
    this.selectedCat.push({ key: 'price',value: event})
  }

  badge = 2

  updateCart() {
    this.updateBadge.emit(this.badge)
  }

  ngOnInit(): void {


  }

}
