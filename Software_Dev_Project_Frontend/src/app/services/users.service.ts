import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  clear_Obj(obj:Object | any) {
    Object.keys(obj).forEach(key => obj[key]=null);
   return obj
  }

  login(obj:Object | any){

    return obj
  }

  register(obj:Object | any){

    return obj
  }

  
}



