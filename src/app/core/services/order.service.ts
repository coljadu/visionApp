import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
  ) { }

  createOrder(cart: Array<any>, config:any){
    
    return this.http
      .post(
        environment.api_url + "/customers/initiateOrder",
        cart,
        config
      )
  }
}
