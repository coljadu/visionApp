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
            "&amt=" +
            this.transactionDetails.amt +
            "&txncurr=" +
            this.transactionDetails.txncurr +
            "&txnscamt=0&clientcode=" +
            this.transactionDetails.clientcode +
            "&txnid=" +
            this.transactionDetails.txnid +
            "&date=" +
            this.transactionDetails.date +
            "&custacc=" +
            this.transactionDetails.custacc +
            "&udf1=" +
            this.transactionDetails.udf1 +
            "&udf9=" +
            this.udf9 +
            "&ru=http://localhost:3000/payment?data&udf2=" +
            this.transactionDetails.udf2 +
            "&udf3=" +
            this.transactionDetails.udf3 +
            "&signature=" +
            this.transactionDetails.signature;
          window.open(redirectUrl, "_self");
        },
        err => {
          console.log(err);
        }
      );
  }
}
