import { Injectable } from '@angular/core';

import BaseService from "./base-service";
import {createUserType, loginUserType, updateUserType} from "./service.interface";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private currentUser?: UserInterface

  setCurrentUser(user: UserInterface | undefined) {
    this.currentUser = user
  }

  getCurrentUser() {
    return this.currentUser
  }

  isLoggedIn() {
    return !!this.currentUser
  }

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

  updateUser(data: updateUserType) {
    return this.http.put<any>(this.API_BASE + "/users/me/edit", data)
  }

  logoutUser() {
    return this.http.post<any>(this.API_BASE + "/auth/logout", {})
  }

  followUser(userToFollowId: number, src: string) {
    return this.http.post<any>(this.API_BASE + "/users/follows/", {
      userToFollowId: userToFollowId,
      src: src,
    })
  }

  stopFollowingUser(userId: number) {
    return this.http.delete<any>(this.API_BASE + "/users/follows/" + userId)
  }

  static isUserFollowsHim(user?: UserInterface, userId?: number) {
    if(!userId) return false

    for(let i = 0; i < user!.follows!.length; i++) {
      let followed = user!.follows![i]
      if(followed.followedId === userId) return true
    }
    return false
  }
}
