import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService} from '../core/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {};

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  loginUser() {
    console.log(this.user);
    this.http.post(environment.api_url+'/app/login', this.user)
      .subscribe(res => {
        console.log('login');
          this.authService.saveUser(res);
          this.router.navigate(['/home']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
