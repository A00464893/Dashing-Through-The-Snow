import { TemplateBindingParseResult } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Shop_Categories {
  id: string;
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  @Output() routing = new EventEmitter();
  @Output() shop_item = new EventEmitter();

  

  constructor() { }


  loginFlag = false
  selected_shop_item = {}
  shop_categories :Shop_Categories[] = []

  selectedItem(): void {
    this.shop_item.emit(this.selected_shop_item)
  }
  badge = 0
  route = 'h'
  getShopItems() {
    return [
      {
        id: '1',
        name: "Trees"
      },
      {
        id: '2',
        name: "Cakes"
      }
    ]
  }


  changeRoute(route: string) {
    this.route = route
    sessionStorage.setItem('route', this.route)
    this.routing.emit(route)
  }
  login() {
    this.route = 'l'
    sessionStorage.setItem('user', '')
    sessionStorage.setItem('route', this.route)
    this.changeRoute(this.route)
  }
  logout() {
    this.loginFlag = false
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
