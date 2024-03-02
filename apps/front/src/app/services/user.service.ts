import { Injectable, isDevMode } from '@angular/core';

import BaseService from "./base-service";
import {createUserType, loginUserType} from "./service.interface";



@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  registerUser(user: createUserType) {
    return this.http.post<any>(this.API_BASE + "/auth/register", user)
  }

  loginUser(credentials: loginUserType) {
    return this.http.post<any>(this.API_BASE + "/auth/login", credentials)
  }

  getUser() {
    return this.http.get<any>(this.API_BASE + "/users/me", {
      observe: 'response'
    })
  }

  logoutUser() {
    return this.http.post<any>(this.API_BASE + "/auth/logout", {})
  }
}
