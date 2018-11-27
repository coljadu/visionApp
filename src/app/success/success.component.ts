import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";
import { AuthService } from "../core/services/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.css"]
})
export class SuccessComponent implements OnInit {
  response = {};
  successData = {};
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // //this.param1 = this.route.snapshot.paramMap.get("amt");
    // this.param1 = this.route.snapshot.queryParamMap.get("amt");
    // console.log(this.param1);
    this.route.queryParamMap.subscribe(queryParams => {
      this.response["mmp_txn"] = queryParams.get("mmp_txn");
      this.response["mer_txn"] = queryParams.get("mer_txn");
      this.response["amt"] = queryParams.get("amt");
      this.response["prod"] = queryParams.get("prod");
      this.response["date"] = queryParams.get("date");
      this.response["bank_txn"] = queryParams.get("bank_txn");
      this.response["f_code"] = queryParams.get("f_code");
      this.response["clientcode"] = queryParams.get("clientcode");
      this.response["bank_name"] = queryParams.get("bank_name");
      this.response["auth_code"] = queryParams.get("auth_code");
      this.response["ipg_txn_id"] = queryParams.get("ipg_txn_id");
      this.response["merchant_id"] = queryParams.get("merchant_id");
      this.response["desc"] = queryParams.get("desc");
      this.response["udf9"] = queryParams.get("udf9");
      this.response["discriminator"] = queryParams.get("discriminator");
      this.response["surcharge"] = queryParams.get("surcharge");
      this.response["surcharge"] = queryParams.get("surcharge");
      this.response["CardNumber"] = queryParams.get("CardNumber");
      this.response["udf1"] = queryParams.get("udf1");
      this.response["udf2"] = queryParams.get("udf2");
      this.response["udf3"] = queryParams.get("udf3");
      this.response["udf4"] = queryParams.get("udf4");
      this.response["udf5"] = queryParams.get("udf5");
      this.response["udf6"] = queryParams.get("udf6");
      this.response["signature"] = queryParams.get("signature");
      console.log(this.response);
      let config = this.authService.getCofigObj();
      this.http
        .post(
          environment.api_url + "/payment/trxComplete",
          this.response,
          config
        )
        .subscribe(res => {
          console.log(res);
          this.successData = res;
        });
    });
  }
}
