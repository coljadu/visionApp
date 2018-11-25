import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { environment } from "../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { CartService } from "../core/services/cart.service";
import { PaymentService } from "../core/services/payment.service";
import { OrderService } from "../core/services/order.service";
import { TransactionService } from "../core/services/transaction.service";
import { ThrowStmt } from "@angular/compiler";

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private transactionService: TransactionService,
  ) {}

  ngOnInit() {
    //this.getCartInfo();
    this.cartDetails = this.cartService.getCart();
  }
  
  removeItem(machineId: string){
    this.cartService.removeFromCart(machineId);
    this.ngOnInit();
  }

  initiateTransaction() {
    let config = this.authService.getCofigObj();
  
    const url = this.paymentService.buildUrl('100', 'dlfjklsajfl');
    console.log({url});

    window.open(url, "_self");
    // this.orderService.createOrder(this.cartDetails, config).subscribe((res)=>{
    //   // it shoudld return an ordre id
      
    //   this.transactionService.initTranx(res['orderID'], config).subscribe(()=>{
    //     const url = this.paymentService.buildUrl('100', 'dlfjklsajfl');
    //     console.log({url});

    //     window.open(url, "_self");
    //   });
    // });

  }
}
