import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  
  constructor(
    private http: HttpClient,
  ) { }

  initTranx(orderId:string, config: any){
    return this.http
      .get(
        environment.api_url + "/payment/trxInitiate?orderId=" + orderId,
        config
      )
  }
}
