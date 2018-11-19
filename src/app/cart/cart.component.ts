import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cartDetails: any = [];
  // cartDetails = [{
  //   'description' : "product 1",
  //   'price' : 2000,
  //   'quntity' : 1,
  //   'duration' : 12
  // }]

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.getCartInfo();
    const orderId: string = this.route.snapshot.paramMap.get("orderId");
    console.log(orderId);
  }

  getCartInfo() {
    this.http.get(environment.api_url + "cartUrl").subscribe(
      res => {
        this.cartDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  editCartInfo() {}
}
