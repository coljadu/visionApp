import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }
  saveUser(user){
    localStorage.setItem('user', JSON.stringify(user));
  }
  getCofigObj() {
    let _accessToken;
    let user = localStorage.getItem('user');
    if (user) {
        let _parsedContent = JSON.parse(user);
        _accessToken = _parsedContent.access_token;
    }
    let config = {
        headers: {
            "Authorization": "Bearer " + _accessToken,
            'Content-Type' : 'application/json'
        }
    };

    return config;
}
}
