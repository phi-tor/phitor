import { Injectable, isDevMode } from '@angular/core';
import {HttpClient} from "@angular/common/http";

type createUserType = {
  username: string
  email: string
  password: string
  password_confirmation: string
  lang: string
  terms: string
}

type loginUserType = {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_BASE = isDevMode()
    ? "http://localhost:3333"
    : "" // prod api base url

  constructor(private http: HttpClient) { }

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
