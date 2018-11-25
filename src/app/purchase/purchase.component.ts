import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { environment } from "../../environments/environment";
import { AuthService } from "../core/services/auth.service";
import { CartService } from "../core/services/cart.service";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.css"]
})
export class PurchaseComponent implements OnInit {
  purchaseData = {};
  Plans: any = [];
  selectedPlan = {};
  machineId = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getPlans();
  }

  getPlans() {
    this.http
      .get(environment.api_url + "/product/plans?status=ACTIVE")
      .subscribe(res => {
        console.log(res);
        this.Plans = res;
      });
  }
  
  intitPurchase() {
    var purchasedData = {};
    purchasedData["machineId"] = this.machineId;
    purchasedData["planId"] = 1;

    this.cartService.addToCart(this.machineId, this.selectedPlan);

    this.router.navigate(["/cart"]);
  }
}
