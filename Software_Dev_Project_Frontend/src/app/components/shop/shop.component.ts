import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Options, LabelType } from "@angular-slider/ngx-slider";;

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
  @Output() shop_item = new EventEmitter();
  @Output() updateBadge = new EventEmitter();

  constructor() { }

  price_attributes = {

    min : 0,
    max : 100000,
    options : {
      floor: 0,
      ceil: 100000,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return "<b>Min:</b> $" + value;
          case LabelType.High:
            return "<b>Max:</b> $" + value;
          default:
            return "$" + value;
        }
      }
    }
  }
  
  check_selected() {
    if (this.selectedCat && this.selectedCat.length > 0)
      return true
    else
      return false
  }

  clear_selection(select: any){
    if (select.key == 'price'){
      this.price_attributes.min = this.price_attributes.options.floor
      this.price_attributes.max = this.price_attributes.options.ceil
    }
    this.selectedCat.splice(this.selectedCat.findIndex(x => x.key === select.key && x.value === select.value),1)
  }
  price_filter(event: any) {
    console.log(event)
    const value = '$'+event.value.toString()+ ' - ' + '$'+event.highValue.toString()
    if (this.selectedCat && this.selectedCat.findIndex(x => x.key === "price") != -1){
      this.selectedCat.splice(this.selectedCat.findIndex(x => x.key === "price"),1)
      this.selectedCat.push({ key: 'price',value: value})
    }
    else if (this.selectedCat){
      this.selectedCat.push({ key: 'price',value: value})
    }
    else{
      this.selectedCat = []
      this.selectedCat.push({ key: 'price',value: value})
    } 
    this.shop_item.emit(this.selectedCat)
  }

  badge = 2

  updateCart() {
    this.updateBadge.emit(this.badge)
  }

  ngOnInit(): void {


  }

}
