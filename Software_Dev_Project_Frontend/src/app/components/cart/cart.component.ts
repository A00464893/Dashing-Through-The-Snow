import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker'


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { Router } from '@angular/router';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CartComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  @Output() updateBadge = new EventEmitter();

  constructor(private userServices: UsersService, private sharedService: SharedService, private _formBuilder: FormBuilder, private _router: Router) {
    this.minDate = new Date(2016, 1, 1);
    this.maxDate = new Date(2031, 11, 31);
  }
  minDate: Date;
  maxDate: Date;
  total_price = 0
  badge = 0
  list_add: any
  date = new FormControl(moment());
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    // const ctrlValue = this.date.value!;
    // ctrlValue.month(normalizedMonthAndYear.month());
    // ctrlValue.year(normalizedMonthAndYear.year());
    this.date.value?.month(normalizedMonthAndYear.month())
    this.date.value?.year(normalizedMonthAndYear.year())
    // this.date.setValue(ctrlValue);
    console.log(this.date.value)

    datepicker.close();
  }
  // list_add = [{
  //   id: 1,
  //   name: 'Allen',
  //   phone: '6113131313',
  //   flat: 'Apt 722',
  //   street: '1030 South Park Street',
  //   city: 'Halifax',
  //   postal_code: 'B3H 2W3',
  //   province: 'Nova Scotia',
  //   country: 'Canada',
  // },
  // {
  //   id: 2,
  //   name: 'Piyush',
  //   phone: '6113131313',
  //   flat: 'Apt 722',
  //   street: '1030 South Park Street',
  //   city: 'Halifax',
  //   postal_code: 'B3H 2W3',
  //   province: 'Nova Scotia',
  //   country: 'Canada',
  // }]
  selected_add: any = {}
  cart_items: any
  //cart_items: any = [{
  //   id: 1,
  //   image: 'https://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
  //   title: 'Cristmas Tree',
  //   price: 200.00,
  //   quantity: 2
  // },
  // {
  //   id: 2,
  //   image: 'https://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
  //   title: 'Crist Tree',
  //   price: 150.00,
  //   q/ uantity: 1
  // },
  // ]
  card_details = {
    card_number: '',
    cvv: '',
    expiry: '',
    card_type: '',
    name_on_card: '',
    username: '',
    amount : 0,
    status : '',
    transaction_id:''
  }
  valid_name(name: string) {
    return /^[A-Z a-z]*$/gm.test(name)
  }
  valid_card(card: any) {
      if ([51, 52, 53, 54, 55].includes(parseInt(card.toString().substring(0, 2))) && card.toString().length == 16) {
        this.card_details.card_type = 'MasterCard'
        return true
      }
      else if (parseInt(card.toString().substring(0, 1)) == 4 && card.toString().length == 16) {
        this.card_details.card_type = 'Visa'
        return true
      }
      else if ([34, 37].includes(parseInt(card.toString().substring(0, 2))) && card.toString().length == 15) {
        this.card_details.card_type = 'American Express'
        return true
      }
      else
        return false
  }
  valid_cvv(cvv: any) {
    if (cvv.toString().length == 3) {
      return true
    }
    else {
      return false
    }
  }
  valid_expiry(expiry:string){
    if(expiry.includes('/') && expiry.length == 7){
      const arr = expiry.split('/')
      try{
        if(parseInt(arr[0]) < 13 && parseInt(arr[1]) > 2015 && parseInt(arr[1]) < 2032)
          return true
        else
          return false
      }
      catch{
        return false
      }
    }
    else
      return false
    return /^(0[1-9]|1[0-2])\/([0-9]{4})$/.test(expiry)
  }
  makeid(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  make_payemnt() {
    this.card_details.username =  sessionStorage.getItem('user_id') || ''
    this.card_details.amount = this.total_price
    this.card_details.status = 'success'
    this.card_details.card_number =  this.card_details.card_number.toString()
    this.card_details.cvv =  this.card_details.cvv.toString()
    this.card_details.transaction_id = this.makeid(24)
    this.userServices.add_payment_details(this.card_details).subscribe((r:any)=>{
      const order = {
        username: this.card_details.username,
        payment_id : r.value.id,
        total: this.total_price,
        order_date : new Date().toLocaleString()
      }
      console.log(order)
      this.userServices.add_order(order).subscribe((o:any)=>{
        this.cart_items.forEach((element: any) => {
          const order_details = {
            order_id : o.value.id,
            product_id : element.product_id,
            amount: element.price,
            quantity: element.quantity
          }
          console.log(order_details)
          this.userServices.add_order_details(order_details).subscribe(x=>{
            
          })
          this.userServices.delete_cart_itemByUsername({ username: sessionStorage.getItem('user_id') }).subscribe(x=>{
            this.cart_items = []
            this.card_details = this.userServices.clear_Obj(this.card_details)
            this.sharedService.badge.next(0)
            this.place_order = false
            this._router.navigate(['shop'])
          })
        })
      })
    })

  }
  change_quantity(id: any, action: string) {
    const index = this.cart_items.findIndex((x: { id: any; }) => x.id == id)
    if (action == 'add') {
      this.cart_items[index]['quantity'] += 1;

    }
    else {
      if (this.cart_items[index]['quantity'] == 1) {
        Swal.fire({
          title: 'Are you sure ?',
          text: 'This will remove the item',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            this.userServices.delete_cart_item({ id: id, username: sessionStorage.getItem('user_id') }).subscribe(((r: any) => {
              this.cart_items = r.value
              this.sharedService.badge.next(this.cart_items.length)
              this.cart_items.forEach((element: any) => {
                element['quantity'] = 1
                this.userServices.get_products_id({ id: element['product_id'] }).subscribe((p: any) => {
                  element['name'] = p.value['name']
                  element['image'] = p.value['image']
                  element['price'] = p.value['price']
                  this.calculate_price()
                })
              })

            }))
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.calculate_price()
          }
        });

      }
      else {
        this.cart_items[index]['quantity'] -= 1;
      }
    }

    this.calculate_price()
  }
  calculate_price() {
    this.total_price = 0
    this.cart_items.forEach((r: any) => {
      r['total_price'] = r.price * r.quantity
      this.total_price = this.total_price + r['total_price']
    })
  }
  updateCart() {
    this.updateBadge.emit(this.badge)
  }
  change_add(add: any) {
    this.selected_add = add
  }

  place_order = false

  ngOnInit(): void {
    this.userServices.get_addresses({ username: sessionStorage.getItem('user_id') }).subscribe((r: any) => {
      this.list_add = r.value
      this.selected_add = this.list_add[0]
    }, err => {
    })
    this.userServices.get_cart_item({ username: sessionStorage.getItem('user_id') }).subscribe((r: any) => {
      this.cart_items = r.value
      this.cart_items.forEach((element: any) => {
        element['quantity'] = 1
        this.userServices.get_products_id({ id: element['product_id'] }).subscribe((p: any) => {
          element['name'] = p.value['name']
          element['image'] = p.value['image']
          element['price'] = p.value['price']
          this.calculate_price()
        })
      });

    }, err => {
    })


  }

}
