import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { NgIf } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../environments/environment";
import { AuthService } from "../core/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: any = {};
  stateList = [{ id: 1, name: "madhya pradesh" }];
  cityList = [{ id: 1, name: "Bhopal" }];

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getStatesList();
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      userType: ["", Validators.required],
      contactNo: ["", [Validators.required, Validators.minLength(10)]],
      countryId: ["", Validators.required],
      stateId: ["", Validators.required],
      cityId: ["", Validators.required],
      zipCode: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.user.firstName = this.registerForm.value.firstName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    this.user.userType = this.registerForm.value.userType;
    this.user.contactNo = this.registerForm.value.contactNo;
    this.user.countryId = this.registerForm.value.countryId;
    this.user.stateId = this.registerForm.value.stateId;
    this.user.cityId = this.registerForm.value.cityId;
    this.user.zipCode = this.registerForm.value.zipCode;
    this.http
      .post(environment.api_url + "/signup/register", this.user)
      .subscribe(
        res => {
          console.log("signup");
          this.authService.saveUser(res);
          this.router.navigate(["/home"]);
        },
        err => {
          console.log(err);
        }
      );
  }
  getStatesList() {
    // this.http.get(environment.api_url+'/location/country/1/states')
    //   .subscribe(res => {
    //     console.log(res);
    //     this.stateList = res;
    //     }, (err) => {
    //       console.log(err);
    //     }
    //   );
  }
  getCityList(StateId) {
    // this.http.get(environment.api_url+'/location/states/'+StateId+'/cities')
    //   .subscribe(res => {
    //     console.log(res);
    //     }, (err) => {
    //       console.log(err);
    //     }
    //   );
    debugger;
    console.log(StateId);
    if (StateId === "1")
      this.cityList = [{ id: 1, name: "bhopal" }, { id: 2, name: "Indore" }];
    else if (StateId === 2)
      this.cityList = [{ id: 1, name: "Mumbai" }, { id: 2, name: "Pune" }];
    else if (StateId === 3)
      this.cityList = [{ id: 1, name: "Lakhnao" }, { id: 2, name: "Kanpur" }];
  }
}
