import { Injectable } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  defaults = {
    login: '197',
    pass: 'Test@123',
    prodid: 'NSE',
    reqHashKey: "KEY123657234",
    ttype: 'NBFundTransfer',
    txncurr: 'INR',
    clientcode: btoa('NAVIV'),
    custacc: '1234567890',
    ru: 'https://localhost:4200'
  }

  constructor() { }

  buildUrl(amt: string, orderId: string){

    const signature_request = this.getEncodedValueWithSha2(this.defaults.reqHashKey, [
      this.defaults.login,
      this.defaults.pass,
      this.defaults.ttype,
      this.defaults.prodid,
      orderId,
      amt,
      this.defaults.txncurr
    ]);

    let redirectUrl: any =
    "https://paynetzuat.atomtech.in/paynetz/epi/fts?login=" +
    this.defaults.login +
    "&pass= " +
    this.defaults.pass +
    "&ttype=" +
    this.defaults.ttype +
    "&prodid=" +
    this.defaults.prodid +
    "&amt=" +
    amt +
    "&txncurr=" +
    this.defaults.txncurr +
    "&txnscamt=0.0&clientcode=" +
    // this.transactionDetails.txnscamt +
    this.defaults.clientcode +
    "&txnid=" +
    orderId + 
    "&date=" +
    //this.transactionDetails.txnid +
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() +
    "&custacc=" +
    this.defaults.custacc +
    "&ru=" +
    this.defaults.ru +
    "&signature=" + 
    signature_request;

    return redirectUrl;
  }

  getEncodedValueWithSha2(hashKey: string, params: Array<string>){

    return crypto.HmacSHA512(params.join(''), hashKey)
  }
}
