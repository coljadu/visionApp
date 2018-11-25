import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }


  addToCart(machineId: string, planDetail: any){

    let data = localStorage.getItem('cart');
    let cart: Array<any>;

    cart = JSON.parse(data)

    if(!data){
      cart = [];
    }

    const map = {
      machineId: machineId,
      planDetail: planDetail
    }

    cart.push(map);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(){

    let data = localStorage.getItem('cart');
    let cart: Array<any>;

    cart = JSON.parse(data)

    if(!data){
      cart = [];
    }

    return cart;
  }

  removeFromCart(machineId:string){

    let data = localStorage.getItem('cart');
    let cart: Array<any>;
    let temp = [];


    cart = JSON.parse(data)

    if(!data){
      cart = [];
    }

    for(let item of cart){
      if(item['machineId'] == machineId){
        continue;
      }

      temp.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(temp));
  }
}
