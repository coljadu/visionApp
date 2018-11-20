import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ShareDataService {
  res: object = {};
  orderId = "";
  constructor() {}

  storeResponse(res) {
    this.res = res;
    this.orderId = res.orderId;
  }

  retriveResponse() {
    return this.res;
  }
}
