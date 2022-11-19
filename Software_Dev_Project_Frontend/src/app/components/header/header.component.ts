import { TemplateBindingParseResult } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Shop_Categories {
  key: string;
  value: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})



export class HeaderComponent implements OnInit {

  @Output() routing = new EventEmitter();
  @Output() shop_item = new EventEmitter();
  @Input() loginFlag: boolean | undefined ;
  @Input() badge: number | undefined ;
  

  constructor() { }

  selected_shop_item!:Shop_Categories
  shop_categories :Shop_Categories[] = []

  selectedItem(cat: any): void {
    this.route = 's'
    this.selected_shop_item = cat
    sessionStorage.setItem('route', this.route)
    this.shop_item.emit([this.selected_shop_item])
    this.routing.emit(this.route)

  }
  route = 'h'
  getShopItems() {
    return [
      {
        key: '1',
        value: "Trees"
      },
      {
        key: '2',
        value: "Cakes"
      }
    ]
  }


  changeRoute(route: string) {
    this.route = route
    sessionStorage.setItem('route', this.route)
    
    if (route == 's'){
      this.selected_shop_item = { key : '', value:''}
    }
      this.shop_item.emit([])
      this.routing.emit(route)
  }
  login() {
    this.route = 'l'
    sessionStorage.setItem('user', '')
    sessionStorage.setItem('route', this.route)
    this.changeRoute(this.route)
  }
  logout() {
    this.route = 'h'
    sessionStorage.clear()
    sessionStorage.setItem('route', this.route)
    sessionStorage.setItem('user', '')

  }
  getBadge(badge: number) {
    this.badge = badge
  }
  ngOnInit(): void {
    this.route = sessionStorage.getItem('route') || 'h'
    this.changeRoute(this.route)
    this.shop_categories = this.getShopItems()
  }


}
