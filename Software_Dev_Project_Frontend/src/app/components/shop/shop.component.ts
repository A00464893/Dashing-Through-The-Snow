import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Options, LabelType } from "@angular-slider/ngx-slider";import { UsersService } from 'src/app/services/users.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

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
  cart_items: any;
  categories : any
  constructor(private userService:UsersService,private sharedService: SharedService) { }

  itemsArr:any
  filteredArr:any
  product_cat:any

  price_attributes = {

    min : 0,
    max : 200,
    options : {
      floor: 0,
      ceil: 200,
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
    this.filteredArr = this.itemsArr
    this.selectedCat.forEach(element => {
      if(element.key == 'price'){
        this.filteredArr = this.filteredArr.filter((r:any)=>{
          return r.price > this.price_attributes.min && r.price < this.price_attributes.max
      })
      }
      else if(element.key == 'Category'){
        this.filteredArr = this.filteredArr.filter((x:any)=> x.category == element.value)
      }
    });
  }
  price_filter(event: any) {
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
    this.filteredArr = this.filteredArr.filter((r:any)=>{
        return r.price > event.value && r.price < event.highValue
    })
    this.shop_item.emit(this.selectedCat)
  }

  badge =0
  cat_filter(e:any,item:any){
    this.filteredArr = this.itemsArr.filter((x:any)=> x.category == item.selected[0].value)
    if(this.selectedCat && this.selectedCat.findIndex(x => x.key === "Category") != -1){
      this.selectedCat.splice(this.selectedCat.findIndex(x => x.key === "Category"),1) 
      this.selectedCat.push({ key: 'Category',value: item.selected[0].value})
    }
    else if (this.selectedCat){
      this.selectedCat.push({ key: 'Category',value: item.selected[0].value})
    }
    else{
      this.selectedCat = []
      this.selectedCat.push({ key: 'Category',value: item.selected[0].value})
    } 

  }
  updateCart(item:any) {
    const index = this.cart_items.findIndex((x:any)=>x.product_id.toString() === item.id.toString())
    if (index != -1){
      Swal.fire('Item Present in Cart', '', 'warning');
    }
    else{
      this.userService.add_cart_item({username: sessionStorage.getItem('user_id'),product_id:item.id}).subscribe((r:any)=>{
        this.cart_items = r.value
        this.sharedService.badge.next(this.cart_items.length)
      })
    }
    this.updateBadge.emit(this.badge)
  }
  ngOnInit(): void {

    this.userService.get_all_products().subscribe((r:any)=>{
      this.itemsArr = r.value
      this.userService.get_all_product_category().subscribe((r:any)=>{
        this.product_cat = r.value
        this.itemsArr.forEach((element:any) => {
          const index = this.product_cat.findIndex((x:any)=> x.id == element.category_id)
          element['category'] = this.product_cat[index]['name']
          element['product_category_description'] = this.product_cat[index]['desc']
    
        });
      })
      this.filteredArr = this.itemsArr
    })
    
    this.userService.get_cart_item({ username: sessionStorage.getItem('user_id') }).subscribe((r:any) => {
      this.cart_items = r.value
      this.sharedService.badge.next(this.cart_items.length)
    })
    
  }

}
