import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  user_details: any;
  constructor(public dialog: MatDialog, private userServices: UsersService, private sharedService: SharedService, private _router: Router) {
  }

  open_order_details(details: any) {
    const dialogRef = this.dialog.open(OrderDialog, {
      data: details,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayedColumns: string[] = ['order', 'title', 'total', 'order_date', 'details'];
  order_details: any
  // order_details = new MatTableDataSource([
  //   {
  //     id: 1,
  //     image: 'https://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
  //     title: 'Cristmas Tree and More',
  //     price: 550.00,
  //     order_date: '12 Dec 2022 1:38 pm',
  //     details: [{
  //       id: 1,
  //       image: 'https://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
  //       title: 'Cristmas Tree',
  //       price: 200.00,
  //       order_date: '12 Dec 2022 1:38 pm',
  //       quantity:2
  //     },{
  //       id: 2,
  //       image: 'https://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
  //       title: 'Crist Tree',
  //       price: 150.00,
  //       order_date: '12 Dec 2022 1:38 pm',
  //       quantity:1
  //     }]
  //   }
  // ]);

  ngAfterViewInit() {
    this.order_details.paginator = this.paginator;
    this.order_details.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.order_details.filter = filterValue.trim().toLowerCase();

    if (this.order_details.paginator) {
      this.order_details.paginator.firstPage();
    }
  }

  register_hide = true;
  change_pass = {
    old: '',
    new: '',
    confirm: ''
  }
  new_address = {
    name: '',
    username: sessionStorage.getItem('user_id') || ' ',
    mobile: '',
    flat_no: ' ',
    street_address: '',
    city: '',
    postal_code: '',
    province: '',
    country: '',
  }
  list_add: any = []
  // list_add = [{
  //   id: 1,
  //   name: 'Allen',
  //   username:'',
  //   mobile: '6113131313',
  //   flat_no: 'Apt 722',
  //   street_address: '1030 South Park Street',
  //   city: 'Halifax',
  //   postal_code: 'B3H 2W3',
  //   province: 'Nova Scotia',
  //   country: 'Canada',
  // },
  // {
  //   id: 2,
  //   username:'',
  //   mobile: '6113131313',
  //   flat_no: 'Apt 722',
  //   street_address: '1030 South Park Street',
  //   city: 'Halifax',
  //   postal_code: 'B3H 2W3',
  //   province: 'Nova Scotia',
  //   country: 'Canada'
  // }]

  unique_country: string[] = []
  unique_province: string[] = []
  unique_city: string[] = []
  unique_postal_code: string[] = []

  public filteredCountry = this.unique_country.slice();
  public filteredProvince = this.unique_province.slice();
  public filteredCity = this.unique_city.slice();
  public filteredPostalCode = this.unique_postal_code.slice();

  user: any = {}
  // user = {
  //   'username': 'piyushpriyam.piyush@gmail.com',
  //   'first_name': 'Piyush',
  //   'last_name': 'Priyam',
  //   'mobile': '8007751172',
  //   'email': 'piyushpriyam.piyush@gmail.com'
  // }
  nav_item = 'p'
  edit_flag = [{
    edit_item: 'Profile Information',
    flag: false
  },
  {
    edit_item: 'Email',
    flag: false
  },
  {
    edit_item: 'Phone',
    flag: false
  },
  {
    edit_item: 'Add Address',
    flag: false
  }
  ]
  folders = [
    {
      name: 'My Orders',
      allias: 'o',
      icon: 'view_list'
    },
    {
      name: 'Profile Information',
      allias: 'p',
      icon: 'person_pin'
    },
    {
      name: 'Manage Addresses',
      allias: 'm',
      icon: 'location_on'
    },
    {
      name: 'Change Password',
      allias: 'c',
      icon: 'lock_open'
    }
  ]

  email = new FormControl('', [Validators.required, Validators.email]);

  edit_profile(allias: string) {
    let index = this.edit_flag.findIndex(x => x.edit_item === allias)
    this.edit_flag[index]['flag'] = !this.edit_flag[index]['flag']
    this.new_address = {
      name: '',
      username: sessionStorage.getItem('user_id') || ' ',
      mobile: '',
      flat_no: ' ',
      street_address: '',
      city: '',
      postal_code: '',
      province: '',
      country: '',
    }
  }
  get_edit_profile_flag(allias: string) {
    let index = this.edit_flag.findIndex(x => x.edit_item === allias)
    return this.edit_flag[index]['flag']
  }
  save(allias: string) {
    this.userServices.update_user_data(this.user).subscribe((r: any) => {
      this.user = r.value
    }, err => {

    })
    this.edit_profile(allias)
  }
  filter(item: string) {
    if (item === 'country') {
      this.userServices.get_province({ country: this.new_address.country }).subscribe((r: any) => {
        this.unique_province = r.value
        this.filteredProvince = this.unique_province.slice();
      })
    }
    else if (item === 'province') {
      this.userServices.get_city({ province: this.new_address.province, country: this.new_address.country }).subscribe((r: any) => {
        this.unique_city = r.value
        this.filteredCity = this.unique_city.slice();
      })
    }
    else if (item === 'city') {
      this.userServices.get_postal_code({ city: this.new_address.city, province: this.new_address.province, country: this.new_address.country }).subscribe((r: any) => {
        this.unique_postal_code = r.value
        this.filteredPostalCode = this.unique_postal_code.slice();
      })
    }

  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  logout() {
    this.sharedService.loginFlag.next(false)
    this.sharedService.route.next('l')
    sessionStorage.clear()
    this._router.navigate(['login'])
  }

  navigate(allias: string) {
    this.nav_item = allias
  }
  check_fields(allias: string) {
    if (allias === 'Add Address') {
      return Object.values(this.new_address).some(x => x === null || x === '') || this.check_phone(this.new_address.mobile);
    }
    else {
      return Object.values(this.user).some(x => x === null || x === '') || this.check_phone(this.user.mobile);;
    }
  }
  save_address() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the address',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        if (result.value) {
          if (this.new_address.flat_no.trim() == '')
            this.new_address.flat_no = ' '
          this.new_address.username = sessionStorage.getItem('user_id') || ''
          console.log(this.new_address)
          this.userServices.add_address(this.new_address).subscribe((r: any) => {
            this.list_add = r.value
          }, err => {

          })
          this.edit_profile('Add Address')
          Swal.fire('Success', 'Address added successfully.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.edit_profile('Add Address')
          Swal.fire('Cancelled', '', 'warning');

        }
      }
    });


  }
  delete_add(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete the address',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.userServices.delete_address({ username: sessionStorage.getItem('user_id'), id: id }).subscribe((r: any) => {
          this.list_add = r.value
        }, err => {

        })
        // const index = this.list_add.findIndex((x: { id: any; }) => x.id === id)
        // this.list_add.splice(index, 1)
        Swal.fire('Removed!', 'Address removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', '', 'error');
      }
    });

  }
  change_password() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to change your password',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.user.password = this.change_pass.old + '@@@@@@@@' + this.change_pass.new
        this.userServices.update_pass(this.user).subscribe((r: any) => {
          this.user = r.value
        }, err => {

        })
        this.change_pass = {
          old: '',
          new: '',
          confirm: ''
        }

        Swal.fire('Changed', 'Password changed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Old Password Prevails', 'error');
      }
      this.nav_item = 'p'
    });


  }
  check_phone(mobile: any) {
    if (mobile.toString().length == 10) {
      return ! /^[\+]?[(]?[1-9]{1}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{6}$/g.test(mobile)
    }
    else
      return true
  }

  ngOnInit(): void {
    this.userServices.get_country().subscribe((r: any) => {
      this.unique_country = r.value
      this.filteredCountry = this.unique_country.slice();
    })

    this.userServices.get_user_data({ username: sessionStorage.getItem('user_id') }).subscribe((r: any) => {
      this.user = r.value
    }, err => {

    })
    this.userServices.get_addresses({ username: sessionStorage.getItem('user_id') }).subscribe((r: any) => {
      this.list_add = r.value
    }, err => {
    })
    this.userServices.get_orders({ username: sessionStorage.getItem('user_id') }).subscribe((r: any) => {

      r.value.forEach((element: any) => {
        this.userServices.get_order_details({ order_id: element['id'] }).subscribe((o: any) => {
          element['details'] = o.value
          element['details'].forEach((ele: any) => {
            ele['order_date'] = element['order_date']
            this.userServices.get_products_id({ id: ele['product_id'] }).subscribe((p: any) => {
              ele['title'] = p.value['name']
              ele['image'] = p.value['image']
              if (element['details'].length > 1 && element['title'] == undefined) {
                element['title'] = p.value['name'] + ' and more...'
                element['image'] = p.value['image']
              }
              else if (element['title'] == undefined) {
                element['title'] = p.value['name']
                element['image'] = p.value['image']
              }
            })
          })
        }, err => {
        })
      });
      this.order_details = new MatTableDataSource(r.value)
    }, err => {
    })
  }

}


@Component({
  selector: 'order-dialog',
  templateUrl: 'order_dialog.html',
  styleUrls: ['./account.component.scss']
})
export class OrderDialog {
  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

