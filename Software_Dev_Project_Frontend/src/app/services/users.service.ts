import { HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  master_url = 'https://localhost:7106/api/'

  clear_Obj(obj:Object | any) {
    Object.keys(obj).forEach(key => obj[key]=null);
   return obj
  }

  login(obj:any){
    return this.http.post(this.master_url + 'UserData/Login',obj)
  }

  register(obj: any){
    return this.http.post(this.master_url + 'UserData/Register',obj)
  }
  get_addresses(obj:any){
    return this.http.post(this.master_url + 'UserAddress/GetAddressByUsername',obj)
  }
  add_address(obj:any){
    return this.http.post(this.master_url + 'UserAddress/AddAddress',obj)
  }
  delete_address(obj:any){
    return this.http.post(this.master_url + 'UserAddress/DeleteAddress',obj)
  }
  get_user_data(obj:any){
    return this.http.post(this.master_url + 'UserData/getUserDataUsername',obj)
  }
  update_user_data(obj:any){
    return this.http.post(this.master_url + 'UserData/Update',obj)
  }
  update_pass(obj:any){
    return this.http.post(this.master_url + 'UserData/UpdatePassword',obj)
  }
  get_user_details(obj:any){
    return this.http.post(this.master_url + 'UserData/getUserDataUsername',obj)
  }
  get_orders(obj:any){
    return this.http.post(this.master_url + 'Orders/getOrderDataByUsername',obj)
  }
  get_order_details(obj:any){
    return this.http.post(this.master_url + 'OrderDetails/getOrderDetailsByOrderID',obj)
  }
  add_order(obj:any){
    return this.http.post(this.master_url + 'Orders/AddOrder',obj)
  }
  add_order_details(obj:any){
    return this.http.post(this.master_url + 'OrderDetails/AddOrderDetails',obj)
  }
  get_all_products(){
    return this.http.get(this.master_url + 'Product/GetAll')
  }
  get_products_id(obj:any){
    return this.http.post(this.master_url + 'Product/Get',obj)
  }
  get_all_product_category(){
    return this.http.get(this.master_url + 'ProductCategory/GetAll')
  }
  get_cart_item(obj:any){
    return this.http.post(this.master_url + 'CartItem/GetItemsByUsername',obj)
  }
  add_cart_item(obj:any){
    return this.http.post(this.master_url + 'CartItem/AddCartItem',obj)
  }
  delete_cart_item(obj:any){
    return this.http.post(this.master_url + 'CartItem/DeleteCartItem',obj)
  }
  delete_cart_itemByUsername(obj:any){
    return this.http.post(this.master_url + 'CartItem/DeleteCartItemByUsername',obj)
  }
  get_country(){
    return this.http.post(this.master_url + 'GeoDetails/GetCountry',{})
  }
  get_province(obj:any){
    return this.http.post(this.master_url + 'GeoDetails/GetProvinceByCountry',obj)
  }
  get_city(obj:any){
    return this.http.post(this.master_url + 'GeoDetails/GetCityByProvince',obj)
  }
  get_postal_code(obj:any){
    return this.http.post(this.master_url + 'GeoDetails/GetPostalByCity',obj)
  }
  add_payment_details(obj:any){
    return this.http.post(this.master_url + 'PaymentDetails/AddPayment',obj)
  }
}



