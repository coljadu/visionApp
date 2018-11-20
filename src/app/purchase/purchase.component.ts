import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { environment } from "../../environments/environment";
import { AuthService } from "../core/services/auth.service";
import { ShareDataService } from "../core/services/share-data.service";

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
    private shareDataService: ShareDataService
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
    var puchasedData = {};
    puchasedData["machineId"] = this.machineId;
    puchasedData["planId"] = 1;
    let config = this.authService.getCofigObj();
    console.log("purachses data", puchasedData);
    console.log("config data", config);

    this.http
      .post(
        environment.api_url + "/customers/initiateOrder",
        puchasedData,
        config
      )
      .subscribe(
        res => {
          this.shareDataService.storeResponse(res);
          this.router.navigate(["/cart"]);
        },
        err => {
          console.log(err);
        }
      );
  }
}
