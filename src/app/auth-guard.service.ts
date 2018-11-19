import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from './core/services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    console.log('auth guard called');
    var user = localStorage.getItem('user');
    if(!user) this.router.navigate(['/login']); 
    return user ? true : false;
  }

}
