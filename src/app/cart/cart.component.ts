import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { environment } from "../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { ShareDataService } from "../core/services/share-data.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cartDetails = [];
  planDetails: object = {};
  transactionDetails: any = {};
  udf9 = "license-purcase";
  orderId = "";
  // cartDetails = [{
  //   'description' : "product 1",
  //   'price' : 2000,
  //   'quntity' : 1,
  //   'duration' : 12
  // }]

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private shareDataService: ShareDataService
  ) {}

  ngOnInit() {
    //this.getCartInfo();
    this.planDetails = this.shareDataService.retriveResponse();
    this.orderId = this.shareDataService.orderId;
    this.cartDetails.push(this.planDetails);
    console.log(this.cartDetails);
  }

  initiateTransaction() {
    let config = this.authService.getCofigObj();
    this.http
      .get(
        environment.api_url + "/payment/trxInitiate?orderId=" + this.orderId,
        config
      )
      .subscribe(
        res => {
          this.transactionDetails = res;
          console.log(res);
          let redirectUrl: any =
            "https://paynetzuat.atomtech.in/paynetz/epi/fts?login=" +
            this.transactionDetails.login +
            "&pass= " +
            this.transactionDetails.pass +
            "&ttype=" +
            this.transactionDetails.ttype +
            "&prodid=" +
            this.transactionDetails.prodid +
            "&amt=0&txncurr=" +
            this.transactionDetails.txncurr +
            "&txnscamt=0.0&clientcode=" +
            // this.transactionDetails.txnscamt +
            this.transactionDetails.clientcode +
            "&txnid=30&date=" +
            //this.transactionDetails.txnid +
            this.transactionDetails.date +
            "&custacc=" +
            this.transactionDetails.custacc +
            "&udf1=" +
            this.transactionDetails.udf1 +
            "&udf9=" +
            this.udf9 +
            "&ru=" +
            this.transactionDetails.ru +
            "&udf2=" +
            this.transactionDetails.udf2 +
            "&udf3=" +
            this.transactionDetails.udf3 +
            "&signature=dd305959379d5520406ef33056ea008ad30f8413ebdb518163be61aa2d8a3100d7b0209c6477fe0e49ed8430a5d2119c4d273921f95a09e7ec55e2c7084973e0";
          //this.transactionDetails.signature;
          console.log(redirectUrl);
          debugger;
          window.open(redirectUrl, "_self");
        },
        err => {
          console.log(err);
        }
      );
  }
}
